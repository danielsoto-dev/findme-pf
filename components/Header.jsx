import Image from "next/image";
import { Link } from "./Link";
import { useUser } from "@auth0/nextjs-auth0";
import { DropDown } from "./DropDown";
export const Header = () => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    <header className="flex justify-around items-center h-[80px]">
      <h1 className="text-4xl">
        <Link href="/">
          Find<span className="text-blue-500">Me</span>
        </Link>
      </h1>
      <nav className="justify-around items-center flex ">
        <Link className="mx-4" href="/about">
          About Us
        </Link>
        <Link className="mx-4" href="/contact-us">
          Contact Us
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
      <a className="mx-4 underline-effect" href="/sign-up">
        Sign Up
      </a>
      <a
        className="mx-4"
        href="/api/auth/login"
        className="border-[1px] border-black rounded-md px-3 py-[5px]"
      >
        Log In
      </a>
    </>
  );
};
const LoggedIn = ({ user }) => {
  return (
    <>
      <span className="text-blue-500 mr-2">{user.name}</span>
      <DropDown user={user} />
    </>
  );
};
