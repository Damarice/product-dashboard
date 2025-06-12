"use client";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link"; // Import Next.js Link component
import MobileTopBar from "./mobileTopBar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Topbar: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [isSystemDark, setIsSystemDark] = useState(false);

  // Load saved theme and system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsSystemDark(systemDark);

    if (savedTheme === "dark") {
      setIsDark(true);
    } else if (savedTheme === "light") {
      setIsDark(false);
    } else {
      setIsDark(systemDark);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        rtl={false}
        draggable
        theme="light"
        transition={Bounce}
      />
      <div className="offcanvas-menu-overlay" />
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
          <div className="offcanvas__links">{/*  @ts-ignore */}</div>
          <div className="offcanvas__top__hover"></div>
        </div>

        <div className="offcanvas__nav__option">
          <></>
        </div>
        <div id="mobile-menu-wrap" />
      </div>

      <header className="header dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
        <div className="container">
          <div className="row justify-center items-center">
            <div className="col-lg-3 col-md-3 items-center justify-start md:justify-center flex">
              <div className="flex items-center justify-center py-2">
                <Link href="/">
                  <Image
                    src="/img/logo-ecore.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-16 dark:bg-white "
                    quality={100}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 dark:text-white">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className="dark:text-white">
                    <Link href="/shop" className="dark:text-white">
                      Shop
                    </Link>
                  </li>
                  <li className="dark:text-white">
                    <button
                      onClick={() => {
                        setIsDark(!isDark);
                        if (isDark) {
                          localStorage.setItem("theme", "light");
                        } else {
                          localStorage.setItem("theme", "dark");
                        }
                      }}
                      className=" right-4 z-50 p-2 px-4 rounded-lg transition-all duration-300 
                 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white 
                 hover:bg-gray-200 dark:hover:bg-gray-700 shadow-lg 
                 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{isDark ? "☀️" : "🌙"}</span>
                        <span className="font-medium">
                          {isDark ? "Light Mode" : "Dark Mode"}
                        </span>
                      </div>
                    </button>
                  </li>

                  {/* <ToggleDarkMode /> */}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3 col-md-3">
              {/* <div className="header__nav__option items-center justify-center flex">
                <>
                  <Link href="/wishlist">
                    <Image
                      src="/img/icon/heart.png"
                      alt="Wishlist"
                      width={20}
                      height={20}
                      className="w-auto h-6"
                    />
                  </Link>

                  <Link href="/shopping-cart">
                    <Image
                      src="/img/icon/cart.png"
                      alt="Cart"
                      width={20}
                      height={20}
                      className="w-auto h-6"
                    />

                    <span>0</span>
                  </Link>
                  <Link href="/shopping-cart">
                    <div className="price">$0.00</div>
                  </Link>
                  <Suspense
                    fallback={
                      <div className="canvas__open">
                        <i className="fa fa-bars" />
                      </div>
                    }
                  ></Suspense>
                </>

                <Suspense
                  fallback={
                    <div className="canvas__open">
                      <i className="fa fa-bars" />
                    </div>
                  }
                ></Suspense>
              </div> */}
            </div>
          </div>
          <Suspense
            fallback={
              <div className="canvas__open">
                <i className="fa fa-bars" />
              </div>
            }
          >
            <MobileTopBar toast={toast} />
          </Suspense>
        </div>
      </header>
    </Fragment>
  );
};

export default Topbar;
