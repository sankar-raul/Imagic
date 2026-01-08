import { Request, Response } from "express";
import demoClass from "../models/demoClass.model";

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
        res.status(200).json(demoClassEntries);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
