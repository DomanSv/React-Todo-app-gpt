import { useMutation } from "@tanstack/react-query";
import { GptAiApi } from "../api";

export function useAskGptById({ onSuccess }) {
  const { mutate, isLoading, error } = useMutation({ mutationFn: GptAiApi.askGpt, onSuccess });
  return { askGpt: mutate, gptIsLoading: isLoading, error };
}
