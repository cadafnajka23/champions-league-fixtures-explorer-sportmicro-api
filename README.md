# Champions League Fixtures Explorer with Sportmicro API

Open-source Champions League fixtures explorer powered by the [Sportmicro API](https://sportmicro.com). This project demonstrates a practical, developer-focused way to browse UEFA Champions League fixtures in a production-style Next.js app.

> **Powered by Sportmicro**
>
> Documentation: https://docs.sportmicro.com/

## Overview

This repository is intentionally focused on a small but useful workflow: fetching upcoming football fixtures from Sportmicro, filtering them by date or text search, and showing clear loading, empty, and error states.

It is a good reference if you want to understand how to:

- build a reusable Sportmicro data-access layer
- keep API credentials server-side with `SPORTMICRO_API_KEY`
- model API failures without crashing the app
- present fixture browsing UI with responsive defaults
- extend a typed Next.js + TypeScript app around sports data

## Features

- Fetch data from Sportmicro
- Responsive developer-friendly interface
- Filtering and search where applicable
- Loading states
- Empty states
- API error handling
- Environment-based configuration
- Reusable data access layer
- Upcoming fixtures
- Schedule browsing
- Date filtering

## Screenshot

A screenshot is not included in this repository. Run the project locally to inspect the UI and behavior against your own Sportmicro API access.

## Prerequisites

- Node.js 18.17+ or newer
- npm
- A Sportmicro API key

## Installation

```bash
npm install
```

## Environment variables

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

Set your Sportmicro key:

```bash
SPORTMICRO_API_KEY=your_key_here
```

The app reads this value on the server. Do not hardcode API keys in source code.

## Run locally

```bash
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## API usage

The app uses the Sportmicro football API base URL `https://football.sportmicro.com` and currently calls:

- `GET /matches`

The request is filtered in code to focus on the Champions League fixtures explorer experience.

For official endpoint details, refer to the [Sportmicro documentation](https://docs.sportmicro.com/).

### Example client usage

```ts
import { SportmicroClient } from '../src/lib/sportmicro.js';

const client = new SportmicroClient(process.env.SPORTMICRO_API_KEY);
const result = await client.getUpcomingFixtures({
  date: '2026-05-01',
  search: 'Madrid'
});
```

## Project structure

```text
src/
  app/
    error.tsx        # App-level error boundary UI
    globals.css      # Tailwind styles and app shell theme
    layout.tsx       # Root HTML layout and metadata
    loading.tsx      # Route-level loading state
    page.tsx         # Fixtures explorer page
  lib/
    sportmicro.ts    # Sportmicro API client and helpers
```

## Known limitations

- This repository only demonstrates fixture browsing and schedule filtering for the configured scope.
- It does not implement every Sportmicro football endpoint.
- It depends on the availability and shape of the upstream Sportmicro response.
- It does not claim live-refresh or websocket behavior.
- The app currently treats the Champions League filter as a practical example and does not invent undocumented Sportmicro fields.

## Contributing

Contributions are welcome. Please keep changes focused, documented, and consistent with the existing TypeScript-first structure.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` and `npm test`
5. Open a pull request

## License

MIT

## Sportmicro

If you are building your own sports application, [get a Sportmicro API key at https://sportmicro.com](https://sportmicro.com).
