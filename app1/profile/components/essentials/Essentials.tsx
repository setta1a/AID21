import { Gender, Profile } from '@/app/models/profile/profile';
import { Field } from 'react-final-form';
import { EditableField, FieldType } from '../field/Field';
import { DateField } from '../field/DateField';
import { type SelectOption } from '@gravity-ui/uikit';
import { Fragment } from 'react';
import block from 'bem-cn-lite';

import './Essentials.scss';

const b = block('profile-edit-essentials');

const genderSelectOptions: SelectOption<Gender>[] = [
    {
        value: Gender.Male,
        content: 'Мужской',
    },
    {
        value: Gender.Female,
        content: 'Женский',
    },
    ,
    {
        value: Gender.Unspecified,
        content: 'Не указано',
    },
];

export const Essentials = () => {
    return (
        <div className={b()}>
            <div className={b('field')}>
                <h3>Имя</h3>
                <Field<Profile['essentials']['name']> name="essentials.name">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Фамилия</h3>
                <Field<
                    Profile['essentials']['surname']
                > name="essentials.surname">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Отчество</h3>
                <Field<
                    Profile['essentials']['middleName']
                > name="essentials.middleName">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Дата рождения</h3>
                <Field<
                    Profile['essentials']['birthDate']
                > name="essentials.birthDate">
                    {(props) => (
                        <DateField
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                            edit
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Пол</h3>
                <Field<
                    Profile['essentials']['gender']
                > name="essentials.gender">
                    {(props) => (
                        <EditableField
                            type={FieldType.Select}
                            value={props.input.value || Gender.Unspecified}
                            onUpdate={props.input.onChange}
                            options={genderSelectOptions}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Гражданство</h3>
                <Field<
                    Profile['essentials']['citizenship']
                > name="essentials.citizenship">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Регион поиска работы</h3>
                <Field<
                    Profile['essentials']['region']
                > name="essentials.region">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Контактный номер</h3>
                <Field<
                    Profile['essentials']['mobile']
                > name="essentials.mobile">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
            <div className={b('field')}>
                <h3>Email</h3>
                <Field<Profile['essentials']['email']> name="essentials.email">
                    {(props) => (
                        <EditableField
                            type={FieldType.Line}
                            value={props.input.value}
                            onUpdate={props.input.onChange}
                        />
                    )}
                </Field>
            </div>
        </div>
    );
};
