import localforage from "localforage";
import { nanoid } from "nanoid";

import { extractTokenFromHeaders } from "../auth/utils";
import { generateBadRequestResponse, generateNotFoundRequestResponse, generateServerErrorResponse } from "../utils";
import {
  applySubTodosSchema,
  applyUpdateTodoSchema,
  checkIfSubTodoExistsInUserTodos,
  checkIfTodoExistsInUserTodos,
  filterUserSubTodos,
  filterUserTodos,
  getNonUserTodosById,
  getUserTodosById,
  validateTodo,
} from "./utils";
import { RESPONSE_DELAY } from "../const";
import { errMessages } from "../errMessages";

export async function addTodoHandler(req, res, ctx) {
  try {
    const body = await req.json();

    const err = validateTodo({ body, res, ctx });
    if (err) return err;

    const id = nanoid();
    const loggedInUserId = extractTokenFromHeaders(req.headers);

    const userTodos = await getUserTodosById(loggedInUserId);
    const otherTodos = await getNonUserTodosById(loggedInUserId);

    const newTodo = {
      ...body,
      done: false,
      created: new Date().getTime(),
      updated: null,
      id,
      subTasks: applySubTodosSchema(body?.subTasks),
    };

    await localforage.setItem("todos", [
      ...otherTodos,
      {
        ownerId: loggedInUserId,
        todos: [newTodo, ...userTodos],
      },
    ]);

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(201), ctx.json(newTodo));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function deleteTodoHandler(req, res, ctx) {
  try {
    const todoId = req?.params?.id;

    if (todoId === "undefined") {
      return generateBadRequestResponse({ res, ctx, message: errMessages.deleteRequiredParam });
    }

    const loggedInUserId = extractTokenFromHeaders(req.headers);
    const userTodos = await getUserTodosById(loggedInUserId);
    const otherTodos = await getNonUserTodosById(loggedInUserId);

    const err = await checkIfTodoExistsInUserTodos({ userTodos, todoId, res, ctx });
    if (err) return err;

    const { todoForDeletion, filteredTodos } = await filterUserTodos({ userTodos, todoId });

    await localforage.setItem("todos", [
      ...otherTodos,
      {
        ownerId: loggedInUserId,
        todos: filteredTodos,
      },
    ]);

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(todoForDeletion));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function deleteSubTodoHandler(req, res, ctx) {
  try {
    const todoId = req?.params?.id;
    const subTodoId = req?.params?.subTodoId;

    if (todoId === "undefined" || subTodoId === "undefined") {
      return generateBadRequestResponse({ res, ctx, message: errMessages.deleteSubTodoRequiredParams });
    }

    const loggedInUserId = extractTokenFromHeaders(req.headers);
    const userTodos = await getUserTodosById(loggedInUserId);
    const otherTodos = await getNonUserTodosById(loggedInUserId);

    const err = await checkIfSubTodoExistsInUserTodos({ userTodos, todoId, subTodoId, res, ctx });
    if (err) return err;

    const { todoForDeletion, filteredTodos } = await filterUserSubTodos({ userTodos, todoId, subTodoId });

    await localforage.setItem("todos", [
      ...otherTodos,
      {
        ownerId: loggedInUserId,
        todos: filteredTodos,
      },
    ]);

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(todoForDeletion));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function editTodoHandler(req, res, ctx) {
  try {
    const todoId = req?.params?.id;

    if (todoId === "undefined") {
      return generateBadRequestResponse({ res, ctx, message: errMessages.editRequiredParam });
    }

    const body = await req.json();

    const err = validateTodo({ body, res, ctx });
    if (err) return err;

    const loggedInUserId = extractTokenFromHeaders(req.headers);
    const userTodos = await getUserTodosById(loggedInUserId);
    const otherTodos = await getNonUserTodosById(loggedInUserId);

    const existsErr = await checkIfTodoExistsInUserTodos({ userTodos, todoId, res, ctx });
    if (existsErr) return existsErr;

    const editedTodo = await userTodos.find((x) => x.id === todoId);

    const updatedTodos = await userTodos.map((todo) => {
      if (todo?.id === editedTodo?.id) {
        return applyUpdateTodoSchema({ editedTodo, body });
      }
      return todo;
    });

    await localforage.setItem("todos", [
      ...otherTodos,
      {
        ownerId: loggedInUserId,
        todos: updatedTodos,
      },
    ]);

    const updatedTodo = await updatedTodos.find((x) => x?.id === todoId);

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(updatedTodo));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function getLoggedInUserTodosHandler(req, res, ctx) {
  try {
    const loggedInUserId = extractTokenFromHeaders(req.headers);
    const todos = await getUserTodosById(loggedInUserId);
    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(todos));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}

export async function getLoggedInUserTodoHandler(req, res, ctx) {
  try {
    const todoId = req?.params?.id;

    if (todoId === "undefined") {
      return generateBadRequestResponse({ res, ctx, message: errMessages.getTodoByIdRequiredParam });
    }

    const loggedInUserId = extractTokenFromHeaders(req.headers);
    const userTodos = await getUserTodosById(loggedInUserId);
    const todo = await userTodos?.find((x) => x?.id === todoId);

    if (!todo) {
      return generateNotFoundRequestResponse({ res, ctx, message: errMessages.todoNotFound(todoId) });
    }

    return res(ctx.delay(RESPONSE_DELAY), ctx.status(200), ctx.json(todo));
  } catch (error) {
    return generateServerErrorResponse({ res, ctx, message: errMessages.somethingWentWrong });
  }
}
