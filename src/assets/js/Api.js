import axios from "axios";
import baseURL from "./BaseUrl";
const Api = axios.create({
  baseURL,
});

Api.defaults.withCredentials = true;

export default Api;
