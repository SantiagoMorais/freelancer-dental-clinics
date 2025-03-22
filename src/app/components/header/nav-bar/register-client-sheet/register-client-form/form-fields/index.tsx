import { UseFormReturn } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TFormRegisterClientSchema } from "@/core/types/form-register-client-schema";
import { formFields } from "@/utils/register-client-functions/form-inputs-array";
import { processZipCode } from "@/utils/register-client-functions/process-zip-code";

interface IFormFields {
  form: UseFormReturn<TFormRegisterClientSchema>;
  setProcessingZipCode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormFields = ({ form, setProcessingZipCode }: IFormFields) => {
  const handleGetZipCodeValue = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const formattedValue = value.replace(/-/g, "").trim();

    if (formattedValue.length === 8) {
      processZipCode({ zipCode: formattedValue, form, setProcessingZipCode });
    }
    return;
  };

  return (
    <div className="grid w-full grid-cols-1 gap-6">
      {formFields.map((formField) => (
        <FormField
          key={formField.name}
          control={form.control}
          name={formField.name}
          render={({ field }) => {
            const adjustedValue =
              typeof field.value === "boolean"
                ? String(field.value)
                : field.value;
            return (
              <FormItem
                className={`${formField.customComponent && formField.customComponent === "Switch" && "flex flex-wrap items-center"}`}
              >
                <FormLabel className="text-lg font-semibold">
                  {formField.label}:
                  {formField.required && (
                    <span className="text-destructive"> *</span>
                  )}
                </FormLabel>
                <FormControl>
                  {!formField.customComponent ? (
                    <Input
                      placeholder={
                        formField.placeholder && formField.placeholder
                      }
                      {...field}
                      value={adjustedValue || ""}
                      className="border-primary font-semibold"
                    />
                  ) : formField.customComponent === "Switch" ? (
                    <Switch
                      className="ml-2 scale-150 cursor-pointer"
                      checked={field.value as boolean}
                      onCheckedChange={field.onChange}
                    />
                  ) : (
                    <PatternFormat
                      className="border-primary font-semibold"
                      format={formField.format || "(##) ####-####"}
                      customInput={Input}
                      placeholder={formField.placeholder}
                      {...field}
                      value={adjustedValue || ""}
                      onBlur={async (e) =>
                        formField.name === "zipCode"
                          ? handleGetZipCodeValue(e)
                          : undefined
                      }
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      ))}
    </div>
  );
};
