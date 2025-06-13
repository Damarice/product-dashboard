
```markdown
# 🛍️ Product Dashboard - Frontend Developer Assessment

A modern, responsive product dashboard built with **Next.js (App Router)**, **Tailwind CSS**, **TypeScript**, and **React Query**. This project showcases clean architecture, component-based design, and practical frontend engineering using a public product API.

---

## 🧱 Tech Stack

- **Next.js 13+ (App Router)**
- **TypeScript**
- **Tailwind CSS**
- **React Query** – For data fetching and caching
- **Public API**: [https://dummyjson.com/products](https://dummyjson.com/products)

---

## 📦 Features

- **Product Listing Page**  
  - Displays products in a responsive grid layout  
  - Each card includes product image, title, price, and rating

- **Search & Filter**  
  - Real-time search by product title  
  - Category-based filtering using a dropdown

- **Product Details Page**  
  - Dynamic routing to show more info about each product  
  - Uses `/products/:id` endpoint

- **User Experience Enhancements**  
  - Loading skeletons and spinners  
  - Error handling with helpful messages

- **Optional**: Dark mode toggle (can be added as an enhancement)

---

## 📁 Folder Structure

```

/app
├── layout.tsx             # App-wide layout wrapper
├── page.tsx               # Product listing page
└── product/
└── \[id]/page.tsx      # Dynamic route for product details

/components
├── Layout.tsx
├── ProductCard.tsx
├── ProductGrid.tsx
├── SearchBar.tsx
└── CategoryFilter.tsx

/hooks
└── useProducts.ts         # Custom hook for data fetching

/styles
└── globals.css            # Tailwind and global styles

````

---

## 🛠️ Getting Started Locally

1. **Clone the Repository**

```bash
git clone https://github.com/Damarice/product-dashboard.git
cd product-dashboard
````

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Development Server**

```bash
npm run dev
```

4. Open `http://localhost:3000` in your browser to see the dashboard.

---

## 🧠 Architecture & Design Decisions

* **Modular Design**: UI is broken into atomic reusable components.
* **React Query**: Used for efficient data fetching with built-in caching, loading, and error states.
* **Client-Side Filtering**: Search and category filters run on the client for immediate feedback.
* **Responsive Design**: Tailwind CSS utility classes used for mobile-first responsiveness.

---

## 📌 Improvements & Future Enhancements

* Add pagination or infinite scroll
* Implement dark mode toggle with persisted theme
* Add accessibility improvements (ARIA, keyboard support)
* Write unit tests for components and hooks
