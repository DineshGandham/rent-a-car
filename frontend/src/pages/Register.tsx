import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/auth/useRegister';

const Register = () => {
  const { register, handleSubmit, onSubmit, errors } = useRegister();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-700 px-4">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-3xl font-bold text-white mb-6 text-center drop-shadow">
          Create Account
        </h1>

        <div className="mb-4">
          <label htmlFor="name" className="block text-white text-sm mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            placeholder="Enter your name"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white/80"
          />
          {errors.name && <p className="text-red-200 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white text-sm mb-2">
            Email Address
          </label>
          <input
            type="text"
            id="email"
            {...register('email')}
            placeholder="Enter your email"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white/80"
          />
          {errors.email && <p className="text-red-200 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-white text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            placeholder="Create password"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white/80"
          />
          {errors.password && <p className="text-red-200 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-white text-sm mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            {...register('confirmPassword')}
            placeholder="Confirm password"
            className="w-full p-3 border border-gray-300 rounded-lg bg-white/80"
          />
          {errors.confirmPassword && (
            <p className="text-red-200 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Register
        </button>

        <div className="mt-4 text-center text-sm text-white">
          Already have an account?{' '}
          <Link to="/login" className="underline hover:text-red-300">
            Login here
          </Link>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;
