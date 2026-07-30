import Button from "@/shared/components/button/button";
import Input from "@/shared/components/input/input";
import Layout from "@/shared/layout/layout";
import useSignIn from "./hooks/use-sign-in";

export default function SignIn() {
  const { changeEmail, changePassword, formState, submitForm } = useSignIn();

  return (
    <Layout>
      <div className="max-w-md mx-auto pt-12">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="space-y-4"
          >
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formState.email}
              onChange={(e) => changeEmail(e.target.value)}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formState.password}
              onChange={(e) => changePassword(e.target.value)}
            />
            <Button variant="primary" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
}