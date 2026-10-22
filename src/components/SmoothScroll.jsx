import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Make lenis available globally for programmatic smooth scrolls (e.g. back to top)
    window.__lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const animId = requestAnimationFrame(raf);

    // If there is an initial hash in URL, scroll to it
    if (window.location.hash) {
      setTimeout(() => {
        const target = document.querySelector(window.location.hash);
        if (target) {
          lenis.scrollTo(target, { offset: -70 });
        }
      }, 200);
    } else {
      // Otherwise start at top
      lenis.scrollTo(0, { immediate: true });
    }

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [pathname]);

  return <>{children}</>;
}
