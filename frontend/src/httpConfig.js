import axios from "axios";

export default axios.create({
  baseURL: "https://api-crud-spring-boot-reactjs.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  }
});