import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/booking",
});

export const cacheBooking = async (bookingData: any) => {
  const response = await API.post("/cache", {
    ...bookingData,
    pickupTime: new Date(bookingData.pickupTime).toISOString().slice(0, 19),
    dropTime: new Date(bookingData.dropTime).toISOString().slice(0, 19),
  });
  return response.data;
};

export const confirmBooking = async (bookingData: any) => {
  const response = await API.post("/confirm", {
    ...bookingData,
    pickupTime: new Date(bookingData.pickupTime).toISOString().slice(0, 19),
    dropTime: new Date(bookingData.dropTime).toISOString().slice(0, 19),
  });
  return response.data;
};

// Fetch all bookings
export const fetchBookings = async () => {
  const response = await API.get("/");
  return response.data;
};
