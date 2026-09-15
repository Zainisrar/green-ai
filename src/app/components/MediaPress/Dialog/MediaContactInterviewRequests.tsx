"use client";

import Link from "next/link";
import styles from "./MediaContactInterviewRequests.module.css";
import MediaDialogFrame from "./MediaDialogFrame";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

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
    >
      <div className={styles.container}>
        {/* Top 2 Columns */}
        <div className={styles.columns}>
          {/* Contact Type Column */}
          <div className={styles.column}>
            <h3 className={styles.colHeader}>Contact Type</h3>
            <ul className={styles.list}>
              <li className={styles.listItem}>General Media Inquiries</li>
              <li className={styles.listItem}>Interview Requests</li>
              <li className={styles.listItem}>Speaking Engagements</li>
            </ul>
          </div>

          {/* Email Column */}
          <div className={styles.column}>
            <h3 className={styles.colHeader}>Email</h3>
            <ul className={styles.list}>
              <li>
                <Link
                  href="mailto:media@green.com.pg"
                  className={styles.listLink}
                >
                  media@green.com.pg
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:comms.director@green.com.pg"
                  className={styles.listLink}
                >
                  comms.director@green.com.pg
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:outreach@green.com.pg"
                  className={styles.listLink}
                >
                  outreach@green.com.pg
                </Link>
              </li>
            </ul>
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
            />
            <div className={styles.pillContent}>
              <img
                src="/images/media-press/phone.png"
                alt=""
                aria-hidden="true"
                className={styles.pillIcon}
              />
              <span>Media Desk: +675 XXX XXX XXX</span>
            </div>
          </div>

          <div className={styles.pillWrapper}>
            <img
              src="/images/media-press/contact-pill-border.svg"
              alt=""
              aria-hidden="true"
              className={styles.pillBorderSvg}
            />
            <div className={styles.pillContent}>
              <img
                src="/images/media-press/calendar.png"
                alt=""
                aria-hidden="true"
                className={styles.pillIcon}
              />
              <span>Mon–Fri | 9 AM–5 PM | GMT+10</span>
            </div>
          </div>
        </div>
      </div>
    </MediaDialogFrame>
  );
}
