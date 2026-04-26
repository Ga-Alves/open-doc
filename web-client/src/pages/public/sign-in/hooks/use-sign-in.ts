import { signInMutation } from "@/api-client/@tanstack/react-query.gen";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

type SubmitForm = {
  email: string;
  password: string;
};

const initialFormState: SubmitForm = {
  email: "",
  password: "",
};

export default function useSignIn() {
  const mutation = useMutation(signInMutation());
  const navigate = useNavigate();

  const [formState, setFormState] = useState<SubmitForm>(initialFormState);

  const submitForm = useCallback(async () => {
    if (!validateForm(formState)) return;

    mutation
      .mutateAsync({
        body: formState,
        credentials: "include",
      })
      .then(() => navigate(OPEN_DOCS_ROUTE.HOME));
  }, [formState, mutation, navigate]);

  const changeEmail = useCallback(
    (email: string) => setFormState((prev) => ({ ...prev, email })),
    [],
  );
  const changePassword = useCallback(
    (password: string) => setFormState((prev) => ({ ...prev, password })),
    [],
  );

  return {
    changeEmail,
    changePassword,
    formState,
    submitForm,
  };
}

function validateForm(form: SubmitForm): boolean {
  return form.email !== "" && form.password !== "";
}
