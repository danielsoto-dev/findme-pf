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
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
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
        className="relative"
      >
        <div id="slider-wrapper" className="px-20" ref={sliderRef}>
          <Slider className="p-2" classNameTray="gap-8">
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
        <div className="text-5xl">
          <ButtonBack className="absolute left-5 top-[50%]">
            <p>
              <HiOutlineChevronLeft />
            </p>
          </ButtonBack>
          <ButtonNext className="absolute right-5 top-[50%]">
            <p>
              <HiOutlineChevronRight />
            </p>
          </ButtonNext>
        </div>
      </CarouselProvider>
    </div>
  );
};
