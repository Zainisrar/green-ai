/**
 * Central CMS Configuration
 *
 * Points to the active Green CMS service.
 * Can be overridden by NEXT_PUBLIC_CMS_URL in the environment.
 */
export const CMS_BASE_URL =
  process.env.NEXT_PUBLIC_CMS_URL?.replace(/\/+$/, "") ||
  "http://217.216.76.178:4000";

