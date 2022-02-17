import { Button } from "./Button";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import { Card } from "./Card";
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
        naturalSlideWidth={384}
        naturalSlideHeight={400}
        visibleSlides={3}
        totalSlides={peopleInfo.length}
        // isIntrinsicHeight this fixes the height of the carousel, even when it cant contain all the slides
      >
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
