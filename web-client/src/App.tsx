import { Route, Routes } from "react-router";
import Home from "./pages/private/home/home";
import NotFound from "./pages/public/not-found/not-found";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
