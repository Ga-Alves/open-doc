import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPublicArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import ArticleCard from "@/shared/components/article-card/article-card";
import Button from "@/shared/components/button/button";
import Layout from "@/shared/layout/layout";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";

export default function Home() {
  const navigate = useNavigate();
  const { data: articles, isLoading } = useQuery(getPublicArticlesOptions());

  const handleStartCollaborativeSession = () => {
    const roomId = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
    navigate(OPEN_DOCS_ROUTE.COLLABORATIVE_ARTICLE.replace(":id", roomId));
  };

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4 pt-6 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Write, Collaborate & Share Knowledge
          </h1>
          <p className="text-base sm:text-lg text-gray-500">
            A modern workspace designed for seamless document creation, real-time collaboration, and effortless publishing.
          </p>
        </section>

        {/* Feature Grid Section */}
        <section className="space-y-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Platform Features
            </h2>
            <p className="text-sm text-gray-500">
              Explore tools designed to elevate your writing workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1: Real-time Collaboration (Actionable) */}
            <div className="p-6 bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-2xl shadow-sm flex flex-col justify-between gap-6 group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl">
                  ⚡
                </div>
                <h3 className="text-lg font-bold tracking-tight">
                  Real-time Collaboration
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Start an instant live editing session and invite your team to write together simultaneously.
                </p>
              </div>

              <Button
                variant="secondary"
                size="sm"
                className="w-full bg-white text-gray-900 hover:bg-gray-100 border-none font-semibold"
                onClick={handleStartCollaborativeSession}
              >
                Start Live Session →
              </Button>
            </div>

            {/* Feature 2: Rich Article Publisher */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  📝
                </div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900">
                  Article Publishing
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Draft, edit, and toggle article visibility between private notes and public posts.
                </p>
              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Integrated Workflow
              </span>
            </div>

            {/* Feature 3: Custom Component System */}
            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                  🧩
                </div>
                <h3 className="text-lg font-bold tracking-tight text-gray-900">
                  Oxygen UI Library
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Built using reusable, accessible, and themeable UI components tailored for authors.
                </p>
              </div>

              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Design System
              </span>
            </div>
          </div>
        </section>

        {/* Public Articles Section */}
        <section className="space-y-6 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              Explore Articles
            </h2>
            <p className="text-sm text-gray-500">
              Discover public stories and technical documentation created by the community.
            </p>
          </div>

          {/* Loading Skeleton */}
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

          {/* Empty State */}
          {!isLoading && (!articles || articles.length === 0) && (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">
                No public articles yet
              </h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Check back later or be the first to write and publish an article!
              </p>
            </div>
          )}

          {/* Article Cards Grid */}
          {!isLoading && articles && articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}