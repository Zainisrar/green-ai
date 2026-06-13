"use client";
import React from "react";
import { notFound } from "next/navigation";
import Chatbot from "../Chatbot";
import ProductNavigation from "../TopNavigation/ProductNavigation";
import { useProductBySlug } from "../../../hooks/useProducts";

interface ProductProps {
  slug: string;
}

const Product = ({ slug }: ProductProps) => {
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

  // Transform API images to match component structure
  const activeImg = currentProduct?.imgs?.map((img: any, index: number) => ({
    id: index + 1,
    imgSrc: img.src,
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
              <div className="lg:mb-6">
                {/* <img
                  src="/images/product/featuredProduct1.png"
                  alt="Solar Kit Components"
                  className="w-full max-w-lg"
                /> */}
                <img
                  src={
                    // @ts-expect-error
                    activeImg[active].imgSrc
                  }
                  alt={
                    // @ts-expect-error
                    activeImg[active].altText
                  }
                  className="w-full h-full lg:max-w-lg"
                />
              </div>

              {/* Product Thumbnails */}
              <div className="lg:flex-nowrap  space-y-4 lg:space-y-0 justify-center  flex space-x-4 mb-6">
                {
                  // @ts-expect-error
                  activeImg.map((img, index) => (
                    <img
                      key={img.id}
                      src={img.imgSrc}
                      alt={img.altText}
                      className={`lg:w-20 w-12 aspect-square lg:h-20 rounded-md cursor-pointer ${
                        active === index
                          ? "border-2 border-[#23B14D]"
                          : "opacity-70"
                      }`}
                      onClick={() => handleImageClick(index)}
                    />
                  ))
                }
              </div>

              {/* Enquiry Button */}
              <div className="cursor-pointer flex justify-end lg:w-[71%]">
                {currentProduct?.ctaButton ? (
                  <button
                    className=" cursor-pointer"
                    onClick={() => {
                      if (currentProduct.ctaButton.href) {
                        window.open(currentProduct.ctaButton.href, "_blank");
                      }
                    }}
                  >
                    <img src="/images/product/enquiry.png" alt="Enquiry" />
                  </button>
                ) : (
                  <img src="/images/product/enquiry.png" alt="Enquiry" />
                )}
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
                  className="text-xl ml-20 mt-4   lg:max-w-xs lg:ml-32 lg:text-3xl  lg:tracking-wider lg:leading-10  lg:leading-auto font-bold text-gray-800 mb-2 lg:mb-4">
                    {/* {currentProduct?.title}  */}
                    Lighting Up <br /> and Lifting Up <br /> Living Standards
                  </h3>
                  <p className="text-gray-600 text-sm lg:block hidden px-16  lg:text-xl">
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
                  className="grid grid-cols-3 text-center lg:text-left lg:flex  space-x-8 space-y-8 justify-center  lg:flex-wrap  text-xs">
                    {currentProduct?.keys.map((key: any, index: number) => (
                      <div key={index} className="flex flex-col items-center">
                        <img
                          src={key.icon.src}
                          alt={key.icon.alt}
                          className="w-24  mb-2"
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
