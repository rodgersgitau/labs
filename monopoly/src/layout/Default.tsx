import { FC, ReactNode } from "react";

import { Navigation } from "../components";

interface DefaultLayoutProps {
  children?: ReactNode;
  title?: string;
  subtitle?: string;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <main className="relative z-0 min-h-screen text-white bg-bottom bg-no-repeat bg-primary bg-hero-pattern">
      <div className="relative z-0 flex flex-col items-center w-full min-h-screen p-8">
        <Navigation />
        <section className="bg-primary rounded-lg text-accent shadow-stamp space-y-8 m-auto w-full max-w-sm md:max-w-lg xl:max-w-xl p-6 xl:p-8 min-h-[20rem] ">
          <header className="flex flex-col justify-center w-full gap-8 font-sans">
            {title && (
              <h1 className="text-3xl font-semibold leading-snug uppercase text-accent">
                {title}
              </h1>
            )}
            {subtitle && (
              <h2 className="text-xl font-semibold leading-snug capitalize text-neutral-200">
                {subtitle}
              </h2>
            )}
          </header>
          <main className="w-full text-white">{children}</main>
        </section>
      </div>
    </main>
  );
};

export default DefaultLayout;
