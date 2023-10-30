import React, { useContext } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { PetContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function DogFood() {
  const { productDetails } = useContext(PetContext);
  const navigate = useNavigate()
  const CatFood = productDetails.filter((value) => value.category === "Cat");
  return (
    <>
      <section
        className="products d-flex flex-column align-items-center"
        style={{ paddingTop: "80px" }}
      >
        <h1 className="mt-5 text-black fw-bolder">
          <span>Cat</span> Food
        </h1>

        <MDBContainer fluid className="my-5">
          <MDBRow className="best-seller d-flex flex-wrap justify-content-center pb-0 ms-5 me-5 h-50">
            {CatFood.map((value) => (
              <MDBCol
                xl="3"
                lg="4"
                md="4"
                sm="6"
                className="best-seller-image mb-3"
                key={value.id}
                onClick={() => navigate(`/cat-food/${value.id}`)}
              >
                <MDBCard className="text-black">
                  <MDBCardImage
                    src={value.src}
                    position="top"
                    alt="product-image"
                  />
                  <MDBCardBody>
                    <div className="text-center">
                      <MDBCardTitle className="best-seller-name fw-bold">
                        {value.name}
                      </MDBCardTitle>
                    </div>
                    <p
                      className="text-center fw-bolder fs-5"
                      style={{ color: "#ed2335" }}
                    >
                      ₹{value.price}
                    </p>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            ))}
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  );
}
