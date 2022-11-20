import localforage from "localforage";
import { describe, it, expect, afterAll, vi } from "vitest";
import api from "../../api";
import * as utils from "../../auth/utils";
import { errMessages } from "../../errMessages";

describe("attempt to register with invalid data", () => {
	it("should return bad request if no data is passed", async () => {
		const data = await api.register({}).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.provideUserRequiredFields,
		});
	});

	it("should return bad request if username is less than 2 characters", async () => {
		const data = await api.register({ username: "a", password: "a" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.usernameMinLength,
		});
	});

	it("should return bad request if username is more than 50 characters", async () => {
		const data = await api
			.register({ username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", password: "a" })
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.usernameMaxLength,
		});
	});

	it("should return bad request if password does not meet requirements", async () => {
		const data = await api.register({ username: "admin", password: "admin" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.passwordPattern,
		});
	});
});

describe("internal errors from trying to register", () => {
	afterAll(async () => {
		await localforage.clear();
	});
	it("should return bad request if username has been taken", async () => {
		await api.register({ username: "admin", password: "Admin123" });
		// register user with same username
		const data = await api.register({ username: "admin", password: "Password123" }).catch(({ response }) => response?.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.usernameAlreadyExists,
		});
	});
});

describe("successfully register", () => {
	afterAll(async () => {
		await localforage.clear();
	});
	it("should successfully register a user", async () => {
		const data = await api.register({ username: "admin", password: "Admin123" });
		expect(data).toHaveProperty("token");
	});
});

describe("handle uncaught server errors", () => {
	afterAll(async () => {
		await localforage.clear();
		vi.restoreAllMocks();
	});

	it("should catch unexpected server errors with code 500", async () => {
		vi.spyOn(utils, "validateUserRegister").mockImplementation(() => {
			throw new Error("break");
		});

		const data = await api.register({ username: "admin", password: "Admin123" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
