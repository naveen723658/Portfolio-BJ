import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./app";
import Cookies from "js-cookie";
const auth = getAuth(app);
export default auth;

export async function signIn(email, password) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    const token = await result?.user.getIdToken(); // Await the getIdToken() promise
    Cookies.set("token", token, { secure: true, sameSite: "Strict" }); // Set cookie server-side
  } catch (e) {
    error = e;
  }
  return { result, error };
}

const logOut = async (router, callbackUrl) => {
  try {
    await signOut(auth);
    Cookies.remove("token");
    if (router) {
      router.push(callbackUrl);
    }
    return true;
  } catch (error) {
    return error;
  }
};
export { logOut };
