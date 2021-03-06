import { Link } from "./Link";
import { useUser } from "@auth0/nextjs-auth0";
import { DropDown } from "./DropDown";
import { useMobileNavbar } from "../contexts/mobile-navbar";
import { MobileNavbar } from "./MobileNavbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";
import { checkIfUserIsInDatabase } from "../lib/dbActions";
const mobileStyles = `sm:flex`;
export const Header = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const { isOpen, toggle, setIsOpen } = useMobileNavbar();
  useEffect(() => {
    async function checkIfUserIsRegister() {
      if (user && !isLoading) {
        console.log("user pre fetch", user);
        const data = await checkIfUserIsInDatabase(user);
        const { hasFilledProfile } = data;
        if (!hasFilledProfile) {
          router.push("/register");
          toast("Por favor llene el formulario antes de proceder", {
            icon: "ℹ",
            id: "checkIfUserIsRegister",
            duration: 3000,
          });
        }
      }
    }
    try {
      checkIfUserIsRegister();
    } catch (error) {
      console.log(error);
    }
  }, [user, isLoading]);

  return (
    <header className="sticky top-0 pt-10 px-4 md:static z-10 bg-white flex justify-around items-center h-[80px]">
      <h1 className="text-4xl">
        <Link href="/">
          Find<span className="text-blue-500">Me</span>
        </Link>
      </h1>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <MobileNavbar
        className="sm:hidden text-2xl"
        user={user}
        onUnmount={() => setIsOpen(false)}
        isOpen={isOpen}
        onClick={toggle}
      />
      <nav className={`justify-around items-center hidden ${mobileStyles}`}>
        <Link className="mx-4" href="/about">
          Acerca de Nosotros
        </Link>
        <Link className="mx-4" href="/person-register">
          Registrar una persona
        </Link>
        <Link className="mx-4" href="/contact-us">
          Contactanos
        </Link>
        {user && !isLoading && !error ? (
          <LoggedIn user={user} />
        ) : (
          <NotLoggedIn />
        )}
      </nav>
    </header>
  );
};

const NotLoggedIn = () => {
  return (
    <>
      <a className="mx-4 underline-effect" href="/api/signup">
        Sign Up
      </a>
      <a
        href="/api/auth/login"
        className="border-[1px] transition duration-150 ease-in border-black rounded-md px-3 py-[5px] focus:bg-black focus:text-white hover:bg-black hover:text-white"
      >
        Log In
      </a>
    </>
  );
};
const LoggedIn = ({ user }) => {
  return (
    <>
      <Link href="/find" className="mx-4">
        Encuentra personas
      </Link>
      <span className="text-blue-500 mx-4">{user.name}</span>
      <DropDown user={user} />
    </>
  );
};
