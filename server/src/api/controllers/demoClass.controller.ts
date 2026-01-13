import { Request, Response } from "express";
import demoClass from "../../models/demoClass/demoClass.model";
import { IdemoClass } from "../../Types/demoClass.types";

export const demoClassForm = async (req: Request, res: Response) =>{
    try {
        const demoClassData:IdemoClass = req.body;
        const demoClassDetails = await demoClass.create(demoClassData);
        res.status(201).json({
            data: demoClassDetails,
            message: "Demo class form submitted successfully"
        }
        );
        return;
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}

export const getDemoClassEntries = async (req: Request, res: Response) => {
    try {
        const demoClassEntries = await demoClass.find();
        if (demoClassEntries.length === 0) {
            return res.status(404).json({ message: "No demo class entries found" });
        }
        res.status(200).json(demoClassEntries);
        return;
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        return;
    }
}
