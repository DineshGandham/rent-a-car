import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { reservationSchema } from "../../schemas/reservationSchema";
import { useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import {vehicleReserve} from '../../slices/reservationSlice';

interface BookingRequest {
  pickupLocation: string;
  dropLocation: string;
  pickupTime: string;
  dropTime: string; 
}


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
  try {
    const pickupDateTime = new Date(
      data.pickupDate.getFullYear(),
      data.pickupDate.getMonth(),
      data.pickupDate.getDate(),
      data.pickupTime.getHours(),
      data.pickupTime.getMinutes()
    );

    const dropoffDateTime = new Date(
      data.dropoffDate.getFullYear(),
      data.dropoffDate.getMonth(),
      data.dropoffDate.getDate(),
      data.dropoffTime.getHours(),
      data.dropoffTime.getMinutes()
    );

    const payload = {
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropoffLocation,
      pickupTime: pickupDateTime.toISOString(),
      dropTime: dropoffDateTime.toISOString(),
    };

    dispatch(vehicleReserve(payload))
      .unwrap()
      .then((result: any) => {
        console.log("Reservation Result:", result);
        toast.success("Reservation submitted successfully!");
      })
      .catch((error: any) => {
        console.error("Error submitting reservation:", error);
        toast.error("Reservation failed. Please try again.");
      });

    console.log("Reservation Payload:", payload);
  } catch (error) {
    console.error("Unexpected Error:", error);
    toast.error("Something went wrong!");
  }
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
