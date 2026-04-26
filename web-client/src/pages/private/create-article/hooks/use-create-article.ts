import { createArticleMutation } from "@/api-client/@tanstack/react-query.gen";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";

export default function useCreateArticle() {
  const mutation = useMutation(
    createArticleMutation({ credentials: "include" }),
  );

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
