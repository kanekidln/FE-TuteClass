import { useMemo, useRef, useState } from "react";
import heroBackground from "../../../assets/images/Back_ground.jpg";
import { FeatureModal } from "./components/FeatureModal";
import { Hero } from "./components/Hero";
import { WorkflowMap } from "./components/WorkflowMap";
import { workflowPathLength } from "./data";
import type { FeatureNode, ModalPosition } from "./types";
import "./LandingPage.css";

export function LandingPage() {
  const [activeFeature, setActiveFeature] = useState<FeatureNode | null>(null);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({ left: 24, top: 120, connectorX: 140 });
  const closeTimer = useRef<number | undefined>(undefined);

  const progressOffset = useMemo(() => {
    if (!activeFeature) return workflowPathLength;
    return workflowPathLength * (1 - activeFeature.progress);
  }, [activeFeature]);

  const openFeature = (feature: FeatureNode, element: HTMLDivElement) => {
    window.clearTimeout(closeTimer.current);
    const rect = element.getBoundingClientRect();
    const modalWidth = Math.min(window.innerWidth * 0.86, 270);
    const modalHeight = 178;
    const margin = 16;
    const nodeCenterX = rect.left + rect.width / 2;
    const nodeTop = rect.top;
    let left = nodeCenterX - modalWidth / 2;
    let top = nodeTop - modalHeight - 18;

    left = Math.max(margin, Math.min(left, window.innerWidth - modalWidth - margin));
    top = Math.max(72, Math.min(top, window.innerHeight - modalHeight - margin));

    setModalPosition({
      left,
      top,
      connectorX: Math.max(18, Math.min(nodeCenterX - left, modalWidth - 18)),
    });
    setActiveFeature(feature);
  };

  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveFeature(null), 140);
  };

  const keepOpen = () => window.clearTimeout(closeTimer.current);

  return (
    <main className="landing-page">
      <section className="landing-hero" id="hero">
        <div className="landing-hero__background">
          <img alt="Tuteclass classroom workflow preview" className="landing-hero__image" decoding="async" src={heroBackground} />
          <div className="landing-hero__wash" />
          <div className="landing-hero__depth" />
          <div className="landing-hero__floor" />
        </div>

        <Hero />

        <WorkflowMap activeFeature={activeFeature} onFeatureOpen={openFeature} onFeatureClose={scheduleClose} progressOffset={progressOffset} />
      </section>

      <FeatureModal feature={activeFeature} onKeepOpen={keepOpen} onScheduleClose={scheduleClose} position={modalPosition} />
    </main>
  );
}
