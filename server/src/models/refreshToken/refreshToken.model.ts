import { model } from "mongoose";
import { IRefreshToken } from "../../Types/interface/refreshToken.interface";
import refreshTokenSchema from "./refreshToken.schema";

const RefreshTokenModel = model<IRefreshToken>(
  "RefreshToken",
  refreshTokenSchema
);

export default RefreshTokenModel;
