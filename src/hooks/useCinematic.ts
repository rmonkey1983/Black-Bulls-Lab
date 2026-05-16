"use client";

import { useGSAP } from "./useGSAP";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useCinematic() {
  const revealOnScroll = (selector: string, stagger = 0.2) => {
    useGSAP(() => {
      const elements = gsap.utils.toArray(selector);
      
      elements.forEach((el: any) => {
        gsap.fromTo(el, 
          { 
            opacity: 0, 
            y: 60, 
            filter: "blur(20px)" 
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 2,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });
  };

  const staggerReveal = (parentSelector: string, childSelector: string) => {
    useGSAP(() => {
      gsap.fromTo(`${parentSelector} ${childSelector}`,
        { 
          opacity: 0, 
          y: 40, 
          filter: "blur(10px)" 
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: parentSelector,
            start: "top 80%"
          }
        }
      );
    });
  };

  const softParallax = (target: string | React.RefObject<any>, speed = 0.1) => {
    useGSAP(() => {
      const el = typeof target === "string" ? target : target.current;
      if (!el) return;
      
      gsap.to(el, {
        yPercent: speed * 100,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  };

  const slowFade = (selector: string) => {
    useGSAP(() => {
      gsap.fromTo(selector, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 3, 
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: selector,
            start: "top 90%"
          }
        }
      );
    });
  };

  return { revealOnScroll, staggerReveal, softParallax, slowFade };
}
