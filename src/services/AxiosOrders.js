import axios from "axios";
import { getItem } from "../common/utils/Storage/Storage";
const baseURL = "http://192.168.1.165:8080/api/v1";

const instance = axios.create({
  baseURL: baseURL,
  headers: {},
});

instance.interceptors.request.use(async (config) => {
  try {
    const token = await getItem("login-token");
    config.headers.Authorization = `Bearer ${token.split('"').join("")}`;
  } catch (error) {
    console.log("Error retrieving token:", error);
  }

  return config;
});

export default instance;
