```markdown
# 🛍 Product Dashboard - Frontend Developer Assessment

A modern, responsive product dashboard built with **Next.js (App Router)**, **Tailwind CSS**, **TypeScript**, and **React Query**. This project allows users to browse, search, and filter products from a public API. It also supports a user-friendly **dark mode toggle** for an enhanced visual experience.

---

## 🧱 Tech Stack

- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Query** – For data fetching and caching
- **Public API**: [https://dummyjson.com/products](https://dummyjson.com/products)

---

## 📦 Features

- **🛍 Product Listing Page**  
  - Displays products in a responsive grid layout  
  - Each card includes product image, title, price, and rating

- **🔍 Search & Filter**  
  - Real-time search by product title  
  - Category filtering using a dropdown

- **📄 Product Details Page**  
  - Dynamic routing to display detailed product information  
  - Uses `/products/:id` endpoint

- **💡 Dark Mode**  
  - Toggle between light and dark themes  
  - Preference persists across sessions

- **⏳ Loading & Error States**  
  - Skeleton loaders/spinners during fetch  
  - Meaningful error messages on failure

---

## 📁 Folder Structure

```

components/
└── shop/
├── categoryFilterlist.tsx
├── ImageTabs.tsx
├── ProductDetail.tsx
├── ShopAction.tsx
├── ShopFilters.tsx
├── Shoppage.tsx
├── darkmode.tsx
├── footer.tsx
├── topbar.tsx
├── mobileTopBar.tsx
├── loading.tsx

app/
└── shop/
├── page.tsx
└── \[...slug]/
└── page.tsx
├── layout.tsx
├── global.css
├── page.tsx

types/
└── product.ts

````

---

## 🛠 Getting Started Locally

1. **Clone the Repository**
```bash
git clone https://github.com/Damarice/product-dashboard.git
cd product-dashboard
````

2. **Install Dependencies**

```bash
npm install
```

3. **Start the Development Server**

```bash
npm run dev
```

4. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 Architecture & Design Decisions

* **Dark Mode**: Managed using React context and Tailwind's `dark:` utility classes with class strategy.
* **Component-Based Architecture**: Each UI section is modular and reusable.
* **React Query**: Chosen for its powerful caching, loading, and error management.
* **Tailwind CSS**: Used for consistent, scalable, and responsive design.

---