import Image from "next/image";

export default function ImageTab({ image }: { image: string }) {
  return (
    <div className="product__details__pic__item">
      <Image
        src={image}
        alt="product image"
        quality={100}
        priority
        width={600}
        height={600}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
