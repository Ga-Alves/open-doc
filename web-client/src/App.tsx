import { useQuery } from "@tanstack/react-query";
import { getArticlesOptions } from "./api-client/@tanstack/react-query.gen";

function App() {
  const { data } = useQuery(getArticlesOptions());

  return (
    <div>
      {data?.map((article) => (
        <div key={article.id}>
          <h1>{article.title}</h1>
          <caption>{article.createdAt}</caption>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
