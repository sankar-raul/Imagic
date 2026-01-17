import { Request, Response } from "express";
import Newsletter from "../../models/newsletter/newsletter.model";

export const subscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(200).json({ message: "Email already subscribed" });
      } else {
        existingSubscriber.isActive = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        return res.status(201).json({
          message: "Newsletter subscription reactivated",
          subscriber: existingSubscriber,
        });
      }
    }

    const newSubscriber = await Newsletter.create({ email });
    res.status(201).json({
      message: "Successfully subscribed to newsletter",
      subscriber: newSubscriber,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const unsubscribeNewsletter = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const subscriber = await Newsletter.findOne({ email });
    if (!subscriber) {
      return res.status(404).json({ message: "Email not found in newsletter" });
    }

    subscriber.isActive = false;
    await subscriber.save();
    res
      .status(200)
      .json({ message: "Successfully unsubscribed from newsletter" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllSubscribers = async (req: Request, res: Response) => {
  try {
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
    const skip = (page - 1) * limit;
    const isActive =
      req.query.isActive === "true"
        ? true
        : req.query.isActive === "false"
        ? false
        : undefined;

    const filter = isActive !== undefined ? { isActive } : {};

    const subscribers = await Newsletter.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ subscribedAt: -1 });
    const totalSubscribers = await Newsletter.countDocuments(filter);

    res.status(200).json({
      data: subscribers,
      totalSubscribers,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteSubscriber = async (req: Request, res: Response) => {
  try {
    const { subscriberId } = req.params;

    const deletedSubscriber = await Newsletter.findByIdAndDelete(subscriberId);
    if (!deletedSubscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    res.status(200).json({ message: "Subscriber deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
