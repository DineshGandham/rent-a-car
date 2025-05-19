import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schemas/registerSchema";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../slices/authSlice";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(registerSchema),
  });


  const onSubmit = async (data) => {
    try {
      const result = await dispatch(registerUser(data)).unwrap();
      toast.success('Registration successful!');
      navigate('/login');
    } catch (err: any) {
      toast.error(err.message ?? 'Registration failed');
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
