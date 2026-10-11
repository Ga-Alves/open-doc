import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { signUpMutation } from "@/api-client/@tanstack/react-query.gen";
import Button from "@/shared/components/button/button";
import Input from "@/shared/components/input/input";
import Layout from "@/shared/layout/layout";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    link?: string;
  }>({});

  // Estado para armazenar a mensagem de erro da API
  const [apiError, setApiError] = useState<string | null>(null);

  const { mutate: signUp, isPending: isLoading } = useMutation({
    ...signUpMutation(),
    onSuccess: () => {
      setApiError(null);
      console.log("Account created successfully!");
      navigate("/sign-in");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Sign up error:", error);
      // Tenta extrair a mensagem que veio do backend ou usa um fallback genérico
      const message =
        error?.body?.message ||
        error?.message ||
        "User not found or password is invalid.";
      setApiError(message);
    },
  });

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (apiError) {
      setApiError(null);
    }
  };

  const validate = () => {
    const newErrors: typeof errors = {};

    if (!id) {
      newErrors.link = "Invalid or missing sign-up link in the URL.";
    }

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    if (!validate() || !id) return;

    signUp({
      body: {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        sign_up_link: id,
      },
    });
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto pt-8">
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="space-y-1 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Create an Account
            </h1>
            <p className="text-sm text-gray-500">
              Fill in your details to accept your invitation to Open Doc.
            </p>
          </div>

          {/* Alerta de Erro da API */}
          {apiError && (
            <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 font-medium flex items-center justify-between gap-2">
              <span>{apiError}</span>
            </div>
          )}

          {errors.link && (
            <div className="p-3.5 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 text-center font-medium">
              {errors.link}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={errors.name}
              disabled={isLoading || !id}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              disabled={isLoading || !id}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              disabled={isLoading || !id}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              disabled={isLoading || !id}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-2"
              disabled={isLoading || !id}
            >
              {isLoading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <div className="text-center pt-2 border-t border-gray-50">
            <p className="text-xs text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/sign-in")}
                className="font-semibold text-gray-900 hover:underline cursor-pointer"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}