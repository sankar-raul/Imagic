import { Request, Response } from "express";
import blog from "../../models/blog/blog.model";

export const postBlog = async (req: Request, res: Response) => {
    try {
        const blogData = req.body;
        const blogDetails = await blog.create(blogData);
        res.status(201).json(blogDetails);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getBlogDetails = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const blogDetails = await blog.findOne({ slug: blogId });
        if (!blogDetails) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ data: blogDetails });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getBlogById = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const blogDetails = await blog.findById(blogId);
        if (!blogDetails) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ data: blogDetails });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const page = Math.max(parseInt(req.query.page as string) || 1, 1);
        const limit = Math.min(parseInt(req.query.limit as string) || 10, 100);
        const skip = (page - 1) * limit;
        const blogs = await blog.find().skip(skip).limit(limit);
        const totalBlogs = await blog.countDocuments();
        if (blogs.length === 0) {
            return res.status(404).json({ message: "No blogs found" });
        }
        res.status(200).json({ blogs, totalBlogs, page, limit });
    }
    catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const updateBlog = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const updateData = req.body;
        const updatedBlog = await blog.findByIdAndUpdate(blogId, updateData, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deleteBlog = async (req: Request, res: Response) => {
    try {
        const { blogId } = req.params;
        const deletedBlog = await blog.findByIdAndDelete(blogId);
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};