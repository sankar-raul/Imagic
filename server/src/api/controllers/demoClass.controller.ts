import { Request, Response } from "express";
import demoClass from "../../models/demoClass/demoClass.model";

export const demoClassForm = async (req: Request, res: Response) =>{
    try {
        const demoClassData = req.body;
        const demoClassDetails = await demoClass.create(demoClassData);
        res.status(201).json(demoClassDetails);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export const getDemoClassEntries = async (req: Request, res: Response) => {
    try {
        const demoClassEntries = await demoClass.find();
        if (demoClassEntries.length === 0) {
            return res.status(404).json({ message: "No demo class entries found" });
        }
        res.status(200).json(demoClassEntries);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
