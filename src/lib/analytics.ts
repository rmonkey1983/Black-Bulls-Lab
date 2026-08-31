export type LeadType = "corporate" | "private" | "partner" | "contact";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    __bblGaReady?: boolean;
  }
}

const CONSENT_COOKIE = "bbl_cookie_consent";

function hasAnalyticsConsent() {
  if (typeof document === "undefined") return false;
  const raw = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];
  if (!raw) return false;

  try {
    return JSON.parse(decodeURIComponent(raw)).analytics === true;
  } catch {
    return false;
  }
}

export function trackEvent(name: string, params: Record<string, string> = {}) {
  if (
    typeof window !== "undefined" &&
    hasAnalyticsConsent() &&
    window.__bblGaReady === true &&
    window.gtag
  ) {
    window.gtag("event", name, params);
  }
}

export function trackLead(leadType: LeadType) {
  trackEvent("generate_lead", { lead_type: leadType });
}

export function trackWaitlistSignup() {
  trackEvent("sign_up", { method: "liar_waitlist" });
}

export function trackWhatsAppClick(location: string) {
  trackEvent("click_whatsapp", { location });
}
