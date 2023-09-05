import axios from "./axios";

export default {
  askGpt: (id) => axios.post(`/gpt/todo/${id}`).then(({data}) => data),
};
