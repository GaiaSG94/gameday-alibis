# Alibis

A daily whodunit for Reddit, built on [Devvit Web](https://developers.reddit.com/).

One room was locked from the inside, four suspects have sightings, and exactly
one report is false - the one that places a suspect inside the locked room.
Name the culprit and the room.

## How to play

1. Read the case file (the locked room plus the sightings).
2. Tap the suspect and the room.
3. Tap Close the case. A correct accusation extends your streak.

One case per day, the same for everyone; streaks stored per user in Redis.

## Stack

- React 19 + Tailwind 4 + Vite (client inside a Reddit post)
- Hono server on Devvit (`/api/init`, `/api/submit`), Redis persistence
- Deterministic daily generation (UTC seed), clue structure tested

## Development

```bash
npm install
npm run dev
npm test
npm run type-check
npm run build
```

## Submission (Reddit's Game of the Day Hackathon)

- App listing: `developers.reddit.com/apps/gameday-alibis` (private until judging ends)
- Demo post: public test subreddit, post running the game
