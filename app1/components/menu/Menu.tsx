import { Routes } from '@/app/constants/routes';
import Link from 'next/link';
import block from 'bem-cn-lite';
import { usePathname } from 'next/navigation';

import './Menu.scss';

const b = block('menu');

const nameMap = {
    [Routes.Main]: 'Главная',
    [Routes.News]: 'Новости',
    [Routes.Vacancies]: 'Вакансии',
};

const NavElement = ({
    route,
    pathname,
}: {
    route: Routes;
    pathname: string;
}) => {
    return (
        <Link
            href={route}
            className={b('link', { current: pathname === route })}
        >
            {nameMap[route]}
        </Link>
    );
};

export const Menu = () => {
    const pathname = usePathname();

    return (
        <div className={b()}>
            <div className={b('logo')}>
                <img src="/images/logo.svg" alt="Logo" />
            </div>
            <nav className={b('navigation')}>
                <NavElement route={Routes.Main} pathname={pathname} />
                <NavElement route={Routes.News} pathname={pathname} />
                <NavElement route={Routes.Vacancies} pathname={pathname} />
            </nav>
        </div>
    );
};
