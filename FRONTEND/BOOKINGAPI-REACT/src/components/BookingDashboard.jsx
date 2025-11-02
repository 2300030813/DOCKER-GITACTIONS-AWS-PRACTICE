import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookingDashboard.css";

export default function BookingDashboard() {
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    bookingId: "",
    customerName: "",
    phone: "",
    email: "",
    numberOfGuests: "",
    location: "",
    bookingDate: "",
    notes: "",
  });
  const [editMode, setEditMode] = useState(false);
  //const API_URL = "http://localhost:1700/bookingapi";
  const API_URL = `${import.meta.env.VITE_API_URL}/bookingapi`;


  // Fetch all bookings
  useEffect(() => {
    axios
      .get(`${API_URL}/all`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update booking
  const handleBook = async (e) => {
    e.preventDefault();
    if (
      !form.bookingId ||
      !form.customerName ||
      !form.phone ||
      !form.email ||
      !form.bookingDate ||
      !form.location
    ) {
      return alert("⚠️ Please fill all required fields!");
    }

    try {
      if (editMode) {
        await axios.put(`${API_URL}/update`, form);
        alert("✅ Booking updated successfully!");
        setEditMode(false);
      } else {
        await axios.post(`${API_URL}/add`, form);
        alert("✅ Booking confirmed successfully!");
      }

      const res = await axios.get(`${API_URL}/all`);
      setBookings(res.data);
    } catch (err) {
      console.error("Error saving booking:", err);
      alert("❌ Failed to save booking.");
    }

    setForm({
      bookingId: "",
      customerName: "",
      phone: "",
      email: "",
      numberOfGuests: "",
      location: "",
      bookingDate: "",
      notes: "",
    });
  };

  // Delete booking
  const handleDelete = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await axios.delete(`${API_URL}/delete/${bookingId}`);
        setBookings(bookings.filter((b) => b.bookingId !== bookingId));
      } catch (err) {
        console.error("Error deleting booking:", err);
      }
    }
  };

  // Edit booking
  const handleEdit = (b) => {
    setForm(b);
    setEditMode(true);
  };

  return (
    <div className="booking-dashboard">
      <form onSubmit={handleBook} className="booking-form">
        <h2>{editMode ? "✏️ Edit Booking" : "📝 Book a Table"}</h2>

        <input
          type="text"
          name="bookingId"
          placeholder="Booking ID"
          value={form.bookingId}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="customerName"
          placeholder="Your Name"
          value={form.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="numberOfGuests"
          placeholder="Number of Guests"
          value={form.numberOfGuests}
          onChange={handleChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="bookingDate"
          value={form.bookingDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Special Requests..."
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">
          {editMode ? "💾 Update Booking" : "✅ Confirm Booking"}
        </button>
      </form>

      <div className="my-bookings">
        <h2>📖 My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          bookings.map((b) => (
            <div key={b.bookingId} className="booking-card">
              <h3>Booking ID: {b.bookingId}</h3>
              <p>
                <strong>Name:</strong> {b.customerName}
              </p>
              <p>
                <strong>Phone:</strong> {b.phone}
              </p>
              <p>
                <strong>Email:</strong> {b.email}
              </p>
              <p>
                <strong>Guests:</strong> {b.numberOfGuests}
              </p>
              <p>
                <strong>Location:</strong> {b.location}
              </p>
              <p>
                <strong>Date:</strong> {b.bookingDate}
              </p>
              {b.notes && (
                <p>
                  <strong>Notes:</strong> {b.notes}
                </p>
              )}
              <div className="booking-actions">
                <button onClick={() => handleEdit(b)}>✏️ Edit</button>
                <button onClick={() => handleDelete(b.bookingId)}>🗑️ Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
