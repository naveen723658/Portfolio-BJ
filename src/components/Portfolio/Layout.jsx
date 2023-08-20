import React, { useEffect } from "react";
import { useFetchData } from "@/hooks/Firebase/fetchdata";
import styled from "@emotion/styled";
import Link from "next/link";
import { Skeleton } from "@mui/material";

export const DisplayFlex = styled.div`
  width: ${(props) => props.width || "100"}%;
  height: ${(prompt) => prompt.height || "100"}vh;
  background-color: ${(prompt) => prompt.color || "none"};
  display: flex;
  flex-direction: ${(prompt) =>
    (prompt.direction === "row" && "row") || "column"};
  align-items: center;
  justify-content: center;
`;
export const Page = styled(DisplayFlex)`
  min-height: 95vh;
  overflow-x: clip;
  height: auto;
  width: 100%;
  background-color: white;
`;
export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 20%;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
    align-items: center;
    min-height: auto;
    margin-bottom: 5vh;
  }
`;

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => (props.active ? "#bf3d3d" : "#f2f2f2")};
  height: auto;
  width: auto;
  min-width: 100%;
  margin: 10px 0;
  padding: 10px;
  color: ${(props) => (props.active ? "white" : "black")};
  text-decoration: none;
  cursor: pointer;
  border-right: 5px solid
    ${(props) =>
      props.color ? (props.active ? "white" : props.color) : "white"};
  @media (max-width: 768px) {
    min-width: 100%;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;
  height: 111vh;
  margin: 0;
  padding: 0 10px;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 5vh;
  }
  p,
  div {
    text-align: justify;
  }
`;
export const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 0 10px;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #131e25;
  }
  p,
  div {
    text-align: justify;
  }
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1.2px solid;
  font-size: 1.8rem;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  color: ${(props) => (props.color ? props.color : "black")};
  @media (max-width: 768px) {
    justify-content: center;
  }
  & img {
    width: 2.5rem;
    height: 2.5rem;
    margin-right: 10px;
  }
`;
export const LayoutPage = styled(Page)`
  flex-direction: row;
  padding: 5rem 10vw;
  gap: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    gap: 0;
    margin-top: 0;
  }
`;

const Layout = ({ children }) => {
  const [data, loading] = useFetchData("folders", "Portfolio", "Data");

  const ulrStyle = {
    textDecoration: "none",
    color: "black",
    minWidth: "100%",
  };

  return (
    <>
      <LayoutPage>
        <LinkContainer>
          <Header>Company</Header>
          {loading ? (
            <>
              {[...Array(10)].map((item, index) => (
                <div style={{ width: "100%" }} key={index}>
                  <Skeleton sx={{ height: "3rem" }} />
                </div>
              ))}
            </>
          ) : (
            <>
              {data?.map((url) => (
                <div style={{ width: "100%" }} key={url.id}>
                  <Link href={`/Portfolio/${url.value}`} style={ulrStyle}>
                    <Items>{url.value}</Items>
                  </Link>
                </div>
              ))}
            </>
          )}
        </LinkContainer>
        <Content>{children}</Content>
      </LayoutPage>
    </>
  );
};
export default Layout;
