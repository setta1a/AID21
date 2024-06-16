import { Avatar } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './User.scss';
import Link from 'next/link';
import { Routes } from '@/app/constants/routes';

const b = block('user');

export const User = () => {
    return (
        <Link className={b()} href={Routes.Profile}>
            <Avatar
                className={b('avatar')}
                imgUrl="/images/user-avatar-default.svg"
                size="l"
                view="outlined"
            />
            <div className={b('user-info')}>
                <span className={b('name')}>User Name</span>
                <span className={b('email')}>sample@sample.net</span>
            </div>
        </Link>
    );
};
