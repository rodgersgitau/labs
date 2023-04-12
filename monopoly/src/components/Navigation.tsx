import { FC, useEffect } from "react";
import { FaDiscord, FaGoogle, FaUser } from "react-icons/fa";
import { FiLogIn, FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

// hooks
import { useAuth } from "../hooks";
import { Brand } from "./Brand";
import { Dropdown } from "./Dropdown";

export interface NavigationProps {}

export const Navigation: FC<NavigationProps> = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      console.log({ user: auth.user });
    }
  }, [auth.user]);

  return (
    <nav className="relative z-50 w-full h-full min-h-fit">
      <div className="flex items-center justify-between lg:p-4 md:flex-row">
        <div className="w-56">
          <Brand />
        </div>
        <div className="flex items-center gap-8 justify-self-end">
          <Link to="/store" className="btn btn-link text-white !no-underline">
            <div className="flex items-center gap-4">
              <FiShoppingCart />
              <span>Store</span>
            </div>
          </Link>
          <Dropdown
            btnText="SignIn"
            btnIcon={<FiLogIn />}
            items={[
              {
                btnText: "Email",
                btnIcon: <FaUser />,
                color: "bg-orange-900",
                onClick: () => navigate("/login"),
              },
              {
                btnText: "Google",
                btnIcon: <FaGoogle />,
                color: "bg-blue-900",
                onClick: auth.signInWithGoogle,
              },
              {
                btnText: "Discord",
                btnIcon: <FaDiscord />,
                color: "bg-indigo-900",
                onClick: auth.signInWithDiscord,
              },
            ]}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
