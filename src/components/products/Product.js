import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState({});

  const { id } = useParams();
  useEffect(() => {
    loadProduct();
  }, []);

  const config = {
    headers: { Authorization: `Bearer 1dc32c63-785b-49a4-b89d-9911de91d390` }
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
