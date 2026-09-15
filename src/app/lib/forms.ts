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
  return Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join(
    " ",
  );
}

export function getCsrfToken() {
  if (typeof document === "undefined") return "";
  return (
    document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content") ?? ""
  );
}

export function buildReachUsPayload(
  overrides: Partial<ReachUsPayload> &
    Pick<ReachUsPayload, "email" | "message">,
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

export async function submitReachUs(
  payload: ReachUsPayload,
): Promise<GsolveResponse> {
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

export interface LoginResponse extends GsolveResponse {
  token?: string;
  user?: {
    id?: string | number;
    email?: string;
    name?: string;
    role?: string;
  };
}

async function handleLoginErrorResponse(response: Response): Promise<never> {
  let serverMessage = "";
  try {
    const errData = await response.json();
    serverMessage =
      errData?.Message ||
      errData?.message ||
      errData?.detail ||
      (typeof errData?.error === "string" ? errData.error : "");
  } catch {
    // Response is not JSON
  }

  if (
    response.status === 400 ||
    response.status === 401 ||
    response.status === 403
  ) {
    throw new Error(
      serverMessage ||
        "Invalid email or password. Please check your credentials and try again.",
    );
  }

  if (response.status === 429) {
    throw new Error(
      serverMessage ||
        "Too many login attempts. Please wait a moment and try again.",
    );
  }

  if (response.status >= 500) {
    throw new Error(
      serverMessage ||
        "Authentication service is temporarily unavailable. Please try again shortly.",
    );
  }

  throw new Error(
    serverMessage ||
      `Login request failed (${response.status}). Please try again.`,
  );
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
    await handleLoginErrorResponse(response);
  }

  return response.json();
}

export async function loginClient(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${GSOLVE_API}/login/user/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    await handleLoginErrorResponse(response);
  }

  return response.json();
}
