import classNames from "classnames";
import get from "lodash.get";
import { ErrorMessage } from "@hookform/error-message";
import { ReactNode, useState, useEffect } from "react";
import { DeepMap, FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { Input, InputProps } from "./input";

export type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  inputClassName?: string;
  right?: ReactNode;
  label?: string;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  inputClassName,
  label,
  right, // Ícono opcional al final del input
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  const [isFocused, setIsFocused] = useState(false);
  const [hasContent, setHasContent] = useState(!!props.value || !!props.defaultValue);

  useEffect(() => {
    setHasContent(!!props.value || !!props.defaultValue);
  }, [props.value, props.defaultValue]);

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasContent(event.target.value.trim() !== "");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasContent(event.target.value.trim() !== "");
  };

  const { disabled } = props;

  return (
    <div className={classNames("relative mb-4", className)} aria-live="polite">
      {label && (
        <label
          htmlFor={name}
          className={classNames(
            "absolute left-2 transition-all duration-200 ease-in-out",
            {
              "text-black": !hasError,
              "text-error": hasError,
              "-top-2 text-xs": isFocused || hasContent,
              "top-2 text-sm": !(isFocused || hasContent),
            }
          )}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          aria-invalid={hasError}
          className={classNames(
            "w-full border-b-2 border-black focus:border-black-500 outline-none transition-all bg-transparent pt-4",
            {
              "border-error focus:border-error": hasError,
              "cursor-not-allowed": disabled,
            },
            inputClassName
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...(props as Omit<InputProps, 'id' | 'size' | 'name'>)}
          {...(register && register(name, rules as RegisterOptions<TFormValues, Path<TFormValues>>))}
        />
        {right && <div className="absolute right-2">{right}</div>}
      </div>
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <p className="text-error text-xs mt-1">
            {typeof message === "object" ? JSON.stringify(message) : message}
          </p>
        )}
      />
    </div>
  );
};
