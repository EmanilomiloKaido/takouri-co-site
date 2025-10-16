import "../styles/globals.css";
import CookieBanner from "../components/CookieBanner";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <CookieBanner />
    </>
  );
}

export default MyApp;
