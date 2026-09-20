import { Request, Response } from "express";
import Certification from "../models/Certification.js";

export const getCertifications = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const certifications = await Certification.find().sort({
      issueDate: -1,
    });

    res.status(200).json({
      success: true,
      count: certifications.length,
      data: certifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch certifications",
    });
  }
};

export const createCertification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certification = await Certification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Certification created successfully",
      data: certification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create certification",
      error,
    });
  }
};

export const updateCertification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certification = await Certification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!certification) {
      res.status(404).json({
        success: false,
        message: "Certification not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Certification updated successfully",
      data: certification,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update certification",
    });
  }
};

export const deleteCertification = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const certification = await Certification.findByIdAndDelete(
      req.params.id
    );

    if (!certification) {
      res.status(404).json({
        success: false,
        message: "Certification not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Certification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete certification",
    });
  }
};