import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues } from 'react-hook-form';
import { FormInputProps } from './form-interface';

export function InputForm<T extends FieldValues>({
  name,
  control,
  label,
  colSpan = 1,
  ...props
}: FormInputProps<T>) {
  const colSpanClass = `col-span-${colSpan}`;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={colSpanClass}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} {...props} />
          </FormControl>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
