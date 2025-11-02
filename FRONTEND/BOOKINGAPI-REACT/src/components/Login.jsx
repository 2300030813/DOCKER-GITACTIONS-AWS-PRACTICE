import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./BookingDashboard.css";

export default function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/userapi/login`, form);

      if (response.status === 200) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        navigate("/dashboard");
      }
    } catch {
      setMessage("❌ Invalid credentials!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>🔐 Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>Don’t have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}
