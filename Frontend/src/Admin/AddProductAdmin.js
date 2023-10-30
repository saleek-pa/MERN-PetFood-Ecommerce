import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PetContext } from "../App";
import {
  MDBInput,
  MDBBtn,
  MDBRadio,
  MDBTextArea,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function AddProductAdmin() {
  const navigate = useNavigate();
  const { productDetails, setProductDetails, productId, setProductId } =
    useContext(PetContext);

  // Function to add new product to ProductDetails Array
  const handleForm = (e) => {
    e.preventDefault();

    const newProduct = {
      id: productId,
      category: e.target.category.value,
      name: e.target.name.value,
      src: e.target.imageURL.value,
      description: e.target.description.value,
      price: e.target.price.value,
      quantity: 1,
    };

    setProductDetails([...productDetails, newProduct]);
    navigate("/dashboard/products");
    setProductId(productId + 1);
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        className="dashboard-table px-5"
        style={{ width: "1000px" }}
        onSubmit={handleForm}
      >
        <h2 className="text-center">Add Product</h2>
        <div className="d-flex justify-content-evenly ">
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
              name="imageURL"
              id="typeURL"
              type="url"
              required
            />
          </div>
          <div className="w-50 pt-4 ms-5">
            <div className="mt-3 mb-3 text-center">
              <label className="me-3 fw-normal">Category: </label>
              <MDBRadio
                name="category"
                id="inlineRadio1"
                value="Cat"
                label="Cat"
                inline
                required
              />
              <MDBRadio
                name="category"
                id="inlineRadio2"
                value="Dog"
                label="Dog"
                inline
              />
            </div>
            <MDBInput
              id="form4Example1"
              wrapperClass="mb-4"
              label="Name"
              name="name"
              required
            />
            <MDBTextArea
              label="Description"
              name="description"
              id="textAreaExample"
              rows={4}
              className="mb-4"
              required
            />

            <MDBInput
              id="form4Example1"
              wrapperClass="mb-4"
              label="Price"
              name="price"
              min={0}
              required
              type="number"
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
