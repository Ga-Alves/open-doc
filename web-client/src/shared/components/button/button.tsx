import type { ButtonHTMLAttributes } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "inline-flex items-center justify-center font-medium transition-all duration-200 hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none active:scale-[0.98]",
  variants: {
    variant: {
      primary: "bg-gray-900 text-white hover:bg-gray-800 active:bg-black shadow-sm",
      secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200/80 active:bg-gray-300",
      outline: "border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 active:bg-red-200",
    },
    size: {
      sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
      md: "px-4 py-2 text-sm rounded-xl gap-2",
      lg: "px-6 py-3 text-base rounded-xl gap-2",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>;

export default function Button({ children, variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}