import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { cardSize } from "../config/sizes";
import { Card } from "./Card";
import { useRef, useLayoutEffect } from "react";
import { useWidthObserver } from "../hooks/useSizeObserver";
const peopleInfo = [
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
  {
    fullName: "Daniel Soto Jaimes",
    age: 18,
    location: "Barranquilla, Atlántico",
  },
];
export const PeopleMissing = () => {
  const sliderRef = useRef(null);
  const { width, setWidth } = useWidthObserver({ targetRef: sliderRef });
  useLayoutEffect(() => {
    //fixes the initial state of the slider, when the component is mounted
    // otherwise the width will be undefined
    if (!width) {
      let newWidth = document.querySelector("#slider-wrapper").clientWidth;
      setWidth(newWidth);
    }
  }, []);

  const visibleSlides = Math.floor(width / cardSize.width);
  return (
    <div className="text-center">
      <h3 className="text-2xl mb-5 mt-10">Missing people in your area</h3>{" "}
      <CarouselProvider
        // infinite
        naturalSlideWidth={cardSize.width}
        naturalSlideHeight={cardSize.height}
        visibleSlides={visibleSlides}
        totalSlides={peopleInfo.length}
        isIntrinsicHeight
      >
        <div id="slider-wrapper" ref={sliderRef}>
          <Slider>
            {peopleInfo.map((person, index) => {
              return (
                //Change the key to the ID of the person
                <Slide index={index} key={person.fullName + index}>
                  <Card
                    fullName={person.fullName}
                    age={person.age}
                    location={person.location}
                  />
                </Slide>
              );
            })}
          </Slider>
        </div>
        <ButtonBack>
          <p className="text-xl font-bold">Back</p>
        </ButtonBack>
        <ButtonNext>
          <p className="ml-3 text-xl font-bold">Next</p>
        </ButtonNext>
      </CarouselProvider>
    </div>
  );
};
