import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Styles/style.css";
import "../src/Styles/card.css";
import { StoreProvider } from "@/redux/storeProvider";
import { AuthContextProvider } from "@/context/AuthContext";
export default function App({ Component, pageProps }) {
  return (
    <StoreProvider>
      <AuthContextProvider>
        <Component {...pageProps} />;
      </AuthContextProvider>
    </StoreProvider>
  );
}
