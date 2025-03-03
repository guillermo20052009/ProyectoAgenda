import axios from "axios";

export default axios.create({
  baseURL: "http://agenda.us-east-1.elasticbeanstalk.com:80/Guillermo/Proyecto",
  headers: {
    "Content-type": "application/json"
  }
});