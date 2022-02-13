import Image from "next/image";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="flex justify-around items-center h-[80px]">
      <h1 className="text-4xl">
        <Link href="/">
          <a>
            Find<span className="text-blue-500">Me</span>
          </a>
        </Link>
      </h1>

      <nav className="justify-around items-center flex w-[180px]">
        <Link href="/about">
          <a>About Us</a>
        </Link>
        <Link href="/contact-us">
          <a>Contact Us</a>
        </Link>
      </nav>
      <div className="justify-around items-center flex w-[180px]">
        <Link href="/sign-in">
          <a>Sign In</a>
        </Link>
        <Link href="/log-in">
          <a className="border-[1px] border-black rounded-md px-3 py-[5px]">
            Log In
          </a>
        </Link>
        {/* <Image
          class="inline-block h-12 w-12 rounded-full ring-2 ring-white"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={40}
          height={40}
          alt="profile"  /> */}
      </div>
    </header>
  );
};
