import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  className?: string;
  inputClassName?: string;
  title?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { placeholder, className, inputClassName, title, error, options, ...rest },
    ref
  ) => {
    return (
      <div className={`relative mt-2 ${className}`}>
        {title && (
          <label className="absolute -top-6 left-0 text-sm text-zinc-600 font-medium">
            {title}
          </label>
        )}

        <select
          ref={ref}
          className={`w-full border border-zinc-300 h-12 rounded pl-3 pr-10 py-2 bg-transparent text-zinc-900 placeholder-zinc-700 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none cursor-pointer ${
            error ? "border-red-500" : ""
          } ${inputClassName}`}
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />

        {error && (
          <span className="text-red-500 text-sm mt-1 block">{error}</span>
        )}
      </div>
    );
  }
);
