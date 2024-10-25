import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ActionButton } from './ActionButton';

interface FormProps<T extends z.ZodType> {
  schema: T;
  defaultValues?: Partial<z.infer<T>>;
  onSubmit: (data: z.infer<T>) => void;
  onCancel?: () => void;
  children: React.ReactNode;
  submitText?: string;
  isSubmitting?: boolean;
}

export function Form<T extends z.ZodType>({
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  children,
  submitText = 'Submit',
  isSubmitting = false,
}: FormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.props.name) {
            return React.cloneElement(child, {
              ...child.props,
              register,
              error: errors[child.props.name],
            });
          }
          return child;
        })}
      </div>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        {onCancel && (
          <ActionButton
            type="button"
            variant="secondary"
            onClick={() => {
              reset();
              onCancel();
            }}
          >
            Cancel
          </ActionButton>
        )}
        <ActionButton
          type="submit"
          isLoading={isSubmitting}
        >
          {submitText}
        </ActionButton>
      </div>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  register?: any;
  error?: any;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  description?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  options,
  description,
}) => {
  const inputClasses = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500";
  
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {description && (
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      )}
      {type === 'select' && options ? (
        <select
          {...(register && register(name))}
          className={inputClasses}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          {...(register && register(name))}
          rows={3}
          className={inputClasses}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          {...(register && register(name))}
          className={inputClasses}
          placeholder={placeholder}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};