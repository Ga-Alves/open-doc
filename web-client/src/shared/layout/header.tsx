import { OPEN_DOCS_PRIVATE_ROUTE, OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router";
import Button from "../components/button/Button";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex border-b-2 border-gray-400 h-12 justify-between items-center p-3">
      <a href="/">Open Doc</a>

      <div className="flex gap-1">
        <Button
          variant="primary"
          onClick={() => navigate(OPEN_DOCS_PRIVATE_ROUTE.CREATE_ARTICLE)}
        >
          Create Article
        </Button>
        <Button
          variant="secondary"
          onClick={() => navigate(OPEN_DOCS_ROUTE.SIGN_IN)}
        >
          Sign In
        </Button>{" "}
      </div>
    </header>
  );
}
