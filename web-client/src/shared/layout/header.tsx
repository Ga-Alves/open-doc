import { OPEN_DOCS_PRIVATE_ROUTE, OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router";
import Button from "../components/button/button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 px-6 h-16 flex justify-between items-center">
      <a href="/" className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-gray-900"></span>
        Open Doc
      </a>

      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(OPEN_DOCS_ROUTE.SIGN_IN)}
        >
          Sign In
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(OPEN_DOCS_PRIVATE_ROUTE.CREATE_ARTICLE)}
        >
          Create Article
        </Button>
      </div>
    </header>
  );
}