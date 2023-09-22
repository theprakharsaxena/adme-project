import axios from "axios";

const AxiosClient = axios.create();

AxiosClient.defaults.baseURL = "https://picsum.photos";

AxiosClient.defaults.headers = {
  "Content-Type": "application/json;",
};

export default AxiosClient;
