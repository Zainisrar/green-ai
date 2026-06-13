"use client";
import React from "react";
import { notFound, useRouter } from "next/navigation";
import Chatbot from "../Chatbot";
import ProductNavigation from "../TopNavigation/ProductNavigation";
import { useProductBySlug } from "../../../hooks/useProducts";

interface ProductProps {
  slug: string;
}

const Product = ({ slug }: ProductProps) => {
  const router = useRouter();
  const { data: currentProduct, isLoading, isError } = useProductBySlug(slug);
  const [active, setActive] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Deliver Cloudinary images optimized + right-sized so they stay crisp.
  // f_auto = best format, q_auto = smart quality, c_limit/w = downscale to the
  // display size (never upscales past the source) at 2x for retina sharpness.
  const optimizeImage = (url: string, width: number) => {
    if (!url?.includes("/upload/")) return url;
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,c_limit,w_${width},dpr_2.0/`
    );
  };

  // Transform API images to match component structure
  const activeImg = currentProduct?.imgs?.map((img: any, index: number) => ({
    id: index + 1,
    imgSrc: optimizeImage(img.src, 600),
    thumbSrc: optimizeImage(img.src, 160),
    altText: img.alt || `Product View ${index + 1}`,
  }));

  const handleImageClick = (index: number) => {
    setActive(index);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading product...</div>
      </div>
    );
  }

  // If no product data found or error, trigger Next.js 404
  if (!currentProduct || isError) {
    notFound();
  }
  return (
    // <div className=' h-screen bg-[url("/images/product/bg.jpg")] bg-cover overflow-hidden relative'>
    <div className=" ">
      <ProductNavigation />
      <div className="lg:block hidden absolute -z-10 right-0 top-0">
        <img
          src="/images/product/mainImg.png"
          className=" h-[150vh] w-[60vw] "
          alt="mainImg"
        />
      </div>
      <div className="flex h-full overflow-hidden">
        {/* Left Side Image */}
        <div className="lg:block  w-1/6 flex items-center justify-center">
          <div className="fixed top-1/3 left-3 lg:left-14">
            <img
              src="/images/product/product.png"
              className="w-8 lg:w-14"
              alt="Products Text"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="  lg:px-8 w-full pt-8">
          {/* Header Section */}
          <div className=" hidden lg:w-[50%] lg:flex justify-between items-start mb-4">
            <div className="hidden">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Products
              </h1>
            </div>
            <div className="flex items-center">
              <img
                src="/images/product/green-sunshine.png"
                alt="GREEN SunShine Logo"
                className="w-32"
              />
            </div>
          </div>

          {/* Content Layout */}
          <div className="lg:flex space-x-8">
            {/* Left Column - Product Showcase */}
            <div className="lg:w-1/2">
              {/* Main Product Image */}
              <div className="lg:mb-6 flex items-center justify-center">
                <img
                  src={
                    // @ts-expect-error
                    activeImg[active].imgSrc
                  }
                  alt={
                    // @ts-expect-error
                    activeImg[active].altText
                  }
                  className="w-full h-auto object-contain max-h-[420px] lg:max-w-lg"
                />
              </div>

              {/* Product Thumbnails */}
              <div className="lg:flex-nowrap  space-y-4 lg:space-y-0 justify-center  flex space-x-4 mb-6">
                {
                  // @ts-expect-error
                  activeImg.map((img, index) => (
                    <img
                      key={img.id}
                      src={img.thumbSrc}
                      alt={img.altText}
                      className={`lg:w-20 w-12 aspect-square lg:h-20 rounded-md object-cover cursor-pointer transition-opacity ${
                        active === index
                          ? "border-2 border-[#23B14D] opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))
                }
              </div>

              {/* Enquiry Button */}
              <div className="flex justify-end lg:w-[71%]">
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => {
                    const href = currentProduct?.ctaButton?.href;
                    if (href) {
                      // External/explicit CMS link opens in a new tab.
                      window.open(href, "_blank");
                    } else {
                      // No CMS link yet — route to the contact page so it never dead-clicks.
                      router.push("/engage/contact-us");
                    }
                  }}
                >
                  <img
                    src="/images/product/enquiry.png"
                    alt={currentProduct?.ctaButton?.text || "Enquiry"}
                  />
                </button>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div className="">
              <div className="relative   my-10 lg:my-0 p-4 lg:p-0">
                <div className="lg:ml-34  lg:pt-16 lg:w-7/12">
                  <h3
                  style={{
                    transform:"skewX(-12deg)"
                  }}
                  className="text-xl mt-4 text-center lg:text-left lg:max-w-xs lg:ml-32 lg:text-3xl  lg:tracking-wider lg:leading-10 font-bold text-gray-800 mb-2 lg:mb-4">
                    {currentProduct?.title}
                  </h3>
                  <p className="text-gray-600 text-sm text-center lg:text-left px-4 lg:px-16 lg:text-xl">
                    {currentProduct?.description ||
                      "To lift up living standards sustainably, it is crucial to invest in infrastructure that supports a better quality of life."}
                  </p>
                </div>
                <div className="absolute  top-0 -z-10">
                  <img src="/images/product/boxImg.png" alt="" className="" />
                </div>
                <div 
                style={{
                  transform:isDesktop?"skewX(-16deg)":"none"
                }}
                className=" lg:bg-gray-100  p-4 mt-32  lg:shadow-2xl lg:p-8  lg:mt-52 ">
                  <div
                   style={{
                  transform:isDesktop?"skewX(16deg)":"none"
                }}
                  className="grid grid-cols-3 gap-4 text-center text-xs lg:flex lg:flex-wrap lg:justify-start lg:gap-6 lg:text-left">
                    {currentProduct?.keys.map((key: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center lg:items-start lg:w-28"
                      >
                        <img
                          src={key.icon.src}
                          alt={key.icon.alt}
                          className="w-14 lg:w-24 mb-2"
                        />
                        <p className="font-semibold">{key.title}</p>
                        <p className="text-gray-600">{key.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:block hidden">
        <Chatbot />
      </div>
    </div>
  );
};

export default Product;
