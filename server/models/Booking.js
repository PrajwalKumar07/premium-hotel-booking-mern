import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  roomType: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  numberOfGuests: { type: Number, required: true, min: 1 },
  specialRequests: { type: String }, // optional
});

// Specify collection name here:
export default mongoose.model("Booking", bookingSchema, "hotel_reservations");
