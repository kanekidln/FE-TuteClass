import { useEffect } from "react";
import { FlipBook } from "./components/FlipBook";
import { NotebookLayout } from "./layouts/NotebookLayout";
import { classTabs, DEFAULT_NOTEBOOK_LOCATION, notebookPages, sectionMarkers, useNotebookController } from "./index";

export function StudentNotebookWorkspace() {
  const navigation = useNotebookController(notebookPages, DEFAULT_NOTEBOOK_LOCATION);
  const currentPage = notebookPages[navigation.currentIndex];

  useEffect(() => {
    document.title = `Tuteclass - ${currentPage.navLabel} lớp ${currentPage.className}`;
  }, [currentPage]);

  return (
    <NotebookLayout
      activeClassKey={currentPage.classKey}
      activeSectionKey={currentPage.sectionKey}
      classItems={classTabs}
      isFlipping={Boolean(navigation.transition)}
      isSpiralHidden={navigation.spiralHidden}
      markerItems={sectionMarkers}
      onClassChange={navigation.goToClass}
      onNextClass={navigation.goToNextClass}
      onPreviousClass={navigation.goToPreviousClass}
      onSectionChange={navigation.goToSection}
    >
      <FlipBook
        accelerateTransition={navigation.accelerateTransition}
        currentIndex={navigation.currentIndex}
        faceBackOnly={navigation.faceBackOnly}
        onRequestNext={navigation.goNext}
        onRequestPrevious={navigation.goPrevious}
        onTransitionComplete={navigation.completeTransition}
        pages={notebookPages}
        transition={navigation.transition}
      />
    </NotebookLayout>
  );
}
