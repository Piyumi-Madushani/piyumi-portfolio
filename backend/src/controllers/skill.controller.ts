import { Request, Response } from "express";
import Skill from "../models/Skill.js";

export const getSkills = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const skills = await Skill.find().sort({
      category: 1,
      order: 1,
    });

    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
    });
  }
};

export const createSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      success: true,
      message: "Skill created successfully",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create skill",
      error,
    });
  }
};

export const updateSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!skill) {
      res.status(404).json({
        success: false,
        message: "Skill not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: skill,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update skill",
    });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      res.status(404).json({
        success: false,
        message: "Skill not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete skill",
    });
  }
};