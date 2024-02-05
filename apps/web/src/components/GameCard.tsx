import { PlayCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";
import Image from "@/components/ui/image";
import Link from "@/components/ui/link";

import { cn, slugify } from "@/lib/utils";
import type { DataType } from "@/data/index";

interface GameCardProps {
  index: number;
  item: DataType;
  className?: string;
}

export default function GameCard({ item, className }: GameCardProps) {
  return (
    <Card
      className={cn(
        "relative mx-auto bg-card/40 w-full border-0 group hover:scale-110 transition",
        className
      )}
    >
      <div
        style={{
          backgroundClip: "padding-box,border-box",
          backgroundOrigin: "border-box",
          border: " 2.25px solid",
          borderImageSlice: 1,
          borderImageSource: "linear-gradient(88.45deg,#c887ff -2.7%,#ffa9a9)",
          clipPath: "inset(0 round 10px)",
        }}
        className="absolute inset-0 transition opacity-0 -z-10 group-hover:opacity-100 group-hover:bg-accent/80"
      />
      <CardHeader>
        <div className="flex items-center w-full h-full gap-4">
          <div className="relative grid items-center w-48 p-2 transition-all group-hover:scale-110">
            <Image
              src={item.image}
              alt={item.name}
              className="object-cover w-full h-full mx-auto rounded !aspect-video"
            />
          </div>

          <div className="grid flex-1 gap-4">
            <p className="text-lg font-black uppercase">{item.name}</p>
            <span className="border-b border-current/90"></span>
            <p className="text-xs font-medium !leading-loose tracking-wide">
              {item.description + "."}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="grid items-center h-14">
        <div className="flex items-center justify-start gap-4">
          {item.link && (
            <Button
              asChild
              variant="outline"
              className="w-full border-current opacity-80 hover:border-0 hover:opacity-100 group-hover:bg-pink-800 group-hover:text-white group-hover:border-0 "
            >
              <Link href={`/games/${slugify(item.name)}`}>
                <PlayCircleIcon className="w-5 h-5 mr-2" />
                Play
              </Link>
            </Button>
          )}
          {item.repository && (
            <Button asChild variant="default" className="w-full">
              <Link target="_blank" href={item.repository}>
                <Icons.gitHub className="w-5 h-5 mr-2" />
                Repo
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

//   name: string;
//   type: "game" | "effect";
//   link?: string;
//   image: string;
//   repository: string;
//   description: string;
