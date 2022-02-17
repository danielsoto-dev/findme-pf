import Image from "next/image";
import { Link } from "./Link";
import { useUser } from "@auth0/nextjs-auth0";
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

      <nav className="justify-around items-center flex w-[180px]">
        <Link href="/about">About Us</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>
      <div className="justify-around items-center flex w-[180px]">
        {user && !isLoading && !error ? (
          <LoggedIn user={user} />
        ) : (
          <NotLoggedIn />
        )}
      </div>
    </header>
  );
};

const NotLoggedIn = () => {
  return (
    <>
      <a href="/sign-up">Sign Up</a>
      <a
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
      <span className="text-blue-500 mr-2">{user.email}</span>
      <span className="text-blue-500">
        <a href="/api/auth/logout">Logout</a>
      </span>
    </>
  );
};
