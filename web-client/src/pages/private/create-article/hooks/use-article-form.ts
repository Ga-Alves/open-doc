import { useCallback, useState } from "react";

interface UseArticleFormProps {
  initialTitle?: string;
  initialContent?: string;
}

export function useArticleForm({
  initialTitle = "",
  initialContent = "",
}: UseArticleFormProps = {}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const resetForm = useCallback(() => {
    setTitle("");
    setContent("");
  }, []);

  const setFormData = useCallback((title: string, content: string) => {
    setTitle(title);
    setContent(content);
  }, []);

  const validateForm = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      window.alert("Please fill all the required fields!");
      return false;
    }
    return true;
  }, [title, content]);

  const getFormData = useCallback(
    () => ({
      title: title.trim(),
      content: content.trim(),
    }),
    [title, content],
  );

  return {
    // State
    title,
    content,
    // Setters
    setTitle,
    setContent,
    // Actions
    resetForm,
    setFormData,
    validateForm,
    getFormData,
    // Helpers
    isFormValid: title.trim().length > 0 && content.trim().length > 0,
  };
}
