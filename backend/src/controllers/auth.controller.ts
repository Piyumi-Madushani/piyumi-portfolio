import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import { generateToken } from "../utils/jwt.js";

export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Username, email, and password are required.",
      });

      return;
    }

    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });

    if (existingAdmin) {
      res.status(409).json({
        success: false,
        message: "Admin already exists.",
      });

      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await Admin.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin created successfully.",
      data: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Register admin error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create admin.",
    });
  }
};

export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });

      return;
    }

    const admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    if (!admin) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

      return;
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.password
    );

    if (!passwordMatches) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });

      return;
    }

    const token = generateToken(admin._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};