import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FieldValues } from 'react-hook-form';
import { Textarea } from '../ui/textarea';
import { FormInputProps } from './form-interface';

export function TextareaForm<T extends FieldValues>({
  name,
  control,
  label,
  colSpan = 1,
  description = '',
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
            <Textarea {...field} className={`font-semibold `} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
