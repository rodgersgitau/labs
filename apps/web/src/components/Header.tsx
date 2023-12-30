import MainNav from "@/components/MainNav";
import MobileNav from "@/components/MobileNav";
import ModeToggle from "@/components/ModeToggle";

import Logo from "@/components/Logo";

interface HeaderProps {
  pathname: string;
}

export default function Header({ pathname }: HeaderProps) {
  return (
    <header className="sticky left-0 right-0 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between mx-auto max-w-screen-2xl">
        <div className="flex items-center flex-1 gap-10 py-4">
          <MobileNav pathname={pathname} />
          <Logo />
          <MainNav pathname={pathname} />
        </div>

        <div className="flex items-center gap-4 ml-auto w-max">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
