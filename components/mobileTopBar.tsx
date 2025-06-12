"use client";
import { Fragment, useState } from "react";

import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
const navigation = [
  // { name: "Product", href: "#" },
  {
    name: "Shop",
    href: "/shop",
    icon: <ShoppingBagIcon className="size-6" />,
  },
  // {
  //   name: "About Us",
  //   href: "/about",
  //   icon: <UserGroupIcon className="size-6" />,
  // },
  // { name: "Blog", href: "/blog", icon: <NewspaperIcon className="size-6" /> },
  // {
  //   name: "Contact",
  //   href: "/contact",
  //   icon: <EnvelopeIcon className="size-6" />,
  // },
];



interface MobileTopBarProps {
  toast: any;
}

export default function MobileTopBar({
  toast,
}: MobileTopBarProps): JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  return (
    <Fragment>
      <div className="canvas__open">
        <i className="fa fa-bars" onClick={() => setMobileMenuOpen(true)} />
      </div>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="xl:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Infin8</span>
              <Image
                src="/img/logo-ecore.png"
                alt="Logo"
                className="bg-[#16243e] w-auto h-auto"
                width={80}
                quality={100}
                height={80}
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="-mx-3 flex flex-row space-x-2 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                ))}

                <>
                 
                </>

                <>
                 
                </>

               
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </Fragment>
  );
}
