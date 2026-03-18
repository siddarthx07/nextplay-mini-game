#!/bin/bash
# Run this inside the nextplay-quiz folder to push to GitHub

echo "🏈 Next Play Quiz — GitHub Setup"
echo "================================"
echo ""

# Initialize git
git init
git add .
git commit -m "feat: Next Play sports quiz mini game

- React + TypeScript quiz game with 4 sports (football, basketball, soccer, baseball)
- 5 questions per sport with instant feedback
- AI Coach: Claude API generates post-answer coaching insights
- Performance ranking system (Hall of Famer → Rookie)
- Animated score ring on results screen
- Framer Motion transitions throughout
- Pure CSS design system with Bebas Neue + DM Sans fonts
- Fully typed with strict TypeScript"

echo ""
echo "✅ Git initialized and committed!"
echo ""
echo "Next steps:"
echo "  1. Create a new repo at https://github.com/new"
echo "     Name it: nextplay-quiz"
echo ""
echo "  2. Run these commands:"
echo "     git remote add origin https://github.com/YOUR_USERNAME/nextplay-quiz.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "  3. To deploy on Vercel:"
echo "     npx vercel --prod"
