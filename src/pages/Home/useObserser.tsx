import { useEffect } from "react";

const useObserser = (options) => {
  const {
    root = null,
    target,
    onIntersect,
    threshold = 0.9,
    rootMargin = "0px",
    enabled = true,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target && target.current;
    if (!el || !enabled) {
      return;
    }
    observer.observe(el);
    return () => {
      observer.unobserve(el);
    };
  }, [target.current]);
};

export default useObserser;
