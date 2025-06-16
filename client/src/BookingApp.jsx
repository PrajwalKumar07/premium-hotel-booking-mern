import React, { useState, useEffect } from "react";
// import CryptoJS from "crypto-js";
// const SECRET_KEY = "YourSuperSecretKey123!"; // Change this to a strong secret ke

const BookingApp = () => {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roomType: "",
    checkInDate: "",
    checkOutDate: "",
    phoneNumber: "",
    numberOfGuests: 1,
    specialRequests: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      if (!res.ok) throw new Error("Failed to fetch bookings");
      const data = await res.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch bookings");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // Validation: Check if any field is empty
    const {
      name,
      email,
      roomType,
      checkInDate,
      checkOutDate,
      phoneNumber,
      numberOfGuests,
    } = formData;

    if (
      !name ||
      !email ||
      !roomType ||
      !checkInDate ||
      !checkOutDate ||
      !phoneNumber ||
      !numberOfGuests
    ) {
      setError("Please enter all the required values");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create booking");
      const newBooking = await res.json();
      setBookings((prev) => [...prev, newBooking]);
      setFormData({
        name: "",
        email: "",
        roomType: "",
        checkInDate: "",
        checkOutDate: "",
        phoneNumber: "",
        numberOfGuests: 1,
        specialRequests: "",
      });
      setSuccessMessage("Booking created successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
          /* Reset & base */
          body, html, #root {
            height: 100%;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
            overflow: hidden;
          }
          #overlay {
            position: fixed;
            top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(0,0,0,0.45);
            z-index: -1;
          }

          /* Main container centered with max size & scroll */
          .container {
            background: #fff;
            padding: 40px 50px;
            border-radius: 16px;
            max-width: 300px;
            width: 70%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 16px 40px rgba(0,0,0,0.3);
            color: #2c3e50;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          h1 {
            text-align: center;
            margin-bottom: 30px;
            font-weight: 700;
            font-size: 2.4rem;
            letter-spacing: 1.3px;
            color: #34495e;
          }

          
          h2 {
            color: #34495e;
            border-bottom: 2px solid #3498db;
            padding-bottom: 6px;
            margin-top: 30px;
            font-weight: 700;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 18px;
          }
          input, select {
            padding: 14px 18px;
            font-size: 1rem;
            border: 1.8px solid #ccc;
            border-radius: 10px;
            outline: none;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          input:focus, select:focus {
            border-color: #2980b9;
            box-shadow: 0 0 12px #a1d6ff;
          }
          label {
            font-weight: 600;
            margin-bottom: 6px;
            color: #555;
          }
          button {
            padding: 16px;
            font-size: 1.2rem;
            font-weight: 700;
            background-color: #3498db;
            color: white;
            border: none;
            border-radius: 14px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.15s ease;
            align-self: center;
            width: 180px;
            box-shadow: 0 6px 12px rgba(52, 152, 219, 0.4);
          }
          button:hover:not(:disabled) {
            background-color: #2980b9;
            transform: scale(1.05);
          }
          button:disabled {
            background-color: #a5c9f0;
            cursor: not-allowed;
            box-shadow: none;
            transform: none;
          }
          hr {
            margin: 35px 0;
            border-color: #eee;
            border-width: 1.5px;
          }
          ul {
            list-style: none;
            padding: 0;
            max-height: 320px;
            overflow-y: auto;
            color: #34495e;
            font-weight: 600;
            font-size: 1.05rem;
            border-radius: 12px;
            box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
            scroll-behavior: smooth;
          }
          li {
            padding: 14px 20px;
            border-bottom: 1px solid #ddd;
            transition: background-color 0.2s ease;
          }
          li:hover {
            background-color: #f0f8ff;
          }
          .error {
            text-align: center;
            color: #e74c3c;
            font-weight: 700;
            margin-top: 15px;
            font-size: 1.1rem;
          }

    

          

          /* Success notification styles */
          .success-notif {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 6px 18px rgba(39, 174, 96, 0.6);
            display: flex;
            align-items: center;
            gap: 14px;
            font-weight: 700;
            font-size: 1.1rem;
            min-width: 240px;
            user-select: none;
            z-index: 1000;
            animation: fadeInOut 3.5s forwards;
          }
          .success-notif svg {
            width: 28px;
            height: 28px;
            fill: white;
            flex-shrink: 0;
          }
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            10%, 90% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px);
            }
          }

          /* Responsive */
          @media (max-width: 640px) {
            .container {
              padding: 30px 25px;
              margin: 10px;
              max-width: 100%;
              max-height: 85vh;
            }
            h1 {
              font-size: 2rem;
            }
            button {
              font-size: 1.1rem;
              padding: 14px;
              width: 100%;
            }
            ul {
              max-height: 220px;
              font-size: 1rem;
            }
          }
        `}</style>

      <div id="overlay"></div>

      <div className="container" role="main" aria-label="Hotel Booking Form">
        <h1 className="shine-text">Hotel Booking</h1>

        <form onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            autoComplete="off"
            aria-label="Name"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="off"
            aria-label="Email"
          />

          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            required
            aria-label="Room Type"
          >
            <option value="" disabled>
              Select room type
            </option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>

          {/* <label htmlFor="checkInDate">Check-in Date</label>
            <input
              id="checkInDate"
              type="date"
              name="checkInDate"
              value={formData.checkInDate}
              onChange={handleChange}
              required
              aria-label="Check-in Date"
            /> */}

          {/* Check-in: only today allowed */}
          <label htmlFor="checkInDate">Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
            min={new Date().toISOString().split("T")[0]}
          />

          {/* <label htmlFor="checkOutDate">Check-out Date</label>
            <input
              id="checkOutDate"
              type="date"
              name="checkOutDate"
              value={formData.checkOutDate}
              onChange={handleChange}
              required
              aria-label="Check-out Date"
            /> */}

          {/* Check-out: today or any future date allowed */}
          <label htmlFor="checkOutDate">Check-out Date</label>
          <input
            id="checkOutDate"
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
            aria-label="Check-out Date"
            min={new Date().toISOString().split("T")[0]}
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            autoComplete="off"
            aria-label="Phone Number"
          />

          <input
            type="number"
            name="numberOfGuests"
            placeholder="Number of Guests"
            value={formData.numberOfGuests}
            onChange={handleChange}
            min="1"
            required
            aria-label="Number of Guests"
          />

          <textarea
            name="specialRequests"
            placeholder="Special Requests (optional)"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            aria-label="Special Requests"
          />

          <button type="submit" disabled={loading} aria-live="polite">
            {loading ? (
              <>
                <span className="spinner" aria-hidden="true"></span> Booking...
              </>
            ) : (
              "Book Now"
            )}
          </button>
        </form>

        {/* Success notification */}
        {successMessage && (
          <div className="success-notif" role="alert" aria-live="assertive">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
            {successMessage}
          </div>
        )}

        <hr />

        <h2>All Bookings</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {bookings.map((b) => (
            <li key={b._id}>
              <strong>{b.name}</strong> - {b.email} - {b.roomType} -{" "}
              {new Date(b.checkInDate).toLocaleDateString()} to{" "}
              {new Date(b.checkOutDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookingApp;
