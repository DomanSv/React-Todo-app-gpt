import localforage from "localforage";
import { describe, it, expect, afterAll, vi } from "vitest";
import api from "../../api";
import * as utils from "../../auth/utils";
import { errMessages } from "../../errMessages";

describe("attempt to login with invalid data", () => {
	it("should return bad request if no data is passed", async () => {
		const data = await api.login({}).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.provideUserRequiredFields,
		});
	});

	it("should return bad request if username is less than 2 characters", async () => {
		const data = await api.login({ username: "a", password: "a" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.usernameMinLength,
		});
	});

	it("should return bad request if username is more than 50 characters", async () => {
		const data = await api
			.login({ username: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", password: "a" })
			.catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.usernameMaxLength,
		});
	});

	it("should return bad request if password does not meet requirements", async () => {
		const data = await api.login({ username: "admin", password: "admin" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.passwordPattern,
		});
	});
});

describe("attempt to login with unregistered user credentials", () => {
	it("should return bad request if user tries to login without registering first", async () => {
		const data = await api.login({ username: "admin", password: "Admin123" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.noUserForCredentials,
		});
	});
});

describe("attempt to login with invalid password", () => {
	afterAll(async () => {
		await localforage.clear();
	});
	it("should return bad request if user tries to login with invalid password", async () => {
		// register user first
		await api.register({ username: "admin", password: "Admin123" });

		const data = await api.login({ username: "admin", password: "Password123" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 400,
			message: errMessages.passwordNoMatch,
		});
	});
});

describe("successfully login", () => {
	afterAll(async () => {
		await localforage.clear();
	});
	it("should successfully login a user", async () => {
		// register user first
		await api.register({ username: "admin", password: "Admin123" });

		const data = await api.login({ username: "admin", password: "Admin123" });
		expect(data).toHaveProperty("token");
	});
});

describe("handle uncaught server errors", () => {
	afterAll(async () => {
		await localforage.clear();
		vi.restoreAllMocks();
	});

	it("should catch unexpected server errors with code 500", async () => {
		vi.spyOn(utils, "validateUserLogin").mockImplementation(() => {
			throw new Error("why");
		});

		const data = await api.login({ username: "admin", password: "Admin123" }).catch(({ response }) => response.data);
		expect(data).toMatchObject({
			status: 500,
			message: errMessages.somethingWentWrong,
		});
	});
});
