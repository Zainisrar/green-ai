"use client";

import type { ClientPartnershipsUseCases } from "../../../lib/api";
import ClientInfoModal from "./ClientInfoModal";
import styles from "./ClientPartnershipDialogs.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: ClientPartnershipsUseCases;
}

const defaultItems = [
  {
    img: {
      alt: "Nurse at clinic",
      src: "/images/client-partnerships/nurse-review.png",
    },
    title:
      "“Before GREEN, our clinic had no light after 5 PM. Now we perform safe deliveries at night.”",
    reference: "– Nurse, Gulf Province",
  },
  {
    img: {
      alt: "Parent with children",
      src: "/images/client-partnerships/rural-review.png",
    },
    title:
      "“This solar system lets my children study in the evening. That’s something we never had before.”",
    reference: "– Parent, Rural Central PNG",
  },
  {
    img: {
      alt: "Local technician",
      src: "/images/client-partnerships/incubator-review.png",
    },
    title:
      "“I was trained by GREEN. Now I earn as an O&M technician and support my family.”",
    reference: "– Incubator Graduate, Madang",
  },
  {
    img: {
      alt: "Village elder",
      src: "/images/client-partnerships/elder-review.png",
    },
    title:
      "“We used to travel hours for fuel. Now we have clean power in the village — always.”",
    reference: "– Village Elder, Eastern Highlands",
  },
];

const UseCases = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Client Testimonials / Use Cases";
  const items = data?.items ?? defaultItems;

  return (
    <ClientInfoModal
      isOpen={isOpen}
      onClose={onClose}
      width={1846}
      height={620}
      contentClassName={styles.testimonialsCustomViewport}
      geometry="testimonials"
    >
      <div className={styles.testimonialsWrapper}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
        </header>

        <div className={styles.testimonialsGrid}>
          {items.map((item) => (
            <article key={item.reference} className={styles.testimonialCard}>
              <img
                loading="lazy"
                decoding="async"
                src={item.img.src}
                alt={item.img.alt}
                className={styles.testimonialImage}
              />
              <p className={styles.testimonialQuote}>
                <span>{item.title}</span>
                <span className={styles.testimonialReference}>{item.reference}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default UseCases;
