import type { InputHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const inputStyle = tv({
  base: "w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all duration-200 text-sm",
  variants: {
    hasError: {
      true: "border-red-500 focus:border-red-500 focus:ring-red-500/10",
    },
  },
});

type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyle> & {
    label?: string;
    error?: string;
  };

export default function Input({ label, error, hasError, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </label>
      )}
      <input className={inputStyle({ hasError: hasError || !!error, className })} {...props} />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}