import { useEffect, useState, useRef } from 'react';

export function useIntersectionObserver(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const elementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Once it becomes visible, we can keep it visible or toggle
                // By default we just toggle, or set true once if we want "reveal once"
                // Esecuzione standard: animazione 'reveal once'
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Smettiamo di osservare una volta rivelato
                    observer.unobserve(element);
                }
            },
            {
                threshold: 0.1, // Default a 10%
                rootMargin: '0px 0px -50px 0px', // Trigger appena prima del bottom
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options]);

    return { ref: elementRef, inView: isIntersecting };
}
