import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const initialValues = { email: "", password: "" };

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const resp = await axios.get("https://fakestoreapi.com/users");
      const allUsers = resp.data;

      const foundUser = allUsers.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (!foundUser) {
        toast.error("No account found with that email/password.");
      } else {
        // Store user info
        localStorage.setItem("isAuthenticated", "true");
        const fullName = `${foundUser.name.firstname} ${foundUser.name.lastname}`;
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("email", foundUser.email);
        localStorage.setItem("userId", foundUser.id);

        toast.success("Login successful! Redirecting to home…");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50 p-6">
      <ToastContainer position="top-center" />
      <div className="bg-white flex flex-col items-center shadow-2xl rounded-3xl max-w-md w-full p-8">
        <FaUser size={100} className="text-[#fd9a18]" />
        <h2 className="text-3xl font-bold text-[#fd9a18] mb-6 text-center">
          Log In
        </h2>

        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-neutral-800 font-medium mb-1"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-[#fd9a18] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-neutral-800 font-medium mb-1"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-[#fd9a18] rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#fd9a18] text-white font-semibold rounded-lg hover:bg-amber-600 transition disabled:opacity-50"
              >
                {isSubmitting ? "Logging In..." : "Log In"}
              </button>

              <Link to="/">
                <button className="w-full py-2 bg-[#f5b35d] text-neutral-700 font-semibold rounded-lg hover:bg-amber-600 transition">
                  Home
                </button>
              </Link>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-center text-[#fd9a18]">
          Don’t have an account?
          <Link
            to="/register"
            className="text-[#fd9a18] font-medium hover:underline ml-1"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
