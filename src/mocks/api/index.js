import axios from "./axios";
import { clearToken } from "./utils";

export default {
  axios,

  login: (body) => axios.post("/login", body).then(({ data }) => data),
  register: (body) => axios.post("/register", body).then(({ data }) => data),

  getAccount: () => axios.get("/account").then(({ data }) => data),

  logout: clearToken,

  add: (body) => axios.post("/todos", body).then(({ data }) => data),
  edit: (body) => axios.post(`/todos/${body?.id}`, body).then(({ data }) => data),

  delete: (id) => axios.delete(`/todos/${id}`).then(({ data }) => data),
  deleteSubTodo: (params) => axios.delete(`/todos/${params?.todoId}/${params?.subTodoId}`).then(({ data }) => data),

  getAll: () => axios.get("/todos").then(({ data }) => data),
  getById: (id) => axios.get(`/todos/${id}`).then(({ data }) => data),
};
