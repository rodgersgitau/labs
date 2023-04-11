import { FC, ReactNode } from "react";

// import { useAuth } from "../hooks";
// import Auth from "../pages/LoginPage";

interface DefaultLayoutProps {
  children?: ReactNode;
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  // const { user, session } = useAuth();
  return (
    <main className="relative z-0 min-h-screen text-white bg-secondary">
      <div className="fixed inset-0 bg-bottom bg-no-repeat bg-hero-pattern">
        <section className="relative z-0 flex items-center w-full min-h-screen">
          {children}
          {/* {!session ? <Auth /> : <>{children} </>} */}
        </section>
      </div>
    </main>
  );
};

export default DefaultLayout;
