'use client';

import './globals.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { usePathname } from 'next/navigation';
import { Providers } from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isBlogPage = pathname?.startsWith('/blog');

  return (
    <html lang="tr">
      <body>
        <Providers>
          {!isAdminPage && <Header />}
          {children}
          {!isAdminPage && <Footer />}
        </Providers>
      </body>
    </html>
  );
} 