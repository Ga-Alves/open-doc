import {
  getArticlesQueryKey,
  getPublicArticlesQueryKey,
  updateArticleMutation,
} from "@/api-client/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

interface UseEditArticleProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function useEditArticle({
  onSuccess,
  onError,
}: UseEditArticleProps = {}) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...updateArticleMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getArticlesQueryKey() });
      queryClient.invalidateQueries({ queryKey: getPublicArticlesQueryKey() });

      onSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Error updating article:", error);
      window.alert("Failed to update article. Please try again.");
      onError?.(error);
    },
  });

  const submitForm = useCallback(
    (id: string, formData: { title: string; content: string }) => {
      return mutation.mutateAsync({
        body: formData,
        query: { id },
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
