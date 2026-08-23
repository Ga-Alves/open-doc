import { getPublicArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import Editor from "@/shared/components/editor/editor";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

export default function Article() {
  const { data, isLoading } = useQuery(getPublicArticlesOptions());
  const { id } = useParams();
  const initialDocument = data?.find((article) => article.id === id)?.content;

  if (isLoading || !initialDocument) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Editor isEditable={false} initialContent={initialDocument} />
    </div>
  );
}
