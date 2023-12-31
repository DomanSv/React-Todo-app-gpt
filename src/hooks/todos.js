import { useMutation, useQuery } from "@tanstack/react-query";
import { TodoApi } from "../api";

export function useAddTodo({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: TodoApi.addTodo, onSuccess });
  return { addTodo: mutate, isLoading, error };
}

export function useTodos() {
  const { data, isLoading, isFetching, error } = useQuery(["todos"], TodoApi.getTodos);
  return { todos: data, tasksIsLoading: isLoading, tasksIsFetching: isFetching, error };
}

export function useTodosById({ id, enabled }) {
  const { data, isLoading, error, isFetching } = useQuery(["todos", id], () => TodoApi.getTodoById(id), {enabled});
  return { todo: data, isLoadingTodo: isLoading, error, isFetchingTodo: isFetching };
}

export function useDeleteTodo({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: TodoApi.deleteTodo, onSuccess });
  return { deleteTodo: mutate, isLoading, error };
}

export function useDeleteSubtask({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: TodoApi.deleteSubtask, onSuccess });
  return { deleteSubtask: mutate, isLoading, error };
}

export function useEditTodo({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: TodoApi.editTodo, onSuccess });
  return { editTodo: mutate, isLoading, error };
}
