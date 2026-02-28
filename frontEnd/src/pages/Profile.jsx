import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { auth } from "../services/firebase";
import axios from "axios";

export default function Profile() {
  const { currentUser, logout, changePassword } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Password Change State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");

  useEffect(() => {
    // Redirect if not logged in
    if (!currentUser) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");

    if (newPassword !== confirmPassword) {
      return setPasswordMsg("Passwords do not match");
    }

    try {
      await changePassword(newPassword);
      setPasswordMsg("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordMsg(error.message);
    }
  };

  if (loading) return <div className="glass-panel">Loading profile...</div>;

  return (
    <div className="glass-panel" style={{ maxWidth: "500px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        User Profile
      </h2>

      {userData ? (
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          {userData.profile_pic ? (
            <img
              src={userData.profile_pic}
              alt="Profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
                border: "3px solid white",
              }}
            />
          ) : (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#ccc",
                margin: "0 auto 15px",
              }}
            />
          )}
          <h3>{userData.name}</h3>
          <p style={{ color: "#555" }}>@{userData.username}</p>
          <p style={{ color: "#555" }}>{userData.email}</p>
          <p style={{ color: "#555" }}>{userData.mobile_number}</p>
        </div>
      ) : (
        <p>Profile data not found.</p>
      )}

      <hr
        style={{
          border: "none",
          borderTop: "1px solid rgba(255,255,255,0.5)",
          margin: "20px 0",
        }}
      />

      <form onSubmit={handlePasswordChange}>
        <h4 style={{ marginBottom: "10px" }}>Change Password</h4>
        {passwordMsg && (
          <p
            style={{
              fontSize: "14px",
              marginBottom: "10px",
              color: passwordMsg.includes("success") ? "green" : "red",
            }}
          >
            {passwordMsg}
          </p>
        )}

        <input
          type="password"
          placeholder="New Password"
          className="glass-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="glass-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="glass-button">
          Update Password
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="glass-button primary"
        style={{ marginTop: "20px", background: "#d9534f" }}
      >
        Log Out
      </button>
    </div>
  );
}
