import { Button } from "./Button";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import { cardSize } from "../config/sizes";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import { Card } from "./Card";
import { useEffect, useRef, useState } from "react";
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
export const Hero = () => {
  const sliderRef = useRef(null);
  const { width, setWidth } = useWidthObserver({ targetRef: sliderRef });
  useEffect(() => {
    //fixes the initial state of the slider, when the component is mounted
    // otherwise the width will be undefined
    if (!width) {
      let newWidth = document.querySelector("#slider-wrapper").clientWidth;
      setWidth(newWidth);
    }
  }, []);

  const visibleSlides = Math.floor(width / cardSize.width);
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl mb-5 ">
        We are an website built to connect people!
      </h2>
      <Image
        alt="A colorfull Colombian Street"
        src="https://images.unsplash.com/photo-1576018753502-1a55b66cc44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80"
        width={900}
        height={400}
      />
      <Button className="block mx-auto text-xl mt-10">Register here!</Button>
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
