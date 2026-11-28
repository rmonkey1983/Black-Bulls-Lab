"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState({ pathname, children });
  const isCurrent = displayed.pathname === pathname;

  // Initialize .reveal-section scroll triggers as soon as the new page is in the DOM
  useEffect(() => {
    const sections = document.querySelectorAll('.reveal-section');
    const ctx = gsap.context(() => sections.forEach(section => {
      gsap.fromTo(section, 
        { opacity: 0, y: 30 },
        {
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }));

    return () => ctx.revert();
  }, [displayed.pathname]);

  useEffect(() => {
    // First load and same-page updates render directly: only real navigations animate.
    if (!isCurrent) {
      const overlay = overlayRef.current;
      const container = containerRef.current;
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayed({ pathname, children });
          window.scrollTo(0, 0);
          
          // Exit overlay - snappier animation
          gsap.to(overlayRef.current, {
            scaleY: 0,
            duration: 0.8,
            ease: "expo.inOut",
            transformOrigin: "top"
          });

          // Reveal content - synchronized with overlay exit, snappier and no delay to avoid blank screens
          gsap.fromTo(containerRef.current,
            { opacity: 0, y: 15, filter: "blur(5px)" },
            { 
              opacity: 1, 
              y: 0, 
              filter: "blur(0px)", 
              duration: 0.8, 
              ease: "expo.out",
              clearProps: "opacity,transform,filter",
              onComplete: () => {
                // Critical: Refresh ScrollTriggers now that the layout is stable at y:0
                ScrollTrigger.refresh();
                
                // Backup refresh after a short delay for image load adjustments
                setTimeout(() => {
                  ScrollTrigger.refresh();
                }, 200);
              }
            }
          );
        }
      });

      // Enter overlay - snappier timing
      tl.to(overlayRef.current, {
        scaleY: 1,
        duration: 0.6,
        ease: "expo.inOut",
        transformOrigin: "bottom"
      });

      tl.to(containerRef.current, {
        opacity: 0,
        y: -20,
        filter: "blur(5px)",
        duration: 0.5,
        ease: "expo.in"
      }, "-=0.5");

      return () => {
        // Interrupted navigation: never leave the page covered or hidden.
        if (tl.progress() < 1) {
          tl.kill();
          gsap.set(overlay, { scaleY: 0 });
          gsap.set(container, { clearProps: "opacity,transform,filter" });
        }
      };
    }
  }, [pathname, children, isCurrent]);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-9999 bg-accent-gold scale-y-0 will-change-transform"
      />
      <div ref={containerRef} className="will-change-transform">
        {isCurrent ? children : displayed.children}
      </div>
    </>
  );
}

