import Iconify from "@/hooks/iconify/Iconify";
import Image from "next/image";

const Contact = () => {
  return (
    <div>
      <section className="contact-widget spad" id="Contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-md-6 col-md-3">
              <div className="contact__widget__item">
                <div className="contact__widget__item__icon">
                  <Iconify icon="mdi:address-marker" />
                </div>
                <div className="contact__widget__item__text">
                  <h4>Address</h4>
                  <p>India , Delhi Mayur Vihar Phase 3</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-md-6 col-md-3">
              <div className="contact__widget__item">
                <div className="contact__widget__item__icon">
                  <Iconify icon="mingcute:phone-fill" />
                </div>
                <div className="contact__widget__item__text">
                  <h4>Hotline</h4>
                  <p>00-000-000-000 • 00-000-000 </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-md-6 col-md-3">
              <div className="contact__widget__item">
                <div className="contact__widget__item__icon">
                  <Iconify icon="ic:round-email" />
                </div>
                <div className="contact__widget__item__text">
                  <h4>Email</h4>
                  <p>Support@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call To Action Section Begin */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28012.12807121815!2d77.31778388235638!3d28.644264392100045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfad07ac6ca3d%3A0x4797942eb250fd96!2sVaishali%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1693673738513!5m2!1sen!2sin"

                  style={{ border: 0, height:"100%" , width: "100%" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="contact__form">
                <h3>Get in touch</h3>
                <form action="#">
                  <input type="text" placeholder="Name" />
                  <input type="text" placeholder="Email" />
                  <input type="text" placeholder="Phone" />
                  <textarea placeholder="Message" defaultValue={""} />
                  <button type="submit" className="site-btn">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Call To Action Section End */}
    </div>
  );
};
export default Contact;
