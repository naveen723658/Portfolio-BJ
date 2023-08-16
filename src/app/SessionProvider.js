import React from "react";
import { SessionProvider as Provider } from "next-auth/react";
function SessionProvider({ children }) {
  return <Provider refetchOnWindowFocus={true}>{children}</Provider>;
}
export default SessionProvider;
