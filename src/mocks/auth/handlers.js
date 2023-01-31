import localforage from "localforage";
import { nanoid } from "nanoid";

import { generateNotFoundRequestResponse, generateServerErrorResponse } from "../utils";
import { extractTokenFromHeaders, getUserById, getUserByUsername, validateUserLogin, validateUserRegister } from "./utils";
import { errMessages } from "../errMessages";
import { RESPONSE_DELAY } from "../const";

export async function loginHandler(req, res, ctx) {
  try {
    const body = await req.json();

    const err = await validateUserLogin({ body, res, ctx });
    if (err) return err;

    const user = await getUserByUsername(body?.username);

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json({ token: user?.id }));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function registerHandler(req, res, ctx) {
  try {
    const body = await req.json();

    const err = await validateUserRegister({ body, res, ctx });
    if (err) return err;

    const id = nanoid();
    const users = (await localforage.getItem("users")) ?? [];
    localforage.setItem("users", [
      ...users,
      {
        ...body,
        created: new Date().getTime(),
        id,
      },
    ]);
    return res(ctx.delay(RESPONSE_DELAY), ctx.status(201), ctx.json({ token: id }));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function getLoggedInUserHandler(req, res, ctx) {
  try {
    const token = extractTokenFromHeaders(req.headers);
    const user = await getUserById(token);
    if (!user) {
      return generateNotFoundRequestResponse({ res, ctx, message: errMessages.noUserForToken });
    }
    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(user));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}
