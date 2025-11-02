import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="mainpage">
      <div className="overlay">
        <header className="mainpage-header">
          <h1>🏖️ Welcome to DineEase</h1>
          <p>Relax. Dine. Enjoy your perfect getaway!</p>
          <button className="mainpage-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </header>

        {/* Floating images section */}
        <div className="floating-images">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Beachside Dining" />
          <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Restaurant Dish" />
          <img src="https://images.unsplash.com/photo-1528605248644-14dd04022da1" alt="Tropical Drink" />
        </div>
      </div>
    </div>
  );
}
