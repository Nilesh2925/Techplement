import { User, Lock, Calculator, UserPlus } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigator = useNavigate();
  async function signUpUser(e) {
    e.preventDefault();
    const formData = new FormData(event.target);
    const { email, password, confirmPassword } = Object.fromEntries(
      formData.entries()
    );
    if (!email || !password || !confirmPassword) {
      return toast.error("Enter all fields");
    }
    if (password.length < 6) {
      return toast.error("Password should be at-least 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("password and  confirm password doesn't match");
    }

    try {
      const endpoint = `${import.meta.env.VITE_BACKEND_URI}/users/signup`;
      const response = await axios.post(endpoint, {
        email,
        password,
      });
      if (response.data.message === "User Already Exists") {
        return toast.error("User Already Exists");
      }
      const token = response.data.token;

      // Store the token in local storage
      localStorage.setItem("token", token);
      localStorage.setItem("user", email);
      e.target.reset();
      toast.success("Logged in successfully");

      setTimeout(() => {
        navigator("/login");
      }, 1000);
    } catch (error) {
      console.error("Signup failed:", error);
      // Handle signup failure
      return toast.error("Something went wrong! Please try later");
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <Toaster />
      <div className="bg-white p-10 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          CalcApp
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Make your calculations easier
        </p>

        <div className="mb-8 text-center">
          <Calculator className="mx-auto h-24 w-24 text-blue-500" />
        </div>

        <form onSubmit={signUpUser}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              email
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <User className="ml-3" />
              <input
                type="text"
                id="email"
                name="email"
                className="p-3 pl-0 bg-transparent w-full focus:outline-none"
                placeholder="Choose a email"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Lock className="ml-3" />
              <input
                type="password"
                name="password"
                id="password"
                className="p-3 pl-0 bg-transparent w-full focus:outline-none"
                placeholder="Create a password"
              />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Confirm Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <Lock className="ml-3" />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="p-3 pl-0 bg-transparent w-full focus:outline-none"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="flex items-center justify-center px-6 py-3 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700 focus:outline-none focus:bg-green-700"
            >
              <UserPlus className="mr-2" />
              Sign Up
            </button>
            <Link
              to={"/login"}
              type="button"
              className="flex items-center justify-center text-sm text-green-600 hover:underline"
            >
              Already have an account? Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
