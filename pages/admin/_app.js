import { AuthContextProvider } from "@/context/AuthContext";
import AuthMiddleware from "../_authmiddleware";
export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <AuthMiddleware>
        <Component {...pageProps} />
      </AuthMiddleware>
    </AuthContextProvider>
  );
}
