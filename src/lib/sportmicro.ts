export type SportmicroFixture = {
  id?: string | number;
  start_time?: string;
  start_timestamp?: number;
  status_type?: string;
  status?: string;
  season_id?: string | number;
  tournament_id?: string | number;
  round_id?: string | number;
  home_team_id?: string | number;
  away_team_id?: string | number;
  home_team_name?: string;
  away_team_name?: string;
  home_team_score?: number | null;
  away_team_score?: number | null;
  arena_name?: string;
};

export type FixtureFilters = {
  date?: string;
  seasonId?: string;
  tournamentId?: string;
  search?: string;
};

export type ApiSuccess<T> = { ok: true; data: T };
export type ApiFailure = { ok: false; error: string };

export class SportmicroClient {
  private readonly baseUrl = 'https://football.sportmicro.com';
  private readonly apiKey: string | undefined;

  constructor(apiKey: string | undefined) {
    this.apiKey = apiKey;
  }

  async getUpcomingFixtures(filters: FixtureFilters): Promise<ApiSuccess<SportmicroFixture[]> | ApiFailure> {
    if (!this.apiKey) {
      return { ok: false, error: 'SPORTMICRO_API_KEY is missing. Add it to your environment and restart the app.' };
    }

    const params = new URLSearchParams();
    params.set('offset', '0');
    params.set('limit', '20');
    if (filters.date) params.set('start_time', `gte.${filters.date}`);
    if (filters.search) params.set('q', filters.search);
    if (filters.seasonId) params.set('season_id', `eq.${filters.seasonId}`);
    if (filters.tournamentId) params.set('tournament_id', `eq.${filters.tournamentId}`);

    const url = `${this.baseUrl}/matches?${params.toString()}`;

    try {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${this.apiKey}`
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        return { ok: false, error: `Sportmicro returned ${response.status} ${response.statusText}` };
      }

      const data = (await response.json()) as unknown;
      if (!Array.isArray(data)) {
        return { ok: false, error: 'Sportmicro returned an unexpected response shape.' };
      }

      return { ok: true, data: data as SportmicroFixture[] };
    } catch (error) {
      return { ok: false, error: error instanceof Error ? error.message : 'Unknown network error while loading Sportmicro data.' };
    }
  }
}

export function formatFixtureDate(fixture: SportmicroFixture): string {
  const raw = fixture.start_time ?? (fixture.start_timestamp ? new Date(fixture.start_timestamp * 1000).toISOString() : '');
  if (!raw) return 'Date unavailable';
  const date = new Date(raw);
  return Number.isNaN(date.getTime()) ? raw : new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
}

export function matchesSearch(fixture: SportmicroFixture, search: string): boolean {
  const haystack = [fixture.home_team_name, fixture.away_team_name, fixture.arena_name, fixture.status_type, fixture.status]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
  return haystack.includes(search.toLowerCase());
}
