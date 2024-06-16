import { Button, Label, TextInput } from '@gravity-ui/uikit';
import { FieldArray } from 'react-final-form-arrays';
import { useCallback, useState } from 'react';
import block from 'bem-cn-lite';

import './Skills.scss';

const b = block('profile-edit-skills');

const ListInput = ({ onSubmit }: { onSubmit: (string) => void }) => {
    const [inputValue, setInputValue] = useState('');
    const updateValue = useCallback(
        (newValue) => {
            if (newValue.trim()) {
                onSubmit(newValue);
            }
            setInputValue('');
        },
        [onSubmit]
    );

    return (
        <div className={b('input-text')}>
            <TextInput
                value={inputValue}
                onUpdate={setInputValue}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        updateValue(inputValue);
                    }
                }}
                placeholder="Введите навык"
            />
            <Button view="flat-info" onClick={() => updateValue(inputValue)}>
                Добавить
            </Button>
        </div>
    );
};

export const Skills = ({ initialValue }: { initialValue?: string[] }) => {
    return (
        <FieldArray<string> name="skills" initialValue={initialValue}>
            {({ fields }) => (
                <div className={b()}>
                    {
                        <div className={b('values', { empty: !fields.length })}>
                            {fields.map((name, index) => (
                                <Label
                                    onCloseClick={() => {
                                        fields.remove(index);
                                    }}
                                    type="close"
                                    key={name}
                                >
                                    {fields.value?.[index]}
                                </Label>
                            ))}
                        </div>
                    }
                    <ListInput onSubmit={(newValue) => fields.push(newValue)} />
                </div>
            )}
        </FieldArray>
    );
};
