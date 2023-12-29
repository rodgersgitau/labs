import { Fragment, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import { Image } from '@/components/ui/image';
import Link, { LinkProps, type } from '@/components/ui/link';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="link"
          className="px-0 space-x-4 text-base w-max hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="w-8 h-8" />
          <span className="uppercase">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="relative flex items-center w-24 dark:hidden h-14"
        >
          <Image
            ratio={96 / 56}
            src="/images/logo.svg"
            className="object-cover w-full h-full"
          />
        </MobileLink>

        <MobileLink
          href="/"
          className="relative items-center hidden w-24 dark:flex h-14"
        >
          <Image
            ratio={96 / 56}
            src="/images/logo-dark.svg"
            className="object-cover w-full h-full"
          />
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col gap-8">
            {siteConfig.navLinks.map((link) => (
              <MobileLink
                href={link.path}
                key={`link-${link.path}`}
                className={cn(
                  "font-sans font-semibold transition-colors hover:text-foreground/80",
                  pathname === link.path ? "text-primary" : "text-primary/60"
                )}
              >
                {link.label}
              </MobileLink>
            ))}
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
