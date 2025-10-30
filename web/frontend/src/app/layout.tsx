import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/authContext';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Tippie',
    description: 'Leave a tip for your waiter',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className="h-dvh overscroll-none">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white h-full`}
            >
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
