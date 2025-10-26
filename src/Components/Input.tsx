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
  error?: string;
  onIconClick?: () => void;
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
      onIconClick,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`relative mt-2 ${className}`}>
        {title && (
          <label className="absolute -top-6 left-0 text-sm text-zinc-600 font-medium">
            {title}
          </label>
        )}

        <input
          ref={ref}
          placeholder={placeholder}
          className={`w-full border border-zinc-300 h-12 rounded pl-3 pr-10 py-2 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${
            error ? "border-red-500" : ""
          } ${inputClassName}`}
          {...rest}
        />

        {Icon && (
          <button
            type="button"
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 ${iconClassName}`}
            onClick={onIconClick}
          >
            <Icon className="w-6 h-6" />
          </button>
        )}

        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);
