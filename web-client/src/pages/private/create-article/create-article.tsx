import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import ArticleCard from "@/shared/components/article-card/article-card";
import Button from "@/shared/components/button/button";
import Input from "@/shared/components/input/input";
import Switch from "@/shared/components/switch/switch";
import Textarea from "@/shared/components/text-area/text-area";
import Layout from "@/shared/layout/layout";
import { useArticleForm } from "./hooks/use-article-form";
import useCreateArticle from "./hooks/use-create-article";
import useEditArticle from "./hooks/use-edit-article";

type Article = {
  id: string;
  title: string;
  content: string;
  isPublic?: boolean;
  createdAt: string;
};

export default function CreateArticle() {
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useArticleForm();

  const createArticle = useCreateArticle({
    onSuccess: () => {
      form.resetForm();
      console.log("Article created successfully!");
    },
  });

  const editArticle = useEditArticle({
    onSuccess: () => {
      setEditingId(null);
      form.resetForm();
      console.log("Article updated successfully!");
    },
  });

  const { data: articles } = useQuery(getArticlesOptions());

  const isEditing = editingId !== null;
  const isLoading = createArticle.isLoading || editArticle.isLoading;

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    form.setFormData(article.title, article.content, article.isPublic ?? false);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    form.resetForm();
  };

  const handleSubmit = async () => {
    if (!form.validateForm()) return;

    const formData = form.getFormData();

    if (isEditing && editingId) {
      await editArticle.submitForm(editingId, formData);
    } else {
      await createArticle.submitForm(formData);
    }
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <Layout>
      <div className="space-y-12">
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {isEditing ? "Edit Article" : "Draft new Article"}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing
                ? "Update your existing article content below."
                : "Share your ideas with the world."}
            </p>
          </div>

          <div className="space-y-5">
            <Input
              label="Title"
              type="text"
              value={form.title}
              placeholder="Enter a compelling title..."
              onChange={(e) => form.setTitle(e.target.value)}
              disabled={isLoading}
            />

            <Textarea
              label="Content"
              value={form.content}
              placeholder="Write your article here..."
              onChange={(e) => form.setContent(e.target.value)}
              disabled={isLoading}
            />

            <div className="p-4 rounded-xl bg-gray-50/50 border border-gray-100">
              <Switch
                label="Make article public"
                description="Public articles are visible to all readers."
                checked={form.isPublic}
                onChange={(e) => form.setIsPublic(e.target.checked)}
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                onClick={handleSubmit}
                disabled={!form.isFormValid || isLoading}
              >
                {isLoading
                  ? "Saving..."
                  : isEditing
                    ? "Update Article"
                    : "Publish Article"}
              </Button>
              {isEditing && (
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold tracking-tight text-gray-900">
            Published Articles ({articles?.length || 0})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles?.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}