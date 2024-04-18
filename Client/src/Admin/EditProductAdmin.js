import React, { useState, useEffect, useContext } from 'react';
import { axios } from '../Utils/Axios';
import { MDBIcon } from 'mdb-react-ui-kit';
import { PetContext } from '../Context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Radio, TextArea } from '../Components/Input';
import uploadToCloudinary from '../Utils/uploadToCloudinary';
import Button from '../Components/Button';
import toast from 'react-hot-toast';

export default function EditProductAdmin() {
  const { id } = useParams();
  const { setProductDetails } = useContext(PetContext);
  const [item, setItem] = useState({ title: '', description: '', price: '', category: '', image: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageStatus, setImageStatus] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/products/${id}`);
        setItem(response.data.data);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchData();
  }, [id]);

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

  const handleForm = async (e) => {
    e.preventDefault();
    let imageLink = '';
    if (selectedFile) {
      imageLink = await uploadToCloudinary(selectedFile);
    }

    const formData = new FormData();
    formData.append('id', item._id);
    formData.append('title', item.title);
    formData.append('price', item.price);
    formData.append('description', item.description);
    formData.append('category', item.category);
    formData.append('image', imageLink || item.image);

    try {
      const response = await axios.put('/api/admin/products', formData);
      if (response.status === 200) {
        toast.success(response.data.message);
        setProductDetails(response.data.data);
        navigate('/dashboard/products');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleForm}
        className="dashboard-table px-5"
        style={{ width: '1000px' }}
        encType="multipart/form-data"
      >
        <h2 className="text-center">Edit Product</h2>
        <div className="d-flex justify-content-evenly ">
          {imageStatus ? (
            <div className="pt-4" style={{ cursor: 'pointer', width: '300px' }}>
              <h4 className="text-center">&nbsp;</h4>
              <div
                style={{ border: '1px solid gray', borderRadius: '10px', position: 'relative' }}
                className="d-flex flex-column justify-content-center align-items-center"
              >
                <img src={item.image} alt={item.title} className="w-50 py-4" />
                <MDBIcon
                  fas
                  icon="times"
                  className="fs-4"
                  style={{ position: 'absolute', top: '0', right: '0', padding: '10px' }}
                  onClick={() => {
                    setImageStatus(false);
                    setItem({ ...item, image: '' });
                  }}
                />
              </div>
              <hr className="mx-5" />
              <Input type="url" label="Image Link" value={item.image} onChange={handleInputChange} />
            </div>
          ) : (
            <div className="pt-5" style={{ width: '300px' }}>
              {!selectedFile ? (
                <>
                  <h4 className="text-center">Upload your file</h4>
                  <div
                    style={{ border: '1px dashed black', borderRadius: '10px' }}
                    className="d-flex flex-column justify-content-center align-items-center"
                  >
                    <MDBIcon fas icon="file-upload" className="fs-1 pt-5" />
                    <input
                      type="file"
                      name="image"
                      onChange={handleFileInputChange}
                      required
                      style={{
                        width: '300px',
                        height: '200px',
                        position: 'absolute',
                        cursor: 'pointer',
                        opacity: '0',
                        zIndex: '1',
                      }}
                    />
                    <p className="pb-5 pt-2 px-3 text-muted">
                      Drop your file here <br /> or Click to browse
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="pt-1" style={{ cursor: 'pointer', width: '300px' }}>
                    <div
                      style={{ border: '1px solid gray', borderRadius: '10px', position: 'relative' }}
                      className="d-flex flex-column justify-content-center align-items-center"
                    >
                      <img src={imageUrl} alt="Selected" className="w-50 py-4" />
                      <MDBIcon
                        fas
                        icon="times"
                        className="fs-4"
                        style={{ position: 'absolute', top: '0', right: '0', padding: '10px' }}
                        onClick={() => {
                          setSelectedFile(null);
                          setItem({ ...item, image: '' });
                        }}
                      />
                    </div>
                    <hr className="mx-5" />
                    <Input type="text" label="Image Link" value={selectedFile.name} />
                  </div>
                </>
              )}
            </div>
          )}
          <div className="w-50 pt-4 ms-5">
            <div className="mt-3 mb-3 text-center">
              <label className="me-3 text-black">Category: </label>
              {['Cat', 'Dog'].map((category) => (
                <Radio
                  key={category}
                  label={category}
                  value={category}
                  onChange={handleInputChange}
                  checked={item.category === category}
                />
              ))}
            </div>
            <Input type="text" label="Title" name="title" value={item.title} onChange={handleInputChange} />
            <TextArea label="Description" name="description" value={item.description} onChange={handleInputChange} />
            <Input type="number" label="Price" name="price" value={item.price} onChange={handleInputChange} />
            <div className="text-center">
              <Button type="submit" className="mb-4 w-50" color="black">
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
