import { Button } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';

import './BrandButton.scss';

const b = block('brand-button');

export const BrandButton = ({
    children,
    onClick,
    loading,
    className,
}: {
    children: React.ReactNode;
    onClick: () => void;
    loading?: boolean;
    className?: string;
}) => {
    return (
        <Button
            className={b(null, className)}
            view="action"
            size="l"
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            loading={loading}
        >
            {children}
        </Button>
    );
};
