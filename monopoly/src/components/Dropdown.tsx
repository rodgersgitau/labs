import { FC, Fragment, ReactNode, useCallback } from "react";
import { AiOutlineShop } from "react-icons/ai";
import { FaChartPie, FaSmile } from "react-icons/fa";

import { Menu, Transition } from "@headlessui/react";

export interface DropdownLinkType {
  color?: string;
  btnText: string;
  btnIcon: ReactNode;
  onClick?: () => void;
}

export interface DropdownProps {
  btnText: string;
  btnIcon: ReactNode;
  items?: DropdownLinkType[];
}

export const Dropdown: FC<DropdownProps> = ({ btnText, btnIcon, items }) => {
  const getLinkstyles = useCallback((color: string, active: boolean) => {
    const bgColor = active
      ? `${color} !bg-opacity-100 hover:${color} hover:!bg-opacity-100 `
      : `${color} !bg-opacity-75 hover:${color} hover:!bg-opacity-100 `;
    return {
      baseLink: `btn btn-ghost btn-group-horizontal hover:!btn-primary rounded-lg shadow-lg ${bgColor} text-white`,
    };
  }, []);

  return (
    <Menu as="div" className="relative z-50 font-cursive">
      <Menu.Button className="btn btn-link text-white !no-underline">
        <div className="flex items-center gap-4 text-sm">
          {btnIcon}
          <span>{btnText}</span>
        </div>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2.5 origin-top-right rounded-lg shadow-slick w-72 bg-secondary/90 ">
          <div className="flex flex-col items-center w-full gap-8 px-4 py-6">
            <div className="flex flex-col w-full gap-4 text-center">
              <h4 className="my-4 text-sm font-semibold text-white uppercase">
                Choose a way to log in:
              </h4>
              {items?.map((link, idx) => (
                <Menu.Item key={`link-item-${Math.random() * idx}`}>
                  {({ active }) => {
                    const color = link.color || "!bg-accent";
                    const { baseLink } = getLinkstyles(color, active);
                    return (
                      <button onClick={link.onClick} className={`${baseLink}`}>
                        <div className="flex items-center gap-4">
                          {link.btnIcon}
                          <span className="w-[10ch] text-left text-sm capitalize font-cursive">
                            {link.btnText}
                          </span>
                        </div>
                      </button>
                    );
                  }}
                </Menu.Item>
              ))}
            </div>
            <div className="flex flex-col gap-8 text-center">
              <h4 className="text-sm font-semibold text-white uppercase">
                Why login?
              </h4>
              <div className="grid grid-cols-3 gap-2 divide-x-[1px] divide-white text-slate-100">
                <div className="flex flex-col gap-4 p-2 text-center place-items-center">
                  <FaSmile className="text-lg text-slate-200" />
                  <span className="w-full text-xs leading-snug text-center">
                    Unique Identity
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-2 text-center place-items-center">
                  <FaChartPie className="text-lg text-slate-200" />
                  <span className="w-full text-xs leading-snug text-center">
                    Track Statistics
                  </span>
                </div>
                <div className="flex flex-col gap-4 p-2 text-center place-items-center">
                  <AiOutlineShop className="text-lg text-slate-200" />
                  <span className="w-full text-xs leading-snug text-center">
                    Special Features
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
