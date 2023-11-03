import axios from 'axios'

const token = localStorage.getItem("userinfo")

const backend = axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
  });

  export const register = (data) => {
    return backend.post("/api/auth/register", data);
  };
  
  export const login = (data) => {
    return backend.post("api/auth/login", data, config);
  };
  