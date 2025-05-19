import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";

const Login = () => {
  const { register, handleSubmit, errors, onSubmit } = useLogin();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 px-4">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
          Welcome Back
        </h1>

        <div className="mb-4">
          <label className="block text-white mb-2 text-sm" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username or email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80"
            {...register("username")}
          />
          {errors.username && (
            <p className="text-sm text-red-300 mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-white mb-2 text-sm" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-sm text-red-300 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Login
        </button>

        <div className="mt-4 flex justify-between text-sm text-white">
          <Link to="/register" className="hover:underline">
            Don’t have an account? Register
          </Link>
          <Link to="/forgot-password" className="hover:underline">
            Forgot Password?
            </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
