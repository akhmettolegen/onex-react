import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// class Home extends Component {
//   constructor(props) {
//     super(props)

//     this.state = {
//       posts: [],
//       errorMsg: ''
//     }
//   }

//   componentDidMount() {
//     const config = {
//       headers: { Authorization: `Bearer f6634051-6a12-4d25-9ea8-2a13f5688575` }
//     };

//     axios.get('http://143.198.96.88:3000/v1/orders', config)
//     .then(response => {
//       console.log(response.data.data)
//       this.setState({posts: response.data.data})
//     })
//     .catch(error => {
//       console.log(error)
//       this.setState({errorMsg: 'Error retrieving data'})
//     })
//   }

//   render() {
//     const{ posts, errorMsg } = this.state

const Home = () => {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const config = {
    headers: { Authorization: `Bearer f6634051-6a12-4d25-9ea8-2a13f5688575` }
  };

  const loadUsers = async () => {
    const result = await axios.get("http://143.198.96.88:3000/v1/orders", config);
    setOrder(result.data.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Image</th>
              <th scope="col">Status</th>
              <th scope="col">Total cost</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{order.name}</td>
                <td>{order.description}</td>
                <td><img src={ order.image } /></td>
                <td>{order.status}</td>
                <td>{order.totalCost}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/orders/${order.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2"
                    to={`/users/edit/${order.id}`}
                  >
                    Edit
                  </Link>
                  {/* <Link
                    class="btn btn-danger"
                    onClick={() => deleteUser(post.id)}
                  >
                    Delete
                  </Link> */}
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
