import { expect, test } from "@playwright/test";
import { fetchApi } from "../src/app/lib/api";

test("forwards a pre-aborted caller signal to fetch", async () => {
  const callerController = new AbortController();
  const abortReason = new DOMException("Request cancelled", "AbortError");
  callerController.abort(abortReason);

  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const signal = init?.signal as AbortSignal;
    expect(signal.aborted).toBe(true);
    expect(signal.reason).toBe(abortReason);
    throw abortReason;
  };

  try {
    await expect(
      fetchApi("/api/test", { signal: callerController.signal }),
    ).rejects.toBe(abortReason);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
