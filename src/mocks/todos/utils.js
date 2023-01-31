import localforage from "localforage";
import { nanoid } from "nanoid";
import { errMessages } from "../errMessages";
import { generateBadRequestResponse, generateNotFoundRequestResponse } from "../utils";

export async function getUserTodosById(userId) {
  try {
    const todos = (await localforage.getItem("todos")) ?? [];
    const userTodos = todos.find((todo) => todo?.ownerId === userId);
    return userTodos?.todos ?? [];
  } catch (error) {
    return null;
  }
}

export async function getNonUserTodosById(userId) {
  try {
    const todos = (await localforage.getItem("todos")) ?? [];
    const otherTodos = todos.filter((todo) => todo?.ownerId !== userId);
    return otherTodos;
  } catch (error) {
    return null;
  }
}

export async function checkIfTodoExistsInUserTodos({ userTodos, todoId, res, ctx }) {
  const todoForDeletion = await userTodos.find((x) => x.id === todoId);

  if (!todoForDeletion) {
    return generateNotFoundRequestResponse({ res, ctx, message: errMessages.todoNotFound(todoId) });
  }
}

export async function checkIfSubTodoExistsInUserTodos({ userTodos, todoId, subTodoId, res, ctx }) {
  const err = await checkIfTodoExistsInUserTodos({ userTodos, todoId, res, ctx });
  if (err) return err;

  const todoForDeletion = await userTodos.find((x) => x.id === todoId).subTasks.find((y) => y?.id === subTodoId);

  if (!todoForDeletion) {
    return generateNotFoundRequestResponse({ res, ctx, message: errMessages.subTodoNotFound(todoId, subTodoId) });
  }
}

export async function filterUserTodos({ userTodos, todoId }) {
  const todoForDeletion = await userTodos.find((x) => x.id === todoId);
  const filteredTodos = await userTodos.filter((todo) => todo?.id !== todoForDeletion?.id);

  return { todoForDeletion, filteredTodos };
}

export async function filterUserSubTodos({ userTodos, todoId, subTodoId }) {
  const parentTodo = await userTodos.find((x) => x.id === todoId);
  const todoForDeletion = await parentTodo?.subTasks?.find((x) => x?.id === subTodoId);

  const filteredSubTodos = await parentTodo?.subTasks?.filter((x) => x.id !== subTodoId);
  const filteredTodos = await userTodos.map((todo) => {
    if (todo?.id === parentTodo?.id) {
      return {
        ...todo,
        subTasks: filteredSubTodos,
      };
    }
    return todo;
  });

  return { todoForDeletion, filteredTodos };
}

export function applyUpdateTodoSchema({ body, editedTodo }) {
  return {
    id: editedTodo?.id,
    title: body?.title,
    description: body?.description,
    priority: body?.priority,
    done: body?.done,
    created: editedTodo?.created,
    updated: new Date().getTime(),
    subTasks: applyUpdateSubTodosScheme(body?.subTasks),
  };
}

export function applyUpdateSubTodosScheme(subTasks = []) {
  if (subTasks?.length) {
    return subTasks.map((subTodo) => ({
      id: subTodo?.id ?? nanoid(),
      title: subTodo?.title,
      done: subTodo?.done ?? false,
    }));
  }
  return subTasks;
}

export function applySubTodosSchema(subTodos) {
  if (!subTodos?.length) return [];

  return subTodos.map((subTodo) => ({ ...subTodo, id: nanoid(), done: false }));
}

export function validateTodo({ body, res, ctx }) {
  if (!body?.title && !body?.priority) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.provideTodoRequiredFields });
  }

  //Apply title validation
  if (body?.title && body.title?.length < 2) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.titleMinLength });
  }
  if (body?.title && body.title?.length > 50) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.titleMaxLength });
  }

  //Apply priority validation
  if (body?.priority && !["low", "mid", "high"].includes(body.priority)) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.priorityValueOptions });
  }

  //Apply description validation
  if (body?.description && body.description?.length < 2) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.descriptionMinLength });
  }
  if (body?.description && body.description?.length > 500) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.descriptionMaxLength });
  }

  //Apply subTasks validation
  if (body?.subTasks && body?.subTasks?.length > 5) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.subTasksMaxLength });
  }

  if (body?.subTasks && body?.subTasks?.length) {
    const subErrors = body?.subTasks?.map((x) => validateSubTodo({ body: x, res, ctx }));
    return subErrors.filter(Boolean)?.length ? subErrors?.[0] : null;
  }
}

export function validateSubTodo({ body, res, ctx }) {
  if (!body?.title) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.provideSubTaskRequiredField });
  }

  //Apply title validation
  if (body?.title && body.title?.length < 2) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.subTasksTitleMinLength });
  }
  if (body?.title && body.title?.length > 50) {
    return generateBadRequestResponse({ res, ctx, message: errMessages.subTasksTitleMaxLength });
  }
}
