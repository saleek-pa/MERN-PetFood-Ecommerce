import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PetContext } from "../App";
import {
  MDBInput,
  MDBBtn,
  MDBRadio,
  MDBTextArea,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function EditProductAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { productDetails, setProductDetails } = useContext(PetContext);

  // State for image status and URL
  const [imageStatus, setImageStatus] = useState(true);
  const [imageURL, setimageURL] = useState("");

  // Find the product to edit based on the ID
  const product = productDetails.find((item) => item.id === parseInt(id));

  const handleForm = (e) => {
    e.preventDefault();

    // Extract form input values
    const Image = imageURL || e.target.imageURL.value;
    const Name = e.target.name.value;
    const Price = e.target.price.value;
    const Category = e.target.category.value;
    const Description = e.target.description.value;

    // Update the product details with the edited information
    const editedDetails = productDetails.map((details) => {
      if (details.id === product.id) {
        return {
          ...details,
          name: Name,
          src: Image,
          price: Price,
          category: Category,
          description: Description,
        };
      }
      return details;
    });
    // Set the updated product details
    setProductDetails(editedDetails);
    navigate("/dashboard/products");
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleForm}
        className="dashboard-table px-5"
        style={{ width: "1000px" }}
      >
        <h2 className="text-center">Edit Product</h2>
        <div className="d-flex justify-content-evenly ">
          {imageStatus ? (
            <div className="pt-4" style={{ cursor: "pointer", width: "300px" }}>
              <h4 className="text-center">&nbsp;</h4>
              <div
                style={{
                  border: "1px solid gray",
                  borderRadius: "10px",
                  position: "relative",
                }}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-50 py-4"
                />
                <MDBIcon
                  fas
                  icon="times"
                  className="fs-4"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    padding: "10px",
                  }}
                  onClick={() => {
                    setImageStatus(false);
                    setimageURL("");
                  }}
                />
              </div>
              <hr className="mx-5" />
              <MDBInput
                label="Image Link"
                id="typeURL"
                type="url"
                defaultValue={product.src}
                name="imageURL"
                onChange={(e) => setimageURL(e.target.value)}
                className="text-black"
                required
              />
            </div>
          ) : (
            <div className="pt-4" style={{ cursor: "pointer", width: "300px" }}>
              <h4 className="text-center">Upload your file</h4>
              <div
                style={{ border: "1px dashed black", borderRadius: "10px" }}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <MDBIcon fas icon="file-upload" className="fs-1 pt-5" />
                <p className="pb-5 pt-2 px-3 text-muted">
                  Drop your file here <br /> or Click to browse
                </p>
              </div>
              <hr className="mx-5" />
              <MDBInput
                label="Image Link"
                id="typeURL"
                type="url"
                value={imageURL}
                onChange={(e) => setimageURL(e.target.value)}
                required
              />
            </div>
          )}
          <div className="w-50 pt-4 ms-5">
            <div className="mt-3 mb-3 text-center">
              <label className="me-3 text-black">Category: </label>
              <MDBRadio
                name="category"
                id="inlineRadio1"
                value="Cat"
                defaultChecked={product.category === "Cat"}
                label="Cat"
                inline
              />
              <MDBRadio
                name="category"
                id="inlineRadio2"
                value="Dog"
                defaultChecked={product.category === "Dog"}
                label="Dog"
                inline
              />
            </div>
            <MDBInput
              id="form4Example1"
              wrapperClass="mb-4"
              label="Name"
              defaultValue={product.name}
              className="text-black"
              name="name"
              required
            />
            <MDBTextArea
              label="Description"
              id="textAreaExample"
              name="description"
              rows={4}
              className="mb-4 text-black"
              defaultValue={product.description}
              required
            />

            <MDBInput
              id="form4Example1"
              wrapperClass="mb-4"
              label="Price"
              name="price"
              type="number"
              defaultValue={product.price}
              className="text-black"
              required
            />
            <div className="text-center">
              <MDBBtn type="submit" className="mb-4 w-50" color="black" block>
                Submit
              </MDBBtn>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
