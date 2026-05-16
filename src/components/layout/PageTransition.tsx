"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (pathname !== undefined) {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);
          
          // Exit overlay
          gsap.to(overlayRef.current, {
            scaleY: 0,
            duration: 1.2,
            ease: "expo.inOut",
            transformOrigin: "top"
          });

          // Reveal content
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 40, filter: "blur(10px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out", delay: 0.2 }
          );
        }
      });

      // Enter overlay
      tl.to(overlayRef.current, {
        scaleY: 1,
        duration: 1,
        ease: "expo.inOut",
        transformOrigin: "bottom"
      });

      tl.to(containerRef.current, {
        opacity: 0,
        y: -40,
        filter: "blur(10px)",
        duration: 0.8,
        ease: "expo.in"
      }, "-=0.8");
    }
  }, [pathname, children]);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-9999 bg-accent-gold scale-y-0 will-change-transform"
      />
      <div ref={containerRef} className="will-change-transform">
        {displayChildren}
      </div>
    </>
  );
}
