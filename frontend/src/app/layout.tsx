import './globals.css';
import type { Metadata } from 'next';
import { Public_Sans } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import { AuthProvider } from '@/providers/AuthProvider';

const publicSans = Public_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-public-sans',
});

export const metadata: Metadata = {
  title: 'CivicTech - Modern Civic Tech',
  description: 'Empowering citizens to build better cities through real-time action and verified community reporting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${publicSans.className} font-display`}>
        <AuthProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}