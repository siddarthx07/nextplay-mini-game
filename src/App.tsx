import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import type { GameState, Sport } from "./types";
import { QUESTIONS, SPORT_CONFIGS } from "./data";
import { useAIExplain } from "./useAIExplain";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { QuestionCard } from "./components/QuestionCard";
import { ResultsScreen } from "./components/ResultsScreen";
import "./App.css";

const DEFAULT_STATE: GameState = {
  phase: "welcome",
  currentQuestion: 0,
  score: 0,
  answers: [],
  selectedAnswer: null,
  showFeedback: false,
  aiExplanation: null,
  loadingAI: false,
  selectedSport: "football",
};

export default function App() {
  const [game, setGame] = useState<GameState>(DEFAULT_STATE);
  const { explanation, loading: aiLoading, explain, reset: resetAI } = useAIExplain();

  const currentSportConfig = SPORT_CONFIGS[game.selectedSport];
  const questions = QUESTIONS[game.selectedSport];
  const currentQ = questions[game.currentQuestion];

  const startGame = useCallback((sport: Sport) => {
    resetAI();
    setGame({ ...DEFAULT_STATE, phase: "playing", selectedSport: sport });
  }, [resetAI]);

  const handleAnswer = useCallback(
    (answerIndex: number) => {
      const isCorrect = answerIndex === currentQ.correct;
      setGame((prev) => ({
        ...prev,
        selectedAnswer: answerIndex,
        showFeedback: true,
        score: isCorrect ? prev.score + 1 : prev.score,
        answers: [...prev.answers, answerIndex],
      }));
      explain(currentQ, answerIndex);
    },
    [currentQ, explain]
  );

  const handleNext = useCallback(() => {
    resetAI();
    const isLast = game.currentQuestion >= questions.length - 1;
    if (isLast) {
      setGame((prev) => ({ ...prev, phase: "results", showFeedback: false }));
    } else {
      setGame((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: null,
        showFeedback: false,
      }));
    }
  }, [game.currentQuestion, questions.length, resetAI]);

  const handleRestart = useCallback(() => startGame(game.selectedSport), [game.selectedSport, startGame]);
  const handleChangeSport = useCallback(() => { resetAI(); setGame(DEFAULT_STATE); }, [resetAI]);

  return (
    <div
      className="app"
      style={{ "--sport-color": currentSportConfig.color, "--sport-accent": currentSportConfig.accent } as React.CSSProperties}
    >
      <div className="bg-layer" />
      <div className="bg-grid" />
      <div className="bg-glow" style={{ background: `radial-gradient(ellipse 600px 400px at 50% -10%, ${currentSportConfig.accent}22, transparent)` }} />

      <div className="app-container">
        <AnimatePresence mode="wait">
          {game.phase === "welcome" && (
            <WelcomeScreen key="welcome" sportConfigs={SPORT_CONFIGS} onStart={startGame} />
          )}
          {game.phase === "playing" && currentQ && (
            <QuestionCard
              key={`q-${game.currentQuestion}`}
              question={currentQ}
              questionNumber={game.currentQuestion + 1}
              totalQuestions={questions.length}
              score={game.score}
              selectedAnswer={game.selectedAnswer}
              showFeedback={game.showFeedback}
              aiExplanation={explanation}
              aiLoading={aiLoading}
              sportEmoji={currentSportConfig.emoji}
              sportAccent={currentSportConfig.accent}
              onAnswer={handleAnswer}
              onNext={handleNext}
            />
          )}
          {game.phase === "results" && (
            <ResultsScreen
              key="results"
              score={game.score}
              totalQuestions={questions.length}
              answers={game.answers}
              questions={questions}
              sport={game.selectedSport}
              sportConfig={currentSportConfig}
              onRestart={handleRestart}
              onChangeSport={handleChangeSport}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
