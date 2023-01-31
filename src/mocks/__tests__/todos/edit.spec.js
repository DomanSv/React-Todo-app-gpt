import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("attempt to edit todo", () => {
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

  it("should return a bad request response if no id param is passed", async () => {
    const data = await api.edit().catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 400,
      message: errMessages.editRequiredParam,
    });
  });

  it("should return a bad request response if id param passed does not match any todo", async () => {
    const data = await api.edit({ id: "abc", title: "Test todo", priority: "low" }).catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 404,
      message: errMessages.todoNotFound("abc"),
    });
  });

  it("should return a bad request response if todo validation fails", async () => {
    const todoForEdit = await api.add({
      priority: "low",
      title: "test",
    });

    const data = await api
      .edit({
        id: todoForEdit?.id,
        title: "t",
        priority: "mid",
      })
      .catch(({ response }) => response.data);

    expect(data).toMatchObject({
      status: 400,
      message: errMessages.titleMinLength,
    });
  });
});

describe("edit todo", () => {
  let todoForEdit;
  beforeAll(async () => {
    const data = await api.register({ username: "admin", password: "Admin123" });
    setTokenInStorage(data.token);
    api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;

    const todo = await api.add({
      priority: "low",
      title: "Test todo",
      subTasks: [{ title: "sub todo" }],
    });
    todoForEdit = todo;
  });

  afterAll(async () => {
    await localforage.clear();
    localStorage.clear();
    delete api.axios.defaults.headers.Authorization;
    vi.restoreAllMocks();
  });

  it("should successfully edit todo", async () => {
    const date = new Date().getTime();

    vi.useFakeTimers();
    vi.setSystemTime(date);

    expect(Date.now()).toBe(date.valueOf());

    const updatedTodo = await api.edit({
      ...todoForEdit,
      priority: "mid",
      subTasks: [...todoForEdit.subTasks, { title: "another sub todo" }],
    });

    expect(updatedTodo).toMatchObject({
      ...todoForEdit,
      priority: "mid",
      updated: date,
      subTasks: [
        ...todoForEdit.subTasks,
        {
          title: "another sub todo",
          done: false,
        },
      ],
    });

    vi.useRealTimers();
  });

  it("should successfully edit todo by removing subTodos", async () => {
    const date = new Date().getTime();

    vi.useFakeTimers();
    vi.setSystemTime(date);

    expect(Date.now()).toBe(date.valueOf());

    const updatedTodo = await api.edit({
      ...todoForEdit,
      priority: "mid",
      subTasks: [],
    });

    expect(updatedTodo).toMatchObject({
      ...todoForEdit,
      priority: "mid",
      updated: date,
      subTasks: [],
    });

    vi.useRealTimers();
  });

  it("should successfully edit one of many todos", async () => {
    // have more than one todo
    await api.add({ priority: "low", title: "test" });

    const date = new Date().getTime();

    vi.useFakeTimers();
    vi.setSystemTime(date);

    expect(Date.now()).toBe(date.valueOf());

    const updatedTodo = await api.edit({
      ...todoForEdit,
      priority: "mid",
      subTasks: [...todoForEdit.subTasks, { title: "another sub todo" }],
    });

    expect(updatedTodo).toMatchObject({
      ...todoForEdit,
      priority: "mid",
      updated: date,
      subTasks: [
        ...todoForEdit.subTasks,
        {
          title: "another sub todo",
          done: false,
        },
      ],
    });

    vi.useRealTimers();
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
    vi.spyOn(utils, "validateTodo").mockImplementation(() => {
      throw new Error("error");
    });

    const data = await api.edit({ id: "abc" }).catch(({ response }) => response.data);
    expect(data).toMatchObject({
      status: 500,
      message: errMessages.somethingWentWrong,
    });
  });
});
