import sql from "../config/dbconnect.js";

export const registerUser = async (req, res) => {
  const { uid, username, email, name, mobile_number, profile_pic } = req.body;

  try {
    // Insert user into Supabase
    await sql`
      INSERT INTO users (uid, username, email, name, mobile_number, profile_pic)
      VALUES (${uid}, ${username}, ${email}, ${name}, ${mobile_number}, ${profile_pic})
    `;
    res
      .status(201)
      .json({ message: "User registered successfully in database" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ error: "Database error while saving user" });
  }
};

export const getEmailByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const users =
      await sql`SELECT email FROM users WHERE username = ${username}`;

    if (users.length === 0) {
      return res.status(404).json({ error: "Username not found" });
    }

    res.status(200).json({ email: users[0].email });
  } catch (error) {
    console.error("Error fetching email:", error);
    res.status(500).json({ error: "Database error" });
  }
};
