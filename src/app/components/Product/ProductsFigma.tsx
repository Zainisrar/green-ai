"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import ProductEnquiry from "./Modals/ProductEnquiry";
import ProductBrandSwitcher from "./ProductBrandSwitcher";
import styles from "./ProductsFigma.module.css";

const PRODUCT_SLUG = "lighting-up-and-lifting-up-living-standards";

const gallery = [
  [
    "featuredProduct1.png",
    "GREEN SunShine student study and home-lighting kit",
  ],
  ["productImg2-large.png", "GREEN SunShine solar home-lighting system"],
  [
    "productImg3-large.png",
    "GREEN SunShine home system with television and fan",
  ],
  ["productImg4-large.png", "GREEN SunShine home and entertainment system"],
] as const;

const specifications = [
  ["solarpanel.png", "Solar Panel", "60W Poly-\ncrystalline", "--"],
  ["controlbox.png", "Control Box", "12.8V/18000mAh\nLiFePO4", "--"],
  ["ledbulb.png", "LED Bulb", "LED Bulb", "23 hrs / 11 hrs"],
  ["tv.png", "TV", "DC Television\n32 inch", "16 hrs"],
  ["fan.png", "Fan", "DC Pedestal Fan\n16 inch", "13 hrs"],
  ["radio.png", "FM Radio", "Radio with MP3\nplayer", "8 hrs"],
  ["lantern.png", "Lantern", "3.2V 600mAh\nLiFePO4", "8 hrs"],
  [
    "flashlight.png",
    "Flashlight",
    "3W/3.7V 1800mAh\nLi-ion battery",
    "8 hrs / 4 hrs",
  ],
  ["USB.png", "USB Cable", "Mobile Charging\ncable", "--"],
] as const;

const fallbackTitle = "Lighting Up and Lifting Up Living Standards";
const fallbackDescription =
  "To lift up living standards sustainably, it is crucial to invest in infrastructure that supports a better quality of life.";

export default function ProductsFigma() {
  const { data: products } = useProducts();
  const product = products?.find((item) => item.slug === PRODUCT_SLUG);
  const title = product?.title || fallbackTitle;
  const description = product?.description || fallbackDescription;
  const productGallery = product?.imgs?.length
    ? product.imgs.map(
        (image) => [image.src, image.alt || product.title] as const,
      )
    : gallery.map(([image, alt]) => [`/images/product/${image}`, alt] as const);
  const productSpecifications = product?.keys?.length
    ? product.keys.map((item) => ({
        icon: item.icon.src,
        name: item.icon.alt || item.title,
        detail: item.title,
        duration: item.description,
      }))
    : specifications.map(([icon, name, detail, duration]) => ({
        icon: `/images/product/${icon}`,
        name,
        detail,
        duration,
      }));
  const [active, setActive] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);

  const desktop = (
    <main
      className={styles.desktop}
      data-node-id="7077:12660"
      data-products-hydrated={hydrated}
    >
      <img
        loading="lazy"
        decoding="async"
        className={styles.background}
        src="/images/product/bg.jpg"
        alt=""
      />
      <SiteHeader layout="productCanvas" brand="sunshine" productLogo />
      <ProductBrandSwitcher current="GREEN SunShine" />
      <img
        loading="lazy"
        decoding="async"
        className={`${styles.productTopBrandLogo} ${styles.sunshineTopBrandLogo}`}
        src="/images/product/green-sunshine.png"
        alt="GREEN SunShine"
        data-node-id="7077:12773"
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.pageTitleImg}
        src="/images/product/title_h1.png"
        alt=""
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/product/product_vert.png"
        alt=""
      />

      <section className={styles.gallery} aria-label="Product gallery">
        <img
          loading="lazy"
          decoding="async"
          className={styles.hero}
          src={productGallery[active]?.[0] || productGallery[0][0]}
          alt={productGallery[active]?.[1] || productGallery[0][1]}
          data-node-id="7077:12667"
        />
        <div className={styles.thumbnails}>
          {productGallery.map(([image, alt], index) => (
            <button
              key={image}
              type="button"
              className={
                active === index
                  ? styles.activeThumbnail
                  : styles.inactiveThumbnail
              }
              onClick={() => setActive(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={active === index}
            >
              <img loading="lazy" decoding="async" src={image} alt={alt} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.enquiry}
          onClick={() => setIsEnquiryOpen(true)}
        >
          {product?.ctaButton?.text || "Enquiry"}{" "}
          <span aria-hidden="true">›</span>
        </button>
      </section>

      <section className={styles.story} aria-labelledby="product-story-title">
        <img
          loading="lazy"
          decoding="async"
          src="/images/product/boxImg.png"
          alt=""
        />
        <h2 id="product-story-title">
          {title === fallbackTitle ? (
            <>
              Lighting Up
              <br />
              and Lifting Up
              <br />
              Living
              <br />
              Standards
            </>
          ) : (
            title
          )}
        </h2>
        <p>{description}</p>
      </section>

      <section
        className={styles.specifications}
        aria-label="Product specifications"
      >
        <img
          loading="lazy"
          decoding="async"
          className={styles.specificationPanel}
          src="/images/product/boxKeyImg.png"
          alt=""
        />
        <div className={styles.specificationList}>
          {productSpecifications.map((specification) => (
            <article key={specification.name}>
              <img
                loading="lazy"
                decoding="async"
                src={specification.icon}
                alt=""
              />
              <h3>{specification.name}</h3>
              <p>{specification.detail}</p>
              <span>{specification.duration}</span>
            </article>
          ))}
        </div>
      </section>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let's Talk Energy"
        triggerStyle={{
          top: 899,
          right: "auto",
          bottom: "auto",
          left: 1498,
          width: 418,
        }}
      />
    </main>
  );

  const mobile = (
    <main className={styles.mobile}>
      <SiteHeader panel="logoOnly" />
      <div className={styles.mobileContent}>
        <p className={styles.eyebrow}>Products</p>
        <img
          loading="lazy"
          decoding="async"
          className={styles.mobileBrand}
          src="/images/product/green-sunshine.png"
          alt="GREEN SunShine"
        />
        <Link
          href="/engineering/products/green-em-pawa"
          className={styles.mobileEmpawaLink}
        >
          View GREEN Em’Pawa products
        </Link>
        <Link
          href="/engineering/products/green-sunsmart"
          className={styles.mobileEmpawaLink}
        >
          View GREEN SunSmart products
        </Link>
        <img
          loading="lazy"
          decoding="async"
          className={styles.mobileHero}
          src={productGallery[active]?.[0] || productGallery[0][0]}
          alt={productGallery[active]?.[1] || productGallery[0][1]}
        />
        <div className={styles.mobileThumbnails}>
          {productGallery.map(([image], index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={active === index}
            >
              <img loading="lazy" decoding="async" src={image} alt="" />
            </button>
          ))}
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
        <section className={styles.mobileSpecifications}>
          <h2>Kit Specifications</h2>
          <div className={styles.mobileSpecGrid}>
            {productSpecifications.map((specification) => (
              <article key={specification.name} className={styles.mobileSpecItem}>
                <img
                  loading="lazy"
                  decoding="async"
                  src={specification.icon}
                  alt=""
                />
                <h3>{specification.name}</h3>
                <p>{specification.detail}</p>
                {specification.duration !== "--" && (
                  <span>{specification.duration}</span>
                )}
              </article>
            ))}
          </div>
        </section>
        <button
          type="button"
          className={styles.mobileEnquiry}
          onClick={() => setIsEnquiryOpen(true)}
        >
          {product?.ctaButton?.text || "Enquiry"}
        </button>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas desktop={desktop} mobile={mobile} nodeId="7077:12660" />
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={title}
      />
    </>
  );
}
