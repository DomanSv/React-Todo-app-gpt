import axios from "./axios";

export default {
  register: (body) => axios.post("user/register", body).then(({ data }) => data),
  login: (body) => axios.post("user/login", body).then(({ data }) => data),
  getAccount: () => axios.get("user/account").then(({ data }) => data),
};
