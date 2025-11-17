import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Agentic Emailer',
  description: 'Auto-reply and auto-unsubscribe agent'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
