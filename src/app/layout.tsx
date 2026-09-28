import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Champions League Fixtures Explorer with Sportmicro API',
  description: 'Developer-focused Champions League fixtures explorer powered by Sportmicro.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
