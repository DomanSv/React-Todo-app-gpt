import axios from "./axios";

export default {
  register: (body) => axios.post("/register", body).then(({ data }) => data),
  login: (body) => axios.post("/login", body).then(({ data }) => data),
  getAccount: () => axios.get("/account",).then(({ data }) => data),
};
