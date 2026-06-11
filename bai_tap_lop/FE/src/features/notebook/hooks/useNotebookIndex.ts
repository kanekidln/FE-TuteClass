import { useMemo, useState } from "react";
import type { ClassKey, NotebookLocation, NotebookPage, SectionKey } from "../domain/types";

export function useNotebookIndex(pages: NotebookPage[], initialLocation: NotebookLocation) {
  const pageLookup = useMemo(
    () => new Map(pages.map((page, index) => [`${page.classKey}:${page.sectionKey}`, index])),
    [pages]
  );

  const initialIndex = pageLookup.get(`${initialLocation.classKey}:${initialLocation.sectionKey}`) ?? 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const currentPage = pages[currentIndex];

  const getPageIndex = (classKey: ClassKey, sectionKey: SectionKey) => pageLookup.get(`${classKey}:${sectionKey}`);

  return {
    currentIndex,
    currentPage,
    getPageIndex,
    setCurrentIndex
  };
}
