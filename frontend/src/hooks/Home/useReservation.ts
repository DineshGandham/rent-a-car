import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reservationSchema } from "../../schemas/reservationSchema";
import { useDispatch } from "react-redux";

export function useReservation() {
    const dispatch = useDispatch();
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(reservationSchema),
    mode: "onTouched",
  });

  const pickupDate = watch("pickupDate");

  const onSubmit = (data: any) => {
    console.log("Reservation Data:", data);
    alert("Reservation submitted! Check console.");
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    control,
    pickupDate,
  };
}
