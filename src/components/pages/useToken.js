import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    //console.log("get token", userToken)
    return userToken
  };

  const [token, setToken] = useState(getToken());
  console.log("token2", token)

  const saveToken = userToken => {
    console.log("userToken", userToken)
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken);
  };

  console.log("token", token)

  return {
    setToken: saveToken,
    token
  }
}