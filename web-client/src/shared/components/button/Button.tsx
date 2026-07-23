import type { ReactNode } from "react";
import { tv } from "tailwind-variants";

type ButtonProps = {
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
};

export default function Button(props: ButtonProps) {
  const { onClick, children, variant = 'primary', size = 'md' } = props;

  const button = tv({
    base: "hover:cursor-pointer transition-all duration-200 font-medium w-fit",
    variants: {
      color: {
        primary: "bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
      },
      size: {
        sm: "px-3 py-1.5 text-sm rounded-lg",
        md: "px-5 py-2.5 text-base rounded-xl",
        lg: "px-7 py-3.5 text-lg rounded-2xl",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed pointer-events-none",
      }
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    }
  });

  return (
    <button
      className={button({ color: variant, size })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}