import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const Home = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const config = {
    headers: { Authorization: `Bearer 1dc32c63-785b-49a4-b89d-9911de91d390` }
  };

  const loadProducts = async () => {
    const result = await axios.get("http://texert.kz:3000/v1/products", config);
    setProduct(result.data.data);
  };

  const deleteProduct = async id => {
    await axios.delete(`http://texert.kz:3000/v1/products/${id}`, config);
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

export default Home;
