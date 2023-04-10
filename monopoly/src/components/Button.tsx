import { FC, useMemo } from "react";
import { IconType } from "react-icons/lib";

import ReactIcon from "./ReactIcon";

export interface ButtonProps {
  icon: IconType;
  color?: string;
  btnClass?: string;
  iconClass: string;
}

export const Button: FC<ButtonProps> = ({
  icon,
  btnClass,
  iconClass,
  color = "primary",
}) => {
  const styles = useMemo(() => {
    return {
      wrapper: `btn btn-xl bg-${color} rounded w-24 h-24 rounded-full`,
      icon: "text-current text-lg lg:text-xl",
    };
  }, [color]);

  return (
    <button className={btnClass ? btnClass : styles.wrapper}>
      <ReactIcon icon={icon} className={iconClass ? iconClass : styles.icon} />
    </button>
  );
};
