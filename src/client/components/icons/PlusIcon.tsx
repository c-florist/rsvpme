import type { IconProps } from "./Icon";
import Icon from "./Icon.tsx";

export default function PlusIcon({ size, className }: IconProps) {
  return (
    <Icon size={size} className={className}>
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 4v16m8-8H4"
      />
    </Icon>
  );
}
