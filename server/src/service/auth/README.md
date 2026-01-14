# JWT Authentication System

Complete JWT authentication system with access tokens and refresh tokens for the Imagic project.

## 📁 File Structure

```
src/service/auth/
├── jwt.ts              # JWT token generation and verification utilities
├── tokenManager.ts     # Token management (access/refresh tokens)
└── auth.ts            # Authentication handlers and controllers

src/api/
├── controllers/
│   └── auth.controller.ts
├── middlewares/
│   └── adminAuth.ts   # Admin authentication middleware
└── routes/
    └── auth.route.ts  # Authentication routes
```

## 🔑 Features

- **Access Token Generation**: Short-lived tokens (15 minutes)
- **Refresh Token Generation**: Long-lived tokens (7 days)
- **Token Verification**: Secure JWT verification
- **Token Refresh**: Refresh access tokens without re-login
- **Role-based Authorization**: Admin and user role support
- **Logout**: Single device logout
- **Logout All**: Logout from all devices
- **Middleware Protection**: Secure routes with authentication

## 🚀 Setup

1. **Environment Variables** - Add to your `.env` file:

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
```

2. **Install Dependencies** (already installed):

```bash
yarn add jsonwebtoken
yarn add -D @types/jsonwebtoken
```

## 📖 API Endpoints

### Public Routes

#### 1. Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "userId": "12345",
  "role": "admin"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "expiresIn": "15m"
  }
}
```

#### 2. Refresh Token

```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGc...",
    "expiresIn": "15m"
  }
}
```

#### 3. Verify Token

```http
POST /api/auth/verify
Authorization: Bearer eyJhbGc...
```

**Response:**

```json
{
  "success": true,
  "message": "Token is valid",
  "data": {
    "userId": "12345",
    "email": "user@example.com",
    "role": "admin",
    "iat": 1234567890,
    "exp": 1234567890
  }
}
```

### Protected Routes (Require Authentication)

#### 4. Logout

```http
POST /api/auth/logout
Authorization: Bearer eyJhbGc...
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}
```

#### 5. Logout from All Devices

```http
POST /api/auth/logout-all
Authorization: Bearer eyJhbGc...
```

## 🛡️ Using Middleware

### Protect Routes with Authentication

```typescript
import { authenticateToken } from "./service/auth/tokenManager";

// Protect a single route
router.get("/protected", authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Protected data", user });
});
```

### Protect Routes with Role-based Authorization

```typescript
import { authenticateToken, authorizeRoles } from "./service/auth/tokenManager";

// Only admin can access
router.post(
  "/admin/users",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin only data" });
  }
);

// Admin or moderator can access
router.put(
  "/posts/:id",
  authenticateToken,
  authorizeRoles("admin", "moderator"),
  (req, res) => {
    res.json({ message: "Post updated" });
  }
);
```

### Using Admin Auth Middleware

```typescript
import adminAuth from "./api/middlewares/adminAuth";

// Only admin can access
router.delete("/users/:id", adminAuth, deleteUser);
```

## 💡 Usage Examples

### Example 1: Login Flow

```typescript
// Client login
const response = await fetch("/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: "admin@example.com",
    userId: "123",
    role: "admin",
  }),
});

const { data } = await response.json();
// Store tokens
localStorage.setItem("accessToken", data.accessToken);
localStorage.setItem("refreshToken", data.refreshToken);
```

### Example 2: Making Authenticated Requests

```typescript
const accessToken = localStorage.getItem("accessToken");

const response = await fetch("/api/protected-route", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Example 3: Refreshing Expired Token

```typescript
const refreshToken = localStorage.getItem("refreshToken");

const response = await fetch("/api/auth/refresh", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ refreshToken }),
});

const { data } = await response.json();
localStorage.setItem("accessToken", data.accessToken);
```

## 🔧 Utility Functions

### JWT Utilities (jwt.ts)

- `generateAccessToken(payload, expiresIn)` - Generate access token
- `generateRefreshToken(payload, expiresIn)` - Generate refresh token
- `verifyToken(token)` - Verify JWT token
- `verifyRefreshToken(token)` - Verify refresh token
- `decodeToken(token)` - Decode token without verification
- `extractTokenFromHeader(authHeader)` - Extract token from Bearer header

### Token Manager (tokenManager.ts)

- `loginAndGenerateTokens(payload)` - Generate both tokens
- `refreshAccessToken(refreshToken)` - Get new access token
- `logout(refreshToken)` - Invalidate refresh token
- `logoutAllDevices()` - Clear all refresh tokens
- `authenticateToken` - Middleware for route protection
- `authorizeRoles(...roles)` - Middleware for role-based access

## ⚠️ Security Notes

1. **Change JWT_SECRET**: Always use a strong, unique secret in production
2. **HTTPS Only**: Always use HTTPS in production
3. **Token Storage**: Store refresh tokens securely (httpOnly cookies recommended)
4. **Token Rotation**: Implement refresh token rotation for better security
5. **Redis**: Use Redis instead of in-memory storage for production
6. **Rate Limiting**: Add rate limiting to authentication endpoints

## 🔄 Production Improvements

For production use, consider:

1. **Redis for Token Storage**

```typescript
import Redis from "ioredis";
const redis = new Redis();

// Store refresh token
await redis.set(
  `refresh_token:${userId}`,
  refreshToken,
  "EX",
  7 * 24 * 60 * 60
);

// Verify refresh token
const stored = await redis.get(`refresh_token:${userId}`);
```

2. **Refresh Token Rotation**

```typescript
// When refreshing, issue new refresh token and invalidate old one
```

3. **Token Blacklisting**

```typescript
// Blacklist tokens on logout
await redis.set(`blacklist:${token}`, "1", "EX", tokenExpiry);
```

## 📝 Integration with App

Add to your main app file ([app.ts](../../app.ts)):

```typescript
import authRouter from "./api/routes/auth.route";

// Add auth routes
app.use("/api/auth", authRouter);
```

## 🧪 Testing

Test the endpoints using curl:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","userId":"123","role":"admin"}'

# Access protected route
curl -X GET http://localhost:8080/api/protected \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Refresh token
curl -X POST http://localhost:8080/api/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{"refreshToken":"YOUR_REFRESH_TOKEN"}'
```

## 📚 TypeScript Types

```typescript
interface TokenPayload {
  userId: string;
  email?: string;
  role?: string;
}

interface DecodedToken extends JwtPayload {
  userId: string;
  email?: string;
  role?: string;
}
```
