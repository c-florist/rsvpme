import type { IconProps } from "./Icon";
import Icon from "./Icon.tsx";

export default function ArrowLeftIcon({ size, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </Icon>
  );
}
