import { FC } from "react";
import { Link } from "react-router-dom";

export interface BrandProps {}

export const Brand: FC<BrandProps> = () => {
  return (
    <Link to="/" className="flex flex-col w-full h-full gap-8">
      <div className="w-full h-full p-2 rounded-lg bg-slate-100">
        <img
          alt="monopoly logo"
          src="/images/logo.png"
          className="object-cover w-full h-auto rounded bg-inherit"
        />
      </div>
    </Link>
  );
};

export default Brand;
