import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { client } from "./api-client/client.gen.ts";
import App from "./App.tsx";
import { OPEN_DOCS_ROUTE } from "./utils/constants.ts";
import { ENV_VARIABLES } from "./utils/environmentVariables.ts";
import { AuthProvider } from "./shared/context/auth-provider.tsx";

const queryClient = new QueryClient();

client.setConfig({
  baseUrl: ENV_VARIABLES.API_BASE_URL,
  credentials: "include"
});
client.interceptors.response.use((response) => {
    if (response.status === 403) {
        window.location.href = OPEN_DOCS_ROUTE.SIGN_IN;
        return Promise.reject(new Error('Access Denied!'));
    }
    return response;
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);