import { motion } from "framer-motion";
import type { Question, Sport, SportConfig } from "../types";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  answers: (number | null)[];
  questions: Question[];
  sport: Sport;
  sportConfig: SportConfig;
  onRestart: () => void;
  onChangeSport: () => void;
}

function getRank(score: number, total: number): { title: string; emoji: string; message: string } {
  const pct = score / total;
  if (pct === 1) return { title: "Hall of Famer", emoji: "🏆", message: "Perfect score! You know this sport inside out." };
  if (pct >= 0.8) return { title: "All-Star", emoji: "⭐", message: "Outstanding knowledge — you're close to elite." };
  if (pct >= 0.6) return { title: "Starting Lineup", emoji: "🎯", message: "Solid performance. A bit more film study and you're elite." };
  if (pct >= 0.4) return { title: "Practice Squad", emoji: "📋", message: "Good effort — keep studying and you'll level up fast." };
  return { title: "Rookie", emoji: "🌱", message: "Everyone starts somewhere. Study up and try again!" };
}

export function ResultsScreen({
  score,
  totalQuestions,
  answers,
  questions,
  sportConfig,
  onRestart,
  onChangeSport,
}: ResultsScreenProps) {
  const rank = getRank(score, totalQuestions);
  const percentage = Math.round((score / totalQuestions) * 100);

  return (
    <motion.div
      className="results-screen"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className="rank-badge"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
      >
        <span className="rank-emoji">{rank.emoji}</span>
      </motion.div>

      <motion.h2
        className="rank-title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        {rank.title}
      </motion.h2>

      <motion.p
        className="rank-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
      >
        {rank.message}
      </motion.p>

      {/* Score ring */}
      <motion.div
        className="score-ring-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg className="score-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
          <motion.circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke={sportConfig.accent}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 50}`}
            strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
            transform="rotate(-90 60 60)"
            initial={{ strokeDashoffset: `${2 * Math.PI * 50}` }}
            animate={{ strokeDashoffset: `${2 * Math.PI * 50 * (1 - percentage / 100)}` }}
            transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
          />
        </svg>
        <div className="score-ring-text">
          <span className="score-num" style={{ color: sportConfig.accent }}>
            {score}
          </span>
          <span className="score-denom">/{totalQuestions}</span>
          <span className="score-pct">{percentage}%</span>
        </div>
      </motion.div>

      {/* Answer breakdown */}
      <motion.div
        className="answer-breakdown"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p className="breakdown-label">Answer Breakdown</p>
        <div className="breakdown-list">
          {questions.map((q, i) => {
            const correct = answers[i] === q.correct;
            return (
              <motion.div
                key={q.id}
                className={`breakdown-row ${correct ? "breakdown-correct" : "breakdown-wrong"}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.75 + i * 0.06 }}
              >
                <span className="breakdown-icon">{correct ? "✓" : "✗"}</span>
                <span className="breakdown-q">Q{i + 1}: {q.question.slice(0, 48)}…</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        className="results-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <motion.button
          className="action-btn action-primary"
          style={{ background: sportConfig.accent }}
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {sportConfig.emoji} Play Again
        </motion.button>
        <motion.button
          className="action-btn action-secondary"
          onClick={onChangeSport}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          Change Sport
        </motion.button>
      </motion.div>

      <p className="results-footer">Built for Next Play</p>
    </motion.div>
  );
}
