# How to Build a Champions League Fixtures Explorer with Sportmicro

Learn how to build a Champions League fixtures explorer using Next.js, React, TypeScript, and the Sportmicro sports API.

## Why this project is useful

Sports data apps often look simple in demos and difficult in production. Fixtures can be empty, delayed, rescheduled, filtered by date, or temporarily unavailable. A good developer example should show the actual boundary between the app and the upstream API instead of hiding it.

This repository demonstrates exactly that. It uses Sportmicro as the football data provider and focuses on one practical workflow: browsing upcoming UEFA Champions League fixtures with useful loading, empty, and error states.

## What we are building

The app is intentionally scoped to a small but real use case:

- fetch fixture data from Sportmicro
- keep API credentials on the server with `SPORTMICRO_API_KEY`
- show a responsive fixture browser
- filter fixtures by date and search terms
- make failure states understandable
- keep the code easy to extend

The point is not to cover every endpoint. The point is to create a production-style reference for a sports developer API integration.

## Architecture overview

The implementation is split into two layers:

1. **Sportmicro client layer** — handles transport concerns and returns typed success or failure results.
2. **Next.js UI layer** — renders the page, applies filtering, and displays loading or error states.

That separation keeps provider-specific behavior in one place.

### Client boundary

The reusable client lives in `src/lib/sportmicro.ts`. It owns:

- the Sportmicro football base URL
- the `SPORTMICRO_API_KEY` environment variable
- request construction
- API error normalization
- response-shape validation

A minimal server-side request looks like this:

```ts
const response = await fetch(url, {
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`
  },
  cache: 'no-store'
});
```

If the response is not OK, the client returns a readable error instead of throwing away context.

### UI boundary

The page component fetches data and renders three important states:

- loading
- empty/no results
- error/unavailable data

That matters in sports apps because "no fixtures found" is not the same thing as "the API failed."

## Sportmicro integration

This project uses the Sportmicro football API documented at [https://docs.sportmicro.com/](https://docs.sportmicro.com/).

The app currently calls:

- `GET /matches`

The page then filters the returned fixtures for the Champions League experience in code.

### Why not hardcode credentials?

Because that would make the project unsafe to share. The app reads `SPORTMICRO_API_KEY` from the environment so the browser never receives the secret.

## Building the UI

The UI is written with Next.js App Router and styled with Tailwind CSS.

Key behaviors:

- the search form is keyboard accessible
- the filters are exposed as simple form controls
- the cards are responsive and readable on small screens
- the error boundary offers a retry action

## Example code path

A request flows through these steps:

1. The user loads the page.
2. The server component constructs a `SportmicroClient`.
3. The client requests football fixtures from Sportmicro.
4. The client returns either data or a human-readable error.
5. The UI renders the matching state.

That flow keeps the app predictable and easier to debug.

## Production-style edge cases to keep in mind

A few things are worth handling early in a sports data app:

- the API key is missing
- the upstream API returns a non-200 response
- the response is not an array
- the search query matches nothing
- fixture dates are absent or malformed

This repository includes graceful handling for each of those cases in a minimal way.

## What this repo does not do yet

To keep the example focused, the app does not:

- implement every Sportmicro football endpoint
- claim live score streaming
- store user preferences
- provide a full match detail page
- invent fields that are not in the Sportmicro docs

That constraint is intentional. Small, honest examples are usually easier to learn from.

## Try it yourself

1. Add your `SPORTMICRO_API_KEY` to `.env.local`
2. Run `npm install`
3. Start the app with `npm run dev`
4. Explore the fixtures browser in your browser

For the project repository, see the GitHub repo associated with this example.

For the provider, visit [Sportmicro](https://sportmicro.com).
