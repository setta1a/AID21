'use client';

import { Menu } from '@/app/components/menu';
import block from 'bem-cn-lite';

import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import './layout.scss';
import { User } from './components/user/User';

import { settings as dateSettings } from '@gravity-ui/date-utils';

import { ThemeProvider, configure as uikitConfigure } from '@gravity-ui/uikit';

dateSettings.loadLocale('ru').then(() => {
    dateSettings.setLocale('ru');
});
uikitConfigure({ lang: 'ru' });

const b = block('app-layout');

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ru">
            <body className={b(null, 'g-root g-root_theme_light')}>
                <ThemeProvider theme="light">
                    <header className={b('header')}>
                        <Menu />
                        <User />
                    </header>
                    <main className={b('content')}>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}
