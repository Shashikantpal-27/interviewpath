import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import "../config/dns.js";
import Admin from "../models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    const email =
      process.env.ADMIN_EMAIL;

    const password =
      process.env.ADMIN_PASSWORD;

    const name =
      process.env.ADMIN_NAME ||
      "System Admin";

    if (!email || !password) {
      throw new Error(
        "ADMIN_EMAIL and ADMIN_PASSWORD are required."
      );
    }

    const existingAdmin =
      await Admin.findOne({
        email: email.toLowerCase(),
      });

    if (existingAdmin) {
      console.log(
        "Admin already exists"
      );

      await mongoose.disconnect();

      process.exit(0);
    }

    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    await Admin.create({
      name,
      email:
        email.toLowerCase(),
      password:
        hashedPassword,
      role: "admin",
    });

    console.log(
      "Admin created successfully"
    );

    await mongoose.disconnect();

    process.exit(0);

  } catch (error) {

    console.error(
      "Admin seeding failed:",
      error.message
    );

    process.exit(1);
  }
};

seedAdmin();