import clsx from "clsx";
import type { ComponentProps, VNode } from "preact";
import { useCallback } from "preact/hooks";
import { useFocus } from "~/client/hooks/useFocus";

export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  errors?: string[];
  children: VNode;
}
export function FormField({
  id,
  name,
  label,
  errors,
  children,
  ...props
}: FormFieldProps) {
  return (
    <label
      htmlFor={id}
      className="label text-neutral flex flex-col items-start"
      {...props}
    >
      <div>{label}</div>
      {children}
      {errors?.map((message) => (
        <div className="text-error" key={message}>
          {message}
        </div>
      ))}
    </label>
  );
}

export interface FormInputProps extends ComponentProps<"input"> {
  id: string;
  name: string;
  label: string;
  errors?: string[];
  isFocused?: boolean;
}
export function FormInput({
  label,
  id,
  errors,
  name,
  className,
  isFocused = false,
  ...props
}: FormInputProps) {
  const handleAutoFocus = useFocus(isFocused);

  return (
    <FormField id={id} name={name} label={label} errors={errors}>
      <input
        ref={handleAutoFocus}
        className={clsx("input", errors?.length && "input-error", className)}
        name={name}
        id={id}
        {...props}
      />
    </FormField>
  );
}

export interface FormTextareaProps extends ComponentProps<"textarea"> {
  id: string;
  name: string;
  label: string;
  errors?: string[];
  isFocused?: boolean;
}
export function FormTextarea({
  label,
  id,
  errors,
  name,
  className,
  isFocused = false,
  ...props
}: FormTextareaProps) {
  const handleAutoFocus = useFocus(isFocused);
  return (
    <FormField id={id} name={name} label={label} errors={errors}>
      <textarea
        ref={handleAutoFocus}
        className={clsx(
          "textarea",
          errors?.length && "textarea-error",
          className,
        )}
        name={name}
        id={id}
        {...props}
      />
    </FormField>
  );
}
