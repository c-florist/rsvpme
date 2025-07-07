import type { PropsWithChildren } from "preact/compat";

export interface IconProps {
  size?: string;
  className?: string;
}
export default function Icon({
  size = "w-5 h-5",
  className = "",
  children,
}: PropsWithChildren<IconProps>) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: I think icons should be screen reader ignored, explained via aria-label or button content.
    <svg
      class={`${size} ${className}`}
      aria-hidden
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {children}
    </svg>
  );
}
