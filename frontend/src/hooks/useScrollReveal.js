import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once visible, we can unobserve if we only want animation once
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealElements.forEach((el) => observer.observe(el));

    // Handle performance bars custom trigger
    const perfBarsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-width') || '100%';
          bar.style.width = targetWidth;
        }
      });
    }, observerOptions);

    const perfBars = document.querySelectorAll('.perf-bar');
    perfBars.forEach((bar) => perfBarsObserver.observe(bar));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      perfBars.forEach((bar) => perfBarsObserver.unobserve(bar));
    };
  }, []);
};
