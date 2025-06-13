import { Fragment, Suspense } from "react";
import ImageTabs from "@/components/shop/imageTabs";
import ImageTabsSSR from "@/components/shop/ImageTabsSSR";
import ProductDetail from "@/components/shop/productDetail";
import { Product } from "@/types/product";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorComponent from "@/components/error";
import type { Metadata } from "next";
import axios from "axios";
import ShopAction from "@/components/shop/shopAction";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // const decodedId = decodeMaskedId(params.slug);
  const response = await axios.get(
    `${process.env.API_URL}/products/${params.slug}`
  );
  const product = response.data;

  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: [
        {
          url: product?.images?.[0],
          width: 1200,
          height: 630,
          alt: product?.title,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/${params.slug}`,
    },
  };
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  // const decodedId = decodeMaskedId(params.slug);
  const response = await axios.get(
    `${process.env.API_URL}/products/${params.slug}`
  );
  const selectedProduct = response.data;

  if (!selectedProduct) return <ErrorComponent />;

  return (
    <Fragment>
      <div className="bg-gray-100 dark:bg-gray-900 font-roboto">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          rtl={false}
          draggable
          theme="light"
          transition={Bounce}
        />

        <div className="container mx-auto px-2 py-8">
          <div className="flex flex-wrap -mx-4">
            <ImageTabs image_url={selectedProduct?.images} />

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2 dark:text-white">
                {selectedProduct?.title}
              </h2>

              <div className="mb-4 mt-6">
                <span className="text-2xl font-bold mr-2 dark:text-white">
                  ${selectedProduct?.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400 line-through">
                  $
                  {(
                    selectedProduct?.price /
                    (1 - selectedProduct?.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
              </div>

              <div className="mb-4">
                <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900 px-2 py-1 text-sm font-medium text-blue-700 dark:text-blue-100 ring-1 ring-inset ring-blue-700/10 dark:ring-blue-100/10">
                  Brand: {selectedProduct?.brand}
                </span>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(Math.round(selectedProduct?.rating || 0))].map(
                  (_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6 text-yellow-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )
                )}
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {selectedProduct?.rating?.toFixed(2)}
                </span>
              </div>

              <ShopAction selectedProduct={selectedProduct} toast={toast} />

              <h3 className="text-xl font-semibold mb-2 mt-6 dark:text-white">
                Description:
              </h3>
              <div
                className="text-gray-700 dark:text-gray-400 mb-6 w-full important-font mt-2"
                dangerouslySetInnerHTML={{
                  __html: selectedProduct?.description,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {Array.isArray(selectedProduct?.related) &&
        selectedProduct.related.length > 0 && (
          <section className="related spad">
            <div className="container py-4">
              <div className="row">
                <div className="col-lg-12">
                  <h3 className="related-title dark:text-white">
                    Related Products
                  </h3>
                </div>
              </div>
              <div className="row">
                {selectedProduct.related.map((product: Product) => (
                  <ProductDetail product={product} key={product.id} />
                ))}
              </div>
            </div>
          </section>
        )}
    </Fragment>
  );
}
