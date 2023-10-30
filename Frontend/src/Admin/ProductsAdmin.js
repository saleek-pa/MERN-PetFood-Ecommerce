import React, { useContext, useState, useEffect } from "react";
import { PetContext } from "../App";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function ProductsAdmin() {
  const navigate = useNavigate();
  const { productDetails, setProductDetails, handlePrice } =
    useContext(PetContext);

  // Initialize state to filter products by category
  const [category, setCategory] = useState(productDetails);
  const [selectedOption, setSelectedOption] = useState("All");

  // Use useEffect to filter products based on the selected category
  useEffect(() => {
    if (selectedOption === "All") {
      setCategory(productDetails);
    } else {
      setCategory(
        productDetails.filter((product) => product.category === selectedOption)
      );
    }
  }, [selectedOption, productDetails]);

  // Handle product deletion
  const handleDelete = (productId) => {
    const filteredProductData = productDetails.filter(
      (product) => product.id !== productId
    );
    setProductDetails(filteredProductData);
  };

  return (
    <div>
      <div className="dashboard-table products-admin px-3 py-3">
        <table>
          <thead>
            <tr>
              <td>ID</td>
              <td>
                <select
                  style={{ border: "none" }}
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </td>
              <td>Image</td>
              <td>Name</td>
              <td>Description</td>
              <td>Price</td>
            </tr>
          </thead>
          {category.map((product) => (
            <tbody key={product.id}>
              <tr>
                <th>{product.id}</th>
                <th>{product.category}</th>
                <th>
                  <img
                    src={product.src}
                    alt={product.name}
                    style={{ width: "120px" }}
                  />
                </th>
                <th>{product.name}</th>
                <th>{product.description.slice(0, 60)}</th>
                <th>{handlePrice(product.price)}</th>
                <th>
                  <MDBBtn
                    className="me-1"
                    color="success"
                    rounded
                    onClick={() =>
                      navigate(`/dashboard/products/${product.id}`)
                    }
                  >
                    <MDBIcon fas icon="edit" />
                  </MDBBtn>
                </th>
                <th>
                  <MDBBtn
                    className="me-1"
                    color="danger"
                    rounded
                    onClick={() => handleDelete(product.id)}
                  >
                    <MDBIcon fas icon="trash" />
                  </MDBBtn>
                </th>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
