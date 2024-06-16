import { Field } from 'react-final-form';
import { EditableField, FieldType } from '../field/Field';
import { type WorkExperience as TWorkExperience } from '@/app/models/profile/profile';
import { Button, Icon } from '@gravity-ui/uikit';
import { FieldArray } from 'react-final-form-arrays';
import { DateField } from '@gravity-ui/date-components';
import { dateTimeParse } from '@gravity-ui/date-utils';
import block from 'bem-cn-lite';
import { Xmark as CloseIcon } from '@gravity-ui/icons';

import './WorkExperience.scss';

const b = block('profile-edit-work-experience');

const emptyValue: TWorkExperience = {
    companyName: '',
    position: '',
    startDate: '',
};

export const WorkExperience = ({
    initialValue,
}: {
    initialValue?: TWorkExperience[];
}) => {
    return (
        <FieldArray<TWorkExperience>
            name="workExperience"
            initialValue={initialValue}
        >
            {({ fields }) => (
                <div className={b()}>
                    {fields.map((name, index) => (
                        <div key={name} className={b('section')}>
                            <div className={b('fields')}>
                                <div className={b('input-container')}>
                                    <h3>Название компании</h3>
                                    <Field<TWorkExperience['companyName']>
                                        name={`${name}.companyName`}
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
                                    <h3>Должность</h3>
                                    <Field<TWorkExperience['position']>
                                        name={`${name}.position`}
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
                                    <h3>Опыт работы</h3>
                                    <Field<
                                        TWorkExperience['experienceDescription']
                                    >
                                        name={`${name}.experienceDescription`}
                                    >
                                        {(props) => (
                                            <EditableField
                                                type={FieldType.Text}
                                                value={props.input.value}
                                                onUpdate={props.input.onChange}
                                                minRows={5}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className={b('period-container')}>
                                    <div className={b('period')}>
                                        <h3>Дата трудоустройства</h3>
                                        <Field<TWorkExperience['startDate']>
                                            name={`${name}.startDate`}
                                        >
                                            {(props) => (
                                                <DateField
                                                    defaultValue={dateTimeParse(
                                                        props.input.value
                                                    )}
                                                    onUpdate={(newDate) => {
                                                        if (
                                                            newDate &&
                                                            newDate.year() >
                                                                1000
                                                        ) {
                                                            props.input.onChange(
                                                                newDate.toISOString()
                                                            );
                                                        }
                                                    }}
                                                    format="MMMM, YYYY"
                                                    placeholder="Месяц, год"
                                                />
                                            )}
                                        </Field>
                                    </div>
                                    <div className={b('period')}>
                                        <h3>Дата увольнения</h3>
                                        <Field<TWorkExperience['endDate']>
                                            name={`${name}.endDate`}
                                        >
                                            {(props) => (
                                                <DateField
                                                    defaultValue={dateTimeParse(
                                                        props.input.value
                                                    )}
                                                    onUpdate={(newDate) => {
                                                        if (
                                                            newDate &&
                                                            newDate.year() >
                                                                1000
                                                        ) {
                                                            props.input.onChange(
                                                                newDate.toISOString()
                                                            );
                                                        }
                                                    }}
                                                    format="MMMM, YYYY"
                                                    placeholder="Месяц, год"
                                                />
                                            )}
                                        </Field>
                                    </div>
                                </div>
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
