import type { TextareaHTMLAttributes } from "react";
import { tv } from "tailwind-variants";

const textareaStyle = tv({
  base: "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 focus:bg-white focus:ring-2 focus:ring-gray-900/10 transition-all duration-200 text-base resize-y min-h-[160px]",
});

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({ label, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {label}
        </label>
      )}
      <textarea className={textareaStyle({ className })} {...props} />
    </div>
  );
}