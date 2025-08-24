import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

async function authMiddleware(req, res, next) {
  try {
    // 1. Check for token in Authorization header
    const authHeader = req.headers.authorization;
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized! No token provided.",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];
    
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach userId to request object
    req.user = { id: decoded.userId };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res.status(401).json({
      success: false,
      message: "Not Authorized! Invalid token.",
    });
  }
}

export default authMiddleware;