"use client";

import Link from "next/link";
import styles from "./MediaContactInterviewRequests.module.css";
import MediaDialogFrame from "./MediaDialogFrame";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CONTACT_TYPES = [
  { text: "General Media Inquiries", offset: 70 },
  { text: "Interview Requests", offset: 35 },
  { text: "Speaking Engagements", offset: 0 },
];

const EMAILS = [
  { text: "media@green.com.pg", href: "mailto:media@green.com.pg", offset: 70 },
  {
    text: "comms.director@green.com.pg",
    href: "mailto:comms.director@green.com.pg",
    offset: 35,
  },
  {
    text: "outreach@green.com.pg",
    href: "mailto:outreach@green.com.pg",
    offset: 0,
  },
];

export default function MediaContactInterviewRequests({
  isOpen,
  onClose,
}: Props) {
  return (
    <MediaDialogFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Media Contact & Interview Requests"
      labelledBy="media-contact-title"
      variant="mediaContact"
    >
      <div className={styles.container}>
        {/* Top 2 Tilted Columns */}
        <div className={styles.columns}>
          {/* Contact Type Column */}
          <div className={styles.column}>
            <div
              className={styles.contactTypeHeader}
              style={{ transform: "translateX(70px)" }}
            >
              Contact Type
            </div>
            <div className={styles.list}>
              {CONTACT_TYPES.map((item) => (
                <div
                  key={item.text}
                  className={styles.contactTypeItem}
                  style={{ transform: `translateX(${item.offset}px)` }}
                >
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Email Column */}
          <div className={styles.column}>
            <div
              className={styles.emailHeader}
              style={{ transform: "translateX(70px)" }}
            >
              Email
            </div>
            <div className={styles.list}>
              {EMAILS.map((item) => (
                <div
                  key={item.text}
                  className={styles.emailItem}
                  style={{ transform: `translateX(${item.offset}px)` }}
                >
                  <Link href={item.href} className={styles.listLink}>
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Pills Row - shifted to follow parallelogram slant */}
        <div className={styles.pillsRow}>
          <div className={styles.pillWrapper}>
            <img
              src="/images/media-press/contact-pill-border.svg"
              alt=""
              aria-hidden="true"
              className={styles.pillBorderSvg}
              width={504}
              height={70}
            />
            <a href="tel:+6750000000" className={styles.pillContent}>
              <img
                src="/images/media-press/phone.png"
                alt=""
                aria-hidden="true"
                className={styles.pillIcon}
                width={24}
                height={24}
              />
              <span>Media Desk: +675 XXX XXX XXX</span>
            </a>
          </div>

          <div className={styles.pillWrapper}>
            <img
              src="/images/media-press/contact-pill-border.svg"
              alt=""
              aria-hidden="true"
              className={styles.pillBorderSvg}
              width={504}
              height={70}
            />
            <div className={styles.pillContent}>
              <img
                src="/images/media-press/calendar.png"
                alt=""
                aria-hidden="true"
                className={styles.pillIcon}
                width={24}
                height={24}
              />
              <span>Mon–Fri | 9 AM–5 PM | GMT+10</span>
            </div>
          </div>
        </div>
      </div>
    </MediaDialogFrame>
  );
}
