import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      posts: [],
      errorMsg: ''
    }
  }

  componentDidMount() {
    const config = {
      headers: { Authorization: `Bearer f908650b-4b42-4379-a619-db9d8248c63a` }
    };

    axios.get('http://localhost:3001/v1/orders', config)
    .then(response => {
      console.log(response.data.data)
      this.setState({posts: response.data.data})
    })
    .catch(error => {
      console.log(error)
      this.setState({errorMsg: 'Error retrieving data'})
    })
  }

  render() {
    const{ posts, errorMsg } = this.state
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
                <th scope="col">Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{post.name}</td>
                  <td>{post.description}</td>
                  <td>{post.image}</td>
                  <td>
                    <Link class="btn btn-primary mr-2" to={`/users/${post.id}`}>
                      View
                    </Link>
                    <Link
                      class="btn btn-outline-primary mr-2"
                      to={`/users/edit/${post.id}`}
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
  }
};

export default Home;
