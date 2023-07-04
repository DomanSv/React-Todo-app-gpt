import axios from "./axios";

export default {
  register: (body) => axios.post("/register", body).then(({ data }) => data),
  login: (body) => axios.post("/login", body).then(({ data }) => data),
  getAccount: () => axios.get("/account").then(({ data }) => data),
  addTodo: (body) => axios.post("/todos", body).then(({ data }) => data),
  getTodos: () => axios.get("/todos").then((data) => data),
};
