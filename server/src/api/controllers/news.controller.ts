import { Request, Response } from "express";
import news from "../../models/news/news.model";

export const postNews = async (req: Request, res: Response) => {
    try {
        const newsData = req.body;
        const newNews = await news.create(newsData);
        res.status(201).json(newNews);
    } catch (error) {
        res.status(500).json({ message: "Error posting news", error });
    }
}

export const getAllNews = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;
        const newsList = await news.find().skip(skip).limit(limit).sort({ published_date: -1 });
        const countOfNews = await news.countDocuments();
        res.status(200).json({ news: newsList, total: countOfNews, page, limit });
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error });
    }
}

export const getSingleNews = async (req: Request, res: Response) => {
    try {
        const newsId = req.params.newsId;
        const singleNews = await news.findOne({ slug: newsId });
        if (!singleNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(singleNews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching news", error });
    }
}

export const deleteNews = async (req: Request, res: Response) => {
    try {
        const newsId = req.params.newsId;
        const deletedNews = await news.findByIdAndDelete(newsId);
        if (!deletedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json({ message: "News deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting news", error });
    }
}

export const updateNews = async (req: Request, res: Response) => {
    try {
        const newsId = req.params.newsId;
        const updateData = req.body;
        const updatedNews = await news.findByIdAndUpdate(newsId, updateData, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: "News not found" });
        }
        res.status(200).json(updatedNews);
    } catch (error) {
        res.status(500).json({ message: "Error updating news", error });
    } 
}