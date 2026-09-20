import { Request, Response } from "express";
import Education from "../models/Education.js";

export const getEducations = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const educations = await Education.find().sort({
      startDate: -1,
    });

    res.status(200).json({
      success: true,
      count: educations.length,
      data: educations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch education",
    });
  }
};

export const createEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      success: true,
      message: "Education created successfully",
      data: education,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create education",
      error,
    });
  }
};

export const updateEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const education = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!education) {
      res.status(404).json({
        success: false,
        message: "Education not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
      data: education,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update education",
    });
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const education = await Education.findByIdAndDelete(
      req.params.id
    );

    if (!education) {
      res.status(404).json({
        success: false,
        message: "Education not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Education deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete education",
    });
  }
};