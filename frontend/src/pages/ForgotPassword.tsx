import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log("Reset link sent to:", data.email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 px-4">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
          Forgot Password?
        </h2>
        <p className="text-sm text-white text-center mb-4">
          Enter your registered email to receive a reset link.
        </p>

        <div className="mb-6">
          <label htmlFor="email" className="block text-white mb-2 text-sm">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="example@mail.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white/80"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-300 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Send Reset Link
        </button>

        <div className="mt-4 text-sm text-white text-center">
          <Link to="/login" className="hover:underline">
            Back to Login
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default ForgotPassword;
