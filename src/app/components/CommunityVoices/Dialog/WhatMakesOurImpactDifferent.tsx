"use client";

import { useCommunityVoices } from "../../../../hooks/useCommunityVoices";
import styles from "./CommunityVoicesModals.module.css";
import { useModalDialogFocus } from "./useModalDialogFocus";

interface Props { isOpen: boolean; onClose: () => void; }

export default function WhatMakesOurImpactDifferent({ isOpen, onClose }: Props) {
  const { data } = useCommunityVoices();
  const dialogRef = useModalDialogFocus(isOpen && !!data, onClose);
  if (!isOpen || !data) return null;
  const modalData = data.modals.whatMakesOurImpactDifferent;

  return (
    <div className={styles.overlay} role="presentation">
      <button type="button" className={styles.backdrop} onClick={onClose} aria-label="Close dialog overlay" />
      <section ref={dialogRef} className={`${styles.dialog} ${styles.impactDialog}`} role="dialog" aria-modal="true" aria-labelledby="impact-different-title">
        <button type="button" data-modal-initial-focus className={styles.closeButton} onClick={onClose} aria-label="Close dialog"><span /><span /></button>
        <header className={styles.dialogHeader}><h2 id="impact-different-title">{modalData.title}</h2></header>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.impactGrid}>
          <section><h3>{modalData.key1.title}</h3><ul>{modalData.key1.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></section>
          <section><h3>{modalData.key2.title}</h3><ul>{modalData.key2.items.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></section>
        </div>
      </section>
    </div>
  );
}
