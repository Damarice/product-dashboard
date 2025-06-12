"use client";

import { useEffect, useState } from "react";
import { Category, Product } from "@/types/product";
import ShopFilters from "./shopFilters";
import ProductDetail from "./productDetail";

interface ShopPageProps {
  categories: Category[];
}

export default function ShopPage({ categories }: ShopPageProps) {
  const [filters, setFilters] = useState({});
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const limit = 12;

  const offset = (currentPage - 1) * limit;

  const fetchProducts = async (page = 1, category?: string) => {
    const limit = 12;
    const skip = (page - 1) * limit;

    try {
      let res;

      if (category) {
        // Fetch products by category
        res = await fetch(
          `${process.env.API_URL}/products/category/${category}`
        );
        const data = await res.json();

        // Manually slice since category endpoint returns all at once
        const paginated = data.products.slice(skip, skip + limit);
        setProducts(paginated);
        setTotalProducts(data.products.length);
      } else {
        // Fetch paginated products normally
        const res = await fetch(
          `${process.env.API_URL}/products?limit=${limit}&skip=${skip}`
        );
        const data = await res.json();
        setProducts(data.products);
        setTotalProducts(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);
  const handleFilterByCategory = (categoryName: string) => {
    setFilters({ category: categoryName });
    setCurrentPage(1); // Reset to first page
    fetchProducts(1, categoryName); // Call with category
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setFilteredProducts(products);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered);
  };
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handlePageChange = (page: number) => setCurrentPage(page);

  const renderPaginationButtons = () => {
    const totalPages = Math.ceil(totalProducts / limit);
    const buttons = [];

    const addButton = (page: number) => {
      const isActive = page === currentPage;
      return (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-10 h-10 mx-1 flex items-center justify-center rounded-full transition-all duration-300 border 
            ${
              isActive
                ? "bg-blue-600 text-white shadow-md"
                : "bg-[#f5f5dc] text-gray-800 hover:bg-[#e8e8c9]"
            }`}
        >
          {page}
        </button>
      );
    };

    const addEllipsis = (key: string) => (
      <span
        key={key}
        className="w-10 h-10 mx-1 flex items-center justify-center text-gray-500"
      >
        ...
      </span>
    );

    if (totalPages <= 7) {
      // Show all pages if few
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(addButton(i));
      }
    } else {
      // Always show first page
      buttons.push(addButton(1));

      // Show ellipsis if currentPage > 4
      if (currentPage > 4) {
        buttons.push(addEllipsis("start"));
      }

      // Show range around currentPage
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        buttons.push(addButton(i));
      }

      // Show ellipsis if currentPage < totalPages - 3
      if (currentPage < totalPages - 3) {
        buttons.push(addEllipsis("end"));
      }

      // Always show last page
      buttons.push(addButton(totalPages));
    }

    return buttons;
  };

  return (
    <div className="container dark:text-white ">
      <div className="row dark:text-white ">
        <ShopFilters
          categories={categories}
          handleFilterByCategory={handleFilterByCategory}
          products={products}
          searchQuery={searchQuery}
          onSearch={handleSearch}
        />

        <div className="col-lg-9">
          <div>
            <p className="text-gray-700 dark:text-gray-400">
              Showing {offset + 1}–{Math.min(offset + limit, totalProducts)} of{" "}
              {totalProducts} results
            </p>
          </div>
          <div className="row dark:text-white  ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductDetail key={product.id} product={product} />
              ))
            ) : (
              <p className="text-gray-700 dark:text-gray-400">
                No products found.
              </p>
            )}
          </div>
          <div className="product__pagination flex justify-center mt-4">
            {renderPaginationButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}
