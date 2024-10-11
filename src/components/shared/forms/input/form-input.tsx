import classNames from "classnames";
import get from "lodash.get";

import { ErrorMessage } from "@hookform/error-message";
import { ReactNode } from "react";
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister,} from "react-hook-form";
import { Input, InputProps } from "./input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  inputClassName?: string;
  right?: ReactNode;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  inputClassName,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  // If the name is in a FieldArray, it will be 'fields.index.fieldName' and errors[name] won't return anything, so we are using lodash get
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  const { disabled } = props;

  return (
    <div className={classNames("", className)} aria-live="polite">
      <Input
        name={name}
        aria-invalid={hasError}
        className={classNames({
          "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-error hover:border-error focus:border-error focus:ring-error":
            hasError,
          "cursor-not-allowed": disabled,
          [`${inputClassName ? inputClassName : ""}`]: true,
        })}
        {...props}
       // {...(register && register(name, {...rules, }))}
       {...(register && register(name, {...(rules as RegisterOptions<TFormValues, Path<TFormValues>>)}))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="text-error text-xs">{message}</p>
        )}
      />
    </div>
  );
};
