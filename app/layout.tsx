import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nibble - Food & Emotion Tracker',
  description: 'Notice the connection between what you eat and how you feel.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${fraunces.variable} antialiased font-sans text-ink bg-cream min-h-screen flex flex-col`}>
        <main className="flex-1 max-w-md mx-auto w-full pb-20 relative bg-cream shadow-sm min-h-screen">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
