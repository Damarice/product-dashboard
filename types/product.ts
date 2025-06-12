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

export interface Cart {
  total_amount: number;
  quantity: number;
  color: string;
  id: string;
  product: Product;
  created_at: string;
  updated_at: string;
}

export interface WishList {
  id: string;
  product: Product;
  created_at: string;
  updated_at: string;
}

export interface OrderItems {
  id: string;
  product: Product;
  quantity: number;
  total_price: number;
  color: string;
  size: string;
  order_status: string;
  tracking_number: string;
  courier: string;
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  total_price: number;
  first_name: string;
  last_name: string;
  payment_status: string;
  shipping_address: string;
  order_number: string;
  city: string;
  state: string;
  zip_code: string;
  order_status: string;
  orderItems: OrderItems[];
  created_at: string;
  updated_at: string;
}
