import React, { useEffect, useState } from "react";

const FadeSlideIn: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={isVisible ? "animate-fade-slide-in" : "opacity-0"}>
      {children}
    </div>
  );
};

export default FadeSlideIn;
