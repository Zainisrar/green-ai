import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import QueryProvider from "./providers/QueryProvider";
import { ReduxProvider } from "../providers/ReduxProvider";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GREEN Limited - Sustainable Energy Solutions for the Pacific",
    template: "%s | GREEN Limited"
  },
  description: "Leading provider of renewable energy solutions including solar power, energy storage, and sustainable infrastructure across the Pacific region. Powering communities with clean energy.",
  keywords: [
    "renewable energy",
    "solar power",
    "energy storage",
    "sustainable energy",
    "GREEN Limited",
    "Pacific energy solutions",
    "clean energy",
    "solar installation",
    "energy infrastructure"
  ],
  authors: [{ name: "GREEN Limited" }],
  creator: "GREEN Limited",
  publisher: "GREEN Limited",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://example.com",
    title: "GREEN Limited - Sustainable Energy Solutions for the Pacific",
    description: "Leading provider of renewable energy solutions including solar power, energy storage, and sustainable infrastructure across the Pacific region.",
    siteName: "GREEN Limited",
    images: [
      {
        url: "/images/heroSection/logo.png",
        width: 1200,
        height: 630,
        alt: "GREEN Limited Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GREEN Limited - Sustainable Energy Solutions for the Pacific",
    description: "Leading provider of renewable energy solutions including solar power, energy storage, and sustainable infrastructure across the Pacific region.",
    images: ["/images/heroSection/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#4CAF50",
      },
    ],
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <ReduxProvider>
          <QueryProvider>
            {children}
          </QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
