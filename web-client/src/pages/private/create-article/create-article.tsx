import { getArticlesOptions } from "@/api-client/@tanstack/react-query.gen";
import Button from "@/shared/components/button/Button";
import Layout from "@/shared/layout/layout";
import { useQuery } from "@tanstack/react-query";
import useCreateArticle from "./hooks/use-create-article";

export default function CreateArticle() {
  const { title, setTitle, content, setContent, submitForm } =
    useCreateArticle();

  const { data } = useQuery(getArticlesOptions());
  return (
    <Layout>
      <p>Lets create an article!</p>
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
      <Button onClick={submitForm}>Submit</Button>

      <div>
        {data?.map((article) => (
          <div key={article.id}>
            <h1>{article.title}</h1>
            <span>{article.createdAt}</span>
            <p>{article.content}</p>
          </div>
        ))}
      </div>
    </Layout>
  );
}
