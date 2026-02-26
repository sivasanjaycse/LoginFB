import sql from "../config/dbconnect.js";

export const getUserProfile = async (req, res) => {
  const { uid } = req.user; // Retrieved from the verifyToken middleware

  try {
    const users =
      await sql`SELECT username, email, name, mobile_number, profile_pic FROM users WHERE uid = ${uid}`;

    if (users.length === 0) {
      return res.status(404).json({ error: "User profile not found" });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Database error" });
  }
};
