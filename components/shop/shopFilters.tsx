"use client";
import { useState } from "react";
import { Category } from "@/types/product";
import CategoryFilterList from "./categoryFilterList";
import { Product } from "@/types/product";

interface ShopFiltersProps {
  categories: Category[];
  handleFilterByCategory: (id: string) => void;
  products: Product[];
  searchQuery: string;
  onSearch: (query: string) => void;
}
export default function ShopFilters({
  categories,
  handleFilterByCategory,
  searchQuery,
  onSearch,
}: ShopFiltersProps) {
  const [categoryActive, setCategoryActive] = useState(false);

  const handleToggle = (event: any) => {
    event.preventDefault();
    setCategoryActive(!categoryActive);
  };

  return (
    <div className="col-lg-3">
      <div className="shop__sidebar">
        <div className="shop__sidebar__search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearch(searchQuery);
            }}
          >
            <input
              type="text"
              placeholder="Search..."
              className="dark:text-white dark:bg-gray-900 dark:border-gray-700 dark:hover:cursor-pointer"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
            <button type="submit">
              <span className="icon_search" />
            </button>
          </form>
        </div>
        <div className=" dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
          <div className="accordion" id="accordionExample">
            <CategoryFilterList
              name="Categories"
              items={categories}
              handleFilterByCategory={handleFilterByCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
