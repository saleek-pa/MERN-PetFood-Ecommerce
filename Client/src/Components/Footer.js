import React from 'react';
import { MDBRow, MDBCol, MDBFooter, MDBIcon, MDBContainer } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <>
      <MDBFooter className="footer-color text-center text-lg-start text-white" id="contact">
        <section className="footer-position">
          <MDBContainer className="text-center text-md-start">
            <MDBRow className="">
              <MDBCol sm="8" md="8" lg="5" xl="4" className="mx-auto mb-4">
                <h6 className="logo-footer text-uppercase mt-5 mb-4">Kitter</h6>
                <p>
                  If you have any question, please contact us at
                  <br />
                  <span>support@gmail.com</span>
                </p>
                <p>
                  <MDBIcon icon="home" className="me-3" />
                  30 Buttonwood St.Pataskala OH 43062
                </p>
                <p>
                  <MDBIcon icon="phone" className="me-3" /> (+1)-6234-56-789-1011
                </p>
              </MDBCol>

              <MDBCol sm="4" md="4" lg="2" xl="2" className="contact-hover text-secondary mx-auto mb-4">
                <h6 className="text-light fw-bold mb-4 mt-5">Corporate</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Careers
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    About Us
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Contact Us
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    FAQs
                  </a>
                </p>
              </MDBCol>

              <MDBCol sm="6" md="8" lg="2" xl="2" className="contact-hover text-secondary mx-auto mb-4">
                <h6 className="text-light fw-bold mb-4 mt-5">Information</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Online Store
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Refund Policy
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Shipping Policy
                  </a>
                </p>
              </MDBCol>

              <MDBCol sm="6" md="4" lg="2" xl="2" className="contact-hover text-secondary mx-auto mb-md-0 mb-4">
                <h6 className="text-light fw-bold mb-4 mt-5">Services</h6>
                <p>
                  <a href="#!" className="text-reset">
                    Grooming
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Positive Dog Training
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Veterinary Services
                  </a>
                </p>
                <p>
                  <a href="#!" className="text-reset">
                    Petco Insurance
                  </a>
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          <div className="payment d-flex justify-content-between align-items-center flex-wrap pe-5 me-5 ps-5 ms-5 pb-4">
            <p className="text-muted">© 2023 Kitter. All rights reserved.</p>
            <img
              src="https://res.cloudinary.com/dmzqckfj4/image/upload/v1706504631/home%20page/azb4970ad3erjqotwlvw.png"
              alt="Payment Methods"
            />
          </div>
        </section>
      </MDBFooter>
    </>
  );
}
