import React from "react";
import "./BrowseRestaurants.css";

const restaurants = [
  {
    id: 1,
    name: "The Ocean Grill",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    rating: 4.5,
    location: "Chennai",
    cuisine: "Seafood & Grill",
  },
  {
    id: 2,
    name: "Skyline Dine",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    location: "Bangalore",
    cuisine: "Continental",
  },
  {
    id: 3,
    name: "Royal Tandoor",
    image:
      "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80",
    rating: 4.6,
    location: "Mumbai",
    cuisine: "North Indian",
  },
];

export default function BrowseRestaurants({ onBookNow }) {
  return (
    <div className="browse-container">
      <h2>🍴 Browse Restaurants</h2>
      <div className="restaurant-list">
        {restaurants.map((res) => (
          <div key={res.id} className="restaurant-card">
            <img src={res.image} alt={res.name} />
            <h3>{res.name}</h3>
            <p>⭐ {res.rating}</p>
            <p>{res.location}</p>
            <button onClick={() => onBookNow(res)}>Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}
