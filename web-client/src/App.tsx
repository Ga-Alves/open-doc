import { Route, Routes } from "react-router";
import CreateArticle from "./pages/private/create-article/create-article";
import Home from "./pages/private/home/home";
import NotFound from "./pages/public/not-found/not-found";
import { OPEN_DOCS_ROUTE } from "./utils/constants";

function App() {
  return (
    <Routes>
      <Route path={OPEN_DOCS_ROUTE.HOME} element={<Home />} />
      <Route
        path={OPEN_DOCS_ROUTE.CREATE_ARTICLE}
        element={<CreateArticle />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
