import { Field } from 'react-final-form';
import { EditableField, FieldType } from '../field/Field';
import {
    type Education as TEducation,
    EducationLevel,
} from '@/app/models/profile/profile';
import { Button, Checkbox, Icon, SelectOption } from '@gravity-ui/uikit';
import { FieldArray } from 'react-final-form-arrays';
import block from 'bem-cn-lite';
import { Xmark as CloseIcon } from '@gravity-ui/icons';

import './Education.scss';
import { DateField } from '@gravity-ui/date-components';

const b = block('profile-edit-education');

const levelSelectOptions: SelectOption<EducationLevel>[] = [
    {
        value: EducationLevel.Bachelor,
        content: 'Бакалавриат',
    },
    {
        value: EducationLevel.Master,
        content: 'Магистратура',
    },
    ,
    {
        value: EducationLevel.Speciality,
        content: 'Специалитет',
    },
];

const emptyValue: TEducation = {
    level: EducationLevel.Bachelor,
    name: '',
    faculty: '',
    speciality: '',
};

export const Education = ({
    initialValue,
}: {
    initialValue?: TEducation[];
}) => {
    return (
        <FieldArray<TEducation> name="education" initialValue={initialValue}>
            {({ fields }) => (
                <div className={b()}>
                    {fields.map((name, index) => (
                        <div key={name} className={b('section')}>
                            <div className={b('fields')}>
                                <Field<TEducation['level']>
                                    name={`${name}.level`}
                                >
                                    {(props) => (
                                        <EditableField
                                            type={FieldType.Select}
                                            value={props.input.value}
                                            onUpdate={props.input.onChange}
                                            options={levelSelectOptions}
                                        />
                                    )}
                                </Field>
                                <div className={b('input-container')}>
                                    <h3>Название учебного заведения</h3>
                                    <Field<TEducation['name']>
                                        name={`${name}.name`}
                                    >
                                        {(props) => (
                                            <EditableField
                                                type={FieldType.Line}
                                                value={props.input.value}
                                                onUpdate={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className={b('input-container')}>
                                    <h3>Факультет</h3>
                                    <Field<TEducation['faculty']>
                                        name={`${name}.faculty`}
                                    >
                                        {(props) => (
                                            <EditableField
                                                type={FieldType.Line}
                                                value={props.input.value}
                                                onUpdate={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className={b('input-container')}>
                                    <h3>Специализация</h3>
                                    <Field<TEducation['speciality']>
                                        name={`${name}.speciality`}
                                    >
                                        {(props) => (
                                            <EditableField
                                                type={FieldType.Line}
                                                value={props.input.value}
                                                onUpdate={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div>
                                    <h3>
                                        Год окончания (или предполагаемого
                                        окончания)
                                    </h3>

                                    <Field<TEducation['finishDate']>
                                        name={`${name}.finishDate`}
                                    >
                                        {(props) => (
                                            <DateField
                                                format="YYYY"
                                                placeholder="Год"
                                                onUpdate={props.input.onChange}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <Field<TEducation['notFinished']>
                                    name={`${name}.notFinished`}
                                >
                                    {(props) => (
                                        <Checkbox
                                            onUpdate={props.input.onChange}
                                            checked={props.input.value}
                                        >
                                            Незавершенное образование
                                        </Checkbox>
                                    )}
                                </Field>
                            </div>
                            <Button
                                className={b('remove')}
                                onClick={() => fields.remove(index)}
                                view="flat"
                            >
                                <Icon data={CloseIcon} />
                            </Button>
                        </div>
                    ))}
                    <Button
                        onClick={() => fields.push(emptyValue)}
                        view="flat-info"
                        className={b('add')}
                    >
                        Добавить
                    </Button>
                </div>
            )}
        </FieldArray>
    );
};
