"use client";
import { useState } from "react";

interface FilterProps {
  name: string;
  items: any[];
}

export default function FilterList({ name, items }: FilterProps) {
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
                  <a href="#" className="text-black ">
                    {item.name}
                  </a>
                </li>
              ))}
              {/* <li>
                <a href="#" className="text-black ">
                  Men (20)
                </a>
              </li>
              <li>
                <a href="#">Women (20)</a>
              </li>
              <li>
                <a href="#">Bags (20)</a>
              </li>
              <li>
                <a href="#">Clothing (20)</a>
              </li>
              <li>
                <a href="#">Shoes (20)</a>
              </li>
              <li>
                <a href="#">Accessories (20)</a>
              </li>
              <li>
                <a href="#">Kids (20)</a>
              </li>
              <li>
                <a href="#">Kids (20)</a>
              </li>
              <li>
                <a href="#">Kids (21)</a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
