import { SportmicroClient, formatFixtureDate, matchesSearch } from '@/lib/sportmicro';

const client = new SportmicroClient(process.env.SPORTMICRO_API_KEY);

export default async function Page({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const params = searchParams ? await searchParams : {};
  const date = typeof params.date === 'string' ? params.date : '';
  const search = typeof params.search === 'string' ? params.search : '';

  const result = await client.getUpcomingFixtures({ date: date || undefined, search: search || undefined, tournamentId: 'eq.champions-league' });

  const filtered = result.ok ? result.data.filter((fixture) => (search ? matchesSearch(fixture, search) : true)) : [];

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="space-y-4 rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">Powered by Sportmicro</p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">Champions League Fixtures Explorer</h1>
          <p className="max-w-3xl text-base text-slate-300">
            Browse upcoming UEFA Champions League fixtures, filter by date, and see how a production-style Sportmicro integration handles loading, empty, and error states.
          </p>
        </div>

        <form className="grid gap-3 sm:grid-cols-3" action="/" method="get">
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Search teams or venue
            <input
              name="search"
              defaultValue={search}
              placeholder="e.g. Real Madrid"
              className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none ring-0 placeholder:text-slate-500 focus:border-sky-400"
            />
          </label>
          <label className="flex flex-col gap-2 text-sm text-slate-300">
            Date filter
            <input name="date" type="date" defaultValue={date} className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-sky-400" />
          </label>
          <div className="flex items-end gap-3">
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              Apply filters
            </button>
            <a href="/" className="rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-200 transition hover:border-slate-500 hover:text-white">
              Reset
            </a>
          </div>
        </form>
      </section>

      {!result.ok ? (
        <section className="rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 text-amber-100">
          <h2 className="text-xl font-semibold text-amber-50">Data unavailable</h2>
          <p className="mt-2 max-w-3xl">{result.error}</p>
          <p className="mt-4 text-sm text-amber-100/80">Add a valid SPORTMICRO_API_KEY to your environment and restart the app to load live fixture data.</p>
        </section>
      ) : filtered.length === 0 ? (
        <section className="rounded-3xl border border-slate-700 bg-slate-900/70 p-8 text-slate-300">
          <h2 className="text-xl font-semibold text-white">No fixtures found</h2>
          <p className="mt-2">No upcoming fixtures matched the current filters. Try a different date or clear the search.</p>
        </section>
      ) : (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((fixture, index) => (
            <article key={String(fixture.id ?? `${fixture.home_team_name ?? 'home'}-${fixture.away_team_name ?? 'away'}-${index}`)} className="flex h-full flex-col rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20">
              <div className="flex items-center justify-between gap-3 text-sm text-slate-400">
                <span>{fixture.status_type ?? fixture.status ?? 'Scheduled'}</span>
                <span>{fixture.tournament_id ? `Tournament ${fixture.tournament_id}` : 'Champions League'}</span>
              </div>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {fixture.home_team_name ?? 'Home team'} vs {fixture.away_team_name ?? 'Away team'}
              </h2>
              <p className="mt-2 text-sm text-slate-300">{fixture.arena_name ?? 'Venue unavailable'}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-slate-400">Kickoff</dt>
                  <dd className="mt-1 text-slate-100">{formatFixtureDate(fixture)}</dd>
                </div>
                <div>
                  <dt className="text-slate-400">Score</dt>
                  <dd className="mt-1 text-slate-100">
                    {fixture.home_team_score ?? '—'} - {fixture.away_team_score ?? '—'}
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
