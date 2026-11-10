"use client";
import { notFound } from "next/navigation";
import React from "react";
import { useProductBySlug } from "../../../hooks/useProducts";
import Chatbot from "../Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import ProductEnquiry from "./Modals/ProductEnquiry";
import { getProductBrand } from "./productCatalog";
import SpecificationIcon from "./SpecificationIcon";
import "../../home.css";

interface ProductProps {
  slug: string;
}

const Product = ({ slug }: ProductProps) => {
  const { data: currentProduct, isLoading, isError } = useProductBySlug(slug);
  const [active, setActive] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);
  React.useEffect(() => {
    const resize = () => setIsDesktop(window.innerWidth >= 1201);
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Deliver Cloudinary images optimized + right-sized so they stay crisp.
  // f_auto = best format, q_auto = smart quality, c_limit/w = downscale to the
  // display size (never upscales past the source) at 2x for retina sharpness.
  const optimizeImage = (url: string, width: number) => {
    if (!url?.includes("/upload/")) return url;
    return url.replace(
      "/upload/",
      `/upload/f_auto,q_auto,c_limit,w_${width},dpr_2.0/`,
    );
  };

  // Transform API images to match component structure
  const activeImg = currentProduct?.imgs?.map((img, index: number) => ({
    id: index + 1,
    imgSrc: optimizeImage(img.src, 600),
    thumbSrc: optimizeImage(img.src, 160),
    altText: img.alt || `Product View ${index + 1}`,
  }));

  const image = activeImg?.[active] ?? activeImg?.[0];
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
    <div className="relative pb-12 lg:pb-0">
      <SiteHeader brand={getProductBrand(currentProduct) ?? "green"} />
      <div className="lg:block hidden absolute -z-10 right-0 top-0 bottom-0">
        <img
          loading="lazy"
          decoding="async"
          src="/images/product/mainImg.png"
          className=" h-full w-[66vw] object-fill "
          alt="mainImg"
        />
      </div>
      <div className="flex h-full overflow-hidden">
        {/* Left Side Image */}
        <div className="lg:block  w-1/6 flex items-center justify-center">
          <div className="fixed top-1/3 left-3 lg:left-14">
            <img
              loading="lazy"
              decoding="async"
              src="/images/product/product.png"
              className="w-8 lg:w-14"
              alt="Products Text"
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="px-4 sm:px-8 w-full pt-24 lg:pt-8">
          {/* Header Section */}
          <div className=" hidden lg:w-[50%] lg:flex justify-between items-start mb-4">
            <div className="hidden">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Products
              </h1>
            </div>
            <div className="flex items-center">
              <img
                loading="lazy"
                decoding="async"
                src={`/images/product/green-${getProductBrand(currentProduct) ?? "sunshine"}.png`}
                alt=""
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
                {image && (
                  <img
                    loading="lazy"
                    decoding="async"
                    src={image.imgSrc}
                    alt={
                      activeImg?.[active]?.altText ||
                      currentProduct?.title ||
                      "Product"
                    }
                    className="w-full h-auto object-contain max-h-[420px] lg:max-w-lg"
                  />
                )}
              </div>

              {/* Product Thumbnails */}
              {activeImg && activeImg.length > 1 && (
                <div className="lg:flex-nowrap space-y-4 lg:space-y-0 justify-center flex space-x-4 mb-6">
                  {activeImg.map((img, index: number) => (
                    <button
                      type="button"
                      key={img.id}
                      className={`lg:w-20 w-12 aspect-square lg:h-20 rounded-md object-cover cursor-pointer transition-opacity ${
                        active === index
                          ? "border-2 border-[#23B14D] opacity-100"
                          : "opacity-70 hover:opacity-100"
                      }`}
                      onClick={() => handleImageClick(index)}
                      aria-pressed={active === index}
                    >
                      <img
                        loading="lazy"
                        decoding="async"
                        src={img.thumbSrc}
                        alt={img.altText}
                        className="h-full w-full rounded-[inherit] object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {currentProduct.ctaButton?.text && (
                <div className="flex justify-end lg:w-[71%]">
                  <button
                    type="button"
                    className="cursor-pointer bg-gradient-to-r from-lime-200 to-yellow-200 px-10 py-3 font-bold"
                    onClick={() => {
                      if (currentProduct.ctaButton.href)
                        window.location.assign(currentProduct.ctaButton.href);
                      else setIsEnquiryOpen(true);
                    }}
                  >
                    {currentProduct.ctaButton.text}{" "}
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right Column - Product Info */}
            <div className="">
              <div className="relative   my-10 lg:my-0 p-4 lg:p-0">
                <div className="lg:ml-auto lg:mr-12 lg:w-[440px] lg:pt-8">
                  {/* Yellow card: skewed wrapper so the curve is controllable and
                      the text always stays inside it. */}
                  <div
                    style={{
                      transform: isDesktop ? "skewX(-10deg)" : "none",
                    }}
                    className="lg:bg-gradient-to-br lg:from-[#f4f7d6] lg:to-[#e8f0c4] lg:px-12 lg:py-12 lg:shadow-sm"
                  >
                    <div
                      style={{
                        transform: isDesktop ? "skewX(10deg)" : "none",
                      }}
                    >
                      <h3 className="text-xl mt-4 lg:mt-0 text-center lg:text-left lg:text-3xl  lg:tracking-wide lg:leading-10 font-bold text-gray-800 mb-2 lg:mb-4">
                        {currentProduct?.title}
                      </h3>
                      <p className="text-gray-600 text-sm text-center lg:text-left px-4 lg:px-0 lg:text-base">
                        {currentProduct.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    transform: isDesktop ? "skewX(-16deg)" : "none",
                  }}
                  className=" lg:bg-gray-100  p-4 mt-32  lg:shadow-2xl lg:p-8  lg:mt-52 "
                >
                  <div
                    style={{
                      transform: isDesktop ? "skewX(16deg)" : "none",
                    }}
                    className="grid grid-cols-3 gap-4 text-center text-xs lg:flex lg:flex-wrap lg:justify-start lg:gap-6 lg:text-left"
                  >
                    {currentProduct?.keys?.map((key, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col items-center lg:items-start lg:w-28"
                      >
                        <SpecificationIcon feature={key} />
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
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={currentProduct?.title}
      />
    </div>
  );
};

export default Product;
