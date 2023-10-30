import axios from 'axios'

const token = localStorage.getItem("userinfo")

const backend = axios.create({
    baseURL: `${process.env.BACKEND_URL}`,
  });