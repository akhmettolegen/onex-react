import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// class Order extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       post: {},
//       errorMsg: ''
//     }
//   }

//   componentDidMount() {
//     const config = {
//       headers: { Authorization: `Bearer f6634051-6a12-4d25-9ea8-2a13f5688575` }
//     };

//     const { id } = this.props.match.params;

//     axios.get(`http://143.198.96.88:3000/v1/orders/${id}`, config)
//     .then(response => {
//       console.log(response.data.data)
//       this.setState({post: response.data.data})
//     })
//     .catch(error => {
//       console.log(error)
//       this.setState({errorMsg: 'Error retrieving data'})
//     })
//   }

const Order = () => {
  const [order, setUser] = useState({});

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  const config = {
    headers: { Authorization: `Bearer e27f766e-6b3e-4904-88fd-7feb4eeb38d8` }
  };

  const loadUser = async () => {
    console.log("id", id)
    const res = await axios.get(`http://texert.kz:3000/v1/orders/${id}`, config);
    console.log("res", res.data)
    setUser(res.data.data);
  };

  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to="/">
        back to Home
      </Link>
      <h1 className="display-4">Order Id: {id}</h1>
      <hr />
      <ul className="list-group w-50">
        <li className="list-group-item">name: {order.product.name}</li>
        <li className="list-group-item">description: {order.product.description}</li>
        <li className="list-group-item">date: {order.createdAt}</li>
        <li className="list-group-item">status: {order.status}</li>
        <li className="list-group-item">image: <img src={ order.product.image } /></li>
        <li className="list-group-item">cost: {order.product.primeCost}</li>
        <li className="list-group-item">location: {order.product.totalCost}</li>
      </ul>
    </div>
  );
}

export default Order;
