import localforage from "localforage";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { setTokenInStorage } from "../utils";
import api from "../api";
import * as utils from "../auth/utils";
import * as todoUtils from "../todos/utils";
import { errMessages } from "../errMessages";

describe("verifyAuthorization", () => {
  it("should intercept requests without authorization header", async () => {
    const protectedRequests = ["getAccount", "add", "edit", "delete", "deleteSubTodo", "getAll", "getById"];

    for (const request of protectedRequests) {
      const data = await api?.[request]?.().catch(({ response }) => response.data);
      expect(data).toMatchObject({
        status: 401,
        message: errMessages.unauthorized,
      });
    }
  });
});

describe("getUserByUsername", () => {
  it("should return null if unable to get user by username from localforage", async () => {
    vi.spyOn(localforage, "getItem").mockImplementationOnce(() => {
      throw new Error("error");
    });

    expect(await utils.getUserByUsername()).toEqual(null);
  });
});

describe("getUserTodosById", () => {
  it("should return null if unable to get todos for specific user from localforage", async () => {
    vi.spyOn(localforage, "getItem").mockImplementationOnce(() => {
      throw new Error("error");
    });

    expect(await todoUtils.getUserTodosById()).toEqual(null);
  });
});

describe("getNonUserTodosById", () => {
  it("should return null if unable to get todos for other users from localforage", async () => {
    vi.spyOn(localforage, "getItem").mockImplementationOnce(() => {
      throw new Error("error");
    });

    expect(await todoUtils.getNonUserTodosById()).toEqual(null);
  });
});

describe("getUserById", () => {
  it("should return null if unable to get user by id from localforage", async () => {
    vi.spyOn(localforage, "getItem").mockImplementationOnce(() => {
      throw new Error("error");
    });

    expect(await utils.getUserById()).toEqual(null);
  });
});

describe("logout", () => {
  let userToken;

  beforeEach(async () => {
    const data = await api.register({ username: "admin", password: "Admin123" });
    userToken = data.token;
    setTokenInStorage(data.token);
    api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;
  });

  afterEach(async () => {
    await localforage.clear();
    localStorage.clear();
    delete api.axios.defaults.headers.Authorization;
    userToken = undefined;
  });

  it("should delete token from localStorage when called", async () => {
    const data = await api.getAccount();

    const users = await localforage.getItem("users");
    const userObj = users.find((x) => x.id === userToken);

    expect(data).toMatchObject(userObj);
    expect(localStorage.getItem(import.meta.env.REACT_APP_TOKEN_KEY)).toEqual(JSON.stringify(userToken));

    api.logout();

    expect(localStorage.getItem(import.meta.env.REACT_APP_TOKEN_KEY)).toBeNull();
  });

  it("should delete token from localStorage when called and lock previously accessible api calls", async () => {
    const data = await api.getAccount();

    const users = await localforage.getItem("users");
    const userObj = users.find((x) => x.id === userToken);

    expect(data).toMatchObject(userObj);
    expect(localStorage.getItem(import.meta.env.REACT_APP_TOKEN_KEY)).toEqual(JSON.stringify(userToken));

    api.logout();

    expect(localStorage.getItem(import.meta.env.REACT_APP_TOKEN_KEY)).toBeNull();
    delete api.axios.defaults.headers.Authorization;

    const dataAfterLogout = await api.getAccount().catch(({ response }) => response.data);
    expect(dataAfterLogout).toMatchObject({
      status: 401,
      message: errMessages.unauthorized,
    });
  });
});
