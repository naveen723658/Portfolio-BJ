import Player from "./Player";

const Counter = () => {
  return (
    <section className="counter w-100 h-auto">
      {/* <Player
        type={"video/mp4"}
        videoJsOptions={{
          // autoplay: true,
          controls: false,
          // loop: true,
          responsive: true,
          fluid: true,
          aspectRatio: "16:9",
          sources: [
            {
              src: "https://firebasestorage.googleapis.com/v0/b/brijesh-kumar-96397.appspot.com/o/Next%20Fashion%20Intro%2F8_2.mp4?alt=media&token=7d1f9b31-f235-4678-9d8d-59a56602f1d7",
              type: "video/mp4",
            },
          ],
        }}
      /> */}
      <div className="container">
        <div className="counter__content">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item">
                <div className="counter__item__text">
                  <img src="img/icons/ci-1.png" alt="" />
                  <h2 className="counter_num">230</h2>
                  <p>Compled Projects</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item second__item">
                <div className="counter__item__text">
                  <img src="img/icons/ci-2.png" alt="" />
                  <h2 className="counter_num">1068</h2>
                  <p>Happy clients</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item third__item">
                <div className="counter__item__text">
                  <img src="img/icons/ci-3.png" alt="" />
                  <h2 className="counter_num">230</h2>
                  <p> clients</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="counter__item four__item">
                <div className="counter__item__text">
                  <img src="img/icons/ci-4.png" alt="" />
                  <h2 className="counter_num">230</h2>
                  <p>Compled Projects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Counter;
