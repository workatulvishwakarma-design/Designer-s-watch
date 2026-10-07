/**
 * ─────────────────────────────────────────────────────────
 *  Official Meta / Instagram Graph API Service
 *  Handles automatic synchronization for Instagram Professional accounts.
 *
 *  Environment Variables:
 *    INSTAGRAM_ACCESS_TOKEN       - Meta Long-Lived User Access Token (Server-side ONLY)
 *    INSTAGRAM_USER_ID            - Instagram Business/Creator Account ID (Optional)
 *    NEXT_PUBLIC_INSTAGRAM_HANDLE  - Instagram handle (Default: designerworld1948)
 * ─────────────────────────────────────────────────────────
 */

export interface InstagramPost {
  id: string;
  caption?: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp?: string;
  isReel?: boolean;
}

export interface InstagramLiveStatus {
  isLive: boolean;
  liveUrl?: string;
  title?: string;
}

export interface InstagramFeedResponse {
  isConfigured: boolean;
  posts: InstagramPost[];
  liveStatus: InstagramLiveStatus;
  handle: string;
  profileUrl: string;
  source: "api" | "unconfigured" | "error";
}

const DEFAULT_HANDLE = "designerworld1948";

export function getInstagramHandle(): string {
  return process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || DEFAULT_HANDLE;
}

export function getInstagramProfileUrl(): string {
  const handle = getInstagramHandle();
  return `https://www.instagram.com/${handle}/`;
}

/**
 * Checks Meta's Graph API for active live broadcast status on the Instagram Professional Account.
 * Strictly avoids faking — returns false if unconfigured or no active broadcast is live.
 */
async function checkInstagramLive(
  token: string,
  userId?: string
): Promise<InstagramLiveStatus> {
  if (!token || !userId) {
    return { isLive: false };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const liveApiUrl = `https://graph.facebook.com/v21.0/${userId}/live_videos?broadcast_status=["LIVE"]&access_token=${token}`;
    const res = await fetch(liveApiUrl, {
      signal: controller.signal,
      next: { revalidate: 120 },
    });

    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.data) && data.data.length > 0) {
        const liveVideo = data.data[0];
        return {
          isLive: true,
          liveUrl: `https://www.instagram.com/${getInstagramHandle()}/live/`,
          title: liveVideo.title || "Live Stream",
        };
      }
    }
  } catch {
    // Fail silently
  }

  return { isLive: false };
}

/**
 * Fetches the Instagram feed via official Meta/Instagram Graph API.
 * Uses Next.js server-side caching (revalidate: 3600 seconds) so page visitors
 * experience zero latency and zero rate limit pressure.
 */
export async function fetchInstagramFeed(): Promise<InstagramFeedResponse> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN?.trim();
  const userId = process.env.INSTAGRAM_USER_ID?.trim();
  const handle = getInstagramHandle();
  const profileUrl = getInstagramProfileUrl();

  // If no credentials configured yet, cleanly report unconfigured state
  // Never inject fake black cards or broken images.
  if (!token) {
    return {
      isConfigured: false,
      posts: [],
      liveStatus: { isLive: false },
      handle,
      profileUrl,
      source: "unconfigured",
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    // Instagram Graph API endpoint (Professional/Business) or Basic Display endpoint
    const endpoint = userId
      ? `https://graph.facebook.com/v21.0/${userId}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`
      : `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=12&access_token=${token}`;

    const res = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Cache on server for 1 hour
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.warn(`[Instagram API] Meta API responded with status ${res.status}.`);
      return {
        isConfigured: true,
        posts: [],
        liveStatus: { isLive: false },
        handle,
        profileUrl,
        source: "error",
      };
    }

    const json = await res.json();

    if (!Array.isArray(json.data) || json.data.length === 0) {
      return {
        isConfigured: true,
        posts: [],
        liveStatus: { isLive: false },
        handle,
        profileUrl,
        source: "api",
      };
    }

    // Filter and map real Meta API items
    const posts: InstagramPost[] = json.data
      .filter((item: any) => item && (item.media_url || item.thumbnail_url))
      .slice(0, 6)
      .map((item: any) => {
        const isVideo = item.media_type === "VIDEO";
        const isReel = isVideo || (item.permalink && item.permalink.includes("/reel/"));
        const mediaUrl = isVideo && item.thumbnail_url ? item.thumbnail_url : item.media_url;

        return {
          id: item.id,
          caption: item.caption || "",
          mediaType: item.media_type || "IMAGE",
          mediaUrl: mediaUrl || item.media_url,
          thumbnailUrl: item.thumbnail_url || item.media_url,
          permalink: item.permalink || profileUrl,
          timestamp: item.timestamp,
          isReel,
        };
      });

    // Check Live status if Professional account credentials permit
    const liveStatus = await checkInstagramLive(token, userId);

    return {
      isConfigured: true,
      posts,
      liveStatus,
      handle,
      profileUrl,
      source: "api",
    };
  } catch (error) {
    console.error("[Instagram API] Fetch error:", error instanceof Error ? error.message : String(error));
    return {
      isConfigured: true,
      posts: [],
      liveStatus: { isLive: false },
      handle,
      profileUrl,
      source: "error",
    };
  }
}
