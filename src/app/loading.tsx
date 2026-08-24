/**
 * Route-transition fallback.
 *
 * Every page in this app is a client component, so moving between routes means
 * fetching that route's JavaScript chunk first. Without a loading boundary the
 * previous page just sits there with no feedback until the new chunk arrives,
 * which reads as "the site is stuck" even when it is only a short wait.
 *
 * This is deliberately lightweight: no imports, no context, no data. It renders
 * inside the root layout, so the header and shell stay put and only the page
 * body swaps -- which is what makes the transition feel immediate.
 */
export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        width: "100%",
      }}
    >
      <span
        style={{
          width: 36,
          height: 36,
          display: "inline-block",
          border: "3px solid #d8ecdd",
          borderTopColor: "#23B14D",
          borderRadius: "50%",
          animation: "greenai-spin 0.7s linear infinite",
        }}
      />
      {/* Scoped keyframes: styled-jsx is not used here so the animation is
          defined inline to keep this component dependency-free. */}
      <style>{`
        @keyframes greenai-spin { to { transform: rotate(360deg); } }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Loading page"] > span { animation-duration: 2.4s; }
        }
      `}</style>
    </div>
  );
}
