import Layout, { Header, InnerContent } from "./Layout";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";
import { useFetchData } from "@/hooks/Firebase/fetchdata";
import Player from "../Player";
import { Skeleton } from "@mui/material";
import Navbar from "../Navbar";
import React from "react";

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const Portfolio = ({ docID }) => {
  const [data, loading] = useFetchData(
    "video",
    "Portfolio",
    "Data",
    "category",
    docID ? docID : null
  );
  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(to right,rgb(19, 30, 37) 24.4%, rgb(19, 30, 37) 66%, #141e30, #243b55)",
        }}
      >
        <Navbar />
        <div className="breadcrumb-option" data-setbg="img/breadcrumb-bg.jpg">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <div className="breadcrumb__text">
                  <h2>Portfolio</h2>
                  <div className="breadcrumb__links">
                    <a href="/">Home</a>
                    <span>Portfolio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Layout>
        <Header>{docID ? docID : "ALL"}</Header>
        <InnerContent>
          <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 3 }} spacing={2}>
            {loading ? (
              <>
                {[...Array(10)].map((item, index) => (
                  <Skeleton
                    key={index}
                    sx={{ bgcolor: "gray.900" }}
                    variant="rectangular"
                    minwidth={110}
                    height={200}
                  />
                ))}
              </>
            ) : (
              <>
                {data?.map((item) => (
                  <div key={item.id}>
                    <Player
                      type={"video/mp4"}
                      videoJsOptions={{
                        autoplay: false,
                        controls: true,
                        preload: "auto",
                        responsive: true,
                        fluid: true,
                        sources: [
                          {
                            src: item.videoUrl,
                            type: "video/mp4",
                          },
                        ],
                      }}
                    />
                  </div>
                ))}
              </>
            )}
          </Masonry>
        </InnerContent>
      </Layout>
    </>
  );
};

export default Portfolio;
