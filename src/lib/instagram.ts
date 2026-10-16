/**
 * ──────────────────────────────────────────────────────────────────────────
 *  Official Meta / Instagram Graph API Service
 *  Secure server-side media integration for @designerworld1948
 *  
 *  - Supports Instagram Login / Instagram Business API / Basic Display
 *  - Strict server-only token security (NEVER exposed to client)
 *  - Next.js ISR caching with 15-minute revalidation (900s)
 *  - In-memory fallback cache to guarantee 100% visual stability
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface InstagramMediaItem {
  id: string;
  caption: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl: string;
  videoUrl?: string;
  permalink: string;
  timestamp?: string;
  isReel: boolean;
  isCarousel: boolean;
  aspectRatioClass?: string;
}

export interface InstagramFeedResult {
  isConfigured: boolean;
  posts: InstagramMediaItem[];
  handle: string;
  profileUrl: string;
  source: "api" | "cache" | "unconfigured" | "error";
  fetchedAt: number;
}

import cachedInstagramData from "@/data/instagram_cache.json";

const DEFAULT_HANDLE = "designerworld1948";
const FALLBACK_TOKEN =
  "IGAAXznsFUVCxBZAFpCT05Kem1PX2xiNlk2Vi16aDF3UEpaVUxFUjdzSjRDbVZAxLWdycjlONEtZAZA3FkcWZA6Qm9JQjVyTWhUb2FNeVdHeWxUUm9DeFFpZAmJCSHdaX0ZAtS21vUTFHY2VVVW4xSkVUR3dYNHFEZAVYwODBJM1k1TmdfawZDZD";

// Stale-while-revalidate in-memory fallback cache
let memoryCache: {
  result: InstagramFeedResult | null;
  timestamp: number;
} = {
  result: null,
  timestamp: 0,
};

export function getInstagramHandle(): string {
  return process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || DEFAULT_HANDLE;
}

export function getInstagramProfileUrl(): string {
  const handle = getInstagramHandle();
  return `https://www.instagram.com/${handle}/`;
}

/**
 * Cleanly truncates captions for editorial preview cards
 */
export function formatCaptionTeaser(caption?: string, maxLen = 80): string {
  if (!caption) return "";
  const cleaned = caption
    .replace(/#[\w_]+/g, "") // Clean trailing hashtags for editorial aesthetic
    .replace(/\n+/g, " ")
    .trim();
  if (cleaned.length <= maxLen) return cleaned;
  return cleaned.substring(0, maxLen).trim() + "…";
}

/**
 * Relative time formatting (e.g., '2d ago', '1w ago')
 */
export function formatRelativeTime(timestamp?: string): string {
  if (!timestamp) return "";
  try {
    const diffMs = Date.now() - new Date(timestamp).getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 24) return `${Math.max(1, diffHours)}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks}w ago`;
  } catch {
    return "";
  }
}

/**
 * Transforms raw Meta API items into unified InstagramMediaItem list
 */
function transformRawPosts(rawList: any[], profileUrl: string): InstagramMediaItem[] {
  const valid = rawList.filter(
    (item: any) => item && (item.media_url || item.thumbnail_url)
  );

  return valid.slice(0, 10).map((item: any, index: number) => {
    const isVideo = item.media_type === "VIDEO";
    const isReel = isVideo || (typeof item.permalink === "string" && item.permalink.includes("/reel/"));
    const isCarousel = item.media_type === "CAROUSEL_ALBUM";

    // Validate playable video stream URL
    const hasPlayableVideo = isVideo && typeof item.media_url === "string" && item.media_url.startsWith("http");
    const videoUrl = hasPlayableVideo ? item.media_url : undefined;

    // Poster thumbnail
    const posterUrl = (isVideo && item.thumbnail_url) ? item.thumbnail_url : (item.media_url || item.thumbnail_url || "");

    // Alternating aspect ratio rhythm
    let aspectRatioClass = "aspect-[4/5]";
    if (index === 1 || index === 4 || index === 7) {
      aspectRatioClass = "aspect-square";
    } else if (index === 2 || index === 5) {
      aspectRatioClass = "aspect-[3/4]";
    }

    return {
      id: String(item.id || index),
      caption: item.caption || "",
      mediaType: item.media_type || "IMAGE",
      mediaUrl: item.media_url || posterUrl,
      thumbnailUrl: posterUrl,
      videoUrl,
      permalink: item.permalink || profileUrl,
      timestamp: item.timestamp,
      isReel,
      isCarousel,
      aspectRatioClass,
    };
  });
}

/**
 * Fetches latest official posts directly from Meta's Graph API.
 * Server-only execution. Guaranteed to return populated posts via bundled fallback.
 */
export async function fetchInstagramFeed(): Promise<InstagramFeedResult> {
  const token = (
    process.env.IG_ACCESS_TOKEN ||
    process.env.INSTAGRAM_ACCESS_TOKEN ||
    FALLBACK_TOKEN
  )?.trim();

  const handle = getInstagramHandle();
  const profileUrl = getInstagramProfileUrl();

  const getFallbackPosts = () => {
    if (Array.isArray(cachedInstagramData) && cachedInstagramData.length > 0) {
      return transformRawPosts(cachedInstagramData, profileUrl);
    }
    return [];
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    // Always use graph.instagram.com/me/media for Instagram user token
    const endpoint = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`;

    const res = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 900 }, // Cache server-side for 15 minutes (900 seconds)
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Instagram API] Meta API returned ${res.status}. Using cached feed.`);
      const fallbackPosts = getFallbackPosts();
      return {
        isConfigured: true,
        posts: memoryCache.result?.posts.length ? memoryCache.result.posts : fallbackPosts,
        handle,
        profileUrl,
        source: "cache",
        fetchedAt: Date.now(),
      };
    }

    const json = await res.json();

    if (!Array.isArray(json.data) || json.data.length === 0) {
      const fallbackPosts = getFallbackPosts();
      return {
        isConfigured: true,
        posts: memoryCache.result?.posts.length ? memoryCache.result.posts : fallbackPosts,
        handle,
        profileUrl,
        source: "cache",
        fetchedAt: Date.now(),
      };
    }

    const posts = transformRawPosts(json.data, profileUrl);

    const result: InstagramFeedResult = {
      isConfigured: true,
      posts,
      handle,
      profileUrl,
      source: "api",
      fetchedAt: Date.now(),
    };

    memoryCache = {
      result,
      timestamp: Date.now(),
    };

    return result;
  } catch (error) {
    console.warn("[Instagram API] Request error:", error instanceof Error ? error.message : String(error));
    const fallbackPosts = getFallbackPosts();
    return {
      isConfigured: true,
      posts: memoryCache.result?.posts.length ? memoryCache.result.posts : fallbackPosts,
      handle,
      profileUrl,
      source: "cache",
      fetchedAt: Date.now(),
    };
  }
}

