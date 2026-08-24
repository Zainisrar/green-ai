"use client";

import { useState } from "react";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import ProductEnquiry from "./Modals/ProductEnquiry";
import styles from "./ProductsFigma.module.css";

const gallery = [
  ["kit-1.png", "GREEN Em’Pawa solar power system"],
  ["kit-2.png", "GREEN Em’Pawa mobile solar power system"],
  ["kit-3.png", "GREEN Em’Pawa solar power system"],
  ["kit-4.png", "GREEN Em’Pawa energy platform"],
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

const productName = "GREEN Em’Pawa";
const productTitle = "Lighting Up and Lifting Up Living Standards";
const description =
  "To lift up living standards sustainably, it is crucial to invest in infrastructure that supports a better quality of life.";

/** Em’Pawa Figma page composed from individual source assets. */
export default function EmpawaProductsFigma() {
  const [active, setActive] = useState(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const desktop = (
    <main className={styles.desktop} data-node-id="7077:25663">
      <img loading="lazy" decoding="async" className={styles.background} src="/images/product/bg.jpg" alt="" />
      <SiteHeader layout="productCanvas" brand="empawa" productLogo />
      <div className={styles.empawaPrimaryBrand}>
        <img loading="lazy" decoding="async" src="/images/product/green-empawa.png" alt={productName} />
      </div>
      <img loading="lazy" decoding="async"
        className={styles.pageTitleImg}
        src="/images/product/title_h1.png"
        alt=""
      />
      <img loading="lazy" decoding="async"
        className={styles.verticalTitle}
        src="/images/product/product_vert.png"
        alt=""
      />

      <section className={styles.gallery} aria-label={`${productName} gallery`}>
        <img loading="lazy" decoding="async"
          className={styles.hero}
          src={`/images/product/empawa/${gallery[active][0]}`}
          alt={gallery[active][1]}
        />
        <div className={styles.thumbnails}>
          {gallery.map(([image, alt], index) => (
            <button
              key={image}
              type="button"
              className={
                active === index
                  ? styles.activeThumbnail
                  : styles.inactiveThumbnail
              }
              onClick={() => setActive(index)}
              aria-label={`Show ${productName} product ${index + 1}`}
              aria-pressed={active === index}
            >
              <img loading="lazy" decoding="async" src={`/images/product/empawa/${image}`} alt={alt} />
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.enquiry}
          onClick={() => setIsEnquiryOpen(true)}
        >
          Enquiry <span aria-hidden="true">›</span>
        </button>
      </section>

      <section className={styles.story} aria-labelledby="empawa-story-title">
        <img loading="lazy" decoding="async" src="/images/product/boxImg.png" alt="" />
        <h2 id="empawa-story-title">
          Lighting Up
          <br />
          and Lifting Up
          <br />
          Living
          <br />
          Standards
        </h2>
        <p>{description}</p>
      </section>

      <section
        className={styles.specifications}
        aria-label="Product specifications"
      >
        <img loading="lazy" decoding="async"
          className={styles.specificationPanel}
          src="/images/product/boxKeyImg.png"
          alt=""
        />
        <div className={styles.specificationList}>
          {specifications.map(([icon, name, detail, duration]) => (
            <article key={name}>
              <img loading="lazy" decoding="async" src={`/images/product/${icon}`} alt="" />
              <h3>{name}</h3>
              <p>{detail}</p>
              <span>{duration}</span>
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
        <img loading="lazy" decoding="async"
          className={styles.mobileBrand}
          src="/images/product/green-empawa.png"
          alt={productName}
        />
        <img loading="lazy" decoding="async"
          className={styles.mobileHero}
          src={`/images/product/empawa/${gallery[active][0]}`}
          alt={gallery[active][1]}
        />
        <div className={styles.mobileThumbnails}>
          {gallery.map(([image], index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show ${productName} product ${index + 1}`}
              aria-pressed={active === index}
            >
              <img loading="lazy" decoding="async" src={`/images/product/empawa/${image}`} alt="" />
            </button>
          ))}
        </div>
        <h1>{productTitle}</h1>
        <p>{description}</p>
        <button
          type="button"
          className={styles.mobileEnquiry}
          onClick={() => setIsEnquiryOpen(true)}
        >
          Enquiry
        </button>
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        mobile={mobile}
        nodeId="7077:25663"
        fitCanvasHeight
      />
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={productName}
      />
    </>
  );
}
