import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { forgotPasswordSchema } from "../../schemas/forgotPasswordSchema";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../slices/authSlice";
type FormValues = {
  email: string;
//   password: string;
//   confirmPassword: string;
};

export function useForgotPassword() {
    const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
        const response = await dispatch(forgotPassword(data)).unWrap();
        toast.success("Email Sent")
    } catch (error:any) {
        toast.error(error.message ?? 'Failed to send email');
    }

  };
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
