import { Fragment, useState } from "react";

import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import Link, { type LinkProps } from "@/components/Link";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 mr-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <svg
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
          >
            <path
              d="M3 5H11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 12H16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M3 19H21"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
          <span className="ml-2 uppercase">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="w-36" />
          <span className="font-bold sr-only">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col gap-8">
            <MobileLink
              href="/effects"
              onOpenChange={setOpen}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/effects" ? "text-primary" : "text-primary/60"
              )}
            >
              Effects
            </MobileLink>
            <MobileLink
              href="/games"
              onOpenChange={setOpen}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/games" ? "text-primary" : "text-primary/60"
              )}
            >
              Games
            </MobileLink>
            <MobileLink
              href="/widgets"
              onOpenChange={setOpen}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === "/widgets" ? "text-primary" : "text-primary/60"
              )}
            >
              Widgets
            </MobileLink>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
