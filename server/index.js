// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import Booking from "./models/Booking.js";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json()); // parse JSON body

// // Connect to MongoDB
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("Connected to MongoDB"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // 📌 Create a booking (POST /api/bookings)
// app.post("/api/bookings", async (req, res) => {
//   try {
//     console.log("Request Body:", req.body); // Debug incoming data

//     const booking = new Booking(req.body);
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     console.error("Booking Save Error:", error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // 📌 Get all bookings (GET /api/bookings)
// app.get("/api/bookings", async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import Booking from "./models/Booking.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// POST /api/bookings (save + send email)
app.post("/api/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();

    // Setup nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //     const mailOptions = {
    //       from: process.env.EMAIL_USER,
    //       to: booking.email,
    //       subject: "Your Booking is Confirmed!",
    //       text: `
    // Hello ${booking.name},

    // Thank you for booking with us!

    // 📅 Check-In: ${new Date(booking.checkInDate).toDateString()}
    // 📅 Check-Out: ${new Date(booking.checkOutDate).toDateString()}
    // 🏨 Room Type: ${booking.roomType}
    // 📞 Phone: ${booking.phoneNumber}
    // 👥 Guests: ${booking.numberOfGuests}
    // 📝 Special Requests: ${booking.specialRequests || "None"}

    // We look forward to hosting you!

    // - Hotel Booking Team
    //       `,
    //     };

    const mailOptions = {
      from: `"Flabystaa Reservations" <${process.env.EMAIL_USER}>`,
      to: booking.email,
      subject: "🎉 Your Booking with Flabystaa is Confirmed!",
      html: `
    <div style="font-family: 'Segoe UI', sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #0066cc;">Hello ${booking.name},</h2>
      <p style="font-size: 16px;">
        🏖️ Thank you for choosing <strong style="color: #0066cc;">Flabystaa</strong> – where comfort meets luxury.
      </p>

      <p style="font-size: 16px;">
        We're thrilled to confirm your stay with us. Here are your booking details:
      </p>

      <table style="width: 100%; font-size: 15px; margin: 20px 0;">
        <tr><td>📅 <strong>Check-In:</strong></td><td>${new Date(
          booking.checkInDate
        ).toDateString()}</td></tr>
        <tr><td>📅 <strong>Check-Out:</strong></td><td>${new Date(
          booking.checkOutDate
        ).toDateString()}</td></tr>
        <tr><td>🏨 <strong>Room Type:</strong></td><td>${
          booking.roomType
        }</td></tr>
        <tr><td>👥 <strong>Guests:</strong></td><td>${
          booking.numberOfGuests
        }</td></tr>
        <tr><td>📞 <strong>Phone:</strong></td><td>${
          booking.phoneNumber
        }</td></tr>
        <tr><td>📝 <strong>Special Requests:</strong></td><td>${
          booking.specialRequests || "None"
        }</td></tr>
      </table>

      <p style="font-size: 16px;">
        If you need anything before your arrival, feel free to reply to this email. We're always here to help 💙.
      </p>

      <p style="font-size: 16px;">We can't wait to welcome you to Flabystaa!</p>

      <p style="margin-top: 30px; font-size: 16px; color: #888;">
        Warm regards,<br />
        <strong style="color: #0066cc;">The Flabystaa Team</strong><br/>
        ✨ Your premium getaway destination
      </p>
    </div>
  `,
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Email Error:", err);
        console.error("Failed to send booking confirmation email:", err);
      } else {
        console.log("Email Sent:", info.response);
        console.log("Booking Confirmation Email sent to:", booking.email);
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Booking Save Error:", error);
    res.status(400).json({ error: error.message });
  }
});

// GET /api/bookings
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
