"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPConfig {
  scope?: React.RefObject<Element | null> | string | Element;
  dependencies?: React.DependencyList;
}

/**
 * Custom hook for GSAP animations with automatic cleanup.
 * Supports both an array of dependencies or a config object { scope, dependencies }.
 */
export function useGSAP(
  callback: gsap.ContextFunc,
  config: React.DependencyList | GSAPConfig = []
) {
  const ctx = useRef<gsap.Context | null>(null);

  // Normalize arguments
  const isConfigObject = !Array.isArray(config);
  const deps = isConfigObject ? (config as GSAPConfig).dependencies || [] : (config as React.DependencyList);
  const scope = isConfigObject ? (config as GSAPConfig).scope : undefined;

  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Use scope if provided (can be a ref or a selector/element)
    const isRef = scope && typeof scope !== "string" && "current" in scope;
    const contextScope = isRef ? (scope as React.RefObject<Element | null>).current : scope;

    // If a ref scope is provided but it's null, skip this effect cycle
    if (isRef && !contextScope) return;

    ctx.current = gsap.context(callback, contextScope ?? undefined);
    
    return () => {
      ctx.current?.revert();
      ctx.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
