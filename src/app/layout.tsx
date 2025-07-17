import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '../shared/theme-provider';
import { LangSwitcher } from '../shared/lang-switcher';
import { ThemeSwitcher } from '../shared/theme-switcher';
import { cookies } from 'next/headers';

import './app.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'SellerHub',
    description: 'Поиск вакансий',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Читаем тему из cookie на сервере
    const cookieStore = await cookies();
    const theme = cookieStore.get('theme')?.value === 'dark' ? 'dark' : 'light';

    return (
        <html lang="ru" className={theme}>
            <head>
                <link
                    rel="icon"
                    href="/sellerhub-favicon.svg"
                    type="image/svg+xml"
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-light-shades dark:bg-dark-shades antialiased`}
            >
                <ThemeProvider initialTheme={theme}>
                    <header className="mb-4 flex items-center justify-between border-b bg-black p-4">
                        <div className="text-main-color text-xl font-bold">
                            SellerHub
                        </div>
                        <div className="flex gap-4">
                            <LangSwitcher />
                            <ThemeSwitcher />
                        </div>
                    </header>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

/**
 * Layout с ThemeProvider, переключателями темы и языка
 */
