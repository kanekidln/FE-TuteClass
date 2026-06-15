import type { CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { FeatureNode, ModalPosition } from "../types";

type FeatureModalProps = {
  feature: FeatureNode | null;
  onKeepOpen: () => void;
  onScheduleClose: () => void;
  position: ModalPosition;
};

export function FeatureModal({ feature, onKeepOpen, onScheduleClose, position }: FeatureModalProps) {
  return (
    <AnimatePresence>
      {feature && (
        <motion.div
          aria-labelledby="featureModalTitle"
          aria-modal="false"
          className={`feature-modal is-open ${feature.theme === "orange" ? "theme-orange" : "theme-blue"}`}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          onMouseEnter={onKeepOpen}
          onMouseLeave={onScheduleClose}
          role="dialog"
          style={{ left: position.left, top: position.top, "--connector-x": `${position.connectorX}px` } as CSSProperties}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="feature-dialog relative">
            <div>
              <h2 className="modal-title" id="featureModalTitle">{feature.title}</h2>
              <p className="modal-copy">{feature.copy}</p>
            </div>
            <div aria-hidden="true" className="demo-panel">
              <img alt={feature.imageAlt} className="demo-image" src={feature.image} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
