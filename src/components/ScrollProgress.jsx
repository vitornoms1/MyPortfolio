import { useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const thumbRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      if (thumbRef.current) {
        thumbRef.current.style.height = `${progress * 100}%`;
      }
      rafRef.current = 0;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className="hidden md:block fixed top-24 bottom-24 right-6 w-[2px] bg-line z-40"
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        className="absolute top-0 left-0 w-full bg-accent"
        style={{ height: 0 }}
      />
    </div>
  );
};

export default ScrollProgress;
