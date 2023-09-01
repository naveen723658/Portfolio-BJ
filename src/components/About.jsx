import Image from "next/image";
import Link from "next/link";
const About = () => {
  return (
    <section className="py-4 my-4" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/brijesh-kumar-96397.appspot.com/o/thumbnails%2F862bb351-9ce7-4d5b-8285-e990fdcb6f79.jpeg?alt=media&token=15895373-d41d-4a65-bbbb-4b8e48985c9bg"
              }
              alt="about"
              width={350}
              height={500}
            />
          </div>
          <div className="col-lg-6">
            <div className="about__text">
              <div className="section-title">
                <span>Get to know me</span>
                <h2>So, Who Am I?</h2>
              </div>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <p>
                But must explain to you how all this mistaken idea denoun cin
                pleasure and praisi pain was born and will give complete account
                of the system pound actual teachings
              </p>
              <Link href="/Portfolio" className="primary-btn">
                View My Work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
