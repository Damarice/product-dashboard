"use client";

import { Product } from "@/types/product";
import { Fragment, useState } from "react";
import { gql, useMutation } from "@apollo/client";

interface ShopActionProps {
  selectedProduct: Product;
  toast: any;
}
const ADD_TO_CART = gql`
  mutation Mutation($product: ID!, $quantity: Int!, $color: String) {
    createCart(product: $product, quantity: $quantity, color: $color) {
      id
    }
  }
`;

const ADD_TO_WISHLIST = gql`
  mutation CreateWishList($product: ID!) {
    createWishList(product: $product) {
      id
    }
  }
`;

export default function ShopAction({
  selectedProduct,
  toast,
}: ShopActionProps) {
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(selectedProduct.rating);
  const [isLoading, setIsLoading] = useState(false);
  const [addToCart] = useMutation(ADD_TO_CART);
  const [addToWishList] = useMutation(ADD_TO_WISHLIST);

  const handleAddToCart = () => {
    const id = toast.loading("Adding to cart...");
    setIsLoading(true);
    addToCart({
      variables: {
        product: selectedProduct.id,
        quantity: quantity,
        color: color,
      },
      onCompleted: () => {
        toast.update(id, {
          render: "Added to cart!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setIsLoading(false);
      },
      onError: () => {
        toast.update(id, {
          render: "Failed to add to cart!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        setIsLoading(false);
      },
    });
  };

  const handleAddToWishList = () => {
    if (isLoading) return; // Prevent multiple clicks while loading
    const id = toast.loading("Adding to wishlist...");
    setIsLoading(true);
    addToWishList({
      variables: {
        product: selectedProduct.id,
      },
      onCompleted: () => {
        toast.update(id, {
          render: "Added to wishlist!",
          type: "success",
          isLoading: false,
          autoClose: 5000,
        });
        setIsLoading(false);
      },
      onError: () => {
        toast.update(id, {
          render: "Failed to add to wishlist!",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
        setIsLoading(false);
      },
    });
  };

  return (
    <Fragment>
      <div className="mb-6">
        
      </div>

      <div className="mb-6">
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700 dark:text-white mb-1"
        >
          Quantity:
        </label>
        <input
          type="number"
          id="quantity"
          className="w-12 text-center rounded-md text-gray-700 dark:text-black border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:focus:ring-opacity-50"
          name="quantity"
          min="1"
          value={quantity}
          onChange={(e) => {
            if (parseInt(e.target.value) < 1) {
              setQuantity(1);
              return;
            }

            if (parseInt(e.target.value) > selectedProduct.stock_quantity) {
              setQuantity(selectedProduct.stock_quantity);
              return;
            }

            setQuantity(parseInt(e.target.value));
          }}
          // className="w-12 text-center rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 dark:focus:ring-indigo-800 dark:focus:ring-opacity-50"
        />
      </div>

      <div className="flex space-x-4 mb-6">
        <button
          className="bg-black flex gap-2 items-center text-white dark:text-gray-100 px-6 py-2 rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Add to Cart
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 flex gap-2 items-center  text-gray-800  dark:text-gray-100 px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          onClick={handleAddToWishList}
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Wishlist
        </button>
      </div>
    </Fragment>
  );
}
