import { DecodedToken } from "../service/auth/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export {};
