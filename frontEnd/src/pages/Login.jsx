import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Login() {
  const { login, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState(""); // Can be email OR username
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStandardLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let loginEmail = identifier;

      // If it's a username (doesn't contain '@'), fetch the email from Supabase
      if (!identifier.includes("@")) {
        const response = await axios.get(`/api/auth/username/${identifier}`);
        loginEmail = response.data.email;
      }

      // Log in with Firebase using the resolved email
      const userCredential = await login(loginEmail, password);

      // Optional: Enforce email verification for standard signups
      if (!userCredential.user.emailVerified) {
        setError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      navigate("/profile");
    } catch (err) {
      setError(
        "Failed to log in. Check your credentials or verify your email.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Welcome Back
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

      <form onSubmit={handleStandardLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          className="glass-input"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="glass-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ textAlign: "right", marginBottom: "15px" }}>
          <Link
            to="/forgot-password"
            style={{ fontSize: "14px", color: "#555", textDecoration: "none" }}
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="glass-button primary"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>

      <div style={{ textAlign: "center", margin: "15px 0", color: "#555" }}>
        OR
      </div>

      <button
        onClick={handleGoogleLogin}
        className="glass-button"
        disabled={loading}
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="Google"
          style={{ width: "20px" }}
        />
        Log in with Google
      </button>

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        Don't have an account?{" "}
        <Link
          to="/signup"
          style={{
            color: "#0056b3",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
