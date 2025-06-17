import * as yup from "yup";

export const reservationSchema = yup.object().shape({
  pickupLocation: yup.string().required("Pick-up location is required"),
  dropoffLocation: yup.string().required("Drop-off location is required"),
  pickupDate: yup
    .date()
    .required("Pick-up date is required")
    .min(new Date(), "Pick-up date cannot be in the past"),
  pickupTime: yup.date().required("Pick-up time is required"),
  dropoffDate: yup
    .date()
    .required("Drop-off date is required")
    .min(
      yup.ref("pickupDate"),
      "Drop-off date cannot be before pick-up date"
    ),
  dropoffTime: yup.date().required("Drop-off time is required"),
});
