"use client";

import MediaDialogFrame from "./MediaDialogFrame";
import styles from "./MediaKitDownload.module.css";

interface MediaKitDownloadProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DownloadItem {
  id: string;
  label: string;
  file: string;
  isCol2?: boolean;
}

const ROWS: DownloadItem[][] = [
  // Row 0 - starts at x=335px
  [
    {
      id: "brand-logo-1",
      label: "Brand logo files (PNG, SVG)",
      file: "/media-kit/brand-logos.zip",
    },
    {
      id: "headshots-1",
      label: "Executive Headshots",
      file: "/media-kit/executive-headshots.zip",
    },
    {
      id: "profile-1",
      label: "Company Profile (PDF)",
      file: "/media-kit/company-profile.pdf",
      isCol2: true,
    },
  ],
  // Row 1 - starts at x=293px (offset -42px)
  [
    {
      id: "facts-1",
      label: "Fast facts & stats sheet",
      file: "/media-kit/fast-facts-stats-sheet.pdf",
    },
    {
      id: "press-images-1",
      label: "Approved images for press use",
      file: "/media-kit/approved-press-images.zip",
    },
    {
      id: "boilerplate-1",
      label: "Quote Sheet / Boilerplate",
      file: "/media-kit/quote-sheet-boilerplate.pdf",
      isCol2: true,
    },
  ],
  // Row 2 - starts at x=263px (offset -72px)
  [
    {
      id: "brand-logo-2",
      label: "Brand logo files (PNG, SVG)",
      file: "/media-kit/brand-logos.zip",
    },
    {
      id: "headshots-2",
      label: "Executive Headshots",
      file: "/media-kit/executive-headshots.zip",
    },
    {
      id: "profile-2",
      label: "Company Profile (PDF)",
      file: "/media-kit/company-profile.pdf",
      isCol2: true,
    },
  ],
  // Row 3 - starts at x=221px (offset -114px)
  [
    {
      id: "facts-2",
      label: "Fast facts & stats sheet",
      file: "/media-kit/fast-facts-stats-sheet.pdf",
    },
    {
      id: "press-images-2",
      label: "Approved images for press use",
      file: "/media-kit/approved-press-images.zip",
    },
    {
      id: "boilerplate-2",
      label: "Quote Sheet / Boilerplate",
      file: "/media-kit/quote-sheet-boilerplate.pdf",
      isCol2: true,
    },
  ],
  // Row 4 - starts at x=181px (offset -154px)
  [
    {
      id: "brand-logo-3",
      label: "Brand logo files (PNG, SVG)",
      file: "/media-kit/brand-logos.zip",
    },
    {
      id: "headshots-3",
      label: "Executive Headshots",
      file: "/media-kit/executive-headshots.zip",
    },
    {
      id: "profile-3",
      label: "Company Profile (PDF)",
      file: "/media-kit/company-profile.pdf",
      isCol2: true,
    },
  ],
];

const ROW_OFFSETS = [0, -42, -72, -114, -154];

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
              key={`media-kit-row-${index}`}
              className={styles.row}
              style={{
                transform: `translateX(${ROW_OFFSETS[index]}px)`,
              }}
            >
              {row.map((item) => (
                <a
                  key={item.id}
                  href={item.file}
                  download
                  aria-label={`Download ${item.label}`}
                  className={`${styles.downloadBtn} ${item.isCol2 ? styles.col2Btn : ""}`}
                >
                  <span className={styles.btnLabel}>{item.label}</span>
                  {/* Download Tray Icon matching Figma */}
                  <svg
                    className={styles.downloadIcon}
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M9 2.5V11M5.5 7.5L9 11L12.5 7.5M3 11.5V15.5H15V11.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
