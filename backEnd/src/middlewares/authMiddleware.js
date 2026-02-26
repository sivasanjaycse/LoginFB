import admin from "../config/firebaseAdmin.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // contains the user's uid
    next();
  } catch (error) {
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};
