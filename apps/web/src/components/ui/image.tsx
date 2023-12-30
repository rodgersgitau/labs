import type { ImgHTMLAttributes } from "react";
import type { AspectRatioProps } from "@radix-ui/react-aspect-ratio";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { cn } from "@/lib/utils";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  ratio?: AspectRatioProps["ratio"];
}

export default function Image({
  ratio = 16 / 9,
  className,
  ...rest
}: ImageProps) {
  return (
    <AspectRatio
      ratio={ratio}
      className={cn("relative overflow-clip", className)}
    >
      <img {...rest} className={`object-cover w-full aspect-[${ratio}]`} />
    </AspectRatio>
  );
}
