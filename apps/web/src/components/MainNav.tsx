import { Image } from '@/components/ui/image';
import Link from '@/components/ui/link';
import { siteConfig } from '@/config';
import { cn } from '@/lib/utils';

interface Props {
  pathname: string;
}

export default function MainNav({ pathname }: Props) {
  return (
    <div className="relative z-50 items-center hidden w-full gap-10 py-4 md:flex">
      <Link
        href="/"
        className="relative flex items-center w-24 dark:hidden h-14"
      >
        <Image
          ratio={96 / 56}
          src="/images/logo.svg"
          className="object-cover w-full h-full"
        />
      </Link>

      <Link
        href="/"
        className="relative items-center hidden w-24 dark:flex h-14"
      >
        <Image
          ratio={96 / 56}
          src="/images/logo-dark.svg"
          className="object-cover w-full h-full"
        />
      </Link>

      <nav className="flex items-center justify-center flex-1 gap-10">
        {siteConfig.navLinks.map((link) => (
          <Link
            href={link.path}
            key={`link-${link.path}`}
            className={cn(
              "font-sans font-semibold transition-colors hover:text-foreground/80",
              pathname === link.path ? "text-primary" : "text-primary/60"
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
