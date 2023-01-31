import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("attempt to delete subTodo from storage", () => {
  beforeAll(async () => {
    const data = await api.register({ username: "admin", password: "Admin123" });
    setTokenInStorage(data.token);
    api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;
  });

  afterAll(async () => {
    await localforage.clear();
    localStorage.clear();
    delete api.axios.defaults.headers.Authorization;
    vi.restoreAllMocks();
  });

  it("should return a bad request response if no id and no subTodoId params are passed", async () => {
    const data = await api.deleteSubTodo().catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 400,
      message: errMessages.deleteSubTodoRequiredParams,
    });
  });

  it("should return a bad request response if id param passed does not match any todo", async () => {
    const data = await api
      .deleteSubTodo({
        todoId: "abc",
        subTodoId: "xyz",
      })
      .catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 404,
      message: errMessages.todoNotFound("abc"),
    });
  });

  it("should return a bad request response if subTodoId param passed does not match any subTodo", async () => {
    const todo = await api.add({
      priority: "low",
      title: "Test todo",
      subTasks: [{ title: "sub todo test" }],
    });

    const data = await api
      .deleteSubTodo({
        todoId: todo?.id,
        subTodoId: "xyz",
      })
      .catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 404,
      message: errMessages.subTodoNotFound(todo?.id, "xyz"),
    });
  });
});

describe("delete subTodo from storage", () => {
  let paramsForDeletion;
  beforeAll(async () => {
    const data = await api.register({ username: "admin", password: "Admin123" });
    setTokenInStorage(data.token);
    api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;

    // add more than 1 todo
    await api.add({ priority: "mid", title: "test" });
    const todo = await api.add({
      priority: "low",
      title: "Test todo",
      subTasks: [{ title: "sub todo" }],
    });
    paramsForDeletion = { todoId: todo?.id, subTodoId: todo?.subTasks?.[0]?.id };
  });

  afterAll(async () => {
    await localforage.clear();
    localStorage.clear();
    delete api.axios.defaults.headers.Authorization;
    vi.restoreAllMocks();
  });

  it("should successfully delete subTodo from storage", async () => {
    const data = await api.deleteSubTodo(paramsForDeletion);

    expect(data).toMatchObject({
      id: paramsForDeletion?.subTodoId,
      title: "sub todo",
      done: false,
    });
  });
});

describe("handle uncaught server errors", () => {
  beforeAll(async () => {
    const data = await api.register({ username: "admin", password: "Admin123" });
    setTokenInStorage(data.token);
    api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;
  });

  afterAll(async () => {
    await localforage.clear();
    localStorage.clear();
    delete api.axios.defaults.headers.Authorization;
    vi.restoreAllMocks();
  });

  it("should catch unexpected server errors with code 500", async () => {
    vi.spyOn(utils, "getUserTodosById").mockImplementation(() => {
      throw new Error("error");
    });

    const data = await api.deleteSubTodo({ todoId: "abc", subTodoId: "xyz" }).catch(({ response }) => response.data);
    expect(data).toMatchObject({
      status: 500,
      message: errMessages.somethingWentWrong,
    });
  });
});
