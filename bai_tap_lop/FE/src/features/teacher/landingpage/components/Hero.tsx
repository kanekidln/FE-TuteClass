import { motion } from "framer-motion";

export function Hero() {
  return (
    <div className="landing-hero__content">
      <h1 className="hero-title animate-fade-in">
        Master Your Workflow <br />
        <span className="hero-accent">with Tuteclass!</span>
      </h1>
      <div className="hero-cta-wrap">
        <motion.a
          className="hero-cta"
          href="#teacher/assignments"
          whileHover={{ y: -3, scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 360, damping: 24 }}
        >
          <span className="hero-cta-label">Explore Features</span>
          <span className="hero-cta-arrow">›</span>
        </motion.a>
      </div>
    </div>
  );
}
