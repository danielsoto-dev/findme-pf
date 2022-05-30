import { Button } from "./Button";
import "pure-react-carousel/dist/react-carousel.es.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
export const Hero = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <div className="text-center mt-10">
      <h2 className="text-3xl my-8 mt-20 ">
        Nuestro objetivo es conectar personas dandoles las herramientas más
        modernas
      </h2>
      <Image
        alt="A colorfull Colombian Street"
        src="https://images.unsplash.com/photo-1576018753502-1a55b66cc44a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1746&q=80"
        width={900}
        height={400}
      />
      {!user && (
        <Button
          onClick={() => {
            router.push("/api/signup");
          }}
          className="block mx-auto text-xl mt-10 hover:bg-black hover:text-white ease-in-out duration-300 transition-colors"
        >
          ¡Registrate aqui!
        </Button>
      )}
    </div>
  );
};
