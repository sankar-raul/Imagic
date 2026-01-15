# Quick Start Guide - JWT Authentication

## 🚀 Quick Setup (3 Steps)

### 1. Add to `.env` file:

```env
JWT_SECRET=your-super-secret-key-min-32-characters-long
PORT=8080
```

### 2. Server is already configured!

The auth routes are integrated in [app.ts](../../app.ts).

### 3. Test the API:

#### Test Login (PowerShell/CMD):

```powershell
curl -X POST http://localhost:8080/api/auth/login `
  -H "Content-Type: application/json" `
  -d '{\"email\":\"admin@example.com\",\"userId\":\"123\",\"role\":\"admin\"}'
```

#### Response:

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi...",
    "expiresIn": "15m"
  }
}
```

## 📝 Available Endpoints

| Method | Endpoint               | Auth Required | Description                       |
| ------ | ---------------------- | ------------- | --------------------------------- |
| POST   | `/api/auth/login`      | ❌ No         | Login and get tokens              |
| POST   | `/api/auth/refresh`    | ❌ No         | Refresh access token              |
| POST   | `/api/auth/verify`     | ✅ Yes        | Verify token validity             |
| POST   | `/api/auth/logout`     | ✅ Yes        | Logout (invalidate refresh token) |
| POST   | `/api/auth/logout-all` | ✅ Yes        | Logout from all devices           |

## 🛡️ Protect Your Routes

### Example 1: Protect any route

```typescript
import { authenticateToken } from "./service/auth/tokenManager";

router.get("/api/protected-data", authenticateToken, (req, res) => {
  const user = (req as any).user;
  res.json({ message: "Secret data", user });
});
```

### Example 2: Admin-only routes

```typescript
import adminAuth from "./api/middlewares/adminAuth";

router.delete("/api/admin/users/:id", adminAuth, deleteUserController);
```

### Example 3: Role-based access

```typescript
import { authenticateToken, authorizeRoles } from "./service/auth/tokenManager";

// Only admin and moderator can access
router.put(
  "/api/posts/:id",
  authenticateToken,
  authorizeRoles("admin", "moderator"),
  updatePost
);
```

## 🧪 Test with Postman/Thunder Client

### 1. Login Request:

```
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "userId": "user123",
  "role": "admin"
}
```

### 2. Copy the `accessToken` from response

### 3. Use token in protected routes:

```
GET http://localhost:8080/api/protected-data
Authorization: Bearer YOUR_ACCESS_TOKEN_HERE
```

### 4. Refresh when token expires:

```
POST http://localhost:8080/api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "YOUR_REFRESH_TOKEN_HERE"
}
```

## 📦 Files Created

```
✅ src/service/auth/jwt.ts              - JWT utilities
✅ src/service/auth/tokenManager.ts     - Token management
✅ src/service/auth/auth.ts            - Auth handlers
✅ src/api/controllers/auth.controller.ts - Controllers
✅ src/api/routes/auth.route.ts        - Routes
✅ src/api/middlewares/adminAuth.ts    - Admin middleware (updated)
✅ src/config/config.ts                - Config (updated)
✅ src/app.ts                          - Main app (updated)
```

## 🎯 Next Steps

1. **Add user database**: Connect to your user database for actual authentication
2. **Update login logic** in [auth.ts](auth.ts) - Replace dummy authentication with real database queries
3. **Use Redis**: For production, store refresh tokens in Redis instead of in-memory
4. **Add validation**: Add request validation using express-validator or Zod
5. **Add rate limiting**: Protect login endpoint from brute force attacks

## 🔒 Security Best Practices

- ✅ Access tokens expire in 15 minutes
- ✅ Refresh tokens expire in 7 days
- ✅ Tokens are signed and verified
- ✅ Role-based authorization supported
- ⚠️ Use HTTPS in production
- ⚠️ Store refresh tokens in httpOnly cookies (recommended)
- ⚠️ Use Redis for token storage in production
- ⚠️ Add rate limiting to auth endpoints

## 💡 Integration Example

Update your existing routes to add authentication:

```typescript
// Example: Protect blog routes
import { authenticateToken } from "../../service/auth/tokenManager";
import adminAuth from "../middlewares/adminAuth";

// Public - anyone can read
router.get("/api/blogs", getBlogsController);

// Protected - need login to create
router.post("/api/blogs", authenticateToken, createBlogController);

// Admin only - only admin can delete
router.delete("/api/blogs/:id", adminAuth, deleteBlogController);
```

## 🐛 Troubleshooting

**Token not working?**

- Check if JWT_SECRET is set in `.env`
- Verify token format: `Bearer YOUR_TOKEN`
- Check if token has expired

**401 Unauthorized?**

- Check Authorization header is present
- Token should be: `Authorization: Bearer YOUR_TOKEN`

**403 Forbidden?**

- Token may be expired or invalid
- Check user role if using role-based auth

## 📖 Full Documentation

See [README.md](README.md) for complete documentation.
