import block from 'bem-cn-lite';

import './Avatar.scss';

const b = block('profile-user-avatar');

export const Avatar = ({
    avatarUrl = '/images/user-avatar-default.svg',
}: {
    avatarUrl?: string;
    edit?: boolean;
}) => {
    return (
        <div className={b()}>
            <img src={avatarUrl} alt="User avatar" />
        </div>
    );
};
