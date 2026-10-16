/**
 * ──────────────────────────────────────────────────────────────────────────
 *  Instagram Reel Video Playback Coordinator
 *  
 *  - Limits simultaneous autoplay: Max 2 on Desktop, Max 1 on Mobile (<768px)
 *  - IntersectionObserver priority queue based on visibility and viewport center
 *  - Automatic pause when scrolled out of view (threshold < 0.45)
 *  - Respects prefers-reduced-motion and navigator.connection.saveData
 *  - Gracefully handles browser autoplay blocks and errors
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface RegisteredVideo {
  id: string;
  container: HTMLElement;
  video: HTMLVideoElement;
  onPlayStateChange: (isPlaying: boolean, isBlocked?: boolean) => void;
  intersectionRatio: number;
  viewportDistance: number;
  userPaused: boolean;
}

class PlaybackCoordinator {
  private registry = new Map<string, RegisteredVideo>();
  private observer: IntersectionObserver | null = null;
  private animFrameId: number | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.initObserver();
    }
  }

  private initObserver() {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const viewportCenter = window.innerHeight / 2;

        entries.forEach((entry) => {
          const item = Array.from(this.registry.values()).find(
            (reg) => reg.container === entry.target
          );
          if (item) {
            item.intersectionRatio = entry.intersectionRatio;
            const rect = entry.boundingClientRect;
            const itemCenter = rect.top + rect.height / 2;
            item.viewportDistance = Math.abs(viewportCenter - itemCenter);

            // If scrolled out of view, reset manual userPaused state so it can autoplay next time
            if (entry.intersectionRatio < 0.1) {
              item.userPaused = false;
            }
          }
        });

        this.scheduleEvaluation();
      },
      {
        threshold: [0, 0.25, 0.45, 0.65, 0.85, 1.0],
      }
    );
  }

  public register(item: RegisteredVideo) {
    this.registry.set(item.id, item);
    if (this.observer) {
      this.observer.observe(item.container);
    }
    this.scheduleEvaluation();
  }

  public unregister(id: string) {
    const item = this.registry.get(id);
    if (item) {
      if (this.observer) {
        this.observer.unobserve(item.container);
      }
      try {
        item.video.pause();
      } catch {
        // Safe no-op
      }
      this.registry.delete(id);
      this.scheduleEvaluation();
    }
  }

  public setUserPaused(id: string, paused: boolean) {
    const item = this.registry.get(id);
    if (item) {
      item.userPaused = paused;
      if (paused) {
        try {
          item.video.pause();
          item.onPlayStateChange(false, false);
        } catch {
          // Safe no-op
        }
      }
      this.scheduleEvaluation();
    }
  }

  public scheduleEvaluation() {
    if (this.animFrameId !== null) return;
    if (typeof window === "undefined") return;

    this.animFrameId = window.requestAnimationFrame(() => {
      this.animFrameId = null;
      this.evaluate();
    });
  }

  private evaluate() {
    if (typeof window === "undefined") return;

    // 1. Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      this.pauseAll();
      return;
    }

    // 2. Check Data Saver mode
    const nav = navigator as any;
    if (nav?.connection?.saveData === true) {
      this.pauseAll();
      return;
    }

    // 3. Determine max concurrent autoplay budget
    const isMobile = window.innerWidth < 768;
    const maxAutoplay = isMobile ? 1 : 2;

    // 4. Find all visible eligible candidates (ratio >= 0.45 and not manually paused)
    const candidates = Array.from(this.registry.values()).filter(
      (item) => item.intersectionRatio >= 0.45 && !item.userPaused
    );

    // 5. Sort candidates: highest intersectionRatio first, tiebreak by viewport center closeness
    candidates.sort((a, b) => {
      if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.15) {
        return b.intersectionRatio - a.intersectionRatio;
      }
      return a.viewportDistance - b.viewportDistance;
    });

    const toPlay = new Set(candidates.slice(0, maxAutoplay));

    // 6. Apply play/pause states
    this.registry.forEach((item) => {
      if (toPlay.has(item)) {
        if (item.video.paused) {
          item.video.muted = true;
          item.video.playsInline = true;
          const playPromise = item.video.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                item.onPlayStateChange(true, false);
              })
              .catch(() => {
                // Autoplay blocked by browser policy
                item.onPlayStateChange(false, true);
              });
          }
        }
      } else {
        if (!item.video.paused) {
          item.video.pause();
          item.onPlayStateChange(false, false);
        }
      }
    });
  }

  private pauseAll() {
    this.registry.forEach((item) => {
      if (!item.video.paused) {
        try {
          item.video.pause();
          item.onPlayStateChange(false, false);
        } catch {
          // Safe no-op
        }
      }
    });
  }
}

// Global coordinator singleton for client-side execution
let coordinatorInstance: PlaybackCoordinator | null = null;

export function getPlaybackCoordinator(): PlaybackCoordinator {
  if (!coordinatorInstance) {
    coordinatorInstance = new PlaybackCoordinator();
  }
  return coordinatorInstance;
}
