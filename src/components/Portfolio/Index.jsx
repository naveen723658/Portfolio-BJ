import Layout, { Header, InnerContent } from "./Layout";

import Masonry from "@mui/lab/Masonry";
import { useFetchData } from "@/hooks/Firebase/fetchdata";
import { Skeleton } from "@mui/material";
import Navbar from "../Navbar";
import React, { useState } from "react";
import Image from "next/image";
import PlayModal from "../PlayModal";
import Iconify from "@/hooks/iconify/Iconify";

const Portfolio = ({ docID }) => {
  const [data, loading] = useFetchData(
    "video",
    "Portfolio",
    "Data",
    "category",
    docID ? docID : null
  );

  const [openModal, setOpenModal] = useState(false);
  const [source, setSource] = useState();
  const handlePlay = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
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
                  <div key={item.id} style={{ position: "relative", backgroundColor:"gray" }}>
                    <Image
                      src={item.thumbnailUrl}
                      alt={item.title ? item.title : "video"}
                      placeholder="blur"
                      loading="lazy"
                      sizes="100%"
                      width={item.width}
                      height={item.height}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      blurDataURL={item.thumbnailUrl}
                    />
                    <div
                      onClick={() => (
                        handlePlay(),
                        setSource({
                          src: item.videoUrl,
                          type: "video/mp4",
                          aspectRatio: item.aspectRatio,
                          width: item.width,
                          thumbnailUrl: item.thumbnailUrl,
                          height: item.height,
                        })
                      )}
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: "1",
                        color: "#ffff",
                        borderRadius: "50%",
                        border: "1px solid #ffff",

                        padding: "1rem",
                      }}
                    >
                      <Iconify
                        icon="mingcute:play-fill"
                        sx={{ width: "1.7rem", height: "1.7rem" }}
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </Masonry>
          {source && (
            <PlayModal
              src={source.src}
              type={source.type}
              poster={source.thumbnailUrl}
              ratio={source.aspectRatio}
              w={source.width}
              h={source.height}
              open={openModal}
              onClose={handleCloseModal}
            />
          )}
        </InnerContent>
      </Layout>
    </>
  );
};

export default Portfolio;
