import Header from "./Topbar";
import FilesUpload from "./HeroUpload";

import React, { useState, useEffect } from "react";

import { AuthContext } from "@/firebase/auth";
import { useContext } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Sidebar from "./Sidebar";

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
  // backgroundColor: "#ffff",
});

const Main = styled("div")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  backgroundColor: "#fff",
  minHeight: "100vh",
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Layout = ({ component }) => {
  const [open, setOpen] = useState(false);
  // const currentUser = useContext(AuthContext);
  // const Router = useRouter();
  // useEffect(() => {
  //   if (!currentUser) {
  //     Router.push("/admin/auth/login");
  //   }
  // }, [currentUser, Router]);
  // console.log(currentUser);
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Sidebar openNav={open} onCloseNav={() => setOpen(false)} />
      <Main>{component}</Main>
    </StyledRoot>
  );
};
export default Layout;
