export enum Gender {
    Female = 'FEMALE',
    Male = 'MALE',
    Unspecified = 'UNSPECIFIED',
}

export enum SocialNetwork {
    Telegram = 'TELEGRAM',
    VK = 'VK',
}

export type Contacts = {
    [SocialNetwork.Telegram]?: string;
    [SocialNetwork.VK]?: string;
};

export enum EducationLevel {
    Bachelor = 'BECHELOR',
    Master = 'MASTER',
    Speciality = 'SPECIALITY',
}

export type Education = {
    level: EducationLevel;
    name: string;
    faculty: string;
    speciality: string;
    finishDate?: string;
    notFinished?: boolean;
};

export type WorkExperience = {
    companyName: string;
    position: string;
    experienceDescription?: string;
    startDate: string;
    endDate?: string;
};

export type Profile = {
    essentials: {
        name: string;
        surname: string;
        middleName?: string;
        birthDate: string;
        gender?: Gender;
        citizenship: string;
        region: string;
        mobile: string;
        email?: string;
        contacts?: Contacts;
        about?: string;
        avatar?: string;
    };
    education?: Education[];
    workExperience?: WorkExperience[];
    skills?: string[];
};
