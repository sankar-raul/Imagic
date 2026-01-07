import { Request, Response } from "express";
import Placement from "../models/placement.model";

export const addPlacedStudent = async (req: Request, res: Response) => {
    try {
        const placementData = req.body;
        const placedStudent = await Placement.create(placementData);
        res.status(201).json(placedStudent);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getPlacedStudents = async (req: Request, res: Response) => {
    try {
        const placedStudents = await Placement.find();
        res.status(200).json(placedStudents);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updatePlacedStudent = async (req: Request, res: Response) => {
    try {
        const { placementId } = req.params;
        const updateData = req.body;
        const updatedPlacement = await Placement.findByIdAndUpdate(placementId, updateData, { new: true });
        res.status(200).json(updatedPlacement);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deletePlacedStudent = async (req: Request, res: Response) => {
    try {
        const { placementId } = req.params;
        await Placement.findByIdAndDelete(placementId);
        res.status(200).json({ message: "Placed student record deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};