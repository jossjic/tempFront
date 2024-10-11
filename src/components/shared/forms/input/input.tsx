import classNames from 'classnames';
import {
  DetailedHTMLProps, FC,
  forwardRef, InputHTMLAttributes, ReactNode
} from 'react';

export type InputSize = 'medium' | 'large';
export type InputType = 'text' | 'email' | 'password' | 'search' | "date" | "number";

export type InputProps = {
  id: string;
  name: string;
  label?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  right?: ReactNode;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
>;

// Using maps so that the full Tailwind classes can be seen for purging
// see https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

const sizeMap: { [key in InputSize]: string } = {
  medium: 'p-3 text-base h-[45px]',
  large: 'p-4 text-base',
};



export const Input: FC<InputProps | any> = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      id,
      name,
      label,
      type = 'text',
      size = 'medium',
      className = 'h-[45px]',
      placeholder,
      right,
      ...props
    },
    ref
  ) => {
    const { disabled } = props;
    return (
      <div className='flex flex-col h-full'>
        {label && (
            <label htmlFor={name} className='flex-1'>
          <span className={classNames({
            'font-semibold': true,
            'cursor-not-allowed': disabled,
          })}>{label}</span>
        </label>
          )}
        <div className={classNames({
          'flex flex-row items-center gap-2': true,
          'mt-2': label,
        })}>
          <input
            id={id}
            ref={ref}
            name={name}
            type={type}
            aria-label={label}
            placeholder={placeholder}
            className={classNames([
              `relative inline-flex w-full rounded-lg leading-none transition-colors ease-in-out border border-gray focus:outline-none focus:ring-1 focus:ring-opacity-30 placeholder:text-gray-dark ring-offset-0`,
              sizeMap[size],
              className
            ])}
            {...props}
          />
          {right && (
            right
          )}
        </div>

      </div>
    );
  }
);

Input.displayName = 'Input';