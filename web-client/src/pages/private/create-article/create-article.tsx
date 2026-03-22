import { useNavigate } from "react-router";
import useCreateArticle from "./hooks/use-create-article";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";

export default function CreateArticle() {
  const { title, setTitle, content, setContent, submitForm } =
    useCreateArticle();

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
    </div>
  );
}
