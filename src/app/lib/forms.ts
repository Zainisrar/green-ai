export const GSOLVE_API = "https://app-gsolve.green.com.pg";

export interface ReachUsPayload {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  phone_dial_code: string;
  phone_country_code: string;
  message: string;
  is_whatsapp_number: boolean;
  lead_type: number;
  login_from: number;
  source: number;
  csrfmiddlewaretoken: string;
}

export interface GsolveResponse {
  Code?: string;
  Message?: string;
}

export function generateCaptcha() {
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(" ");
}

export function getCsrfToken() {
  if (typeof document === "undefined") return "";
  return document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? "";
}

export function buildReachUsPayload(
  overrides: Partial<ReachUsPayload> & Pick<ReachUsPayload, "email" | "message">,
): ReachUsPayload {
  return {
    firstname: "",
    lastname: "",
    phone: "",
    phone_dial_code: "+675",
    phone_country_code: "pg",
    is_whatsapp_number: false,
    lead_type: 329,
    login_from: 60,
    source: 82,
    csrfmiddlewaretoken: getCsrfToken(),
    ...overrides,
  };
}

export async function submitReachUs(payload: ReachUsPayload): Promise<GsolveResponse> {
  const response = await fetch(`${GSOLVE_API}/submit/reach_us/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Submission failed (${response.status})`);
  }

  return response.json();
}

export async function loginSupplyPartner(
  email: string,
  password: string,
): Promise<GsolveResponse> {
  const response = await fetch(`${GSOLVE_API}/login/supply_partner/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password. Please try again.");
  }

  return response.json();
}
