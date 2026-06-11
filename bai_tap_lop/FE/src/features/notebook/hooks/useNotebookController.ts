import { useCallback, useMemo } from "react";
import { classTabs } from "../config/navigation";
import type { NotebookLocation, NotebookPage, SectionKey } from "../domain/types";
import { useFlipTransition } from "./useFlipTransition";
import { useNotebookIndex } from "./useNotebookIndex";

export function useNotebookController(pages: NotebookPage[], initialLocation: NotebookLocation) {
  const { currentIndex, currentPage, getPageIndex, setCurrentIndex } = useNotebookIndex(pages, initialLocation);
  const classOrder = useMemo(() => classTabs.map((item) => item.key), []);

  const transitionController = useFlipTransition({
    currentIndex,
    pageCount: pages.length,
    setCurrentIndex
  });

  const goToClass = useCallback(
    (classKey: (typeof classOrder)[number]) => {
      const targetIndex =
        getPageIndex(classKey, currentPage.sectionKey) ?? getPageIndex(classKey, "overview") ?? currentIndex;

      transitionController.goToIndex(targetIndex, { animate: false });
    },
    [currentIndex, currentPage.sectionKey, getPageIndex, transitionController]
  );

  const goToSection = useCallback(
    (sectionKey: SectionKey) => {
      const targetIndex = getPageIndex(currentPage.classKey, sectionKey);
      if (typeof targetIndex === "number") {
        transitionController.goToIndex(targetIndex, { animate: true });
      }
    },
    [currentPage.classKey, getPageIndex, transitionController]
  );

  const goToPreviousClass = useCallback(() => {
    const currentClassIndex = classOrder.indexOf(currentPage.classKey);
    const nextClassKey = classOrder[(currentClassIndex - 1 + classOrder.length) % classOrder.length];
    goToClass(nextClassKey);
  }, [classOrder, currentPage.classKey, goToClass]);

  const goToNextClass = useCallback(() => {
    const currentClassIndex = classOrder.indexOf(currentPage.classKey);
    const nextClassKey = classOrder[(currentClassIndex + 1) % classOrder.length];
    goToClass(nextClassKey);
  }, [classOrder, currentPage.classKey, goToClass]);

  const goPrevious = useCallback(() => {
    transitionController.goToIndex(Math.max(0, currentIndex - 1), { animate: true });
  }, [currentIndex, transitionController]);

  const goNext = useCallback(() => {
    transitionController.goToIndex(Math.min(pages.length - 1, currentIndex + 1), { animate: true });
  }, [currentIndex, pages.length, transitionController]);

  return {
    accelerateTransition: transitionController.accelerateTransition,
    completeTransition: transitionController.completeTransition,
    currentIndex,
    currentPage,
    faceBackOnly: transitionController.faceBackOnly,
    goNext,
    goPrevious,
    goToClass,
    goToNextClass,
    goToPreviousClass,
    goToSection,
    spiralHidden: transitionController.spiralHidden,
    transition: transitionController.transition
  };
}
