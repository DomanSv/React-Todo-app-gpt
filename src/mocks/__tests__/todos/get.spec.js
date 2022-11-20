import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("attempt to get todo by id", () => {
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
		const data = await api.getById().catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.getTodoByIdRequiredParam,
		});
	});

	it("should return a not found request response if todo is not found", async () => {
		const data = await api.getById("abc").catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 404,
			message: errMessages.todoNotFound("abc"),
		});
	});
});

describe("get todo from storage", () => {
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

	it("should return todo object if todo has been found for user", async () => {
		const todo = await api.add({
			priority: "low",
			title: "test",
		});

		const data = await api.getById(todo?.id);
		expect(data).toMatchObject({
			priority: "low",
			title: "test",
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

		const data = await api.getById("abc").catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
