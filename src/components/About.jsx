import Image from "next/image";
import Link from "next/link";
const About = () => {
  return (
    <section className="py-4 my-4" id="about">
      <div className="container py-4 my-4">
        <div className="row">
          <div className="col-lg-6">
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
          </div>
          <div className="col-lg-6">
            <div className="about__text">
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
