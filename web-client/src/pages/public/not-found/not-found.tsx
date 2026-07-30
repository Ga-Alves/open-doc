import Button from "@/shared/components/button/button";
import Layout from "@/shared/layout/layout";
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
        <span className="text-6xl font-extrabold text-gray-200">404</span>
        <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        <p className="text-sm text-gray-500 max-w-sm">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <Button variant="secondary" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Layout>
  );
}