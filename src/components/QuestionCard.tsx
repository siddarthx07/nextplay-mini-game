import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Question } from "../types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  score: number;
  selectedAnswer: number | null;
  showFeedback: boolean;
  aiExplanation: string | null;
  aiLoading: boolean;
  sportEmoji: string;
  sportAccent: string;
  onAnswer: (index: number) => void;
  onNext: () => void;
  onQuit: () => void;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  score,
  selectedAnswer,
  showFeedback,
  aiExplanation,
  aiLoading,
  sportEmoji,
  sportAccent,
  onAnswer,
  onNext,
  onQuit,
}: QuestionCardProps) {
  const [showQuitConfirm, setShowQuitConfirm] = useState(false);
  const isCorrect = selectedAnswer === question.correct;

  const difficultyColor = {
    easy: "#22c55e",
    medium: "#f59e0b",
    hard: "#ef4444",
  }[question.difficulty];

  return (
    <motion.div
      className="question-screen"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {/* Header */}
      <div className="q-header">
        <div className="q-meta">
          <button className="sport-tag" onClick={() => setShowQuitConfirm(true)} title="Back to home">← Home</button>
          <span
            className="difficulty-tag"
            style={{ color: difficultyColor, borderColor: difficultyColor }}
          >
            {question.difficulty}
          </span>
        </div>
        <div className="q-progress-info">
          <span className="q-counter">
            {questionNumber} <span className="q-total">/ {totalQuestions}</span>
          </span>
          <span className="score-badge" style={{ color: sportAccent }}>
            {score} pts
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="progress-bar-track">
        <motion.div
          className="progress-bar-fill"
          style={{ background: sportAccent }}
          initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Question */}
      <motion.div
        className="question-text-wrap"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="question-text">{question.question}</h2>
      </motion.div>

      {/* Options */}
      <div className="options-grid">
        {question.options.map((option, i) => {
          let state: "default" | "correct" | "wrong" | "missed" = "default";
          if (showFeedback) {
            if (i === question.correct) state = "correct";
            else if (i === selectedAnswer) state = "wrong";
            else state = "missed";
          } else if (selectedAnswer === i) {
            state = "default";
          }

          return (
            <motion.button
              key={i}
              className={`option-btn option-${state}`}
              onClick={() => !showFeedback && onAnswer(i)}
              disabled={showFeedback}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.07 }}
              whileHover={!showFeedback ? { scale: 1.02, x: 6 } : {}}
              whileTap={!showFeedback ? { scale: 0.98 } : {}}
            >
              <span className="option-letter">
                {["A", "B", "C", "D"][i]}
              </span>
              <span className="option-text">{option}</span>
              {showFeedback && i === question.correct && (
                <span className="option-icon">✓</span>
              )}
              {showFeedback && i === selectedAnswer && i !== question.correct && (
                <span className="option-icon">✗</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Quit confirmation modal */}
      <AnimatePresence>
        {showQuitConfirm && (
          <motion.div
            className="quit-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="quit-modal"
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className="quit-title">End the quiz?</p>
              <p className="quit-subtitle">Your progress will be lost. Are you sure you want to go back to the menu?</p>
              <div className="quit-actions">
                <button className="quit-btn-cancel" onClick={() => setShowQuitConfirm(false)}>Keep Playing</button>
                <button className="quit-btn-confirm" onClick={onQuit}>End Quiz</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feedback section */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            className={`feedback-panel ${isCorrect ? "feedback-correct" : "feedback-wrong"}`}
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="feedback-header">
              <span className="feedback-verdict">
                {isCorrect ? "🎉 Correct!" : "❌ Not quite"}
              </span>
            </div>
            <p className="feedback-explanation">{question.explanation}</p>

            {/* AI Coach insight */}
            <div className="ai-coach-wrap">
              <span className="ai-coach-label">🤖 AI Coach says:</span>
              {aiLoading ? (
                <div className="ai-loading">
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                  <span className="loading-dot" />
                </div>
              ) : aiExplanation ? (
                <motion.p
                  className="ai-explanation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {aiExplanation}
                </motion.p>
              ) : null}
            </div>

            <motion.button
              className="next-btn"
              style={{ background: sportAccent }}
              onClick={onNext}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {questionNumber < 5 ? "Next Question →" : "See Results →"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
