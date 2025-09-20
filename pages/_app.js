// pages/_app.js
import '../styles/globals.css'; // This imports Tailwind globally

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
