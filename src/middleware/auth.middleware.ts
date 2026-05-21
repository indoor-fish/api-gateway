import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserDTO, UnauthorizedError } from '@indoor-fish/shared-libs';

declare global {
  namespace Express {
    interface Request {
      user?: UserDTO;
    }
  }
}

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or invalid Authorization header'));
  }
  const token = authHeader.slice(7);
  try {
    const secret = process.env.JWT_SECRET ?? 'dev-secret';
    const decoded = jwt.verify(token, secret) as UserDTO;
    req.user = decoded;
    next();
  } catch {
    next(new UnauthorizedError('Invalid or expired token'));
  }
}
