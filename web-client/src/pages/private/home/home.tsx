import { OPEN_DOCS_ROUTE } from "@/utils/constants";
import { getArticlesOptions } from "@api-client/@tanstack/react-query.gen";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function Home() {
  const { data } = useQuery(getArticlesOptions());

  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>Header</h1>{" "}
        <button onClick={() => navigate(OPEN_DOCS_ROUTE.CREATE_ARTICLE)}>
          Create Article
        </button>
      </header>
      <div>
        {data?.map((article) => (
          <div key={article.id}>
            <h1>{article.title}</h1>
            <caption>{article.createdAt}</caption>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
9;
