import Image from "next/image";
import { Link } from "./Link";
export const Header = () => {
  return (
    <header className="flex justify-around items-center h-[80px]">
      <h1 className="text-4xl">
        <Link animated={true} href="/">
          Find<span className="text-blue-500">Me</span>
        </Link>
      </h1>

      <nav className="justify-around items-center flex w-[180px]">
        <Link href="/about">About Us</Link>
        <Link href="/contact-us">Contact Us</Link>
      </nav>
      <div className="justify-around items-center flex w-[180px]">
        <Link href="/sign-up">Sign Up</Link>
        <Link
          href="/log-in"
          animated={false}
          className="border-[1px] border-black rounded-md px-3 py-[5px]"
        >
          Log In
        </Link>
      </div>
    </header>
  );
};
