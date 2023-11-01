import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";
import { PetContext } from "../App";
import "../Styles/Products.css";

function Products() {
   const { productDetails, handlePrice } = useContext(PetContext);
   const slicedData = productDetails.slice(0, 8);

   const navigate = useNavigate();

   const [isFasIcon, setIsFasIcon] = useState(false);

   const toggleIcon = () => {
      setIsFasIcon(!isFasIcon);
   };
   return (
      <>
         <section className="products d-flex flex-column align-items-center">
            <h1 className="mt-5 text-black fw-bolder">
               <span>Best</span> Seller
            </h1>

            <div className="product-content">
               {slicedData.map((value) => (
                  <div className="box" key={value._id}>
                     <div className="box-img" onClick={() => navigate(`/products/${value._id}`)}>
                        <img src={value.image} alt={value.title} />
                     </div>
                     <h3 onClick={() => navigate(`/products/${value._id}`)}>{value.title}</h3>
                     <div className="inbox">
                        <span className="strike-price">{handlePrice(value.price)}</span>
                        <span className="price">{handlePrice(value.price)}</span>
                     </div>
                     <div className="heart" onClick={toggleIcon}>
                        {isFasIcon ? (
                           <MDBIcon fas icon="heart" className="clicked-heart-icon" />
                        ) : (
                           <MDBIcon fas icon="heart" className="heart-icon" />
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </>
   );
}

export default Products;
