const Contact = () => {
  return (
    <div>
      {/* Contact Widget Section Begin */}
      <section className="contact-widget spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-md-6 col-md-3">
              <div className="contact__widget__item">
                <div className="contact__widget__item__icon">
                  <i className="fa fa-map-marker" />
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
                  <i className="fa fa-phone" />
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
                  <i className="fa fa-map-marker" />
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
      {/* Contact Widget Section End */}
      {/* Call To Action Section Begin */}
      <section className="contact spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="contact__map">
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2798902705!2d-74.25986790365917!3d40.697670067823786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1596152431947!5m2!1sen!2sbd"
                  height={450}
                  style={{ border: 0 }}
                /> */}
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
