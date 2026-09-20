import { Request, Response } from "express";
import Contact from "../models/Contact.js";

// Create contact message
export const createContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({
        message: "Name, email and message are required",
      });
      return;
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Create contact error:", error);

    res.status(500).json({
      message: "Failed to send message",
    });
  }
};

// Get all contact messages
export const getContacts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Get contacts error:", error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

// Delete contact message
export const deleteContact = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      res.status(404).json({
        message: "Message not found",
      });
      return;
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);

    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};
// Mark contact message as read
export const markContactAsRead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true, runValidators: true }
    );

    if (!contact) {
      res.status(404).json({
        message: "Message not found",
      });
      return;
    }

    res.status(200).json({
      message: "Message marked as read",
      contact,
    });
  } catch (error) {
    console.error("Mark message as read error:", error);

    res.status(500).json({
      message: "Failed to mark message as read",
    });
  }
};