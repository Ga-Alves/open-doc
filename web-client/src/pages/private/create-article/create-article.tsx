import { useState } from "react";
import { getArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import Button from "@/shared/components/button/button";
import Input from "@/shared/components/input/input";
import Textarea from "@/shared/components/text-area/text-area";
import ArticleCard from "@/shared/components/article-card/article-card";
import Layout from "@/shared/layout/layout";
import { useQuery } from "@tanstack/react-query";
import useCreateArticle from "./hooks/use-create-article";

export default function CreateArticle() {
  const { title, setTitle, content, setContent, submitForm } = useCreateArticle();
  const { data: articles } = useQuery(getArticlesOptions());

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleEdit = (article: { id: string; title: string; content: string }) => {
    setEditingId(article.id);
    setTitle(article.title);
    setContent(article.content);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    console.log("Delete:", id);
  };

  return (
    <Layout>
      <div className="space-y-12">
        <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {editingId ? "Edit Article" : "Draft new Article"}
            </h1>
            <p className="text-sm text-gray-500">
              {editingId
                ? "Update your existing article content below."
                : "Share your ideas with the world."}
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Title"
              type="text"
              value={title}
              placeholder="Enter a compelling title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              label="Content"
              value={content}
              placeholder="Write your article here..."
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="flex items-center gap-3 pt-2">
              <Button onClick={submitForm}>
                {editingId ? "Update Article" : "Publish Article"}
              </Button>
              {editingId && (
                <Button variant="outline" onClick={handleCancelEdit}>
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