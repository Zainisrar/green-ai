"use client";

import React from "react";

/**
 * Last-resort error boundary.
 *
 * `app/error.tsx` renders *inside* the root layout, so it cannot catch a throw
 * that happens while the root layout itself is evaluating (next/font failures,
 * `metadataBase: new URL(...)`, the Redux/Query providers). Without this file
 * those errors fall through to Next's bare built-in "Application error" screen.
 *
 * Deliberately self-contained: its own <html>/<body>, inline styles only, and
 * no context-dependent hooks -- anything it depends on could be the thing that
 * is already broken.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Root layout error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
          backgroundColor: "#ffffff",
          color: "#1f2937",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <main style={{ maxWidth: "32rem", textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 0.75rem",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#4caf50",
            }}
          >
            GREEN Limited
          </p>
          <h1
            style={{
              margin: "0 0 1rem",
              fontSize: "1.75rem",
              lineHeight: 1.25,
              fontWeight: 700,
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              margin: "0 0 1.75rem",
              fontSize: "1rem",
              lineHeight: 1.6,
              color: "#4b5563",
            }}
          >
            We hit an unexpected error while loading this page. Please try again
            in a moment.
          </p>

          {error.digest ? (
            <p
              style={{
                margin: "0 0 1.75rem",
                fontSize: "0.8125rem",
                color: "#6b7280",
              }}
            >
              Reference: <code>{error.digest}</code>
            </p>
          ) : null}

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                padding: "0.625rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#4caf50",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            {/* Plain anchor, not next/link: a full reload is the point here. */}
            <a
              href="/"
              style={{
                padding: "0.625rem 1.5rem",
                fontSize: "0.9375rem",
                fontWeight: 600,
                color: "#4caf50",
                border: "2px solid #4caf50",
                borderRadius: "0.5rem",
                textDecoration: "none",
              }}
            >
              Go home
            </a>
          </div>

          <p
            style={{
              margin: "2rem 0 0",
              fontSize: "0.8125rem",
              color: "#6b7280",
            }}
          >
            Still stuck?{" "}
            <a href="mailto:info@green.com.pg" style={{ color: "#4caf50" }}>
              info@green.com.pg
            </a>
          </p>
        </main>
      </body>
    </html>
  );
}
