import { BrandButton } from '@/app/components/BrandButton';
import { TextArea } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import { useState } from 'react';
import './ContactForm.scss';

const b = block('contact-form');

type ContactFormProps = {
    onConfirm: (text: string) => void;
};

export const ContactForm = ({ onConfirm }: ContactFormProps) => {
    const [value, setValue] = useState('');
    const [errored, setErrored] = useState(false);

    return (
        <div className={b()}>
            <TextArea
                value={value}
                onUpdate={(newValue) => {
                    setValue(newValue);
                    setErrored(false);
                }}
                placeholder="Что вас интересует?"
                error={errored}
                errorMessage="Это поле должно бвть заполнено"
                minRows={10}
            />
            <BrandButton
                onClick={() => {
                    if (!value.trim()) {
                        setErrored(true);
                    }
                    onConfirm(value);
                    setValue('');
                }}
                className={b('submit')}
            >
                Отправить
            </BrandButton>
        </div>
    );
};
