import { Request, Response } from "express";

/**
 * Example: How to protect routes with different levels of authentication
 * Copy these examples to your route files to add authentication
 *
 * Note: This is an example file showing usage patterns.
 * Import adminAuth like this in your actual route files:
 * import adminAuth from '../middlewares/adminAuth';
 */

// ============================================
// EXAMPLE 1: Public Route (No Authentication)
// ============================================
export const publicRoute = (req: Request, res: Response) => {
  res.json({
    message: "This is public data, no authentication required",
  });
};

// ============================================
// EXAMPLE 2: Protected Route (Any Logged-in User)
// ============================================
// Apply: router.get('/protected', authenticateToken, protectedRoute);
export const protectedRoute = (req: Request, res: Response) => {
  const user = req.user; // User data from JWT token (now properly typed!)

  res.json({
    message: "This is protected data",
    user: {
      userId: user?.userId,
      email: user?.email,
      role: user?.role,
    },
  });
};

// ============================================
// EXAMPLE 3: Admin Only Route
// ============================================
// Import in your route file: import adminAuth from '../middlewares/adminAuth';
// Apply: router.delete('/admin/users/:id', adminAuth, adminOnlyRoute);
export const adminOnlyRoute = (req: Request, res: Response) => {
  const user = req.user;

  res.json({
    message: "Admin access granted",
    admin: user?.email,
  });
};

// ============================================
// EXAMPLE 4: Role-Based Route (Admin or Moderator)
// ============================================
// Apply: router.put('/posts/:id', authenticateToken, authorizeRoles('admin', 'moderator'), moderatorRoute);
export const moderatorRoute = (req: Request, res: Response) => {
  const user = req.user;

  res.json({
    message: "Admin or moderator access granted",
    user: {
      userId: user?.userId,
      role: user?.role,
    },
  });
};

// ============================================
// EXAMPLE 5: Complete Route Setup with All Methods
// ============================================
/**
 * Example blog route setup with different authentication levels
 *
 * import express from 'express';
 * import { authenticateToken } from '../../service/auth/tokenManager';
 * import adminAuth from '../middlewares/adminAuth';
 *
 * const router = express.Router();
 *
 * // Public - Anyone can read blogs
 * router.get('/blogs', getBlogs);
 * router.get('/blogs/:id', getBlogById);
 *
 * // Protected - Logged-in users can create
 * router.post('/blogs', authenticateToken, createBlog);
 *
 * // Protected - Users can update their own blogs
 * router.put('/blogs/:id', authenticateToken, updateBlog);
 *
 * // Admin Only - Only admins can delete
 * router.delete('/blogs/:id', adminAuth, deleteBlog);
 *
 * export default router;
 */

// ============================================
// EXAMPLE 6: Route with Ownership Check
// ============================================
export const updateOwnBlog = async (req: Request, res: Response) => {
  const user = req.user;
  const blogId = req.params.id;

  // TODO: Fetch blog from database
  // const blog = await Blog.findById(blogId);

  // Check if user owns the blog OR is admin
  // if (blog.userId !== user.userId && user.role !== 'admin') {
  //   return res.status(403).json({
  //     success: false,
  //     message: 'Not authorized to update this blog'
  //   });
  // }

  // TODO: Update blog logic here

  res.json({
    message: "Blog updated successfully",
    blogId,
    updatedBy: user.userId,
  });
};

// ============================================
// EXAMPLE 7: Complete CRUD with Auth
// ============================================
/**
 * Complete example route file:
 *
 * import express from 'express';
 * import { authenticateToken, authorizeRoles } from '../../service/auth/tokenManager';
 * import adminAuth from '../middlewares/adminAuth';
 * import * as controller from '../controllers/resource.controller';
 *
 * const router = express.Router();
 *
 * // Public routes
 * router.get('/resources', controller.list);
 * router.get('/resources/:id', controller.getById);
 *
 * // Authenticated user routes
 * router.post('/resources', authenticateToken, controller.create);
 * router.put('/resources/:id', authenticateToken, controller.update);
 *
 * // Admin only routes
 * router.delete('/resources/:id', adminAuth, controller.remove);
 * router.patch('/resources/:id/approve', adminAuth, controller.approve);
 *
 * // Role-based routes (admin or moderator)
 * router.patch(
 *   '/resources/:id/publish',
 *   authenticateToken,
 *   authorizeRoles('admin', 'moderator'),
 *   controller.publish
 * );
 *
 * export default router;
 */

// ============================================
// EXAMPLE 8: Middleware Chain Example
// ============================================
/**
 * Using multiple middlewares in sequence:
 *
 * router.post(
 *   '/api/admin/posts/:id/publish',
 *   authenticateToken,              // 1. Verify user is logged in
 *   authorizeRoles('admin'),        // 2. Verify user is admin
 *   validatePostData,               // 3. Validate request data
 *   publishPost                     // 4. Execute controller
 * );
 */

// ============================================
// TESTING EXAMPLES
// ============================================

/**
 * Test with curl (PowerShell):
 *
 * # 1. Login and get token
 * $response = curl -X POST http://localhost:8080/api/auth/login `
 *   -H "Content-Type: application/json" `
 *   -d '{\"email\":\"admin@test.com\",\"userId\":\"123\",\"role\":\"admin\"}' | ConvertFrom-Json
 *
 * $token = $response.data.accessToken
 *
 * # 2. Access protected route
 * curl -X GET http://localhost:8080/api/protected `
 *   -H "Authorization: Bearer $token"
 *
 * # 3. Access admin route
 * curl -X DELETE http://localhost:8080/api/admin/users/456 `
 *   -H "Authorization: Bearer $token"
 */

/**
 * Test with JavaScript/TypeScript (Frontend):
 *
 * // 1. Login
 * const loginResponse = await fetch('/api/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({
 *     email: 'user@example.com',
 *     userId: '123',
 *     role: 'user'
 *   })
 * });
 *
 * const { data } = await loginResponse.json();
 * localStorage.setItem('accessToken', data.accessToken);
 * localStorage.setItem('refreshToken', data.refreshToken);
 *
 * // 2. Make authenticated request
 * const response = await fetch('/api/protected', {
 *   headers: {
 *     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
 *   }
 * });
 *
 * // 3. Handle token expiration
 * if (response.status === 403) {
 *   // Refresh token
 *   const refreshResponse = await fetch('/api/auth/refresh', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({
 *       refreshToken: localStorage.getItem('refreshToken')
 *     })
 *   });
 *
 *   const { data } = await refreshResponse.json();
 *   localStorage.setItem('accessToken', data.accessToken);
 *
 *   // Retry original request
 * }
 */

// ============================================
// RECOMMENDED FOLDER STRUCTURE FOR YOUR PROJECT
// ============================================
/**
 * src/
 * ├── api/
 * │   ├── controllers/
 * │   │   ├── auth.controller.ts       ✅ Created
 * │   │   ├── blog.controller.ts       (Add auth to these)
 * │   │   ├── course.controller.ts     (Add auth to these)
 * │   │   └── job.controller.ts        (Add auth to these)
 * │   ├── middlewares/
 * │   │   ├── adminAuth.ts            ✅ Updated
 * │   │   └── upload.ts               (Your existing)
 * │   └── routes/
 * │       ├── auth.route.ts           ✅ Created
 * │       ├── blog.route.ts           (Add auth middleware)
 * │       └── course.route.ts         (Add auth middleware)
 * ├── service/
 * │   └── auth/
 * │       ├── jwt.ts                  ✅ Created
 * │       ├── tokenManager.ts         ✅ Created
 * │       └── auth.ts                 ✅ Created
 * └── config/
 *     └── config.ts                   ✅ Updated
 */
