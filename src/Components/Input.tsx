import { forwardRef, type ElementType } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  icon?: ElementType;
  className?: string;
  iconClassName?: string;
  type?: string;
  inputClassName?: string;
  title?: string;
  error?: string; // Nova prop para erro
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      placeholder,
      icon: Icon,
      className,
      iconClassName,
      inputClassName,
      title,
      error,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`relative ml-4 mt-2 ${className}`}>
        {Icon && <Icon className={iconClassName} />}

        <label className="absolute -top-6 left-0 text-sm text-zinc-600 font-medium">
          {title}
        </label>

        <input
          ref={ref}
          placeholder={placeholder}
          className={`w-full border border-zinc-300 h-10 rounded-xl pl-3 pr-3 py-2 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none ${
            error ? "border-red-500" : ""
          } ${inputClassName}`}
          {...rest}
        />

        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);
