import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  listAccountsOptions,
  createSignupLinkMutation,
} from "@/api-client/@tanstack/react-query.gen";
import Button from "@/shared/components/button/button";
import Layout from "@/shared/layout/layout";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";

export default function AdminDashboard() {
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    data: accounts,
    isLoading: isLoadingAccounts,
    refetch,
  } = useQuery(listAccountsOptions());

  const { mutate: createLink, isPending: isGeneratingLink } = useMutation({
    ...createSignupLinkMutation(),
    onSuccess: (response) => {
      const rawLink = response?.link || ""
      setGeneratedLink(`${window.location.origin}${rawLink}`);
      setCopied(false);
    },
    onError: (error) => {
      console.error("Failed to generate signup link:", error);
    },
  });

  const handleGenerateLink = () => {
    createLink({});
  };

  const handleCopyLink = async () => {
    if (generatedLink) {
      await copyTextToClipboard(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Layout>
      <div className="space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Manage platform accounts and generate secure invitation sign-up links.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleGenerateLink}
            disabled={isGeneratingLink}
          >
            {isGeneratingLink ? "Generating..." : "✨ Generate Sign-up Link"}
          </Button>
        </div>

        {generatedLink && (
          <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                New Invitation Link
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                Active
              </span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm focus:outline-none font-mono"
              />
              <Button
                variant={copied ? "secondary" : "outline"}
                onClick={handleCopyLink}
                className="shrink-0"
              >
                {copied ? "✓ Copied!" : "Copy Link"}
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight text-gray-900">
              Platform Accounts ({accounts?.length || 0})
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetch()}
              disabled={isLoadingAccounts}
            >
              Refresh List
            </Button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {isLoadingAccounts ? (
              <div className="p-8 space-y-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-12 rounded-xl bg-gray-100 animate-pulse"
                  />
                ))}
              </div>
            ) : !accounts || accounts.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-sm">
                No accounts found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      <th className="py-3.5 px-6">Name</th>
                      <th className="py-3.5 px-6">Email</th>
                      <th className="py-3.5 px-6">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {accounts.map((account) => (
                      <tr
                        key={account.id}
                        className="hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 px-6 font-medium text-gray-900">
                          {account.name}
                        </td>
                        <td className="py-4 px-6 text-gray-500">
                          {account.email}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide uppercase ${
                              account.role === "ADMIN"
                                ? "bg-purple-50 text-purple-700 border border-purple-200/60"
                                : "bg-gray-100 text-gray-600 border border-gray-200/60"
                            }`}
                          >
                            {account.role}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}