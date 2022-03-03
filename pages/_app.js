import "../styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0";
import { MobileNavbarProvider } from "../contexts/mobile-navbar";
function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <MobileNavbarProvider>
        <Component {...pageProps} />
      </MobileNavbarProvider>
    </UserProvider>
  );
}

export default MyApp;
