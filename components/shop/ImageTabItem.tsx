import Image from "next/image";

export default function ImageTabItem({ image }: { image: string }) {
  return (
    <div className="product__thumb__pic set-bg">
      <Image
        src={image}
        alt="product image"
        quality={100}
        priority
        width={400}
        height={400}
        className="w-full h-14"
      />
    </div>
  );
}
