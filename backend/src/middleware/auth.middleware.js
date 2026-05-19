import jwt from "jsonwebtoken";

export const verifyAdmin = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Admin only" });
    }
    req.admin = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
