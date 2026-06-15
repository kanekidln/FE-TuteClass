import { motion } from "framer-motion";
import { features, workflowPath, workflowPathLength } from "../data";
import type { FeatureNode } from "../types";

type WorkflowMapProps = {
  activeFeature: FeatureNode | null;
  onFeatureOpen: (feature: FeatureNode, element: HTMLDivElement) => void;
  onFeatureClose: () => void;
  progressOffset: number;
};

export function WorkflowMap({ activeFeature, onFeatureOpen, onFeatureClose, progressOffset }: WorkflowMapProps) {
  return (
    <div className="workflow-map" id="features">
      <svg className="workflow-map__path" preserveAspectRatio="none" viewBox="0 0 1440 400">
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="orbitGradient" x1="144" x2="1368" y1="260" y2="165">
            <stop offset="0%" stopColor="#dac7a0" />
            <stop offset="20%" stopColor="#e7b966" />
            <stop offset="42%" stopColor="#5bc1e8" />
            <stop offset="60%" stopColor="#dd7c51" />
            <stop offset="80%" stopColor="#d99b56" />
            <stop offset="100%" stopColor="#86d8ff" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="orbitSpark" x1="144" x2="1368" y1="260" y2="165">
            <stop offset="0%" stopColor="#fff2ca" />
            <stop offset="38%" stopColor="#9ce8ff" />
            <stop offset="70%" stopColor="#ffd0a1" />
            <stop offset="100%" stopColor="#b7eeff" />
          </linearGradient>
        </defs>
        <path d={workflowPath} fill="none" stroke="url(#orbitGradient)" strokeLinecap="round" strokeOpacity="0.16" strokeWidth="30" />
        <path d={workflowPath} fill="none" stroke="#f8f5f0" strokeLinecap="round" strokeOpacity="0.18" strokeWidth="16" />
        <path d={workflowPath} fill="none" stroke="url(#orbitGradient)" strokeLinecap="round" strokeOpacity="0.72" strokeWidth="9" />
        <path d={workflowPath} fill="none" stroke="url(#orbitSpark)" strokeLinecap="round" strokeOpacity="0.7" strokeWidth="2.5" />
        <path className="roadmap-path-active" d={workflowPath} fill="none" stroke="url(#orbitSpark)" strokeLinecap="round" strokeDasharray={workflowPathLength} strokeDashoffset={progressOffset} strokeWidth="7" style={{ opacity: activeFeature ? 1 : 0 }} />
        <path className="roadmap-signal" d={workflowPath} fill="none" stroke="rgba(255,255,255,0.7)" strokeDasharray="1 64" strokeLinecap="round" strokeOpacity="0.72" strokeWidth="4" />
      </svg>

      {features.map((feature, index) => (
        <motion.div
          aria-haspopup="dialog"
          className={`reveal-node workflow-item ${feature.theme === "orange" ? "node-orange" : "node-navy"} ${feature.index === 6 ? "node-final" : ""}`}
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          key={feature.title}
          onBlur={onFeatureClose}
          onFocus={(event) => onFeatureOpen(feature, event.currentTarget)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onFeatureOpen(feature, event.currentTarget);
            }
          }}
          onMouseEnter={(event) => onFeatureOpen(feature, event.currentTarget)}
          onMouseLeave={onFeatureClose}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -8, scale: 1.045 }}
          whileFocus={{ y: -8, scale: 1.045 }}
          transition={{ delay: (index + 1) * 0.08, type: "spring", stiffness: 150, damping: 18, mass: 0.7 }}
          style={{ left: feature.left, top: feature.top, translate: "-50% 0", transitionDelay: `${(index + 1) * 0.2}s` }}
          tabIndex={0}
        >
          <div className={`planet-shape ${feature.planet}`}>
            <span className="planet-ring" />
            <span className="planet-surface" />
            <span className="planet-detail" />
            {feature.index === 3 && <span className="planet-moon" />}
          </div>
          <div className="workflow-card">
            <p>{feature.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
