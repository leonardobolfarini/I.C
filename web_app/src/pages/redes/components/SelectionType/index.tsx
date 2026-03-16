import { IconProps } from "@phosphor-icons/react";
import { SelectionTypeContainer } from "./styles";

interface SelectionTypeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  icon: React.ComponentType<IconProps>;
  isActive: boolean;
}

export function SelectionType({
  children,
  icon: Icon,
  isActive = false,
  ...rest
}: SelectionTypeProps) {
  return (
    <SelectionTypeContainer isActive={isActive} {...rest}>
      <Icon size={20} weight="bold" />
      <p>{children}</p>
    </SelectionTypeContainer>
  );
}
