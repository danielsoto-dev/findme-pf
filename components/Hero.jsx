import { Button } from "./Button";
import { Card } from "./Card";
import Image from "next/image";
export const Hero = () => {
  return (
    <div className="text-center mt-10">
      <h2 className="text-2xl mb-5 ">
        We are an website build to connect people!
      </h2>
      <Image
        alt="A colorfull Colombian Street"
        src="https://images.unsplash.com/photo-1576018753502-1a55b66cc44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80"
        width={900}
        height={400}
      />

      <Button className="block mx-auto text-xl mt-10">Register here!</Button>

      <h3 className="text-2xl mb-5 mt-10">Missing people in your area</h3>
      <div className="flex justify-around gap-x-5 p-5 border-black border-[1px]">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};
