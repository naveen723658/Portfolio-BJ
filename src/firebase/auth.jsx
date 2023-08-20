import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from "./app";
const auth = getAuth(app);
export default auth;

export async function signIn(email, password, router, callbackUrl) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
    if (router && result.user) {
      router.push(callbackUrl);
    }
  } catch (e) {
    error = e;
  }
  return { result, error };
}

const logOut = async (router, callbackUrl) => {
  try {
    await signOut(auth);
    if (router) {
      router.push(callbackUrl);
    }
    return true;
  } catch (error) {
    return error;
  }
};
export { logOut };
