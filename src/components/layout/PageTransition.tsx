"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/useGSAP";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);

  useGSAP(() => {
    // Initial entrance after preloader or first mount
    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.5 }
    );
  }, { scope: containerRef });

  useEffect(() => {
    if (pathname !== undefined) {
      // Transition logic on route change
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        }
      });

      tl.to(containerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: "power2.in"
      });
    }
  }, [pathname, children]);

  return (
    <div ref={containerRef} className="will-change-transform opacity-0">
      {displayChildren}
    </div>
  );
}
