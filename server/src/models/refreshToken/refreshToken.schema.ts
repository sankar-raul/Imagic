import { Schema } from "mongoose";
import { IRefreshToken } from "../../Types/interface/refreshToken.interface";

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    userId: {
      type: String,
      required: [true, "User ID is required"],
      index: true,
    },
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      index: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Index for automatic cleanup of expired tokens
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default refreshTokenSchema;
