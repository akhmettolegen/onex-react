import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";
import useToken from "./useToken";

const Products = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const { token, setToken } = useToken();
  const headers = { Authorization: `Bearer ${token}` }

  const loadProducts = async () => {
    const result = await axios.get("http://texert.kz:3000/v1/products", {headers});
    setProduct(result.data.data);
  };

  const deleteProduct = async id => {
    await axios.delete(`http://texert.kz:3000/v1/products/${id}`, {headers});
    loadProducts();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div>
          <h1>Products</h1>
        </div>
        <div className="button">
          <Link className="btn btn-outline-light" to="/products/add">Add Product</Link>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Total cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td><img className="photo" src={ product.image } /></td>
                <td>{product.status}</td>
                <td>{product.totalCost}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/products/${product.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/products/edit/${product.id}`}
                  >
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                    to={`/products`}
                  >
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
