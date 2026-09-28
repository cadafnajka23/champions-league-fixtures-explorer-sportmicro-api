'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-10 text-slate-100">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-slate-300">{error.message}</p>
      <button onClick={reset} className="mt-6 w-fit rounded-xl bg-sky-500 px-5 py-3 font-medium text-slate-950">
        Try again
      </button>
    </main>
  );
}
