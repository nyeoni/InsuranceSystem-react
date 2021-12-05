import axios from "axios";

const apiManager = axios.create({
  baseURL: "http://hminsu.net:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiManager;