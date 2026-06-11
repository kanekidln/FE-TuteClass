import { useCallback, useEffect, useRef, useState } from "react";
import type { PageTransition, PendingNavigation } from "../domain/types";

const OUTGOING_FACE_SWAP_MS = 560;
const SPIRAL_REVEAL_MS = 120;

type UseFlipTransitionOptions = {
  currentIndex: number;
  pageCount: number;
  setCurrentIndex: (nextIndex: number) => void;
};

export function useFlipTransition({ currentIndex, pageCount, setCurrentIndex }: UseFlipTransitionOptions) {
  const [transition, setTransition] = useState<PageTransition | null>(null);
  const [accelerateTransition, setAccelerateTransition] = useState(false);
  const [faceBackOnly, setFaceBackOnly] = useState(false);
  const [spiralHidden, setSpiralHidden] = useState(false);

  const currentIndexRef = useRef(currentIndex);
  const faceSwapTimerRef = useRef<number | null>(null);
  const spiralRevealTimerRef = useRef<number | null>(null);
  const pendingNavigationRef = useRef<PendingNavigation | null>(null);

  const clearFaceSwapTimer = useCallback(() => {
    if (faceSwapTimerRef.current !== null) {
      window.clearTimeout(faceSwapTimerRef.current);
      faceSwapTimerRef.current = null;
    }
  }, []);

  const clearSpiralRevealTimer = useCallback(() => {
    if (spiralRevealTimerRef.current !== null) {
      window.clearTimeout(spiralRevealTimerRef.current);
      spiralRevealTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(
    () => () => {
      clearFaceSwapTimer();
      clearSpiralRevealTimer();
    },
    [clearFaceSwapTimer, clearSpiralRevealTimer]
  );

  const commitImmediate = useCallback(
    (targetIndex: number) => {
      clearFaceSwapTimer();
      clearSpiralRevealTimer();
      pendingNavigationRef.current = null;
      setAccelerateTransition(false);
      setFaceBackOnly(false);
      setSpiralHidden(false);
      setTransition(null);
      setCurrentIndex(targetIndex);
    },
    [clearFaceSwapTimer, clearSpiralRevealTimer, setCurrentIndex]
  );

  const startAnimatedTransition = useCallback(
    (targetIndex: number) => {
      clearFaceSwapTimer();
      clearSpiralRevealTimer();

      const fromIndex = currentIndexRef.current;
      const forward = targetIndex > fromIndex;

      setAccelerateTransition(false);
      setFaceBackOnly(false);
      setSpiralHidden(true);
      setCurrentIndex(targetIndex);
      setTransition({ fromIndex, toIndex: targetIndex, forward });

      if (forward) {
        faceSwapTimerRef.current = window.setTimeout(() => {
          setFaceBackOnly(true);
        }, OUTGOING_FACE_SWAP_MS);
      }

      spiralRevealTimerRef.current = window.setTimeout(() => {
        setSpiralHidden(false);
      }, SPIRAL_REVEAL_MS);
    },
    [clearFaceSwapTimer, clearSpiralRevealTimer, setCurrentIndex]
  );

  const flushPendingNavigation = useCallback(() => {
    const pendingNavigation = pendingNavigationRef.current;
    pendingNavigationRef.current = null;

    if (!pendingNavigation || pendingNavigation.index === currentIndexRef.current) {
      return;
    }

    if (pendingNavigation.animate) {
      startAnimatedTransition(pendingNavigation.index);
      return;
    }

    commitImmediate(pendingNavigation.index);
  }, [commitImmediate, startAnimatedTransition]);

  const goToIndex = useCallback(
    (targetIndex: number, options: { animate?: boolean } = {}) => {
      const safeIndex = Math.max(0, Math.min(pageCount - 1, targetIndex));
      if (safeIndex === currentIndexRef.current) {
        return;
      }

      if (transition) {
        pendingNavigationRef.current = { index: safeIndex, animate: options.animate !== false };
        setAccelerateTransition(true);
        if (transition.forward) {
          setFaceBackOnly(true);
        }
        return;
      }

      if (options.animate === false) {
        commitImmediate(safeIndex);
        return;
      }

      startAnimatedTransition(safeIndex);
    },
    [commitImmediate, pageCount, startAnimatedTransition, transition]
  );

  const completeTransition = useCallback(() => {
    clearFaceSwapTimer();
    clearSpiralRevealTimer();
    setFaceBackOnly(false);
    setAccelerateTransition(false);
    setSpiralHidden(false);
    setTransition(null);

    window.requestAnimationFrame(() => {
      flushPendingNavigation();
    });
  }, [clearFaceSwapTimer, clearSpiralRevealTimer, flushPendingNavigation]);

  return {
    accelerateTransition,
    completeTransition,
    faceBackOnly,
    goToIndex,
    spiralHidden,
    transition
  };
}
