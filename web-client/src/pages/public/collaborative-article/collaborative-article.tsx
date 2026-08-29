import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import Button from "@/shared/components/button/button";
import CollaborativeEditor from "@/shared/components/collaborative-editor/collaborative-editor";
import { copyTextToClipboard } from "@/utils/copyTextToClipboard";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";

export default function CollaborativeArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  if (!id) return null;

  const handleShare = async () => {
    await copyTextToClipboard(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col antialiased">
      {/* Top Navigation & Action Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(OPEN_DOCS_ROUTE.HOME)}
            aria-label="Back"
          >
            ← Back
          </Button>

          <div className="h-4 w-px bg-gray-200" />

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Live Session
            </span>
          </div>
        </div>

        {/* Share Button */}
        <div className="flex items-center gap-2">
          <Button
            variant={copied ? "secondary" : "primary"}
            size="sm"
            onClick={handleShare}
          >
            {copied ? (
              <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
                ✓ Link copied!
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                🔗 Share link with friends
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Editor Canvas Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-6 md:p-10">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm min-h-[calc(100vh-10rem)] p-8 md:p-12 transition-all">
          <CollaborativeEditor isEditable room={id} initialContent="" />
        </div>
      </main>
    </div>
  );
}
