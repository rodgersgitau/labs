import { cn } from '@/lib/utils';

import type { ReactNode } from "react";

interface BackdropProps {
  children?: ReactNode;
  className?: string;
  contentStyle?: string;
}

export default function Backdrop({
  children,
  className,
  contentStyle,
}: BackdropProps) {
  return (
    <div className={cn("relative w-full bg-background/40", className)}>
      <div className="absolute bg-center bg-no-repeat rounded-lg opacity-20 inset-0 -z-10 bg-backdrop blur h-[80svh]" />
      <div
        className={cn(
          "container flex items-center mx-auto max-w-screen-2xl",
          contentStyle
        )}
      >
        {children}
      </div>
    </div>
  );
}
