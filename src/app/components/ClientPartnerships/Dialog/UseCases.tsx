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
      '"Before GREEN, Our Clinic Had No Light After 5 PM. Now We Perform Safe Deliveries At Night."',
    reference: "– Nurse, Gulf Province",
  },
  {
    img: {
      alt: "Parent with children",
      src: "/images/client-partnerships/rural-review.png",
    },
    title:
      '"This Solar System Lets My Children Study In The Evening. That\'s Something We Never Had Before."',
    reference: "– Parent, Rural Central PNG",
  },
  {
    img: {
      alt: "Local technician",
      src: "/images/client-partnerships/incubator-review.png",
    },
    title:
      '"I Was Trained By GREEN. Now I Earn As An O&M Technician And Support My Family."',
    reference: "– Incubator Graduate, Madang",
  },
  {
    img: {
      alt: "Village elder",
      src: "/images/client-partnerships/elder-review.png",
    },
    title:
      '"We Used To Travel Hours For Fuel. Now We Have Clean Power In The Village — Always."',
    reference: "– Village Elder, Eastern Highlands",
  },
];

const UseCases = ({ isOpen, onClose, data }: Props) => {
  const title = data?.title ?? "Client Testimonials / Use Cases";
  const items = data?.items ?? defaultItems;

  return (
    <ClientInfoModal isOpen={isOpen} onClose={onClose}>
      <div className={styles.useCases}>
        <header className={styles.dialogHeader}>
          <h2 className={styles.dialogTitle}>{title}</h2>
        </header>

        <div className={styles.caseGrid}>
          {items.map((item) => (
            <article key={item.title} className={styles.caseCard}>
              <img
                loading="lazy"
                decoding="async"
                src={item.img.src}
                alt={item.img.alt}
                className={styles.caseImage}
              />
              <p className={styles.caseQuote}>{item.title}</p>
              <p className={styles.caseReference}>{item.reference}</p>
            </article>
          ))}
        </div>
      </div>
    </ClientInfoModal>
  );
};

export default UseCases;
