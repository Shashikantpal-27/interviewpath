import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Admin access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (
      decoded.role !== "admin" ||
      !decoded.adminId
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    const admin = await Admin.findById(
      decoded.adminId
    ).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found.",
      });
    }

    req.admin = {
      adminId: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired admin token.",
    });
  }
};

export default adminMiddleware;