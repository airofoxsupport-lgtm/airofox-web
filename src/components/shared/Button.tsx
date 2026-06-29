import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-brand-navy text-white hover:bg-brand-orange shadow-md",
        secondary: "bg-brand-orange text-white hover:opacity-90 shadow-md",
        outline:
          "border border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white",
        x: "bg-green-500 text-white hover:bg-green-600",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export default function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant }), className)} {...props} />
  );
}
