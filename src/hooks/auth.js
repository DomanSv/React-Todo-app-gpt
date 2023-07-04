import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthApi } from "../api";

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
  const { mutate, isLoading, error } = useMutation({ mutationFn: AuthApi.addTodo, onSuccess });
  return { addTodo: mutate, isLoading, error };
}

export function useTodos() {
  const { data, isLoading, error } = useQuery(["todos"], AuthApi.getTodos);
  return { todos: data, tasksIsLoading: isLoading, error };
}

