import { Route, Routes } from "react-router";
import CreateArticle from "./pages/private/create-article/create-article";
import Article from "./pages/public/article/article";
import Home from "./pages/public/home/home";
import NotFound from "./pages/public/not-found/not-found";
import SignIn from "./pages/public/sign-in/sign-in";
import { OPEN_DOCS_PRIVATE_ROUTE, OPEN_DOCS_ROUTE } from "./utils/constants";

import "@ga-alves/oxygen-ui/style.css";

function App() {
  return (
    <Routes>
      <Route path={OPEN_DOCS_ROUTE.SIGN_IN} element={<SignIn />} />
      <Route path="*" element={<NotFound />} />

      <Route path={OPEN_DOCS_ROUTE.HOME} element={<Home />} />
      <Route path={OPEN_DOCS_ROUTE.ARTICLE} element={<Article />} />

      <Route
        path={OPEN_DOCS_PRIVATE_ROUTE.CREATE_ARTICLE}
        element={<CreateArticle />}
      />
    </Routes>
  );
}

export default App;
