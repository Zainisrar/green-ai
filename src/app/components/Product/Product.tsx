"use client";
import { notFound } from "next/navigation";
import React from "react";
import { useProductBySlug } from "../../../hooks/useProducts";
import Chatbot from "../Chatbot";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import ProductEnquiry from "./Modals/ProductEnquiry";
import "../../home.css";

interface ProductProps {
  slug: string;
}

const lightingSystemItems = [
  {
    icon: "solarpanel.png",
    name: "Solar Panel",
    detail: "60W Poly-crystalline",
  },
  {
    icon: "controlbox.png",
    name: "Control Box",
    detail: "12.8V/18000mAh LiFePO4",
  },
  { icon: "ledbulb.png", name: "LED Bulb", detail: "23 hrs / 11 hrs" },
  {
    icon: "tv.png",
    name: "TV",
    detail: "DC Television 32 inch",
    duration: "16 hrs",
  },
  {
    icon: "fan.png",
    name: "Fan",
    detail: "DC Pedestal Fan 16 inch",
    duration: "13 hrs",
  },
  {
    icon: "radio.png",
    name: "FM Radio",
    detail: "Radio with MP3 player",
    duration: "8 hrs",
  },
  {
    icon: "lantern.png",
    name: "Lantern",
    detail: "3.2V 600mAh LiFePO4",
    duration: "8 hrs",
  },
  {
    icon: "flashlight.png",
    name: "Flashlight",
    detail: "3W/3.7V 1800mAh Li-ion battery",
    duration: "8 hrs / 4 hrs",
  },
  { icon: "USB.png", name: "USB Cable", detail: "Mobile Charging cable" },
];

const Product = ({ slug }: ProductProps) => {
  const { data: currentProduct, isLoading, isError } = useProductBySlug(slug);
  const [active, setActive] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = React.useState(false);
  const [figmaScale, setFigmaScale] = React.useState(1);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
      setFigmaScale(
        Math.min(window.innerWidth / 1920, window.innerHeight / 970),
      );
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (slug === "lighting-up-and-lifting-up-living-standards") {
    return (
      <>
        <SiteHeader brand="sunshine" />
        <div className="product-figma-shell hidden lg:block">
          <div
            className="product-figma-desktop"
            style={{ transform: `scale(${figmaScale})` }}
          >
            <img
              src="/images/product/bg.jpg"
              alt=""
              className="product-figma-background"
            />
            <h1 className="product-figma-heading">Products</h1>

            <img
              src="/images/product/product.png"
              alt="Products"
              className="product-figma-label"
            />
            <img
              src="/images/product/green-sunshine.png"
              alt="GREEN SunShine"
              className="product-figma-brand"
            />

            <div className="product-figma-showcase">
              <img
                src="/images/product/featuredProduct1.png"
                alt="GREEN SunShine lighting system"
                className="product-figma-featured"
              />
              <div className="product-figma-thumbnails">
                {[
                  "featuredProduct1.png",
                  "productImg2.png",
                  "productImg3.png",
                  "productImg4.png",
                ].map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActive(index)}
                    className={active === index ? "is-active" : ""}
                    aria-label={`Show product image ${index + 1}`}
                  >
                    <img src={`/images/product/${image}`} alt="" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="product-figma-enquiry"
              >
                <span>Enquiry</span>
                <span
                  className="product-figma-enquiry-arrow"
                  aria-hidden="true"
                />
              </button>
            </div>

            <section className="product-figma-card">
              <div>
                <h2>
                  Lighting Up
                  <br />
                  and Lifting Up
                  <br />
                  Living
                  <br />
                  Standards
                </h2>
                <p>
                  To lift up living standards sustainably, it is crucial to
                  invest in infrastructure that supports a better quality of
                  life.
                </p>
              </div>
            </section>

            <section
              className="product-figma-specifications"
              aria-label="Product specifications"
            >
              <img src="/images/product/boxKeyImg.png" alt="" />
              <div className="product-figma-specification-list">
                {lightingSystemItems.map((item) => (
                  <article key={item.name}>
                    <img src={`/images/product/${item.icon}`} alt="" />
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                    {item.duration && <span>{item.duration}</span>}
                  </article>
                ))}
              </div>
            </section>
            <D6Chatbot
              canvasAnchored
              triggerClassName="product-figma-chatbot"
            />
          </div>
        </div>

        <div className="lg:hidden">
          <div className="px-6 pt-24 text-center">
            <img
              src="/images/product/green-sunshine.png"
              alt="GREEN SunShine"
              className="mx-auto w-44"
            />
            <img
              src="/images/product/featuredProduct1.png"
              alt="GREEN SunShine lighting system"
              className="mx-auto mt-8 w-full max-w-md"
            />
            <h1 className="mt-8 text-3xl font-bold text-slate-800">
              Lighting Up and Lifting Up Living Standards
            </h1>
            <p className="mt-4 text-slate-600">
              To lift up living standards sustainably, it is crucial to invest
              in infrastructure that supports a better quality of life.
            </p>
          </div>
          <Chatbot />
        </div>

        <ProductEnquiry
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          productName="Lighting Up and Lifting Up Living Standards"
        />
      </>
    );
  }

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
    <div className="relative pb-12 lg:pb-0">
      <SiteHeader />
      <div className="lg:block hidden absolute -z-10 right-0 top-0 bottom-0">
        <img
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
                  onClick={() => setIsEnquiryOpen(true)}
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
                        {currentProduct?.description ||
                          "To lift up living standards sustainably, it is crucial to invest in infrastructure that supports a better quality of life."}
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
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={currentProduct?.title}
      />
    </div>
  );
};

export default Product;
