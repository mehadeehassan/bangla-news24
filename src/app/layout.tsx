import Footer from '@/components/Footer/Footer';
import HeaderPage from '@/components/Header/Header';
import MarqueePage from '@/components/Marquee/Marquee';
import type { Metadata } from 'next';
import { Noto_Serif_Bengali } from 'next/font/google';
import './globals.css';
import { Toaster } from "sonner";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['latin', 'bengali'],
});

export const metadata: Metadata = {
  title: 'BanglaNews24 - Your Trusted Source for News in Bengali',
  description:
    'Your trusted source for the latest news in Bengali, covering national and international events. Stay informed with BanglaNews24. Discover the latest news and stories from around the world in Bengali. Stay up-to-date with the latest news in Bengali.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${notoSerifBengali.className} h-full antialiased`}>
      <body className="flex min-h-screen flex-col" suppressHydrationWarning>
        <HeaderPage />
        <MarqueePage />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
