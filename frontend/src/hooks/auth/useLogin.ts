import { useForm } from "react-hook-form";
import { loginSchema } from "../../schemas/loginSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch,useSelector  } from "react-redux";
import { loginUser } from "../../slices/authSlice";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data:any) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success('Login successful!');
      navigate('/cars');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
}
