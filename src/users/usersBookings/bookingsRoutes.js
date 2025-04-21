import express from "express";
import {
  getAllMultiBookings,
  updateMultiBookings,
  getAllSingleBookings,
  updateSingleBooking,
  deleteSingleBooking,
  createSingleBooking,
  createMultiBooking,
} from "./bookingsControllers.js";

const usersBookingsRouter = express.Router();

// Read booking data
usersBookingsRouter.get("/api/multi-bookings", getAllMultiBookings);
usersBookingsRouter.get("/api/single-bookings", getAllSingleBookings);

// Create booking data
usersBookingsRouter.post("/bookings/single", createSingleBooking); // Removed verifyToken
usersBookingsRouter.post("/bookings/multi", createMultiBooking); // Removed verifyToken

// Update booking data
usersBookingsRouter.put("/api/multi-bookings/:id", updateMultiBookings);
usersBookingsRouter.put("/api/single-bookings/:id", updateSingleBooking);

// Delete booking data
usersBookingsRouter.delete("/api/single-bookings/:id", deleteSingleBooking);

export default usersBookingsRouter;
