import Masonry from "@mui/lab/Masonry";
import styled from "@emotion/styled";
import Navbar from "./Navbar";
import { Skeleton } from "@mui/material";
import Player from "./Player";
import useMediaQuery from "@mui/material/useMediaQuery";
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
const Hero = (props) => {
  const { data, loading = true } = props.props;
  const mediaWidth = useMediaQuery("(min-width:991.5px)");

  return (
    <Div>
      <Navbar />
      <section className="hero" style={{ position: "relative" }}>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-5 ">
              <h2 className="display-5">Embrace the Director’s Chair</h2>
              <p>
                Craft stunning visuals with our state-of-the-art videography
                solutions – because storytelling isn’t limited to words on a
                page. Let your creative juices flow while we capture the magic.
              </p>
              <div className="d-grid gap-2 d-md-flex mt-2 justify-content-md-start mb-4 mb-lg-3">
                <a href="#about" className="primary-btn">
                  See More About Us
                </a>
              </div>
            </div>
            {mediaWidth && (
              <Sidediv className="col-xl-5 col-lg-6 offset-lg-1 p-0 text-light">
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
                          style={{
                            backgroundColor: "#131e2533",
                            border: "none",
                          }}
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
                                  poster: item.thumbnailUrl
                                    ? item.thumbnailUrl
                                    : null,
                                  aspectRatio: item.aspectRatio
                                    ? item.aspectRatio
                                    : "16:9",
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
            )}
          </div>
        </div>
      </section>
    </Div>
  );
};
export default Hero;
