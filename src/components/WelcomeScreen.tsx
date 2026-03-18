import { motion } from "framer-motion";
import type { Sport, SportConfig } from "../types";

interface WelcomeScreenProps {
  sportConfigs: Record<Sport, SportConfig>;
  onStart: (sport: Sport) => void;
}

export function WelcomeScreen({ sportConfigs, onStart }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen">
      <motion.div
        className="welcome-content"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="logo-badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <img src="/nextplay-logo.png" alt="Next Play" className="logo-img" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Next Play
          <span className="title-accent"> Quiz</span>
        </motion.h1>

        <motion.p
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
        >
          Test your sports IQ. 5 questions. One sport. Let's go.
        </motion.p>

        <motion.div
          className="sport-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <p className="pick-label">Pick your sport</p>
          <div className="sport-buttons">
            {(Object.entries(sportConfigs) as [Sport, SportConfig][]).map(
              ([sport, config], i) => (
                <motion.button
                  key={sport}
                  className="sport-btn"
                  style={
                    {
                      "--sport-color": config.color,
                      "--sport-accent": config.accent,
                    } as React.CSSProperties
                  }
                  onClick={() => onStart(sport)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="sport-emoji">{config.emoji}</span>
                  <span className="sport-name">{config.name}</span>
                </motion.button>
              )
            )}
          </div>
        </motion.div>

        <motion.p
          className="footer-note"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          AI-powered explanations after every answer ✨
        </motion.p>
      </motion.div>
    </div>
  );
}
