import { useState } from "react";
import OpenAI from "openai";
import type { Question } from "./types";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export function useAIExplain() {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const explain = async (question: Question, selectedAnswer: number) => {
    setLoading(true);
    setExplanation(null);
    setError(null);

    const isCorrect = selectedAnswer === question.correct;
    const selectedText = question.options[selectedAnswer];
    const correctText = question.options[question.correct];

    const prompt = isCorrect
      ? `The student just answered a sports quiz question correctly. Give a short (2-3 sentence), enthusiastic coach-style deeper insight or fun fact that builds on this knowledge.

Question: "${question.question}"
Their answer: "${selectedText}" ✅ Correct!

Respond in a fun, engaging coaching voice. Keep it under 60 words. Do not repeat the answer, just add color.`
      : `The student got a sports quiz question wrong. Give a short (2-3 sentence) encouraging explanation that helps them understand why the correct answer is right.

Question: "${question.question}"
They answered: "${selectedText}" ❌
Correct answer: "${correctText}" ✅

Respond in an encouraging, coach-like voice. Keep it under 60 words. Focus on the "why".`;

    try {
      const response = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 150,
        messages: [
          {
            role: "system",
            content:
              "You are an enthusiastic sports coach and educator. You make learning sports rules fun and memorable. Always be encouraging, even when a student gets something wrong.",
          },
          { role: "user", content: prompt },
        ],
      });

      const text = response.choices[0]?.message?.content ?? null;
      setExplanation(text);
    } catch {
      setError("Coach is taking a water break — try again!");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setExplanation(null);
    setError(null);
    setLoading(false);
  };

  return { explanation, loading, error, explain, reset };
}
