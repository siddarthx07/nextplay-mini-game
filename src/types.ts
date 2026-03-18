export interface Question {
  id: number;
  sport: string;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface GameState {
  phase: "welcome" | "playing" | "results";
  currentQuestion: number;
  score: number;
  answers: (number | null)[];
  selectedAnswer: number | null;
  showFeedback: boolean;
  aiExplanation: string | null;
  loadingAI: boolean;
  selectedSport: Sport;
}

export type Sport = "football" | "basketball" | "soccer" | "baseball";

export interface SportConfig {
  name: string;
  emoji: string;
  color: string;
  accent: string;
}
