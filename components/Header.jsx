import { Link } from "./Link";
import { useUser } from "@auth0/nextjs-auth0";
import { DropDown } from "./DropDown";
import { useMobileNavbar } from "../contexts/mobile-navbar";
import { MobileNavbar } from "./MobileNavbar";
const mobileStyles = `sm:flex`;

export const Header = () => {
  const { user, error, isLoading } = useUser();
  const { isOpen, toggle, setIsOpen } = useMobileNavbar();
  return (
    <header className="sticky top-0 md:static z-10 bg-white flex justify-around items-center h-[80px]">
      <h1 className="text-4xl">
        <Link href="/">
          Find<span className="text-blue-500">Me</span>
        </Link>
      </h1>
      <MobileNavbar
        className="sm:hidden text-2xl"
        user={user}
        onUnmount={() => setIsOpen(false)}
        isOpen={isOpen}
        onClick={toggle}
      />
      <nav className={`justify-around items-center hidden ${mobileStyles}`}>
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
      <a className="mx-4 underline-effect" href="/api/signup">
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
      <span className="text-blue-500 mx-4">{user.name}</span>
      <DropDown user={user} />
    </>
  );
};
