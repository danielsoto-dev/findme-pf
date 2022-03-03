import { useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { Link } from "./Link";
import { useUser } from "@auth0/nextjs-auth0";
export const MobileNavbar = ({
  onClick,
  onUnmount,
  isOpen,
  className,
  ...props
}) => {
  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);

  return (
    <button {...props} onClick={onClick} className={`${className}`}>
      <FiMenu className="text-4xl" />
    </button>
  );
};
export const MobileMenuList = () => {
  const { user, error, isLoading } = useUser();
  return (
    <div className="text-lg flex p-4 pl-8 flex-col items-start gap-[20px] z-10 bg-white fixed h-[100vh] top-[80px] right-0 left-0 bottom-0">
      <Link href="/about">About Us</Link>
      <Link href="/contact-us">Contact Us</Link>
      {user && !isLoading && !error ? (
        <LoggedIn user={user} />
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};
const NotLoggedIn = () => {
  return (
    <>
      <a className="underline-effect" href="/api/signup">
        Sign Up
      </a>
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
      <a className="underline-effect" href="/api/auth/logout">
        Logout
      </a>
      <p className="text-md">
        Current User: <span className="text-blue-500">{user.name}</span>
      </p>
    </>
  );
};
