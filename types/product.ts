export interface Category {
  category_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface SalesCategory {
  sales_category_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}
export interface Branding {
  brand_name: string;
  id: string;
  created_at: string;
  updated_at: string;
}
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  images: string[];
  rating: number;
  title: string;
  tags: string[];
  colors: string[];
  sizes: number[];
  sales_category: SalesCategory;
  branding: Branding;
  condition: string;
  category: Category;
  created_at: string;
  updated_at: string;
}

