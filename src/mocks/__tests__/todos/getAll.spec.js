import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("get all todos in storage", () => {
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

	it("should return empty array if user has no todos added", async () => {
		const data = await api.getAll();
		expect(data).toEqual([]);
	});

	it("should return array of objects if user has todos added", async () => {
		await api.add({
			priority: "low",
			title: "test",
		});
		await api.add({
			priority: "mid",
			title: "testing",
			subTasks: [{ title: "sub test" }],
		});

		const data = await api.getAll();
		expect(data).toHaveLength(2);

		// checking second added todo to be the first received
		expect(data[0]).toMatchObject({
			priority: "mid",
			title: "testing",
			subTasks: [{ title: "sub test" }],
		});

		expect(data[1]).toMatchObject({
			priority: "low",
			title: "test",
			subTasks: [],
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

		const data = await api.getAll().catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
