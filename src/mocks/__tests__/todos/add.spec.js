import localforage from "localforage";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

import { setTokenInStorage } from "../../utils";
import * as utils from "../../todos/utils";
import api from "../../api";
import { errMessages } from "../../errMessages";

describe("attempt to add todo to storage", () => {
	beforeAll(async () => {
		const data = await api.register({ username: "admin", password: "Admin123" });
		setTokenInStorage(data.token);
		api.axios.defaults.headers.Authorization = `Bearer ${data.token}`;
	});

	afterAll(async () => {
		await localforage.clear();
		localStorage.clear();
		delete api.axios.defaults.headers.Authorization;
	});

	it("should return a bad request response if no title and priority is passed", async () => {
		const data = await api.add({}).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.provideTodoRequiredFields,
		});
	});

	it("should return a bad request response if title is shorter than 2 characters", async () => {
		const data = await api
			.add({
				title: "a",
				priority: "low",
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.titleMinLength,
		});
	});

	it("should return a bad request response if title is longer than 50 characters", async () => {
		const data = await api
			.add({
				title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
				priority: "low",
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.titleMaxLength,
		});
	});

	it("should return a bad request response if priority does not have a value equal to 'low','mid' or 'high'", async () => {
		const data = await api
			.add({
				title: "admin",
				priority: "test",
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.priorityValueOptions,
		});
	});

	it("should return a bad request response if description is shorter than 2 characters", async () => {
		const data = await api
			.add({
				priority: "low",
				title: "admin",
				description: "a",
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.descriptionMinLength,
		});
	});

	it("should return a bad request response if description is longer than 500 characters", async () => {
		const data = await api
			.add({
				priority: "low",
				title: "admin",
				description:
					"Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum. Lorem ipsum.",
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.descriptionMaxLength,
		});
	});

	it("should return a bad request response if subTask array provided with incorrect data", async () => {
		const data = await api
			.add({
				title: "admin",
				priority: "low",
				subTasks: [{}],
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.provideSubTaskRequiredField,
		});
	});

	it("should return a bad request response if subTask array provided with title shorter than 2 characters", async () => {
		const data = await api
			.add({
				title: "admin",
				priority: "low",
				subTasks: [{ title: "a" }],
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.subTasksTitleMinLength,
		});
	});

	it("should return a bad request response if subTask array provided with title longer than 50 characters", async () => {
		const data = await api
			.add({
				title: "admin",
				priority: "low",
				subTasks: [
					{
						title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
					},
				],
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.subTasksTitleMaxLength,
		});
	});

	it("should return a bad request response if subTask array is longer than 5", async () => {
		const data = await api
			.add({
				title: "admin",
				priority: "low",
				subTasks: [
					{ title: "task 1" },
					{ title: "task 2" },
					{ title: "task 3" },
					{ title: "task 4" },
					{ title: "task 5" },
					{ title: "task 6" },
				],
			})
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.subTasksMaxLength,
		});
	});
});

describe("add todo in storage", () => {
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

	it("should successfully save todo to storage", async () => {
		const date = new Date().getTime();

		vi.useFakeTimers();
		vi.setSystemTime(date);

		expect(Date.now()).toBe(date.valueOf());

		const data = await api.add({
			priority: "low",
			title: "Testing todo",
			description: "Testing todo description",
			subTasks: [{ title: "sub task 1" }, { title: "sub task 2" }, { title: "sub task 3" }],
		});

		expect(data).toMatchObject({
			created: date,
			updated: null,
			priority: "low",
			title: "Testing todo",
			description: "Testing todo description",
			done: false,
			subTasks: [
				{ title: "sub task 1", done: false },
				{ title: "sub task 2", done: false },
				{ title: "sub task 3", done: false },
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

		const data = await api.add({}).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
