"use client";

import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const BackgroundWrapper = dynamic(() => import("@/components/layout/BackgroundWrapper").then(mod => mod.BackgroundWrapper), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/layout/CustomCursor").then(mod => mod.CustomCursor), { ssr: false });
const ScrollProgress = dynamic(() => import("@/components/layout/ScrollProgress").then(mod => mod.ScrollProgress), { ssr: false });
const GSAPInitializer = dynamic(() => import("@/components/layout/GSAPInitializer").then(mod => mod.GSAPInitializer), { ssr: false });
const SmoothScroll = dynamic(() => import("@/components/layout/SmoothScroll").then(mod => mod.SmoothScroll), { ssr: false });
const CookieBanner = dynamic(() => import("@/components/layout/CookieBanner").then(mod => mod.CookieBanner), { ssr: false });

export function ClientOnlyWrappers() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <GSAPInitializer />
      <BackgroundWrapper />
      <SmoothScroll />
      <CookieBanner />
      <GoogleAnalytics />
    </>
  );
}
