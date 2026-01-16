import { Request, Response } from "express";
import Placement from "../../models/placement/placement.model";

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
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
        const skip = (page - 1) * limit;

            
            const placedStudents = await Placement.find().skip(skip).limit(limit);
            const totalPlacedStudents = await Placement.countDocuments();
            res.status(200).json({ data: placedStudents, totalPlacedStudents, page, limit });
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