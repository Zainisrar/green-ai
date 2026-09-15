"use client";

import MediaDialogFrame from "./MediaDialogFrame";
import styles from "./MediaKitDownload.module.css";

interface MediaKitDownloadProps {
  isOpen: boolean;
  onClose: () => void;
}

const ROWS = [
  // Row 0
  [
    {
      id: "1",
      label: "Brand Logo Files (PNG, SVG)",
      file: "/media-kit/brand-logos.zip",
    },
    {
      id: "2",
      label: "Executive Headshots",
      file: "/media-kit/executive-headshots.zip",
    },
    {
      id: "3",
      label: "Company Profile (PDF)",
      file: "/media-kit/company-profile.pdf",
    },
  ],
  // Row 1
  [
    {
      id: "4",
      label: "Fast Facts & Stats Sheet",
      file: "/media-kit/fast-facts-stats-sheet.pdf",
    },
    {
      id: "5",
      label: "Approved Images For Press Use",
      file: "/media-kit/approved-press-images.zip",
    },
    {
      id: "6",
      label: "Quote Sheet / Boilerplate",
      file: "/media-kit/quote-sheet-boilerplate.pdf",
    },
  ],
];

const rowClasses = [
  styles.row0,
  styles.row1,
  styles.row2,
  styles.row3,
  styles.row4,
];

export default function MediaKitDownload({
  isOpen,
  onClose,
}: MediaKitDownloadProps) {
  return (
    <MediaDialogFrame
      isOpen={isOpen}
      onClose={onClose}
      title="Media Kit Download"
      titleExtra={
        <a
          href="/media-kit/green-media-kit.zip"
          download
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Download <em>GREEN Media Kit (ZIP)</em>
        </a>
      }
      labelledBy="media-kit-title"
    >
      <div className={styles.container}>
        <div className={styles.grid}>
          {ROWS.map((row, index) => (
            <div
              key={`row-${row[0]?.id || "group"}`}
              className={`${styles.row} ${rowClasses[index] || ""}`}
            >
              {row.map((item) => (
                <a
                  key={item.id}
                  href={item.file}
                  download
                  className={styles.downloadBtn}
                >
                  <span className={styles.btnLabel}>{item.label}</span>
                  {/* Download Tray Icon */}
                  <svg
                    className={styles.downloadIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </MediaDialogFrame>
  );
}
