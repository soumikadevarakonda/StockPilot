import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:30083/api", // your Spring Boot base
});

export default instance;
