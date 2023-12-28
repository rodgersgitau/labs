import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/lib/utils";

interface SlidesProps {
  className?: string;
  contentStyle?: string;
  direction?: "horizontal" | "vertical";
  items?: { title: string; image?: string }[];
  itemStyle?: string;
}

export default function Slides({
  className,
  contentStyle,
  direction = "horizontal",
  items,
  itemStyle,
}: SlidesProps) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      orientation={direction}
      className={cn("w-full h-full mx-auto relative", className)}
    >
      <CarouselContent>
        {items?.map((item, idx) => (
          <CarouselItem
            key={`slides-${idx}`}
            className={cn("w-full", itemStyle)}
          >
            <Card>
              <CardContent
                className={cn(
                  "flex items-center justify-center ",
                  contentStyle
                )}
              >
                <span className="text-4xl font-semibold">{idx + 1}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute translate-x-1/2 left-1/2 -bottom-[8%]">
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
}
