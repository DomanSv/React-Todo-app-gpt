import localforage from "localforage";
import { describe, expect, it, beforeAll, afterAll, vi } from "vitest";
import api from "../../api";
import { setTokenInStorage } from "../../utils";
import * as utils from "../../auth/utils";
import { errMessages } from "../../errMessages";

describe("attempt to fetch user account", () => {
	afterAll(() => {
		delete api.axios.defaults.headers.Authorization;
	});

	it("should return user object with token", async () => {
		api.axios.defaults.headers.Authorization = `Bearer abc123`;

		const data = await api.getAccount().catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 404,
			message: errMessages.noUserForToken,
		});
	});
});

describe("fetch registered or logged in user account", () => {
	let userToken;

	beforeAll(async () => {
		const data = await api.register({ username: "admin", password: "Admin123" });
		userToken = data.token;
		setTokenInStorage(userToken);
		api.axios.defaults.headers.Authorization = `Bearer ${userToken}`;
	});

	afterAll(async () => {
		await localforage.clear();
		localStorage.clear();
		delete api.axios.defaults.headers.Authorization;
	});

	it("should return user object with token", async () => {
		const data = await api.getAccount();

		const users = await localforage.getItem("users");
		const userObj = users.find((x) => x.id === userToken);

		expect(data).toMatchObject(userObj);
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
		vi.spyOn(utils, "getUserById").mockImplementation(() => {
			throw new Error("error");
		});

		const data = await api.getAccount().catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
