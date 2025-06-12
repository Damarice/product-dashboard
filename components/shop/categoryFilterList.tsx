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
      <div className="card-heading">
        <a
          data-toggle="collapse"
          data-target="#collapseOne"
          onClick={handleToggle}
        >
          {name}
        </a>
      </div>
      <div
        id="collapseOne"
        className={` ${active ? "visible" : " collapse"}`}
        data-parent="#accordionExample"
      >
        <div className="card-body ">
          <div className="shop__sidebar__categories ">
            <ul className=" overflow-auto">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    onClick={() => {
                      handleFilterByCategory(item.category_name);
                    }}
                    className="text-black "
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
