import { Image } from "astro:assets";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import { Icons } from "@/components/Icons";
import Link from "@/components/Link";

interface Props {
  pathname: string;
}

export default function MainNav({ pathname }: Props) {
  return (
    <div className="hidden md:flex md:gap-10">
      <Link href="/" className="flex items-center justify-start !p-0">
        <div className="relative flex items-center w-36 h-14">
          <img
            alt=""
            src="/images/logo.svg"
            className="block object-cover dark:hidden"
          />
          <img
            alt=""
            src="/images/logo-dark.svg"
            className="hidden object-cover dark:block"
          />
        </div>
      </Link>
      <nav className="flex items-center justify-center flex-1 gap-6 text-sm font-semibold">
        <Link
          href="/effects"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/effects" ? "text-primary" : "text-primary/60"
          )}
        >
          Effects
        </Link>
        <Link
          href="/games"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/games" ? "text-primary" : "text-primary/60"
          )}
        >
          Games
        </Link>
        <Link
          href="/widgets"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/widgets" ? "text-primary" : "text-primary/60"
          )}
        >
          Widgets
        </Link>
      </nav>
    </div>
  );
}
