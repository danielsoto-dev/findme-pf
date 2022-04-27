import { useEffect, useState } from "react";
export const useWidthObserver = ({ targetRef }) => {
  const [width, setWidth] = useState(targetRef.current?.clientWidth);
  const getSliderContainerWidth = () => {
    const newWidth = targetRef.current?.clientWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", getSliderContainerWidth);
    return () => {
      window.removeEventListener("resize", getSliderContainerWidth);
    };
  }, []);
  console.log(targetRef, width);
  return { width, setWidth };
};
