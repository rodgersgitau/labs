import Image from "@/components/ui/image";
import Link from "@/components/ui/link";

export default function Logo() {
  return (
    <div className="flex items-center justify-start">
      <Link
        href="/"
        className="relative flex items-center w-24 dark:hidden h-14"
      >
        <Image
          ratio={96 / 56}
          alt="gitau labs logo"
          src="/images/logo.svg"
          className="object-cover w-full h-full"
        />
        <span className="sr-only">Gitau Labs Logo</span>
      </Link>
      <Link
        href="/"
        className="relative items-center hidden w-24 dark:flex h-14"
      >
        <Image
          ratio={96 / 56}
          alt="gitau labs logo"
          src="/images/logo-dark.svg"
          className="object-cover w-full h-full"
        />
        <span className="sr-only">Gitau Labs Logo</span>
      </Link>
    </div>
  );
}
