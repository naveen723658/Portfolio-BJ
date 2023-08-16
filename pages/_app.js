import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Styles/style.css";
import "../src/Styles/card.css";
import SessionProvider from "@/app/SessionProvider";
export default function App({ Component, pageProps }) {
  return (
    <SessionProvider >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
