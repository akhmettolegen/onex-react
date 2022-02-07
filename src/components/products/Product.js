import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import useToken from "../auth/UseToken";

const Product = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();
  useEffect(() => {
    loadProduct();
  }, []);

  const { token, setToken } = useToken();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const loadProduct = async () => {
    const res = await axios.get(`http://texert.kz:3000/v1/products/${id}`, config);
    setProduct(res.data.data);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Product Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {product.name}</li>
        <li className="list-group-item">description: {product.description}</li>
        <li className="list-group-item">date: {product.createdAt}</li>
        <li className="list-group-item">status: {product.status}</li>
        <li className="list-group-item">image: <img src={ product.image } /></li>
        <li className="list-group-item">cost: {product.primeCost}</li>
        <li className="list-group-item">location: {product.totalCost}</li>
      </ul>
    </div>
  );
}

export default Product;
