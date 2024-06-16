import { BrandButton } from '@/app/components/BrandButton';
import { TextArea, TextInput } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import { CSSProperties, useState } from 'react';

import './AccompanyingLetter.scss';

const b = block('accompanying-letter-edit');

type AccompanyingLetterProps = {
    onConfirm: (text: string, url: string) => void;
    className?: string;
    style?: CSSProperties;
};

export const AccompanyingLetter = ({
    onConfirm,
    className,
    style,
}: AccompanyingLetterProps) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    return (
        <div className={b(null, className)} style={style}>
            <div className={b('letter')}>
                <h2>Сопроводительное письмо</h2>
                <TextArea
                    value={text}
                    minRows={10}
                    onUpdate={setText}
                    autoFocus
                />
            </div>
            <div className={b('bottom')}>
                <div className={b('url')}>
                    <h3>Прикрепите ссылку</h3>
                    <TextInput value={url} onUpdate={setUrl} />
                </div>
                <BrandButton onClick={() => onConfirm(text, url)}>
                    Отправить резюме
                </BrandButton>
            </div>
        </div>
    );
};
