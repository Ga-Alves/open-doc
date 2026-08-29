type environmentVariables = {
  SIGNALING_SERVER_HOST: string;
  API_BASE_URL: string;
};

export const ENV_VARIABLES: environmentVariables = {
  SIGNALING_SERVER_HOST:
    import.meta.env.VITE_SIGNALING_SERVER_HOST || "http://localhost:4444/signaling",
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"
};
