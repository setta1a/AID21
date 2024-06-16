import { EmploymentForm } from './employment-form';

export type Vacancy = {
    id: string;
    title: string;
    salary: string;
    experience: string;
    employmentForms: EmploymentForm[];
    places: string[];
    selected: boolean;
    skills: string[];
};

export type VacancyFull = Vacancy & {
    description: string;
    expectations: string[];
    offers: string[];
};
