import { Route, Routes } from "react-router";
import CreateArticle from "./pages/private/create-article/create-article";
import Home from "./pages/private/home/home";
import NotFound from "./pages/public/not-found/not-found";
import SignIn from "./pages/public/sign-in/sign-in";
import { OPEN_DOCS_ROUTE } from "./utils/constants";

function App() {
  return (
    <Routes>
      <Route path={OPEN_DOCS_ROUTE.SIGN_IN} element={<SignIn />} />
      <Route path="*" element={<NotFound />} />

      <Route path={OPEN_DOCS_ROUTE.HOME} element={<Home />} />
      <Route
        path={OPEN_DOCS_ROUTE.CREATE_ARTICLE}
        element={<CreateArticle />}
      />
    </Routes>
  );
}

export default App;
