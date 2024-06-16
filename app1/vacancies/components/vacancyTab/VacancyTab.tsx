import { EmploymentForm } from '@/app/models/vacancy/employment-form';
import { employmentFormText } from '@/app/utils/vacancy';
import { Button, Label } from '@gravity-ui/uikit';
import block from 'bem-cn-lite';
import { Favourite } from './components/Favourite';

import './VacancyTab.scss';
import type { Vacancy } from '@/app/models/vacancy';
import { Routes } from '@/app/constants/routes';
import { useRouter } from 'next/navigation';
import { BrandButton } from '@/app/components/BrandButton';
import { useState } from 'react';

const b = block('vacancy-tab');

export type VacancyTabProps = Vacancy & {
    noLink?: boolean;
    block?: boolean;
    onSelectedSwitch: () => void;
    onConfirm: () => void;
    confirmed?: boolean;
    className?: string;
};

export const VacancyTab = ({
    id,
    title,
    skills,
    salary,
    experience,
    employmentForms,
    places,
    block,
    selected,
    noLink,
    confirmed,
    className,
    onSelectedSwitch,
    onConfirm,
}: VacancyTabProps) => {
    const router = useRouter();

    return (
        <div
            className={b({ block, 'no-link': noLink }, className)}
            onClick={() => {
                if (!noLink) {
                    router.push(`${Routes.Vacancies}/${id}`);
                }
            }}
        >
            <div className={b('info')}>
                <h2 className={b('title')}>{title}</h2>
                <div className={b('skills')}>
                    {skills.map((skill, index) => (
                        <Label size="s" key={index}>
                            {skill}
                        </Label>
                    ))}
                </div>
                <div className={b('properties')}>
                    <span className={b('salary')}>
                        Уровень дохода: {salary}
                    </span>
                    <span className={b('experience')}>
                        Требуемый опыт: {experience}
                    </span>
                    <span className={b('employment')}>
                        {employmentForms
                            .map((form, index) => {
                                const text = employmentFormText[form] ?? form;
                                if (index !== 0) {
                                    return text;
                                }

                                return `${text[0].toUpperCase()}${text.slice(1)}`;
                            })
                            .join(', ')}
                    </span>
                    <span className={b('places')}>{places.join(', ')}</span>
                </div>
            </div>
            <div className={b('actions', { block })}>
                <Favourite selected={selected} onSwitch={onSelectedSwitch} />
                <Button
                    className={b('confirm-action', { confirmed })}
                    view="action"
                    size="l"
                    onClick={(e) => {
                        e.stopPropagation();
                        onConfirm();
                    }}
                >
                    Откликнуться
                </Button>
            </div>
        </div>
    );
};
