import React, { Fragment, Suspense } from "react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link"; // Import Next.js Link component
import MobileTopBar from "./mobileTopBar";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Topbar: React.FC = () => {
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
          <div className="offcanvas__top__hover">
           
          </div>
        </div>

        <div className="offcanvas__nav__option">
         

          <>
          </>
        </div>
        <div id="mobile-menu-wrap" />
        
      </div>

      <header className="header dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
       
        <div className="container">
          <div className="row justify-center items-center">
            <div className="col-lg-3 col-md-3 items-center justify-start md:justify-center flex">
              <div className="flex items-center justify-center">
                <Link href="/">
                  <Image
                    src="/img/logo-ecore.png"
                    alt="Logo"
                    width={100}
                    height={100}
                    className="w-auto h-24"
                    quality={100}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li>
                    <Link href="/shop">Shop</Link>
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
