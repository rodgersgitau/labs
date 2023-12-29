import type { AnchorHTMLAttributes, ReactNode } from "react";

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: ReactNode;
}

const Link = ({ children, ...props }: LinkProps) => {
  return <a {...props}>{children ? <>{children}</> : props?.title}</a>;
};

export default Link;
