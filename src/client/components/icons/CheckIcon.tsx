import type { IconProps } from "./Icon";
import Icon from "./Icon.tsx";

export default function CheckIcon({ size, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M5 13l4 4L19 7"
      />
    </Icon>
  );
}
