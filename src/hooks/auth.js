import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../api";

export function useRegister({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: AuthApi.register, onSuccess });
  return { register: mutate, isLoading, error };
}

export function useLogin({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: AuthApi.login, onSuccess });
  return { login: mutate, isLoading, error };
}
