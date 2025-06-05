import React, { useState, useEffect, useRef } from "react";

function useOnScreen() {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return [ref, isVisible];
}

const FlyInSection = ({ children }) => {
  const [ref, visible] = useOnScreen();

  return (
    <div ref={ref} className={`fly-in ${visible ? "visible" : ""}`}>
      {children}
    </div>
  );
};

export default FlyInSection;
