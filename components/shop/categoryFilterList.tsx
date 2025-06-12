"use client";
import { Category } from "@/types/product";
import { useState } from "react";

interface FilterProps {
  name: string;
  items: Category[];
  handleFilterByCategory: (id: string) => void;
}

export default function CategoryFilterList({
  name,
  items,
  handleFilterByCategory,
}: FilterProps) {
  const [active, setActive] = useState(false);

  const handleToggle = (event: any) => {
    event.preventDefault();
    setActive(!active);
  };

  return (
    <div className="card">
      <a
        className=" dark:text-white dark:bg-gray-900 dark:border-gray-700  px-2 py-2 flex justify-between"
        data-toggle="collapse"
        data-target="#collapseOne"
        onClick={handleToggle}
      >
        <div className="dark:text-white dark:bg-gray-900 dark:border-gray-700 ">
          {name}
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </a>
      <div
        id="collapseOne"
        className={` ${
          active ? "visible" : " collapse"
        } dark:text-white dark:bg-gray-900 dark:border-gray-700 `}
        data-parent="#accordionExample"
      >
        <div className="card-body ">
          <div className=" dark:text-white dark:bg-gray-900 dark:border-gray-700 ">
            <ul className=" overflow-auto dark:text-white dark:bg-gray-900  ">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    onClick={() => {
                      handleFilterByCategory(item.category_name);
                    }}
                    className="dark:text-white dark:bg-gray-900 dark:border-gray-700 capitalize"
                  >
                    {item.category_name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
