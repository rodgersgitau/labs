import { PlayCircleIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious
} from '@/components/ui/carousel';
import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { cn } from '@/lib/utils';

interface SlidesProps {
  className?: string;
  itemStyle?: string;
  footerStyle?: string;
  contentStyle?: string;
  direction?: "horizontal" | "vertical";
  items?: { title: string; image: string; link: string }[];
}

export default function Slides({
  className,
  contentStyle,
  direction = "horizontal",
  footerStyle,
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
      className={cn("w-full h-full relative", className)}
    >
      <CarouselContent className="bg-transparent">
        {items?.map((item, idx) => (
          <CarouselItem
            key={`slides-${idx}`}
            className={cn("w-full", itemStyle)}
          >
            <Card className="bg-transparent rounded-lg overflow-clip">
              <CardContent
                className={cn(
                  "flex items-center justify-center !border-0 p-6",
                  contentStyle
                )}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  className="object-cover w-full"
                />
              </CardContent>
              <CardFooter
                className={cn(
                  "bg-background/40 backdrop-blur p-4 flex items-center justify-between",
                  footerStyle
                )}
              >
                <h2 className="text-2xl font-semibold">{item.title}</h2>
                <Link
                  title={item.title}
                  href={item.link}
                  className={buttonVariants({
                    variant: "default",
                    className:
                      "flex items-center gap-2 hover:scale-110 transition-all",
                  })}
                >
                  <PlayCircleIcon />
                  <span>Play</span>
                </Link>
              </CardFooter>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious
        variant="ghost"
        className="translate-x-4 bg-background text-foreground left-4"
      />
      <CarouselNext
        variant="ghost"
        className="-translate-x-4 bg-background text-foreground right-4 "
      />
    </Carousel>
  );
}
