import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MainPage from "./components/MainPage";
import Login from "./components/Login";
import Register from "./components/Register";
import MainDashboard from "./components/MainDashboard";
import BookingDashboard from "./components/BookingDashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* 👇 Simple welcome page */}
        <Route path="/" element={<MainPage />} />

        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* 👇 Protected route */}
        <Route
          path="/dashboard"
          element={isAuthenticated ? <MainDashboard /> : <Navigate to="/login" />}
        />

        <Route path="/booking-dashboard" element={<BookingDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
