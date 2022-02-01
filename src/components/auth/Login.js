import React, { useState } from 'react';
import axios from "axios";
import './Login.css';

const loginUser = async (body) => {
  const result = await axios.post("http://texert.kz:3000/v1/auth/sign-in", body);
  console.log("res: ", result)
};

const Login = ({setToken}) => {
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await axios.post("http://texert.kz:3000/v1/auth/sign-in", {
      phone,
      password
    });

    console.log("result", result)
    setToken(result.data.token)

  }

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setPhone(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
};

export default Login