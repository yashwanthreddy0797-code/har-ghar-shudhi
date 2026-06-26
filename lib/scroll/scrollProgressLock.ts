/** Progress at which a pinned scroll section is treated as fully revealed. */
export const SCROLL_COMPLETE_THRESHOLD = 0.985;

export type ScrollProgressLock = {
  resolve: (rawProgress: number, direction: number) => number;
  onLeave: (rawProgress: number) => void;
  onLeaveBack: () => void;
  isLockedAtEnd: () => boolean;
};

/** Hold completed scroll sections at their end frame when scrolling back up. */
export function createScrollProgressLock(
  threshold = SCROLL_COMPLETE_THRESHOLD
): ScrollProgressLock {
  let lockedAtEnd = false;

  return {
    resolve(rawProgress: number, direction: number) {
      if (rawProgress >= threshold) lockedAtEnd = true;
      if (lockedAtEnd && direction === -1) return 1;
      return rawProgress;
    },
    onLeave(rawProgress: number) {
      if (rawProgress >= threshold) lockedAtEnd = true;
    },
    onLeaveBack() {
      lockedAtEnd = false;
    },
    isLockedAtEnd() {
      return lockedAtEnd;
    },
  };
}

export function bindScrollProgressLock(
  progressLock: ScrollProgressLock,
  callbacks: {
    onEnter?: () => void;
    onEnterBack?: () => void;
    onLeave?: (self: { progress: number }) => void;
    onLeaveBack?: () => void;
    onUpdate?: (progress: number) => void;
    onLockedEnd?: () => void;
    onUnlocked?: () => void;
  }
) {
  return {
    onEnter: () => {
      callbacks.onEnter?.();
    },
    onEnterBack: () => {
      callbacks.onEnterBack?.();
      if (progressLock.isLockedAtEnd()) {
        callbacks.onLockedEnd?.();
      }
    },
    onLeave: (self: { progress: number }) => {
      progressLock.onLeave(self.progress);
      callbacks.onLeave?.(self);
      if (progressLock.isLockedAtEnd()) {
        callbacks.onLockedEnd?.();
      }
    },
    onLeaveBack: () => {
      progressLock.onLeaveBack();
      callbacks.onUnlocked?.();
      callbacks.onLeaveBack?.();
    },
    onUpdate: (self: { progress: number; direction: number }) => {
      callbacks.onUpdate?.(progressLock.resolve(self.progress, self.direction));
    },
  };
}
