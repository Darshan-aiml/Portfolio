import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Darshan R — Designer & Engineer',
  description:
    'Designing & engineering intelligent systems with clarity and purpose. AI/ML • Full-Stack • UX/UI portfolio.',
  keywords: ['AI', 'Machine Learning', 'Full-Stack', 'UX Design', 'Portfolio', 'Darshan R'],
  authors: [{ name: 'Darshan R' }],
  openGraph: {
    title: 'Darshan R — Designer & Engineer',
    description: 'Designing & engineering intelligent systems with clarity and purpose.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Italiana&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Gupter:wght@400;500;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display+SC:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-text-primary noise-overlay">
        <Navbar />
        <main className="relative z-0 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
