import React, { useState, useEffect } from "react";
import "./BookingDashboard.css";
import BrowseRestaurants from "./BrowseRestaurants";
import BookingDashboard from "./BookingDashboard";

export default function MainDashboard() {
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState({ fullname: "", email: "" });
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const handleBookNow = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setActivePage("bookings");
  };

  return (
    <div className="main-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">🍽️ Dashboard</h2>
        <ul className="menu">
          <li
            className={activePage === "browse" ? "active" : ""}
            onClick={() => setActivePage("browse")}
          >
            🍴 Browse Restaurants
          </li>
          <li
            className={activePage === "bookings" ? "active" : ""}
            onClick={() => setActivePage("bookings")}
          >
            📖 My Bookings
          </li>
          <li
            className={activePage === "profile" ? "active" : ""}
            onClick={() => setActivePage("profile")}
          >
            👤 Profile
          </li>
          <li onClick={handleLogout}>🚪 Logout</li>
        </ul>
      </aside>

      <main className="dashboard-content">
        {activePage === "home" && (
          <div className="welcome-container">
            <h1>👋 Welcome, {user.fullname || "Guest"}!</h1>
            <p>Select an option from the left menu to continue.</p>
          </div>
        )}

        {activePage === "browse" && <BrowseRestaurants onBookNow={handleBookNow} />}
        {activePage === "bookings" && <BookingDashboard selectedRestaurant={selectedRestaurant} />}
        {activePage === "profile" && (
          <div className="profile-section">
            <h2>👤 Profile Details</h2>
            <p><strong>Name:</strong> {user.fullname}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </main>
    </div>
  );
}
