import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { LoadingProvider } from '@/context/LoadingContext';

const goli = localFont({
  src: './fonts/GoliVF.ttf',
  weight: '300, 400, 500, 600, 700',
  variable: '--font-goli',
});

export const metadata: Metadata = {
  title: 'Nutriste',
  description: 'A simple and intuitive food diary app',
  icons: {
    icon: '/assets/logoSingleWhite.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${goli.variable} antialiased bg-[#EAFFE4]`}>
        <LoadingProvider>
          {children}
          <Toaster position="top-center" richColors />
        </LoadingProvider>
      </body>
    </html>
  );
}
