import axios from "./axios";

export default {
  addTodo: (body) => axios.post("/todos", body).then(({ data }) => data),
  getTodos: () => axios.get("/todos").then((data) => data),
  getTodoById: (id) => axios.get(`/todos/${id}`).then((data) => data),
  deleteTodo: (id) => axios.delete(`/todos/${id}`).then((data) => data),
  deleteSubtask: ({id, subtaskId}) => axios.delete(`/todos/${id}/${subtaskId}`).then((data) => data),
  editTodo: (body) => axios.post(`/todos/${body.id}`, body).then((data) => data),
};
