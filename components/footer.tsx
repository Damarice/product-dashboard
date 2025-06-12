"use client"; // This marks the component as a Client Component

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Footer: React.FC = () => {
  const [currentYear] = useState<number>(new Date().getFullYear());

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="footer__about">
              <div className="footer__logo">
                <Link href="/">
                  {/* <Image
                    src="/img/logo-ecore.png"
                    alt="Logo"
                    width={500}
                    height={500}
                    quality={100}
                    className="w-auto h-28"
                  /> */}
                </Link>
              </div>
              <p>
                Demo-ecommerce is a leading online store offering a wide range
                of products at competitive prices. We are committed to providing
                our customers with a seamless shopping experience, exceptional
                customer service, and fast shipping. Our mission is to make
                online shopping convenient and enjoyable for everyone.
              </p>
              <a href="#">
                <img src="/img/payment.png" alt="Payment Methods" />
              </a>
            </div>
          </div>
          
          
          {/* <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
            <div className="footer__widget">
              <h6>Newsletter</h6>
              <div className="footer__newsletter">
                <p>
                  Be the first to know about new arrivals, look books, sales &
                  promos!
                </p>
                <form action="#">
                  <input type="text" placeholder="Your email" />
                  <button type="submit">
                    <span className="icon_mail_alt"></span>
                  </button>
                </form>
              </div>
            </div>
          </div> */}
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12   text-center">
            <div className="footer__copyright__text">
              <p>Copyright © {currentYear}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
