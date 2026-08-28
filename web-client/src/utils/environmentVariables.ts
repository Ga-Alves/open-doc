type environmentVariables = {
  SIGNALING_SERVER_HOST: string;
};

export const ENV_VARIABLES: environmentVariables = {
  SIGNALING_SERVER_HOST:
    import.meta.env.VITE_SIGNALING_SERVER_HOST || "http://localhost:4444",
};
