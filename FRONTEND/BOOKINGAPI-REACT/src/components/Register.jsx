import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./BookingDashboard.css";

export default function Register() {
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.post("http://localhost:1700/userapi/register", form);
      await axios.post(`${import.meta.env.VITE_API_URL}/userapi/register`, form);

      setMessage("✅ Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setMessage("❌ Registration failed!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>📝 Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button type="submit">Register</button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}
