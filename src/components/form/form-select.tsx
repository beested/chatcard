import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FieldValues } from 'react-hook-form';
import { FormInputProps } from './form-interface';

interface Option {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface SelectFormProps<T>
  extends FormInputProps<T extends FieldValues ? T : any> {
  options: Option[];
}

export function SelectForm<T extends FieldValues>({
  name,
  control,
  label,
  colSpan = 1,
  options = [],
  ...props
}: SelectFormProps<T>) {
  const colSpanClass = `col-span-${colSpan}`;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={colSpanClass}>
          <FormLabel className="flex items-center space-x-2">
            <span>{label}</span>
          </FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
              {...props}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma opção">
                  {field.value
                    ? options.find((option) => option.value === field.value)
                        ?.label
                    : 'Selecione uma opção'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between ">
                      <div>{option.label}</div>

                      <div className="ml-2">{option.icon}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
