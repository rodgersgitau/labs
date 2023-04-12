import { FormEvent, useState } from "react";
import { FiLoader, FiUserPlus } from "react-icons/fi";

import { Brand } from "../components";
import { useAuth } from "../hooks";
import { DefaultLayout } from "../layout";

export default function Register() {
  const auth = useAuth();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await auth.signIn(formValues.email, formValues.password);
      void setLoading(false);
    } catch (error) {
      console.log(error);
      void setLoading(false);
    }
    return false;
  };

  return (
    <DefaultLayout subtitle="Create your account  ...">
      <main className="flex flex-col gap-10">
        <form className="w-full p-0 m-0" onSubmit={handleLogin}>
          <div className="flex flex-col gap-8">
            <input
              required
              type="email"
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              placeholder="Your email"
              value={formValues.email}
              className="bg-transparent rounded form-input input-bordered input-md"
            />
            <input
              required
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              type="password"
              value={formValues.password}
              placeholder="Enter your Password"
              className="bg-transparent rounded form-input input-bordered input-md"
            />
            <button
              type="submit"
              disabled={loading}
              className="text-lg capitalize btn btn-lg btn-secondary btn-group"
            >
              {loading ? (
                <div className="flex items-center gap-8">
                  <FiLoader fontSize="1.5rem" />
                  <span>Loading</span>
                </div>
              ) : (
                <div className="flex items-center gap-8">
                  <FiUserPlus fontSize="1.5rem" />
                  <span>SignUp</span>
                </div>
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center justify-end gap-2 text-base">
          <span className="w-[24ch]">Already have an account ?</span>
          <a
            href="/login"
            className="capitalize link link-accent underline-offset-4"
          >
            Sign In
          </a>
        </div>
      </main>
    </DefaultLayout>
  );
}
