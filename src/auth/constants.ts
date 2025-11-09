export const jwtConstants = {
    secret: process.env.JWT_SECRET || 'fallback_secret',
    expiresIn: (process.env.JWT_EXPIRES_IN || '3600s') as string | number,
  };