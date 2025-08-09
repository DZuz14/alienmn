'use client';
import StarryNightSky from '@/components/StarryNightSky';
import { Inter, Roboto_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import NavBar from '../components/NavBar';
import './globals.css';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        {!isHomePage && <NavBar />}
        <StarryNightSky>{children}</StarryNightSky>
      </body>
    </html>
  );
}
