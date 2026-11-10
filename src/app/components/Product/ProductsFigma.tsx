"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { ProductKey } from "../../../hooks/useProducts";
import { useProducts } from "../../../hooks/useProducts";
import D6Chatbot from "../D6Chatbot";
import SiteHeader from "../SiteHeader/SiteHeader";
import FigmaPageCanvas from "../shared/FigmaPageCanvas";
import ProductEnquiry from "./Modals/ProductEnquiry";
import ProductBrandSwitcher from "./ProductBrandSwitcher";
import styles from "./ProductsFigma.module.css";
import ProductThumbnails from "./ProductThumbnails";
import {
  getBrandGallery,
  type ProductBrand,
  productBrands,
} from "./productCatalog";
import SpecificationIcon from "./SpecificationIcon";

export default function ProductsFigma({
  brand = "sunshine",
}: {
  brand?: ProductBrand;
}) {
  const { data: products, isPending, isError, refetch } = useProducts();
  const config = productBrands[brand];
  const productGallery = getBrandGallery(products ?? [], brand);
  const [selection, setSelection] = useState<string | null>(null);
  const selectedIndex = productGallery.findIndex(
    (item) => item.id === selection,
  );
  const active = selectedIndex < 0 ? 0 : selectedIndex;
  const selected = productGallery[active];
  const product = selected?.product;
  const title = product?.title ?? "";
  const description = product?.description ?? "";
  const heroImage = selected?.image.src;
  const heroAlt = selected?.image.alt || product?.title || config.name;
  const productSpecifications = product?.keys ?? [];
  const selectProduct = (index: number) =>
    setSelection(productGallery[index].id);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [expandedSpecification, setExpandedSpecification] =
    useState<ProductKey | null>(null);
  const specificationDialog = useRef<HTMLDialogElement>(null);
  const [specificationPage, setSpecificationPage] = useState({
    productId: 0,
    index: 0,
  });
  const lastWheelPage = useRef(0);
  const pageCount = Math.max(1, Math.ceil(productSpecifications.length / 9));
  const pageIndex =
    specificationPage.productId === product?.id
      ? Math.min(specificationPage.index, pageCount - 1)
      : 0;
  const visibleSpecifications = productSpecifications.slice(
    pageIndex * 9,
    pageIndex * 9 + 9,
  );
  const showSpecificationPage = (index: number) =>
    setSpecificationPage({
      productId: product?.id ?? 0,
      index: Math.max(0, Math.min(index, pageCount - 1)),
    });
  const enquire = () => {
    if (product?.ctaButton?.href)
      window.location.assign(product.ctaButton.href);
    else setIsEnquiryOpen(true);
  };

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (expandedSpecification) specificationDialog.current?.showModal();
    else specificationDialog.current?.close();
  }, [expandedSpecification]);

  const catalogStatus = !product ? (
    <p className={styles.catalogStatus} role="status">
      {isPending ? (
        "Loading products…"
      ) : isError ? (
        <>
          Products are temporarily unavailable.{" "}
          <button type="button" onClick={() => refetch()}>
            Try again
          </button>
        </>
      ) : (
        "No products are available yet."
      )}
    </p>
  ) : null;

  const desktop = (
    <main
      className={styles.desktop}
      data-node-id={config.nodeId}
      data-product-brand={brand}
      data-products-hydrated={hydrated}
    >
      <img
        loading="lazy"
        decoding="async"
        className={styles.background}
        src="/images/product/bg.jpg"
        alt=""
      />
      <SiteHeader
        layout="productCanvas"
        brand={brand}
        productLogo
        showBrand={false}
      />
      <ProductBrandSwitcher current={config.name} />
      <img
        className={styles.brandPanel}
        src={`/images/product/${brand}-brand-panel.png`}
        alt=""
      />
      <img
        loading="lazy"
        decoding="async"
        className={`${styles.productTopBrandLogo} ${brand === "sunshine" ? styles.sunshineTopBrandLogo : brand === "empawa" ? styles.empawaTopBrandLogo : styles.sunsmartTopBrandLogo}`}
        src={`/images/product/green-${brand}.png`}
        alt={config.name}
        data-node-id={
          brand === "sunshine"
            ? "7077:12773"
            : brand === "empawa"
              ? "7077:25765"
              : "7077:27017"
        }
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.pageTitleImg}
        src="/images/product/products-heading-figma.png"
        alt=""
      />
      <img
        loading="lazy"
        decoding="async"
        className={styles.verticalTitle}
        src="/images/product/product-vertical-figma.png"
        alt=""
      />

      <section className={styles.gallery} aria-label="Product gallery">
        {heroImage && (
          <img
            loading="lazy"
            decoding="async"
            className={styles.hero}
            src={heroImage}
            alt={heroAlt}
            data-node-id="7077:12667"
          />
        )}
        <ProductThumbnails
          items={productGallery}
          active={active}
          onSelect={selectProduct}
        />
        {catalogStatus}
        {product?.ctaButton?.text && (
          <button type="button" className={styles.enquiry} onClick={enquire}>
            {product.ctaButton.text} <span aria-hidden="true">›</span>
          </button>
        )}
      </section>

      <section className={styles.story} aria-labelledby="product-story-title">
        <img
          loading="lazy"
          decoding="async"
          src="/images/product/boxImg.png"
          alt=""
        />
        <h2 id="product-story-title">{title}</h2>
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
        <section
          className={styles.specificationList}
          style={{
            gridTemplateColumns: `repeat(${visibleSpecifications.length || 1}, minmax(0, 1fr))`,
          }}
          aria-label="Selected product specifications"
          aria-live="polite"
          onWheel={(event) => {
            if (
              Math.abs(event.deltaX) <= Math.abs(event.deltaY) ||
              Math.abs(event.deltaX) < 12 ||
              Date.now() - lastWheelPage.current < 400
            )
              return;
            lastWheelPage.current = Date.now();
            showSpecificationPage(pageIndex + Math.sign(event.deltaX));
          }}
        >
          {visibleSpecifications.map((specification) => (
            <article key={specification.title}>
              <SpecificationIcon feature={specification} />
              <h3>
                <button
                  type="button"
                  className={styles.specificationDetails}
                  onClick={() => setExpandedSpecification(specification)}
                  aria-label={`View full specification: ${specification.title}`}
                >
                  {specification.title}
                </button>
              </h3>
              <p>{specification.description}</p>
            </article>
          ))}
        </section>
        {productSpecifications.length > 9 && (
          <>
            <button
              type="button"
              className={styles.previousSpecifications}
              aria-label="Previous specifications"
              disabled={pageIndex === 0}
              onClick={() => showSpecificationPage(pageIndex - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.nextSpecifications}
              aria-label="Next specifications"
              disabled={pageIndex === pageCount - 1}
              onClick={() => showSpecificationPage(pageIndex + 1)}
            >
              ›
            </button>
          </>
        )}
      </section>

      <D6Chatbot
        canvasAnchored
        triggerVariant="figmaCanvas"
        figmaPlaceholder="Let's Talk Energy"
        triggerStyle={{
          top: "calc(var(--figma-canvas-height, 970px) - 71px)",
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
          src={`/images/product/green-${brand}.png`}
          alt={config.name}
        />
        {(["sunshine", "empawa", "sunsmart"] as const)
          .filter((item) => item !== brand)
          .map((item) => (
            <Link
              key={item}
              href={`/engineering/products/green-${item}`}
              className={styles.mobileEmpawaLink}
            >
              View {productBrands[item].name} products
            </Link>
          ))}
        {heroImage && (
          <img
            loading="lazy"
            decoding="async"
            className={styles.mobileHero}
            src={heroImage}
            alt={heroAlt}
          />
        )}
        <ProductThumbnails
          items={productGallery}
          active={active}
          onSelect={selectProduct}
          mobile
        />
        {catalogStatus}
        <h1>{title}</h1>
        <p>{description}</p>
        <section className={styles.mobileSpecifications}>
          <h2>Kit Specifications</h2>
          <div className={styles.mobileSpecGrid}>
            {productSpecifications.map((specification) => (
              <article
                key={specification.title}
                className={styles.mobileSpecItem}
              >
                <SpecificationIcon feature={specification} />
                <h3>{specification.title}</h3>
                <p>{specification.description}</p>
              </article>
            ))}
          </div>
        </section>
        {product?.ctaButton?.text && (
          <button
            type="button"
            className={styles.mobileEnquiry}
            onClick={enquire}
          >
            {product.ctaButton.text}
          </button>
        )}
      </div>
      <D6Chatbot />
    </main>
  );

  return (
    <>
      <FigmaPageCanvas
        desktop={desktop}
        mobile={mobile}
        nodeId={config.nodeId}
        scaleToViewport="width"
        fitCanvasHeight
      />
      <ProductEnquiry
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        productName={title}
      />
      {hydrated &&
        createPortal(
          <dialog
            ref={specificationDialog}
            className={styles.specificationDialog}
            aria-labelledby="full-specification-title"
            onClose={() => setExpandedSpecification(null)}
          >
            <button
              type="button"
              className={styles.closeSpecification}
              aria-label="Close specification"
              onClick={() => specificationDialog.current?.close()}
            >
              ×
            </button>
            <h2 id="full-specification-title">
              {expandedSpecification?.title}
            </h2>
            <p>{expandedSpecification?.description}</p>
          </dialog>,
          document.body,
        )}
    </>
  );
}
