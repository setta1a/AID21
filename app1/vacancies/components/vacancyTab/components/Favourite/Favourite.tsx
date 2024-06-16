import block from 'bem-cn-lite';
import { useState } from 'react';
import './Favourite.scss';
import { Logo } from './Logo';

const b = block('favourite');

type FavouriteProps = {
    selected: boolean;
    onSwitch: () => void;
};

export const Favourite = ({ selected, onSwitch }: FavouriteProps) => {
    const [checked, setChecked] = useState(selected);

    return (
        <label className={b()} onClick={(e) => e.stopPropagation()}>
            <input
                type="checkbox"
                onChange={() => {
                    onSwitch();
                    setChecked(!checked);
                }}
                checked={checked}
                className={b('checkbox')}
            />
            <Logo className={b('image', { selected: checked })} />
        </label>
    );
};
