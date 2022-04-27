import { Link } from "./Link";
export const Footer = ({ className }) => {
  return (
    <footer className={`p-[24px] ${className}`}>
      <nav className="grid grid-cols-3">
        <section>
          <h1 className="text-4xl">
            <Link href="/">
              Find<span className="text-blue-500">Me</span>
            </Link>
          </h1>
        </section>
        <section>
          <h4 className="text-xl font-bold">Navigation</h4>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </section>

        <section>
          <h4 className="text-xl font-bold">Access</h4>
          <ul>
            <li>
              <Link href="/api/signup">Sign Up</Link>
            </li>
            <li>
              <Link href="/api/auth/login">Log In</Link>
            </li>
          </ul>
        </section>
      </nav>
    </footer>
  );
};
