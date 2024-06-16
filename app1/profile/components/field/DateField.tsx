import { DatePicker } from '@gravity-ui/date-components';
import { dateTime, dateTimeParse } from '@gravity-ui/date-utils';

export type DateFieldProps = {
    value?: string;
    onUpdate: (value: string) => void;
    edit?: boolean;
};

export const DateField = ({ value, onUpdate, edit }: DateFieldProps) => {
    if (!edit) {
        return <span>{dateTimeParse(value)?.format('L')}</span>;
    }

    return (
        <DatePicker
            defaultValue={dateTimeParse(value)}
            format="L"
            onUpdate={(newValue) => onUpdate(newValue.toISOString())}
        />
    );
};
