import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage("Check your inbox for password reset instructions.");
    } catch (err) {
      setError("Failed to reset password. Please check the email address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Password Reset
      </h2>

      {error && (
        <p
          style={{
            color: "#ff4d4d",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          {error}
        </p>
      )}
      {message && (
        <p
          style={{ color: "green", textAlign: "center", marginBottom: "10px" }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          className="glass-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className="glass-button primary"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link
          to="/login"
          style={{
            color: "#0056b3",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}
