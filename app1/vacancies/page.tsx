'use client';

import { EmploymentForm } from '../models/vacancy/employment-form';
import { VacancyTab, VacancyTabProps } from './components/vacancyTab';
import block from 'bem-cn-lite';

import './page.scss';
import { useState } from 'react';
import { AccompanyingLetter } from './components/accompanyingLetter/AccampanyingLetter';

const b = block('vacancies-page');

const sample: Omit<VacancyTabProps, 'onConfirm'>[] = Array.from({
    length: 10,
}).map((_, index) => ({
    id: index.toString(),
    title: 'Job title',
    skills: ['Skill 1', 'Skill 2', 'Skill 3'],
    salary: 'от 100к в нс',
    experience: '12 years in Azakaban',
    employmentForms: [EmploymentForm.FullTime, EmploymentForm.Remote],
    selected: Math.floor(Math.random() * 3 - 1) > 0,
    places: ['Moscow, St Petersburg'],
    onSelectedSwitch: () => {},
}));

export default function Page() {
    const [letterId, setLetterId] = useState<number | undefined>();
    const [block, setBlock] = useState(false);

    return (
        <div className={b()}>
            {sample.map((vacancy, index) => (
                <VacancyTab
                    {...vacancy}
                    key={vacancy.id}
                    onConfirm={() => {
                        if (letterId === index) {
                            return setLetterId(undefined);
                        }
                        setLetterId(index);
                    }}
                    confirmed={letterId === index}
                    block={block}
                    className={b('vacancy', { inline: !block })}
                />
            ))}
            {letterId !== undefined && (
                <AccompanyingLetter
                    className={b('letter')}
                    onConfirm={() => {
                        setLetterId(undefined);
                    }}
                    style={{
                        gridRowStart:
                            Math.ceil((letterId + 1) / (block ? 3 : 1)) + 1,
                        gridRowEnd:
                            Math.ceil((letterId + 1) / (block ? 3 : 1)) + 2,
                    }}
                />
            )}
        </div>
    );
}
