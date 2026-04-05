import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Role, TrustTier } from '@w4u/shared';

export interface AuthTokenPayload {
  id: string;
  phone_number: string;
  role: Role;
  trust_tier: TrustTier;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthTokenPayload;
    }
  }
}

function extractToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return null;
  }
  return header.slice(7);
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const token = extractToken(req);
  if (!token) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing or invalid authorization header' },
    });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as AuthTokenPayload;
    req.user = payload;
    next();
  } catch {
    res.status(401).json({
      success: false,
      error: { code: 'INVALID_TOKEN', message: 'Invalid or expired access token' },
    });
  }
}

export function optionalAuth(req: Request, _res: Response, next: NextFunction): void {
  const token = extractToken(req);
  if (!token) {
    next();
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwt.accessSecret) as AuthTokenPayload;
    req.user = payload;
  } catch {
    // Ignore invalid tokens in optional mode
  }
  next();
}

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' },
      });
      return;
    }

    next();
  };
}

export function requireTrustTier(minTier: TrustTier) {
  const tierOrder: TrustTier[] = [
    TrustTier.UNVERIFIED,
    TrustTier.ID_VERIFIED,
    TrustTier.SKILLS_VERIFIED,
    TrustTier.COMMUNITY_VOUCHED,
    TrustTier.FULLY_VETTED,
  ];

  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' },
      });
      return;
    }

    const userTierIndex = tierOrder.indexOf(req.user.trust_tier);
    const requiredTierIndex = tierOrder.indexOf(minTier);

    if (userTierIndex < requiredTierIndex) {
      res.status(403).json({
        success: false,
        error: {
          code: 'INSUFFICIENT_TRUST_TIER',
          message: `This action requires trust tier ${minTier} or higher. Current tier: ${req.user.trust_tier}`,
        },
      });
      return;
    }

    next();
  };
}
