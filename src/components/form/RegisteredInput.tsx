import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";
import type { UseFormReturn } from "react-hook-form";

const RegisteredInput: React.FC<
  {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    hookForm: UseFormReturn<any>;
    label?: string;
    description?: string;
  } & InputProps
  // TODO verify if we can use this name on Input component
> = ({ name, hookForm, label, description, className, ...rest }) => {
  return (
    <FormField
      control={hookForm.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} {...rest} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RegisteredInput;
