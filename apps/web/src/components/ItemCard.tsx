import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

import type { DataType } from "@/data/index";
import type { ImgHTMLAttributes } from "react";

interface ItemCardProps extends ImgHTMLAttributes<HTMLImageElement> {
  index: number;
  item: DataType;
  className?: string;
}

export default function ItemCard({ item, className }: ItemCardProps) {
  return (
    <div className={cn("max-w-sm rounded relative w-full", className)}>
      <div className="relative w-full h-[37vh]">
        <Image src={item.image} alt={item.name} className="rounded-xl" />
      </div>
      <div className="flex flex-col gap-3 py-4">
        <div className="flex items-center justify-between gap-1">
          <h2 className="w-full text-xl font-bold text-white line-clamp-1">
            {item.name}
          </h2>
          <div className="px-2 py-1 rounded-sm bg-primary">
            <p className="text-sm font-bold text-white capitalize">
              {item.type}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

//   name: string;
//   type: "game" | "effect";
//   link?: string;
//   image: string;
//   repository: string;
//   description: string;
