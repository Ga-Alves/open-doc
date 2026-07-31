import { useCallback, useState } from "react";

interface UseArticleFormProps {
  initialTitle?: string;
  initialContent?: string;
  initialIsPublic?: boolean;
}

export function useArticleForm({
  initialTitle = "",
  initialContent = "",
  initialIsPublic = false,
}: UseArticleFormProps = {}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [isPublic, setIsPublic] = useState(initialIsPublic);

  const resetForm = useCallback(() => {
    setTitle("");
    setContent("");
    setIsPublic(false);
  }, []);

  const setFormData = useCallback(
    (title: string, content: string, isPublic: boolean = false) => {
      setTitle(title);
      setContent(content);
      setIsPublic(isPublic);
    },
    []
  );

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
      isPublic,
    }),
    [title, content, isPublic]
  );

  return {
    // State
    title,
    content,
    isPublic,
    // Setters
    setTitle,
    setContent,
    setIsPublic,
    // Actions
    resetForm,
    setFormData,
    validateForm,
    getFormData,
    // Helpers
    isFormValid: title.trim().length > 0 && content.trim().length > 0,
  };
}