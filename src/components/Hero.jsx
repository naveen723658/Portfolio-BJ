import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import Masonry from "@mui/lab/Masonry";
import styled from "@emotion/styled";
import Navbar from "./Navbar";
import db from "@/firebase/firestore";
import { Skeleton } from "@mui/material";
import Player from "./Player";
export const Div = styled.div`
  background: radial-gradient(
    circle at 100.9% 51.2%,
    rgb(255, 124, 0) 0%,
    rgb(255, 124, 0) 15.9%,
    rgb(255, 163, 77) 15.9%,
    rgb(255, 163, 77) 24.4%,
    rgb(19, 30, 37) 24.4%,
    rgb(19, 30, 37) 66%
  );
  @media (max-width: 991.5px) {
    background: radial-gradient(
      circle at 50.9% 122.2%,
      rgb(255, 124, 0) 0%,
      rgb(255, 124, 0) 26.9%,
      rgb(255, 163, 77) 15.9%,
      rgb(255, 163, 77) 36.4%,
      rgb(19, 30, 37) 24.4%,
      rgb(19, 30, 37) 66%
    );
  }
`;
export const Sidediv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  box-shadow: rgb(0 0 0 / 15%) -5px 0px, rgb(0 0 0 / 10%) -10px 0px;
  overflow-y: auto;

  /* Hide scrollbar but keep scroll behavior */
  &::-webkit-scrollbar {
    width: 0rem;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: transparent;
  }
`;
const Hero = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "/Data/Portfolio/video");
    const fetchData = async () => {
      const q = query(collectionRef, where("hero", "==", true), limit(6));
      const querySnapshot = await getDocs(q);
      const temp = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(temp);
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Div>
      <Navbar />
      <section className="hero" style={{ position: "relative" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 className="display-5">Embrace the Director’s Chair</h2>
              <p>
                Craft stunning visuals with our state-of-the-art videography
                solutions – because storytelling isn’t limited to words on a
                page. Let your creative juices flow while we capture the magic.
              </p>
              <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-start mb-4 mb-lg-3">
                <a href="#" className="primary-btn">
                  See More About Us
                </a>
              </div>
            </div>
            <Sidediv className="col-lg-5 offset-lg-1 p-0 text-light">
              <Masonry columns={{ xs: 1, sm: 1, md: 2, lg: 2 }} spacing={2}>
                {loading ? (
                  <>
                    {[...Array(6)].map((item, index) => (
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
                    {data?.map((item, index) => (
                      <div
                        key={item.id}
                        className="card"
                        style={{ backgroundColor: "#131e2533", border: "none" }}
                      >
                        <div className="card-body">
                          <div className="card-img-actions">
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
                        </div>
                      </div>
                    ))}

                    <div
                      className="card"
                      style={{ backgroundColor: "#131e2533", border: "none" }}
                    >
                      <div className="card-body">
                        <div className="card-img-actions">
                          <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-start mb-4 mb-lg-3">
                            <a href="#" className="primary-btn">
                              See More
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </Masonry>
            </Sidediv>
          </div>
        </div>
      </section>
    </Div>
  );
};
const itemData = [
  {
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },

  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d",
    title: "Tree",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1627000086207-76eabf23aa2e",
    title: "Camping Car",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7",
    title: "Mountain",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
export default Hero;
