import { ReactElement } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export interface FormInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  colSpan?: number;
  placeholder?: string;
  type?: string;
  description?: string;
  iconRight?: ReactElement;
  iconLeft?: ReactElement;
  options?: any[];
}
