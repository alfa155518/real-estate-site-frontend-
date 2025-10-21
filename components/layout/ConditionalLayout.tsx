'use client';

import { usePathname } from 'next/navigation';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import ScrollToTopBtn from '@/components/ui/ScrollToTopBtn';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}
      {children}
      {!isAdminPage && <ScrollToTopBtn />}
      {!isAdminPage && <Footer />}
    </>
  );
}
