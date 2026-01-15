import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../../config/config";

export interface TokenPayload {
  userId: string;
  email?: string;
  role?: string;
}

export interface DecodedToken extends JwtPayload {
  userId: string;
  email?: string;
  role?: string;
}

/**
 * Generate JWT Access Token
 * @param payload - Data to encode in the token
 * @param expiresIn - Token expiration time (default: 15m)
 * @returns JWT token string
 */
export const generateAccessToken = (
  payload: TokenPayload,
  expiresIn: string = "89988m"
): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // @ts-ignore - Type compatibility issue with jsonwebtoken types
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    issuer: "imagic-server",
  });
};

/**
 * Generate JWT Refresh Token
 * @param payload - Data to encode in the token
 * @param expiresIn - Token expiration time (default: 7d)
 * @returns JWT refresh token string
 */
export const generateRefreshToken = (
  payload: TokenPayload,
  expiresIn: string = "7d"
): string => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // @ts-ignore - Type compatibility issue with jsonwebtoken types
  return jwt.sign({ ...payload, type: "refresh" }, JWT_SECRET, {
    expiresIn,
    issuer: "imagic-server",
  });
};

/**
 * Verify JWT Token
 * @param token - JWT token to verify
 * @returns Decoded token payload
 * @throws Error if token is invalid or expired
 */
export const verifyToken = (token: string): DecodedToken => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: "imagic-server",
    }) as DecodedToken;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

/**
 * Verify Refresh Token
 * @param token - Refresh token to verify
 * @returns Decoded token payload
 * @throws Error if token is invalid or expired
 */
export const verifyRefreshToken = (token: string): DecodedToken => {
  const decoded = verifyToken(token);

  if ((decoded as any).type !== "refresh") {
    throw new Error("Invalid refresh token");
  }

  return decoded;
};

/**
 * Decode JWT token without verification
 * @param token - JWT token to decode
 * @returns Decoded token payload or null
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    return jwt.decode(token) as DecodedToken;
  } catch (error) {
    return null;
  }
};

/**
 * Extract token from Authorization header
 * @param authHeader - Authorization header string
 * @returns Token string or null
 */
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null;

  const parts = authHeader.split(" ");
  if (parts.length === 2 && parts[0] === "Bearer") {
    return parts[1];
  }

  return null;
};
