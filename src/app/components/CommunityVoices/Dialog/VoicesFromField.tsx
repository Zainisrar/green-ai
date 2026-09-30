"use client";

import { useCommunityVoices } from "../../../../hooks/useCommunityVoices";
import styles from "./CommunityVoicesModals.module.css";
import { useModalDialogFocus } from "./useModalDialogFocus";

interface Props { isOpen: boolean; onClose: () => void; }

export default function VoicesFromField({ isOpen, onClose }: Props) {
  const { data } = useCommunityVoices();
  const dialogRef = useModalDialogFocus(isOpen && !!data, onClose);
  if (!isOpen || !data) return null;
  const modalData = data.modals.voicesFromField;

  return (
    <div className={styles.overlay} role="presentation">
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close dialog overlay" />
      <section ref={dialogRef} className={`${styles.dialog} ${styles.voicesDialog}`} role="dialog" aria-modal="true" aria-labelledby="voices-from-field-title">
        <button type="button" data-modal-initial-focus className={styles.closeButton} onClick={onClose} aria-label="Close dialog"><span /><span /></button>
        <header className={styles.dialogHeader}><h2 id="voices-from-field-title">{modalData.title}</h2></header>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.voiceGrid}>
          {modalData.items.map((item, index) => (
            <article className={styles.voiceCard} key={`${item.title}-${index}`}>
              <div className={styles.voiceImage}><img src={item.img.src} alt={item.img.alt} /></div>
              <p className={styles.voiceQuote}>{item.title}</p>
              <p className={styles.voiceAttribution}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
