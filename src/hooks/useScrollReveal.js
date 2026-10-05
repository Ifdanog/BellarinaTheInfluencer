import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal — triggers when element enters viewport.
 * Returns { ref, isVisible }.
 * @param {object} options
 * @param {string}  options.threshold  - IntersectionObserver threshold (default '0.12')
 * @param {string}  options.rootMargin - margin around viewport (default '-60px')
 * @param {boolean} options.once       - only fire once (default true)
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = '-60px',
  once = true,
} = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
}

/**
 * useActiveSection — tracks which section id is currently in view.
 * @param {string[]} sectionIds - array of element ids to watch
 * @returns {string} active section id
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] || '');

  useEffect(() => {
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return active;
}