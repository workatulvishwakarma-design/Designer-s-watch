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

const DEFAULT_HANDLE = "designerworld1948";

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
 * Fetches 10-12 latest official posts directly from Meta's Graph API.
 * Server-only execution.
 */
export async function fetchInstagramFeed(): Promise<InstagramFeedResult> {
  const token = (
    process.env.IG_ACCESS_TOKEN ||
    process.env.INSTAGRAM_ACCESS_TOKEN
  )?.trim();

  const userId = (
    process.env.IG_USER_ID ||
    process.env.INSTAGRAM_USER_ID
  )?.trim();

  const handle = getInstagramHandle();
  const profileUrl = getInstagramProfileUrl();

  // If no credentials configured yet, gracefully return unconfigured state
  if (!token) {
    return {
      isConfigured: false,
      posts: [],
      handle,
      profileUrl,
      source: "unconfigured",
      fetchedAt: Date.now(),
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    // Meta Instagram API endpoints:
    // If IG_USER_ID is provided, use graph.facebook.com/v21.0/{user_id}/media
    // Otherwise fallback to graph.instagram.com/me/media
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,children{id,media_type,media_url}";
    // If token starts with "IG" (Instagram Basic Display / User Token), use graph.instagram.com/me/media
    const endpoint =
      token.startsWith("IG") || !userId
        ? `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${token}`
        : `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=12&access_token=${token}`;

    const res = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 900 }, // Cache server-side for 15 minutes (900 seconds)
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Instagram API] Meta API responded with status ${res.status}`);
      // If we have stale cache, return it rather than showing an error
      if (memoryCache.result && memoryCache.result.posts.length > 0) {
        return { ...memoryCache.result, source: "cache" };
      }
      return {
        isConfigured: true,
        posts: [],
        handle,
        profileUrl,
        source: "error",
        fetchedAt: Date.now(),
      };
    }

    const json = await res.json();

    if (!Array.isArray(json.data) || json.data.length === 0) {
      if (memoryCache.result && memoryCache.result.posts.length > 0) {
        return { ...memoryCache.result, source: "cache" };
      }
      return {
        isConfigured: true,
        posts: [],
        handle,
        profileUrl,
        source: "api",
        fetchedAt: Date.now(),
      };
    }

    // Map and sanitize Instagram media items
    const rawPosts = json.data.filter(
      (item: any) => item && (item.media_url || item.thumbnail_url)
    );

    const posts: InstagramMediaItem[] = rawPosts.slice(0, 10).map((item: any, index: number) => {
      const isVideo = item.media_type === "VIDEO";
      const isReel = isVideo || (typeof item.permalink === "string" && item.permalink.includes("/reel/"));
      const isCarousel = item.media_type === "CAROUSEL_ALBUM";

      // Validate playable video stream URL: Must be VIDEO and media_url must exist and be an http(s) URL
      const hasPlayableVideo = isVideo && typeof item.media_url === "string" && item.media_url.startsWith("http");
      const videoUrl = hasPlayableVideo ? item.media_url : undefined;

      // For poster/thumbnail: prefer thumbnail_url for videos, fallback to media_url
      const posterUrl = (isVideo && item.thumbnail_url) ? item.thumbnail_url : (item.media_url || item.thumbnail_url || "");

      // ROTORIS-inspired editorial layout rhythm:
      // First card: tall portrait (4:5)
      // Second card: square (1:1)
      // Third card (centerpiece): tall reel / vertical (9:16 or 4:5)
      // Others: alternating square and portrait
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

    const result: InstagramFeedResult = {
      isConfigured: true,
      posts,
      handle,
      profileUrl,
      source: "api",
      fetchedAt: Date.now(),
    };

    // Store in backup memory cache
    memoryCache = {
      result,
      timestamp: Date.now(),
    };

    return result;
  } catch (error) {
    console.error("[Instagram API] Request exception:", error instanceof Error ? error.message : String(error));
    if (memoryCache.result && memoryCache.result.posts.length > 0) {
      return { ...memoryCache.result, source: "cache" };
    }
    return {
      isConfigured: true,
      posts: [],
      handle,
      profileUrl,
      source: "error",
      fetchedAt: Date.now(),
    };
  }
}
