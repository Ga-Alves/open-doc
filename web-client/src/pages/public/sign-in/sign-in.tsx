import Button from "@/shared/components/button/Button";
import Layout from "@/shared/layout/layout";
import useSignIn from "./hooks/use-sign-in";

export default function SignIn() {
  const { changeEmail, changePassword, formState, submitForm } = useSignIn();

  return (
    <Layout>
      <h1>Sign-in Page</h1>

      <div className="flex flex-col gap-2">
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
        <Button variant="primary" onClick={submitForm}>
          Sign in
        </Button>
      </div>
    </Layout>
  );
}
