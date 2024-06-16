import { Select, SelectOption, TextArea, TextInput } from '@gravity-ui/uikit';

export enum FieldType {
    Line,
    Text,
    Select,
    List,
}

export type FieldProps = (
    | {
          type: FieldType.Line | FieldType.Text;
          value?: string;
          onUpdate: (value: string) => void;
          minRows?: number;
      }
    | {
          type: FieldType.Select;
          value?: string;
          options: SelectOption<string>[];
          input?: boolean;
          onUpdate: (value: string) => void;
      }
) & { edit?: boolean };

export const Field = (props: FieldProps) => {
    switch (props.type) {
        case FieldType.Line: {
            if (!props.edit) {
                return <span>{props.value}</span>;
            }
            return (
                <TextInput
                    defaultValue={props.value}
                    onUpdate={props.onUpdate}
                />
            );
        }
        case FieldType.Text: {
            if (!props.edit) {
                return props.value;
            }
            return (
                <TextArea
                    defaultValue={props.value}
                    onUpdate={props.onUpdate}
                    minRows={props.minRows}
                />
            );
        }
        case FieldType.Select: {
            if (!props.edit) {
                return props.value;
            }
            return (
                <Select
                    defaultValue={[props.value]}
                    options={props.options}
                    onUpdate={([newValue]) => props.onUpdate(newValue)}
                />
            );
        }
        default: {
            return null;
        }
    }
};

export const EditableField = (props: FieldProps) => <Field edit {...props} />;
