import { useEffect, useRef, useState } from 'react';

export function useCountUp({ end, duration = 1800, suffix = '', prefix = '' }) {
  const [value, setValue] = useState(prefix + '0' + suffix);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          const startTime = performance.now();

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * end);
            setValue(prefix + current.toLocaleString() + suffix);
            if (progress < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, suffix, prefix]);

  return { ref, value };
}
