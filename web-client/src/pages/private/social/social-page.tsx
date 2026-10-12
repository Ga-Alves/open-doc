import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  listAccountsOptions,
  listFeedArticlesOptions,
  followUserMutation,
  listAccountsQueryKey,
  listFeedArticlesQueryKey,
} from "@/api-client/@tanstack/react-query.gen";
import ArticleCard from "@/shared/components/article-card/article-card";
import Button from "@/shared/components/button/button";
import Layout from "@/shared/layout/layout";

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<"discover" | "feed">("discover");
  const queryClient = useQueryClient();

  const { data: accounts, isLoading: isLoadingAccounts } = useQuery(
    listAccountsOptions()
  );
  const { data: feedArticles, isLoading: isLoadingFeed } = useQuery(
    listFeedArticlesOptions()
  );
  const { mutate: followUser, isPending: isFollowing } = useMutation({
    ...followUserMutation(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: listAccountsQueryKey() });
      queryClient.invalidateQueries({ queryKey: listFeedArticlesQueryKey() });
    },
    onError: (error) => {
      console.error("Failed to follow user:", error);
    },
  });

  const handleFollowToggle = (accountId: string) => {
    followUser({
      query: {
        accountToFollow: accountId,
      },
    });
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header da Seção */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            Community & Feed
          </h1>
          <p className="text-sm text-gray-500">
            Discover fellow authors, expand your network, and read personalized articles.
          </p>
        </div>

        {/* Sistema de Abas (Tabs) */}
        <div className="flex border-b border-gray-100 gap-6">
          <button
            onClick={() => setActiveTab("discover")}
            className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === "discover"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Explore Authors
          </button>
          <button
            onClick={() => setActiveTab("feed")}
            className={`pb-3 text-sm font-semibold transition-colors relative cursor-pointer ${
              activeTab === "feed"
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            Following Feed
          </button>
        </div>

        {/* CONTEÚDO DA ABA 1: EXPLORAR AUTORES */}
        {activeTab === "discover" && (
          <div className="space-y-4">
            {isLoadingAccounts ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 4].map((n) => (
                  <div
                    key={n}
                    className="h-24 rounded-2xl bg-gray-100 animate-pulse border border-gray-100"
                  />
                ))}
              </div>
            ) : !accounts || accounts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-500">
                No accounts found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {accounts.map((account) => (
                  <div
                    key={account.id}
                    className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 truncate">
                          {account.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase ${
                            account.role === "ADMIN"
                              ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {account.role}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{account.email}</p>
                    </div>

                    <Button
                      variant={account.followedByUser ? "outline" : "primary"}
                      size="sm"
                      disabled={isFollowing}
                      onClick={() => handleFollowToggle(account.id)}
                      className="shrink-0"
                    >
                      {account.followedByUser ? "Following" : "+ Follow"}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTEÚDO DA ABA 2: FEED DE ARTIGOS DOS SEGUIDOS */}
        {activeTab === "feed" && (
          <div className="space-y-6">
            {isLoadingFeed ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((n) => (
                  <div
                    key={n}
                    className="h-48 rounded-2xl bg-gray-100 animate-pulse border border-gray-100"
                  />
                ))}
              </div>
            ) : !feedArticles || feedArticles.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Your feed is quiet</h3>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">
                  Follow authors in the "Explore Authors" tab to see their latest articles here!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {feedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}