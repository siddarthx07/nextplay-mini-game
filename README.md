# NextPlay Quiz

A sports trivia web app built with React, TypeScript, and Vite. Players pick a sport, answer 5 questions, and receive AI-powered coaching feedback after each answer.

## Features

- Four sports: Football, Basketball, Soccer, Baseball
- 5 questions per sport with easy, medium, and hard difficulty levels
- Instant answer feedback with explanations
- AI coach powered by OpenAI that gives personalized insights after each answer
- Animated UI using Framer Motion

## Tech Stack

- React 19
- TypeScript
- Vite
- Framer Motion
- OpenAI API (gpt-4o-mini) — used for AI coach responses after each answer

## Getting Started

### Prerequisites

- Node.js 18 or higher
- An OpenAI API key

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env` file in the root of the project and add your OpenAI API key:

```
VITE_OPENAI_API_KEY=your_api_key_here
```

### Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

```bash
npm run build
```
