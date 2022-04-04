import { useEffect, useState } from "react";
export const useWidthObserver = ({ targetRef }) => {
  //mirar si esto se puede sacar en un custom hook
  const [width, setWidth] = useState(targetRef.current?.clientWidth);
  // We devide the width by the card size to get the number of cards that we can show in the carousel
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
