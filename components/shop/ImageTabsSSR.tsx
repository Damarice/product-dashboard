import Image from "next/image";

interface ImageTabsProps {
  image_url: string[];
}
export default function ImageTabsSSR({ image_url }: ImageTabsProps) {
  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <Image
        src={image_url[0]}
        alt="Product"
        className="w-full h-auto rounded-lg shadow-md mb-4"
        id="mainImage"
        quality={100}
        priority
        width={600}
        height={600}
      />
      <div className="flex gap-4 py-4 justify-center overflow-x-auto">
        {image_url.map((image: string, index: number) => (
          <Image
            src={image}
            key={image}
            alt="Product Image"
            className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
            quality={100}
            priority
            width={600}
            height={600}
          />
        ))}
      </div>
    </div>
  );
}
