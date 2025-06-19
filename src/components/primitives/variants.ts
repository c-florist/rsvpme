/**
 * @module
 *
 * Shared styles across a lot of ui elements.
 * Best practice:
 * - No base styles, everything applied via (sane) defaultVariants.
 * - Try to tailwind select
 */
import { type VariantProps, cva } from "class-variance-authority";

export const sizeVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs min-h-6 px-2",
      sm: "text-sm min-h-8 px-2.5",
      md: "text-base min-h-10 px-3",
      lg: "text-lg min-h-12 px-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
export type SizeProps = VariantProps<typeof sizeVariants>;

export const interactiveVariants = cva("", {
  variants: {
    radius: {
      md: "rounded-md",
    },
    intent: {
      primary:
        "[--theme:var(--color-blue-600)] [--theme-hi:var(--color-blue-500)] [--theme-lo:var(--color-blue-800)]",
      secondary:
        "[--theme:var(--color-gray-600)] [--theme-hi:var(--color-gray-500)] [--theme-lo:var(--color-gray-800)]",
      success:
        "[--theme:var(--color-green-600)] [--theme-hi:var(--color-green-500)] [--theme-lo:var(--color-green-800)]",
      warning:
        "[--theme:var(--color-yellow-600)] [--theme-hi:var(--color-yellow-500)] [--theme-lo:var(--color-yellow-800)]",
      danger:
        "[--theme:var(--color-red-600)] [--theme-hi:var(--color-red-500)] [--theme-lo:var(--color-red-800)]",
    },
    variant: {
      solid:
        "bg-[var(--theme)] hover:bg-[var(--theme-hi)] disabled:bg-[var(--theme)]/50 disabled:hover:bg-[var(--theme-hi)]/50 text-white placeholder:text-gray-400",
      outline:
        "outline outline-2 hover:outline-3 outline-[var(--theme)] disabled:outline-[var(--theme)]/50 hover:outline-[var(--theme-hi)] bg-transparent text-[var(--theme-lo)] disabled:text-[var(--theme)]/50 placeholder:text-gray-400 hover:bg-[var(--theme-hi)]/5",
      text: "text-[var(--theme-lo)] hover:text-[var(--theme-lo)] disabled:text-[var(--theme-lo)]/50 bg-transparent placeholder:text-gray-400 hover:bg-[var(--theme-hi)]/5",
    },
  },
  defaultVariants: {
    intent: "secondary",
    radius: "md",
    variant: "solid",
  },
});
export type InteractiveProps = VariantProps<typeof interactiveVariants>;
