import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi, TodoApi } from "../api";

export function useRegister({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: AuthApi.register, onSuccess });
  return { register: mutate, isLoading, error };
}

export function useLogin({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: AuthApi.login, onSuccess });
  return { login: mutate, isLoading, error };
}

export function useAccount({ enabled }) {
  const { data, isLoading, error } = useQuery(["account"], AuthApi.getAccount, { staleTime: Infinity, cacheTime: Infinity, enabled });
  return { account: data, isLoading, error };
}

export function useAddTodo({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: TodoApi.addTodo, onSuccess });
  return { addTodo: mutate, isLoading, error };
}

export function useTodos() {
  const { data, isLoading, isFetching, error } = useQuery(["todos"], TodoApi.getTodos);
  return { todos: data, tasksIsLoading: isLoading, tasksIsFetching: isFetching,  error };
}

export function useDeleteTodo({onSuccess}) {
  const { mutate, isLoading, error } = useMutation({mutationFn: TodoApi.deleteTodo, onSuccess});
  return { deleteTodo: mutate, isLoading, error };
}
