import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/shared/lib/providers/theme-provider';
import { ToggleThemeButton } from '@/features/toggle-theme';
import { cookies } from 'next/headers';

import './app.css';
import { Container } from '@/shared';

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
                        <Container className="flex items-center justify-between">
                            <div className="text-main-color text-xl font-bold">
                                SellerHub
                            </div>
                            <div className="flex gap-4">
                                <ToggleThemeButton />
                            </div>
                        </Container>
                    </header>

                    <Container>{children}</Container>
                </ThemeProvider>
            </body>
        </html>
    );
}

/**
 * Layout с ThemeProvider, переключателями темы и языка
 */
