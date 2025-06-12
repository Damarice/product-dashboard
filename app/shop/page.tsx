//shop
// import Topbar from "@/components/topbar";

import { Fragment } from "react";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShopPage from "@/components/shop/shopPage";
import { Category } from "@/types/product";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Explore our wide range of products",
};


const hardcodedCategories: Category[] = [
  {
    id: "1",
    category_name: "groceries",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    category_name: "furniture",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    category_name: "fragrances",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    category_name: "beauty",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];
export default async function Shop() {
  const categories: Category[] = hardcodedCategories;
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
      {/* Breadcrumb Section Begin */}
      <section className="breadcrumb-option dark:text-white dark:bg-gray-600">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text ">
                <h4>Shop</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>Shop</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Section End */}
      {/* Shop Section Begin */}
      <section className="dark:text-white dark:bg-gray-800 dark:border-gray-700  py-4">

     
          <ShopPage categories={categories} />
       
      </section>
      {/* Shop Section End */}
    </Fragment>
  );
}
