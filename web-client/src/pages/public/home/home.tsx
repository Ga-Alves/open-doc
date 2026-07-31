import { getPublicArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import ArticleCard from "@/shared/components/article-card/article-card";
import Layout from "@/shared/layout/layout";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: articles, isLoading } = useQuery(getPublicArticlesOptions());

  return (
    <Layout>
      <div className="space-y-10">
        <section className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Explore Articles
          </h1>
          <p className="text-base text-gray-500 max-w-xl">
            Discover thoughts, stories, and ideas from authors around the platform.
          </p>
        </section>

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-48 rounded-2xl bg-gray-100/80 animate-pulse border border-gray-100"
              />
            ))}
          </div>
        )}

        {!isLoading && (!articles || articles.length === 0) && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">No public articles yet</h3>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Check back later or be the first to write and publish an article!
            </p>
          </div>
        )}

        {!isLoading && articles && articles.length > 0 && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </section>
        )}
      </div>
    </Layout>
  );
}