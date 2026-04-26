import { useNavigate } from "react-router";
import useSignIn from "./hooks/use-sign-in";
import { OPEN_DOCS_ROUTE } from "@/utils/constants";

export default function SignIn() {
  const { changeEmail, changePassword, formState, submitForm } = useSignIn();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Sign-in</h1>

      <button onClick={() => navigate(OPEN_DOCS_ROUTE.HOME)}>
        Go Back Home
      </button>

      <div>
        <input
          type="email"
          name="user-email"
          placeholder="Email"
          value={formState.email}
          onChange={(e) => changeEmail(e.target.value)}
        />
        <input
          type="password"
          name="user-password"
          placeholder="password"
          value={formState.password}
          onChange={(e) => changePassword(e.target.value)}
        />
        <button onClick={submitForm}>Sign In!</button>
      </div>
    </div>
  );
}
