import type { Metadata } from 'next';
import { Rajdhani, Exo_2 } from 'next/font/google';
import './globals.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

const exo2 = Exo_2({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-exo2',
});

export const metadata: Metadata = {
  title: 'iGaming Lobby',
  description: 'Casino Lobby Manager',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${rajdhani.variable} ${exo2.variable} bg-[#060B14] text-white`}>
        {children}
      </body>
    </html>
  );
}