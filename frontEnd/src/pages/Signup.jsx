import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { sendEmailVerification } from "firebase/auth";
import axios from "axios";

export default function Signup() {
  const { signup, signInWithGoogle, changePassword, currentUser } = useAuth();
  const navigate = useNavigate();

  const [googleStep, setGoogleStep] = useState(1); // 1: Initial Signup, 2: Extra Details for Google
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    mobile_number: "",
    profile_pic: "",
  });

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert Image to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profile_pic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Save to Express Backend (Supabase)
  const saveUserToDatabase = async (uid, userData) => {
    await axios.post("http://20.204.117.91:5000/api/auth/register", {
      uid,
      ...userData,
    });
  };

  // --- EMAIL SIGNUP FLOW ---
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Create Firebase User
      const userCredential = await signup(formData.email, formData.password);
      const user = userCredential.user;

      // 2. Send Verification Link
      await sendEmailVerification(user);

      // 3. Save to Supabase
      await saveUserToDatabase(user.uid, formData);

      alert(
        "Signup successful! Please check your email for the verification link.",
      );
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- GOOGLE SIGNUP FLOW ---
  const handleGoogleSignupInitial = async () => {
    setLoading(true);
    setError("");

    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;

      // Pre-fill data from Google
      setFormData((prev) => ({
        ...prev,
        name: user.displayName || "",
        email: user.email || "",
        profile_pic: prev.profile_pic || user.photoURL || "",
      }));

      setGoogleStep(2); // Move to the next step to ask for username/password
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignupCompletion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Attach the password to their Google account
      await changePassword(formData.password);

      // 2. Save complete details to Supabase using currentUser from context
      await saveUserToDatabase(currentUser.uid, formData);

      alert("Google Signup complete!");
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
        Create Account
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

      {/* --- STEP 1: INITIAL SIGNUP OPTIONS --- */}
      {googleStep === 1 && (
        <>
          {/* EMAIL FORM */}
          <form onSubmit={handleEmailSignup}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="glass-input"
              required
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="glass-input"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="glass-input"
              required
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="glass-input"
              required
              onChange={handleChange}
            />
            <input
              type="tel"
              name="mobile_number"
              placeholder="Mobile Number"
              className="glass-input"
              required
              onChange={handleChange}
            />
            <div style={{ marginBottom: "15px" }}>
              <label style={{ fontSize: "14px", color: "#555" }}>
                Profile Picture:
              </label>
              <input
                type="file"
                accept="image/*"
                className="glass-input"
                style={{ border: "none", padding: "5px 0" }}
                onChange={handleImageChange}
              />
            </div>
            <button
              type="submit"
              className="glass-button primary"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up with Email"}
            </button>
          </form>

          {/* OR DIVIDER */}
          <div style={{ textAlign: "center", margin: "15px 0", color: "#555" }}>
            OR
          </div>

          {/* GOOGLE BUTTON */}
          <button
            type="button" // Important so it doesn't try to submit a form
            onClick={handleGoogleSignupInitial}
            className="glass-button"
            disabled={loading}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              style={{ width: "20px" }}
            />
            Sign up with Google
          </button>
        </>
      )}

      {/* --- STEP 2: COMPLETE GOOGLE REGISTRATION --- */}
      {googleStep === 2 && (
        <form onSubmit={handleGoogleSignupCompletion}>
          <p
            style={{ marginBottom: "15px", color: "#555", textAlign: "center" }}
          >
            Almost done! Please choose a username and password.
          </p>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            className="glass-input"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Choose Username"
            className="glass-input"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Set a Password"
            className="glass-input"
            required
            onChange={handleChange}
          />
          <input
            type="tel"
            name="mobile_number"
            placeholder="Mobile Number"
            className="glass-input"
            required
            onChange={handleChange}
          />
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontSize: "14px", color: "#555" }}>
              Profile Picture (Optional update):
            </label>
            <input
              type="file"
              accept="image/*"
              className="glass-input"
              style={{ border: "none", padding: "5px 0" }}
              onChange={handleImageChange}
            />
          </div>
          <button
            type="submit"
            className="glass-button primary"
            disabled={loading}
          >
            {loading ? "Saving..." : "Complete Registration"}
          </button>
        </form>
      )}

      <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        Already have an account?{" "}
        <span
          style={{ color: "#0056b3", cursor: "pointer", fontWeight: "bold" }}
          onClick={() => navigate("/login")}
        >
          Log In
        </span>
      </p>
    </div>
  );
}
