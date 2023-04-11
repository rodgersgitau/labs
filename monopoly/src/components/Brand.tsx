import { FC } from "react";

export interface BrandProps {
  description?: string;
}

export const Brand: FC<BrandProps> = ({ description }) => {
  return (
    <section className="flex flex-col w-full gap-8 h-max">
      <div className="w-full h-max">
        <img
          alt="monopoly logo"
          src="/images/logo.png"
          className="block object-cover w-full h-auto bg-white"
        />
      </div>
      {description && (
        <div className="flex items-center w-full">
          <small className="font-sans font-semibold capitalize text-neutral-500">
            {description}
          </small>
        </div>
      )}
    </section>
  );
};

export default Brand;
