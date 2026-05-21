import { Request, Response, NextFunction } from 'express';

const requestCounts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 100;

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip ?? 'unknown';
  const now = Date.now();
  const record = requestCounts.get(ip);

  if (!record || now > record.resetAt) {
    requestCounts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }
  if (record.count >= MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests', retryAfter: Math.ceil((record.resetAt - now) / 1000) });
  }
  record.count++;
  next();
}
