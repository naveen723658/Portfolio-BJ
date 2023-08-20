import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Styles/style.css";
import "../src/Styles/card.css";
import { AuthContextProvider } from "@/context/AuthContext";
import AuthMiddleware from "./_authmiddleware";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AuthMiddleware>
        <Component {...pageProps} />
      </AuthMiddleware>
    </AuthContextProvider>
  );
}
