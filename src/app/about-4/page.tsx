import type { Metadata } from 'next';
import { Montserrat, Cormorant_Garamond, Oswald } from 'next/font/google';
import { AboutTimeline } from '@/components/about/AboutTimeline';

export const metadata: Metadata = {
  title: 'Our Journey & Heritage | Designer World',
  description:
    'Eight decades of horological heritage — from Nagpal Watch Co. in the 1940s to Designer World Brands today.',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const oswald = Oswald({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

export default function About4Page() {
  return (
    <div
      className={`${montserrat.variable} ${cormorant.variable} ${oswald.variable}`}
      style={{
        backgroundColor: '#efeee8',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <AboutTimeline />
    </div>
  );
}
