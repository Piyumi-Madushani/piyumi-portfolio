import { Request, Response } from "express";
import Experience from "../models/Experience.js";

export const getExperiences = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const experiences = await Experience.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch experiences",
    });
  }
};

export const createExperience = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json({
      success: true,
      message: "Experience created successfully",
      data: experience,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create experience",
      error,
    });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
      data: experience,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndDelete(
      req.params.id
    );

    if (!experience) {
      res.status(404).json({
        success: false,
        message: "Experience not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Experience deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete experience",
    });
  }
};