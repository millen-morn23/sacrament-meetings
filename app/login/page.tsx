import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Log in to manage sacrament meeting programs.",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-lg bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Log in to create and manage sacrament
          meeting programs.
        </p>

        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}