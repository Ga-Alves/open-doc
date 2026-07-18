import { useNavigate } from "react-router";
import useCreateArticle from "./hooks/use-create-article";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { getArticlesOptions } from "@/api-client/@tanstack/react-query.gen";

export default function CreateArticle() {
  const { title, setTitle, content, setContent, submitForm } =
    useCreateArticle();

  const { data } = useQuery(getArticlesOptions());

  const navigate = useNavigate();
  return (
    <div>
      <h1>WIP</h1>

      <p>Lets create an article!</p>
      <button onClick={() => navigate(OPEN_DOCS_ROUTE.HOME)}>
        Go Back to Home.
      </button>
      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={content}
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={submitForm}> Submit</button>

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
