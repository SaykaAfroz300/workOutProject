# FitLog — Workout Library

FitLog is a dark, no-nonsense gym companion website. Pick a lift from the
library, add it to today's plan or save it for later, and keep track of your
workout stats. Built as an assignment project (B14-A6-Fit-Log) using
Next.js and Tailwind CSS.

## Technologies Used

- Next.js (App Router)
- React (useState, useEffect, Context API)
- Tailwind CSS
- Fetch API (for getting workout data from the FitLog API)
- localStorage (to save the plan/saved list even after refresh)

## Features

1. Home page with a hero banner and a library of 12 workouts fetched from
   the API, shown as cards in a responsive grid.
2. Dynamic workout details page (`/workout/[id]`) that shows the full
   instructions, specs, and lets you add a workout to today's plan or save
   it for later.
3. My Plan page (`/my-plan`) with two tabs — Today's Plan and Saved — plus
   a live stats summary (exercises, minutes, calories).
4. Sort dropdown on the My Plan page to sort by Duration, Calories or
   Rating, and a "Mark as Done" / remove button on each planned workout.
5. Toast notifications for every add/remove/save action, a loading spinner
   while data is fetching, a custom 404 page, and the plan/saved data is
   saved to localStorage so it survives a page refresh.
6. Fully responsive layout that works on mobile, tablet and desktop.

## Getting Started

Install the dependencies and run the dev server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

##Vercel Live Link:
https://work-out-project.vercel.app/




## API Used

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Notes

- The "Today's Plan" list is capped at 5 workouts, just like the design
  says ("Cap of five lifts for today").
- Live Link: *(add your deployed link here before submitting)*
- GitHub Repository Link: *(add your repo link here before submitting)*
