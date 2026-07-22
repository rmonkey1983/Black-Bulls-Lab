"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationRegistration {
  type: "reveal" | "stagger" | "parallax" | "fade";
  args: any[];
}

export function useCinematic() {
  const registrationsRef = useRef<AnimationRegistration[]>([]);

  const revealOnScroll = (selector: string, stagger = 0.2) => {
    if (!registrationsRef.current.some(r => r.type === "reveal" && r.args[0] === selector)) {
      registrationsRef.current.push({ type: "reveal", args: [selector, stagger] });
    }
  };

  const staggerReveal = (parentSelector: string, childSelector: string) => {
    if (!registrationsRef.current.some(r => r.type === "stagger" && r.args[0] === parentSelector && r.args[1] === childSelector)) {
      registrationsRef.current.push({ type: "stagger", args: [parentSelector, childSelector] });
    }
  };

  const softParallax = (target: string | React.RefObject<any>, speed = 0.1) => {
    if (!registrationsRef.current.some(r => r.type === "parallax" && r.args[0] === target && r.args[1] === speed)) {
      registrationsRef.current.push({ type: "parallax", args: [target, speed] });
    }
  };

  const slowFade = (selector: string) => {
    if (!registrationsRef.current.some(r => r.type === "fade" && r.args[0] === selector)) {
      registrationsRef.current.push({ type: "fade", args: [selector] });
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      registrationsRef.current.forEach((reg) => {
        if (reg.type === "reveal") {
          const [selector] = reg.args;
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
        } else if (reg.type === "stagger") {
          const [parentSelector, childSelector] = reg.args;
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
        } else if (reg.type === "parallax") {
          const [target, speed] = reg.args;
          const el = typeof target === "string" ? target : (target && "current" in target ? target.current : target);
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
        } else if (reg.type === "fade") {
          const [selector] = reg.args;
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
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return { revealOnScroll, staggerReveal, softParallax, slowFade };
}
