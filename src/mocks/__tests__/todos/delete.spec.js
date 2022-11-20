import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("attempt to delete todo from storage", () => {
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
		const data = await api.delete().catch(({ response }) => response.data);

		expect(data).toMatchObject({
			status: 400,
			message: errMessages.deleteRequiredParam,
		});
	});

	it("should return a bad request response if id param passed does not match any todo", async () => {
		const data = await api.delete("abc").catch(({ response }) => response.data);

		expect(data).toMatchObject({
			status: 404,
			message: errMessages.todoNotFound("abc"),
		});
	});
});

describe("delete todo from storage", () => {
	let todoForDeletionId;
	beforeAll(async () => {
		const data = await api.register({ username: "admin", password: "Admin123" });
		setTokenInStorage(data.token);
		api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;

		const todo = await api.add({ priority: "low", title: "Test todo" });
		todoForDeletionId = todo?.id;
	});

	afterAll(async () => {
		await localforage.clear();
		localStorage.clear();
		delete api.axios.defaults.headers.Authorization;
		vi.restoreAllMocks();
	});

	it("should successfully delete todo from storage", async () => {
		const data = await api.delete(todoForDeletionId);

		expect(data).toMatchObject({
			id: todoForDeletionId,
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

		const data = await api.delete("abc").catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
