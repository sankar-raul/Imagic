# Student Authentication System

A separate authentication system for students, independent from the admin authentication.

## Overview

This authentication system provides complete student registration, login, and profile management functionality. It uses JWT tokens for authentication and bcrypt for password hashing.

## Features

- **Student Registration**: New students can register with name, email, password, phone, and course
- **Student Login**: Authenticate with email and password
- **Token Management**: JWT-based access and refresh tokens
- **Protected Routes**: Middleware to ensure only authenticated students can access certain routes
- **Profile Management**: View and update student profile
- **Password Change**: Change password with old password verification

## API Endpoints

### Public Endpoints (No Authentication Required)

#### Register Student
```
POST /api/student-auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "course": "Web Development"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "course": "Web Development",
    "isVerified": false
  }
}
```

#### Student Login
```
POST /api/student-auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m",
    "student": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "course": "Web Development",
      "phone": "+1234567890"
    }
  }
}
```

#### Refresh Token
```
POST /api/student-auth/refresh
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": "15m"
  }
}
```

### Protected Endpoints (Require Student Authentication)

All protected endpoints require:
- `Authorization` header with Bearer token
- Token must have `role: "student"`

#### Get Student Profile
```
GET /api/student-auth/profile
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "course": "Web Development",
    "phone": "+1234567890",
    "isVerified": false,
    "createdAt": "2026-01-27T...",
    "updatedAt": "2026-01-27T..."
  }
}
```

#### Update Password
```
PUT /api/student-auth/password
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "oldPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

#### Logout
```
POST /api/student-auth/logout
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## Authentication Flow

1. **Registration**: Student registers with credentials → Password is hashed → Student record created
2. **Login**: Student logs in → Credentials verified → JWT tokens generated with role "student"
3. **Access Protected Routes**: Include access token in Authorization header
4. **Token Refresh**: When access token expires, use refresh token to get new access token
5. **Logout**: Invalidate refresh token

## Middleware

### `authenticateToken`
Verifies JWT token and attaches user data to `req.user`

### `studentAuthMiddleware`
Ensures the authenticated user has role "student" - prevents admin tokens from accessing student routes

## Security Features

- Passwords hashed with bcrypt (10 salt rounds)
- JWT tokens with expiration
- Email format validation
- Password length validation (minimum 6 characters)
- Role-based access control
- Refresh token stored in database with expiration

## Differences from Admin Auth

| Feature | Admin Auth | Student Auth |
|---------|-----------|--------------|
| Role | `admin` | `student` |
| Endpoints | `/api/auth/*` | `/api/student-auth/*` |
| Model | AdminModel | StudentModel |
| Additional Fields | - | phone, course, isVerified |
| Registration | No public registration | Public registration available |

## File Structure

```
src/
├── api/
│   ├── controllers/
│   │   └── studentAuth.controller.ts    # Student auth request handlers
│   ├── middlewares/
│   │   └── studentAuth.ts               # Student role verification middleware
│   └── routes/
│       └── studentAuth.route.ts         # Student auth route definitions
├── models/
│   └── student/
│       ├── student.model.ts             # Student Mongoose model
│       └── student.schema.ts            # Student schema definition
├── service/
│   └── studentAuth/
│       └── studentAuth.ts               # Student auth business logic
└── Types/
    └── student.types.ts                 # Student TypeScript interfaces
```

## Example Usage

### Frontend Integration

```javascript
// Register
const register = async (userData) => {
  const response = await fetch('/api/student-auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Login
const login = async (email, password) => {
  const response = await fetch('/api/student-auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  
  // Store tokens
  localStorage.setItem('accessToken', data.data.accessToken);
  localStorage.setItem('refreshToken', data.data.refreshToken);
  
  return data;
};

// Access protected route
const getProfile = async () => {
  const token = localStorage.getItem('accessToken');
  const response = await fetch('/api/student-auth/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
};
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "success": false,
  "message": "Error message describing what went wrong"
}
```

Common error status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error
