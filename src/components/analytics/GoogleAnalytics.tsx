"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { trackWhatsAppClick } from "@/lib/analytics";

const CONSENT_COOKIE = "bbl_cookie_consent";
const CONSENT_EVENT = "bbl-consent-updated";

function hasAnalyticsConsent() {
  if (typeof document === "undefined") return false;
  const raw = document.cookie.split("; ").find((item) => item.startsWith(`${CONSENT_COOKIE}=`))?.split("=")[1];
  if (!raw) return false;
  try {
    return JSON.parse(decodeURIComponent(raw)).analytics === true;
  } catch {
    return false;
  }
}

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const pathname = usePathname();
  const [consented, setConsented] = useState(false);
  const [gaReady, setGaReady] = useState(false);
  const loadedId = useRef<string | null>(null);

  useEffect(() => {
    if (!measurementId) return;

    window.dataLayer = window.dataLayer || [];
    window.__bblGaReady = false;
    window.gtag = window.gtag || ((...args: unknown[]) => window.dataLayer.push(args));
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });

    const syncConsent = () => {
      const allowed = hasAnalyticsConsent();
      setConsented(allowed);
      window.gtag?.("consent", "update", {
        analytics_storage: allowed ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    };

    syncConsent();
    window.addEventListener(CONSENT_EVENT, syncConsent);
    return () => window.removeEventListener(CONSENT_EVENT, syncConsent);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !consented || loadedId.current === measurementId) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.onload = () => {
      loadedId.current = measurementId;
      window.__bblGaReady = true;
      setGaReady(true);
    };
    document.head.appendChild(script);
    window.gtag?.("js", new Date());
    window.gtag?.("config", measurementId, { send_page_view: false });
  }, [consented, measurementId]);

  useEffect(() => {
    if (!measurementId || !consented || !gaReady || loadedId.current !== measurementId) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
    });
  }, [consented, gaReady, measurementId, pathname]);

  useEffect(() => {
    if (!measurementId) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href*="wa.me"]');
      if (link) trackWhatsAppClick(window.location.pathname);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [measurementId]);

  return null;
}
