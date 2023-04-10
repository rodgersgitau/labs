import * as React from "react";
import { IconBaseProps, IconType } from "react-icons/lib";

interface ReactIconType extends IconBaseProps {
  icon: IconType;
}

const ReactIcon: React.FC<ReactIconType> = ({
  icon: ElementIcon,
  ...props
}) => {
  return <ElementIcon {...props} />;
};

export default ReactIcon;
