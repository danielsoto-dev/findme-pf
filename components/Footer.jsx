import Link from "next/link";
export const Footer = () => {
  return (
    <footer className="p-[24px]">
      <nav className="grid grid-cols-3">
        <section>
          <h1 className="text-4xl">
            <Link href="/">
              <a>
                Find<span className="text-blue-500">Me</span>
              </a>
            </Link>
          </h1>
        </section>
        <section>
          <h4 className="text-xl font-bold">Navigation</h4>
          <ul>
            <li>
              <Link href="/about">
                <a>About Us</a>
              </Link>
            </li>
            <li>
              <Link href="/contact-us">
                <a>Contact Us</a>
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-xl font-bold">Access</h4>
          <ul>
            <li>
              <Link href="/sign-up">
                <a>Sign Up</a>
              </Link>
            </li>
            <li>
              <Link href="/log-in">
                <a>Log In</a>
              </Link>
            </li>
          </ul>
        </section>
      </nav>
    </footer>
  );
};
