import MainNav from '@/components/MainNav';
import { MobileNav } from '@/components/MobileNav';
import ModeToggle from '@/components/ModeToggle';
import { buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/ui/icons';
import Link from '@/components/ui/link';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

interface HeaderProps {
  pathname: string;
}

const Header = ({ pathname }: HeaderProps) => {
  return (
    <header className="absolute inset-0 z-50 border-b h-max border-current/70 dark:border-border/40">
      <div className="container flex items-center justify-between mx-auto min-h-16 max-w-screen-2xl">
        <div className="grid items-center flex-1">
          <MainNav pathname={pathname} />
          <MobileNav pathname={pathname} />
        </div>

        <div className="flex items-center gap-4 ml-auto w-max">
          <Link href={siteConfig.links.github} target="_blank">
            <div
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                }),
                "border-[0.5px] border-border"
              )}
            >
              <Icons.gitHub className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link href={siteConfig.links.twitter} target="_blank">
            <div
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost",
                }),
                "border-[0.5px] border-border"
              )}
            >
              <Icons.twitter className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
