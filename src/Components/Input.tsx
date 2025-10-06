import { forwardRef, type ElementType } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon?: ElementType;
  className?: string;
  iconClassName?: string;
  type?: string;
  inputClassName?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, icon: Icon, className, iconClassName, inputClassName, ...rest }, ref) => {
    return (
      <div className={`relative w-[14rem] ml-0 mt-4 border-b border-zinc-300 bg-input rounded ${className}`}>
        {Icon && <Icon className={iconClassName} />}
        <input
          ref={ref} 
          placeholder={placeholder}
          className={`w-full pr-3 py-2 border-0 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none ${inputClassName}`}
          {...rest} 
        />
      </div>
    );
  }
);
