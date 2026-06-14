import type { CSSProperties, UIEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NotebookPage, PageTransition } from "../..";
import { AssignmentsSpread } from "../../spreads/AssignmentsSpread";
import { DiscussionSpread } from "../../spreads/DiscussionSpread";
import { OverviewSpread } from "../../spreads/OverviewSpread";
import { ResourcesSpread } from "../../spreads/ResourcesSpread";
import { ScheduleSpread } from "../../spreads/ScheduleSpread";
import "./FlipBook.css";

const TURN_DEG = -176;
const TURN_DURATION_MS = 1080;
const FAST_FORWARD_DURATION_MS = 240;

type FlipBookProps = {
  accelerateTransition: boolean;
  currentIndex: number;
  faceBackOnly: boolean;
  onRequestNext: () => void;
  onRequestPrevious: () => void;
  onTransitionComplete: () => void;
  pages: NotebookPage[];
  transition: PageTransition | null;
};

type PageFrameProps = {
  page: NotebookPage;
  faceBackOnly?: boolean;
  interactive?: boolean;
  mode: "static" | "under" | "outgoing" | "incoming";
  onTransitionComplete?: () => void;
};

function renderSpread(page: NotebookPage) {
  if (page.spreadType === "schedule") {
    return <ScheduleSpread data={page.data} />;
  }

  if (page.spreadType === "discussion") {
    return <DiscussionSpread data={page.data} />;
  }

  if (page.spreadType === "resources") {
    return <ResourcesSpread data={page.data} />;
  }

  if (page.spreadType === "assignments") {
    return <AssignmentsSpread data={page.data} />;
  }

  return <OverviewSpread classKey={page.classKey} className={page.className} subtitle={page.data.subtitle} />;
}

function PageFrame({ page, faceBackOnly = false, interactive = false, mode, onTransitionComplete }: PageFrameProps) {
  const [animate, setAnimate] = useState(mode === "static" || mode === "under");
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setAnimate(mode === "static" || mode === "under");
  }, [mode, page.key]);

  useEffect(() => {
    if (mode === "static" || mode === "under") {
      return;
    }

    const frameId = requestAnimationFrame(() => {
      setAnimate(true);
    });

    return () => cancelAnimationFrame(frameId);
  }, [mode, page.key]);

  useEffect(() => {
    const scrollArea = scrollRef.current;
    if (!scrollArea) {
      return;
    }

    const scrollable = scrollArea.scrollHeight - scrollArea.clientHeight > 10;
    const atBottom = scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 12;
    setShowMore(scrollable && !atBottom);
  }, [page.key]);

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const scrollArea = event.currentTarget;
    const scrollable = scrollArea.scrollHeight - scrollArea.clientHeight > 10;
    const atBottom = scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 12;
    setShowMore(scrollable && !atBottom);
  };

  const transform =
    mode === "incoming"
      ? animate
        ? "rotateY(0deg)"
        : `rotateY(${TURN_DEG}deg)`
      : mode === "outgoing"
        ? animate
          ? `rotateY(${TURN_DEG}deg)`
          : "rotateY(0deg)"
        : "rotateY(0deg)";

  const className = [
    "spread-page",
    mode === "static" ? "page-static" : "",
    mode === "under" ? "page-under" : "",
    mode === "outgoing" ? "page-outgoing" : "",
    mode === "incoming" ? "page-incoming" : "",
    (mode === "outgoing" || mode === "incoming") && animate ? "turning" : "",
    faceBackOnly ? "face-back-only" : "",
    showMore ? "show-more" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    transform,
    pointerEvents: interactive ? "auto" : "none"
  } satisfies CSSProperties;

  return (
    <section
      className={className}
      data-class={page.classKey}
      data-key={page.key}
      data-section={page.sectionKey}
      data-slot={mode}
      onTransitionEnd={mode === "outgoing" || mode === "incoming" ? onTransitionComplete : undefined}
      style={style}
    >
      <div className="spread-leaf">
        <div className="spread-face spread-face-front">
          <div className="spread-page-shell">
            <div className="spread-scroll" onScroll={handleScroll} ref={scrollRef}>
              <div className="flex h-full min-h-full flex-col">{renderSpread(page)}</div>
            </div>
            <div className="spread-more">
              <span>Cuộn để xem thêm</span>
              <span className="chev">⌄</span>
            </div>
            <div className="spread-page-curl" />
          </div>
        </div>
        <div className="spread-face spread-face-back">
          <div className="spread-page-backdrop" />
          <div className="spread-page-backshade" />
        </div>
      </div>
    </section>
  );
}

export function FlipBook({
  accelerateTransition,
  currentIndex,
  faceBackOnly,
  onRequestNext,
  onRequestPrevious,
  onTransitionComplete,
  pages,
  transition
}: FlipBookProps) {
  const currentPage = pages[currentIndex];

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        onRequestNext();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        onRequestPrevious();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onRequestNext, onRequestPrevious]);

  const pageNodes = useMemo(() => {
    if (!transition) {
      return [<PageFrame interactive key={currentPage.key} mode="static" page={currentPage} />];
    }

    const fromPage = pages[transition.fromIndex];
    const toPage = pages[transition.toIndex];

    if (transition.forward) {
      return [
        <PageFrame key={`${toPage.key}-under`} mode="under" page={toPage} />,
        <PageFrame
          faceBackOnly={faceBackOnly}
          key={`${fromPage.key}-out`}
          mode="outgoing"
          onTransitionComplete={onTransitionComplete}
          page={fromPage}
        />
      ];
    }

    return [
      <PageFrame key={`${fromPage.key}-under`} mode="under" page={fromPage} />,
      <PageFrame key={`${toPage.key}-in`} mode="incoming" onTransitionComplete={onTransitionComplete} page={toPage} />
    ];
  }, [currentPage, faceBackOnly, onTransitionComplete, pages, transition]);

  return (
    <div
      className={`notebook-flip-stage ${accelerateTransition ? "is-accelerating" : ""}`}
      style={{
        ["--turn-duration" as string]: `${accelerateTransition ? FAST_FORWARD_DURATION_MS : TURN_DURATION_MS}ms`
      }}
    >
      <div className="spread-book">{pageNodes}</div>
    </div>
  );
}
