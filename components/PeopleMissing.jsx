import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { cardSize } from "../config/sizes";
import { Card } from "./Card";
import { useRef, useEffect, useState } from "react";
import { useWidthObserver } from "../hooks/useSizeObserver";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export const PeopleMissing = () => {
  const sliderRef = useRef(null);
  const [persons = [], setPersons] = useState([]);
  const { width, setWidth } = useWidthObserver({ targetRef: sliderRef });
  useEffect(() => {
    if (!width) {
      let newWidth = document.querySelector("#slider-wrapper").clientWidth;
      setWidth(newWidth);
    }
    async function getPersons() {
      try {
        const response = await fetch(
          `/api/persons?${new URLSearchParams({ type: "all" })}`
        );
        const persons = await response.json();
        console.log(persons);
        setPersons(persons);
      } catch (error) {
        console.log(error);
      }
    }
    getPersons();
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
        totalSlides={persons.length}
        isIntrinsicHeight
        className="relative"
      >
        <div id="slider-wrapper" className="px-20" ref={sliderRef}>
          <Slider className="p-2" classNameTray="gap-8">
            {persons.map((person, index) => {
              return (
                //Change the key to the ID of the person
                <Slide index={index} key={person._id}>
                  <Card {...person} />
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
