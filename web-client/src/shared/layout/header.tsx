import { useAuth } from "@/shared/context/use-auth";
import { OPEN_DOCS_PRIVATE_ROUTE, OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router";
import Button from "../components/button/button";
import logo from "@/assets/duck.svg";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 px-6 h-16 flex justify-between items-center">
      <a
        href="/"
        className="text-lg font-bold tracking-tight text-gray-900 flex items-center gap-2"
      >
        <img src={logo} alt="Open Doc logo" className="h-9 w-9" />
        Open Doc
      </a>

      <div className="flex items-center gap-3">
        {!isLoading && (
          <>
            {isAuthenticated && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/social")}
              >
                👥 Network
              </Button>
            )}
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  navigate(OPEN_DOCS_PRIVATE_ROUTE.ADMIN_DASHBOARD)
                }
              >
                ⚙️ Admin Dashboard
              </Button>
            )}

            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(OPEN_DOCS_PRIVATE_ROUTE.CREATE_ARTICLE)}
              >
                Create Article
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(OPEN_DOCS_ROUTE.SIGN_IN)}
              >
                Sign In
              </Button>
            )}
          </>
        )}
      </div>
    </header>
  );
}
