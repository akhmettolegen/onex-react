import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import FileUpload from "../fileUpload/FileUpload";

const AddProduct = () => {
  let history = useNavigate();

  const [file, setFile] = useState('');

  const handleFileSelect = (e) => {
    console.log("selected files: ", e.target.files[0])
    setFile(e.target.files[0]);
  }

  const [product, setProduct] = useState({
    name: "",
    description: "",
    status: "",  
    image: "",
    soldCount: 0,
    primeCost: 0.0,
    totalCost: 0.0
  });
  
  const { name, description, status, image, soldCount, primeCost, totalCost } = product;
  const onInputChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value });
  };

  const config = {
    headers: { Authorization: `Bearer 2d99dae6-b67c-45c8-ad7c-4538ddd83ebf` }
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    let resFile
    try {
      resFile = await axios.post('http://texert.kz:3000/v1/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer 2d99dae6-b67c-45c8-ad7c-4538ddd83ebf`
        },
      })
    } catch(error) {
      console.log("error on upload file: ", error)
    }

    console.log("resFile.data.url", resFile)
    product.image = resFile.data.data.url

    await axios.post("http://texert.kz:3000/v1/products", product, config);
  };

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Product</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter product name"
              name="name"
              value={name}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter product description"
              name="description"
              value={description}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter product status"
              name="status"
              value={status}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter product image"
              name="image"
              value={image}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number" 
              className="form-control form-control-lg"
              placeholder="Enter product prime cost"
              name="soldCount"
              value={soldCount}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number" 
              step="0.1"
              className="form-control form-control-lg"
              placeholder="Enter product prime cost"
              name="primeCost"
              value={primeCost}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="number" 
              step="0.1"
              className="form-control form-control-lg"
              placeholder="Enter product total cost"
              name="totalCost"
              value={totalCost}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div>
            <input 
              type="file" 
              className='custom-file-input'
              onChange={handleFileSelect}
            />
          </div>
          <button className="btn btn-primary btn-block">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
