import { OPEN_DOCS_PRIVATE_ROUTE, OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>Header</h1>{" "}
        <button onClick={() => navigate(OPEN_DOCS_PRIVATE_ROUTE.CREATE_ARTICLE)}>
          Create Article
        </button>{" "}
        <button onClick={() => navigate(OPEN_DOCS_ROUTE.SIGN_IN)}>
          Sign In
        </button>{" "}
      </header>
    </div>
  );
}

export default Home;
