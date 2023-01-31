import { rest } from "msw";
import { getLoggedInUserHandler, loginHandler, registerHandler } from "./auth";
import {
  addTodoHandler,
  deleteSubTodoHandler,
  deleteTodoHandler,
  editTodoHandler,
  getLoggedInUserTodoHandler,
  getLoggedInUserTodosHandler,
} from "./todos";

import { verifyAuthorization } from "./utils";

export const handlers = [
  // auth handlers
  rest.post("/register", registerHandler),
  rest.post("/login", loginHandler),

  rest.get("/account", (...args) => verifyAuthorization(...args)(getLoggedInUserHandler)),

  // todo handlers
  rest.post("/todos", (...args) => verifyAuthorization(...args)(addTodoHandler)),
  rest.post("/todos/:id", (...args) => verifyAuthorization(...args)(editTodoHandler)),

  rest.get("/todos", (...args) => verifyAuthorization(...args)(getLoggedInUserTodosHandler)),
  rest.get("/todos/:id", (...args) => verifyAuthorization(...args)(getLoggedInUserTodoHandler)),

  rest.delete("/todos/:id", (...args) => verifyAuthorization(...args)(deleteTodoHandler)),
  rest.delete("/todos/:id/:subTodoId", (...args) => verifyAuthorization(...args)(deleteSubTodoHandler)),
];
