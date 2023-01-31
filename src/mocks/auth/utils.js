import localforage from "localforage";
import { generateBadRequestResponse } from "../utils";
import { passwordRegex } from "../const";
import { errMessages } from "../errMessages";

export async function getUserByUsername(username) {
  try {
    const users = await localforage.getItem("users");
    return users?.find((user) => user?.username === username) ?? null;
  } catch (error) {
    return null;
  }
}

export async function getUserById(id) {
  try {
    const users = await localforage.getItem("users");
    return users?.find((user) => user?.id === id) ?? null;
  } catch (error) {
    return null;
  }
}

export function extractTokenFromHeaders(headers) {
  let token;
  if (headers.get("Authorization")) {
    token = headers.get("Authorization").split(" ")?.[1];
  }
  return token;
}

export function validateUserCredentials({ body, res, ctx }) {
  if (!body?.username || !body?.password) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.provideUserRequiredFields });
  }

  //Apply username validation
  if (body.username?.length < 2) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.usernameMinLength });
  }
  if (body.username?.length > 49) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.usernameMaxLength });
  }

  //Apply password validation
  if (!passwordRegex.test(body.password)) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.passwordPattern });
  }
}

export async function validateUserLogin({ body, res, ctx }) {
  const err = validateUserCredentials({ body, res, ctx });
  if (err) return err;

  const user = await getUserByUsername(body?.username);
  if (!user) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.noUserForCredentials });
  }

  if (body.password !== user.password) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.passwordNoMatch });
  }
}

export async function validateUserRegister({ body, res, ctx }) {
  const err = validateUserCredentials({ body, res, ctx });
  if (err) return err;

  if ((await getUserByUsername(body.username)) !== null) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.usernameAlreadyExists });
  }
}
