import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8090/Guillermo/Proyecto",
  headers: {
    "Content-type": "application/json"
  }
});