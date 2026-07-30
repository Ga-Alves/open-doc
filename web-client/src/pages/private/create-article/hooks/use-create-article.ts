import { createArticleMutation, getArticlesQueryKey } from "@/api-client/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export default function useCreateArticle() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    ...createArticleMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getArticlesQueryKey()});
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitForm = useCallback(() => {
    if (!title || !content) {
      window.alert("Please fill all the required fields!");
      return;
    }

    mutation
      .mutateAsync({
        body: {
          content,
          title,
        },
      })
      .then(() => {
        setTitle("");
        setContent("");
      });
  }, [content, title, mutation]);

  return {
    content,
    mutation,
    setContent,
    setTitle,
    submitForm,
    title,
  };
}
