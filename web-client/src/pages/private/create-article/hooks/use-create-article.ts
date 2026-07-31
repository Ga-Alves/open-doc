import {
  createArticleMutation,
  getArticlesQueryKey,
  getPublicArticlesQueryKey,
} from "@/api-client/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseCreateArticleProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function useCreateArticle({
  onSuccess,
  onError,
}: UseCreateArticleProps = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...createArticleMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getArticlesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getPublicArticlesQueryKey() });
      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Error creating article:", error);
      window.alert("Failed to create article. Please try again.");
      onError?.(error);
    },
  });

  const submitForm = useCallback(
    (formData: { title: string; content: string }) => {
      return mutation.mutateAsync({
        body: formData,
      });
    },
    [mutation],
  );

  return {
    submitForm,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  };
}
