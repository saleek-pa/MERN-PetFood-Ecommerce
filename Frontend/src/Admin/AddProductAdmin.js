import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Axios, PetContext } from "../App";
import uploadToCloudinary from "../Utils/uploadToCloudinary"
import { MDBInput, MDBBtn, MDBRadio, MDBTextArea, MDBIcon } from "mdb-react-ui-kit";
import toast from "react-hot-toast";

export default function AddProductAdmin() {
   const navigate = useNavigate();
   const { setProductDetails } = useContext(PetContext);
   const [item, setItem] = useState({ title: "", description: "", price: "", category: "", image: "" });
   const [selectedFile, setSelectedFile] = useState(null);
   const [imageUrl, setImageUrl] = useState(null);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setItem((prevItem) => ({ ...prevItem, [name]: value }));
   };

   const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setItem({ ...item, image: file });
      setSelectedFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);
   };

   // Function to add new product to ProductDetails Array
   const handleForm = async (e) => {
      e.preventDefault();
      const imageLink = await uploadToCloudinary(selectedFile);

      const formData = new FormData();
      formData.append("image", imageLink);
      formData.append("title", item.title);
      formData.append("price", item.price);
      formData.append("description", item.description);
      formData.append("category", item.category);

      try {
         const response = await Axios.post("/api/admin/products", formData);
         if (response.status === 201) {
            toast.success(response.data.message)
            setProductDetails(response.data.data);
            navigate("/dashboard/products");
         }
      } catch (error) {
         toast.error(error.response.data.message)
      }
   };

   return (
      <div className="d-flex justify-content-center">
         <form
            className="dashboard-table px-5" style={{ width: "80%" }}
            onSubmit={handleForm} encType="multipart/form-data"
         >
            <h2 className="text-center">Add Product</h2>
            <div className="d-flex justify-content-evenly">
               <div className="pt-5" style={{ width: "300px" }}>
                  {!selectedFile ? (
                     <>
                        <h4 className="text-center">Upload your file</h4>
                        <div
                           style={{ border: "1px dashed black", borderRadius: "10px" }}
                           className="d-flex flex-column justify-content-center align-items-center"
                        >
                           <MDBIcon fas icon="file-upload" className="fs-1 pt-5" />
                           <input
                              type="file" name="image" required
                              onChange={handleFileInputChange}
                              style={{ width: "300px", height: "200px", position: "absolute", 
                                       cursor: "pointer", opacity: "0", zIndex: "1" }}
                           />
                           <p className="pb-5 pt-2 px-3 text-muted">
                              Drop your file here <br /> or Click to browse
                           </p>
                        </div>
                     </>
                  ) : (
                     <>
                        <div className="pt-1" style={{ cursor: "pointer", width: "300px" }}>
                           <div
                              style={{ border: "1px solid gray", borderRadius: "10px", position: "relative" }}
                              className="d-flex flex-column justify-content-center align-items-center"
                           >
                              <img src={imageUrl} alt="Selected" className="w-50 py-4" />
                              <MDBIcon
                                 fas icon="times" className="fs-4"
                                 style={{ position: "absolute", top: "0", right: "0", padding: "10px" }}
                                 onClick={() => {
                                    setSelectedFile(null);
                                    setItem({ ...item, image: "" });
                                 }}
                              />
                           </div>
                           <hr className="mx-5" />
                           <MDBInput
                              label="Image Link"
                              type="text"
                              value={selectedFile.name}
                              className="text-black"
                              required
                           />
                        </div>
                     </>
                  )}
               </div>
               <div className="w-50 pt-4 ms-5">
                  <div className="mt-3 mb-3 text-center">
                     <label className="me-3 text-black">Category: </label>
                     {["Cat", "Dog"].map((category) => (
                        <MDBRadio
                           key={category}
                           name="category"
                           value={category}
                           onChange={handleInputChange}
                           label={category}
                           inline
                        />
                     ))}
                  </div>
                  <MDBInput
                     wrapperClass="mb-4"
                     label="Title"
                     className="text-black"
                     name="title"
                     value={item.title}
                     onChange={handleInputChange}
                     required
                  />
                  <MDBTextArea
                     id="textAreaExample"
                     name="description"
                     rows={4}
                     className="mb-4 text-black"
                     value={item.description}
                     onChange={handleInputChange}
                     required
                  />
                  <MDBInput
                     wrapperClass="mb-4"
                     label="Price"
                     name="price"
                     type="number"
                     min={1}
                     value={item.price}
                     onChange={handleInputChange}
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
