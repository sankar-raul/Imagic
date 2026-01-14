# Refresh Token Database Integration

## Overview

The authentication system now uses MongoDB to store refresh tokens instead of in-memory storage. This provides persistence across server restarts and better scalability.

## Files Created

### 1. Interface

- **[refreshToken.interface.ts](../../Types/interface/refreshToken.interface.ts)** - TypeScript interface for refresh tokens

### 2. Schema & Model

- **[refreshToken.schema.ts](../../models/refreshToken/refreshToken.schema.ts)** - Mongoose schema with automatic expiration
- **[refreshToken.model.ts](../../models/refreshToken/refreshToken.model.ts)** - Mongoose model

## Database Schema

```typescript
{
  userId: string; // User ID who owns this token
  token: string; // The JWT refresh token (unique)
  expiresAt: Date; // Expiration date
  createdAt: Date; // Auto-generated timestamp
  updatedAt: Date; // Auto-generated timestamp
}
```

## Features

✅ **Persistent Storage** - Tokens survive server restarts
✅ **Automatic Expiration** - MongoDB TTL index removes expired tokens
✅ **User-Specific Logout** - Can logout from all devices per user
✅ **Token Validation** - Checks both JWT validity and database existence
✅ **Indexed Queries** - Fast lookups by token, userId, and expiresAt

## Updated Functions

All token management functions are now async and use the database:

### `loginAndGenerateTokens(payload)`

```typescript
const tokens = await loginAndGenerateTokens({
  userId: "123",
  email: "user@example.com",
  role: "admin",
});
```

- Generates both access and refresh tokens
- Stores refresh token in database with 7-day expiration

### `refreshAccessToken(refreshToken)`

```typescript
const newAccessToken = await refreshAccessToken(refreshToken);
```

- Validates token exists in database and hasn't expired
- Returns new access token

### `logout(refreshToken)`

```typescript
await logout(refreshToken);
```

- Removes specific refresh token from database

### `logoutAllDevices(userId)`

```typescript
await logoutAllDevices(userId);
```

- Removes all refresh tokens for a specific user
- Logs user out from all devices

### `isRefreshTokenValid(token)`

```typescript
const isValid = await isRefreshTokenValid(token);
```

- Checks if token exists and hasn't expired

### `cleanupExpiredTokens()` (New)

```typescript
await cleanupExpiredTokens();
```

- Manually removes expired tokens
- Optional - MongoDB TTL index does this automatically

## Migration Notes

### Before (In-Memory)

```typescript
// Old code
const tokens = loginAndGenerateTokens(payload);
const newToken = refreshAccessToken(refreshToken);
logout(refreshToken);
```

### After (Database)

```typescript
// New code - add await
const tokens = await loginAndGenerateTokens(payload);
const newToken = await refreshAccessToken(refreshToken);
await logout(refreshToken);
```

## API Endpoint Updates

All auth endpoints now properly handle async operations:

- `POST /api/auth/login` - Creates refresh token in DB
- `POST /api/auth/refresh` - Validates against DB
- `POST /api/auth/logout` - Removes from DB
- `POST /api/auth/logout-all` - Requires authentication, removes all user tokens

## Automatic Cleanup

The schema includes a TTL (Time To Live) index:

```typescript
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
```

MongoDB automatically removes documents where `expiresAt` is in the past.

## Security Improvements

1. **Token Revocation** - Tokens can be instantly invalidated
2. **Device Management** - Users can logout from all devices
3. **Audit Trail** - createdAt/updatedAt timestamps for tracking
4. **Expiration Control** - Database-level enforcement of token expiry

## Production Recommendations

1. **Add Indexes** - Already included for userId, token, and expiresAt
2. **Monitor Collection Size** - Set up alerts for token collection growth
3. **Backup Strategy** - Include refresh tokens in backup plan
4. **Rate Limiting** - Add rate limits to token refresh endpoint
5. **Token Rotation** - Consider implementing refresh token rotation

## Example Usage in Controllers

```typescript
// Login
const tokens = await loginAndGenerateTokens({
  userId: admin.id,
  email: admin.email,
  role: "admin",
});

// Refresh
const newAccessToken = await refreshAccessToken(req.body.refreshToken);

// Logout
await logout(req.body.refreshToken);

// Logout All Devices (requires auth)
await logoutAllDevices(req.user.userId);
```

## Troubleshooting

**Tokens not expiring?**

- Check MongoDB TTL index is active: `db.refreshtokens.getIndexes()`
- TTL monitor runs every 60 seconds by default

**High token count?**

- Manually run cleanup: `await cleanupExpiredTokens()`
- Check if users are logging out properly

**Performance issues?**

- Ensure indexes are created
- Monitor query performance with MongoDB profiler
