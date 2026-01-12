import cloudinary from "../../config/cloudinaryConfig";

const uploadToCloudinary = async (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "uploads",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    
    uploadStream.end(buffer);
  });
};

export { uploadToCloudinary };