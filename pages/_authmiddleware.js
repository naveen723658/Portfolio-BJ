import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
const AuthMiddleware = ({ children }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user && router.pathname === "/admin/auth/login") {
      router.replace("/admin");
    }
    if (!user && router.pathname.includes("/admin")) {
      router.replace("/admin/auth/login");
    }
  }, [user, router]);
  return children;
};
export default AuthMiddleware;
