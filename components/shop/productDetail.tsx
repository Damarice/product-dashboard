import { Product } from "@/types/product";
import { maskId } from "@/utils/encryption";
import Image from "next/image";
import Link from "next/link";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const productName = product.title
  const productCategory = product.category
  const encryptedId = maskId(product.id);

  return (
    <Link
      className="col-lg-4 col-md-6 col-sm-6 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer"
      href={`/shop/${product.id}`}
      // href={`/shop/${productCategory}/${encryptedId}/${productName}`}
    >
      <div className="product__item h-[400px] flex flex-col justify-between dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
        <Image
          src={product.images[0]}
          alt={product.title}
          width={300}
          height={400}
          priority
          className="h-64 w-72 object-fit rounded-t-xl dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer"
          quality={100}
        />
        <ul className="product__hover">
            <li>
              <a href="#" className="dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
                <img src="/img/icon/heart.png" alt="" />
              </a>
            </li>
          </ul>

        <div className="product__item__text space-y-4 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
          <h6 className="dark:text-white  dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">{product.title}</h6>
      
     <div className="rating flex space-x-1 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">
  {Array.from({ length: 5 }, (_, index) => {
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating - fullStars >= 0.5;

    if (index < fullStars) {
      return <i key={index} className="fa fa-star text-yellow-400 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer" />;
    } else if (index === fullStars && hasHalfStar) {
      return <i key={index} className="fa fa-star-half-o text-yellow-400 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer" />;
    } else {
      return <i key={index} className="fa fa-star-o text-yellow-400 dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer" />;
    }
  })}
</div>


          <h5 className="dark:text-white dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-white dark:hover:shadow-lg dark:hover:shadow-gray-700 dark:hover:transition-all dark:hover:duration-300 dark:hover:ease-in-out dark:hover:cursor-pointer">$ {product.price}</h5>
         
        </div>
      </div>
    </Link>
  );
}
