import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import useToken from "../auth/UseToken";
import Select from 'react-select';

const EditProduct = () => {
  const [file, setFile] = useState('');

  const handleFileSelect = (e) => {
    console.log("selected files: ", e.target.files[0])
    setFile(e.target.files[0]);
  }

  const options = [
    { value: 'INACTIVE', label: 'Inactive' },
    { value: 'ACTIVE', label: 'Active' }
  ];

  const [product, setProduct] = useState({});

  const { id } = useParams();
  const { token, setToken } = useToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const getProductById = async () => {
    const res = await axios.get(`http://texert.kz:3000/v1/products/${id}`, config);
    setProduct(res.data.data);
  };

  
  const { name, description, status, image, soldCount, primeCost, totalCost } = product;
  const onInputChange = e => {
    if (e.target) {
      setProduct({ ...product, [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value });
    } else {
      setProduct({...product, ["status"]:e.value})
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    if (file) {
      let resFile
      try {
        resFile = await axios.post('http://texert.kz:3000/v1/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          },
        })
      } catch(error) {
        console.log("error on upload file: ", error)
      }

      product.image = resFile.data.data.url
    }

    await axios.put(`http://texert.kz:3000/v1/products/${id}`, product, config);
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
            <label>
              Pick status:
              <Select
                options={options}
                onChange={e => onInputChange(e)}
              />
            </label>
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
          <button className="btn btn-primary btn-block">Edit Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
