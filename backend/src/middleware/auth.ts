import { Request, Response, NextFunction } from 'express';
import { createUserClient } from '../config/supabase';
import { User } from '@supabase/supabase-js';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
      supabase?: ReturnType<typeof createUserClient>;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: User;
  supabase: ReturnType<typeof createUserClient>;
}

/**
 * Middleware to authenticate requests using Supabase JWT tokens
 */
export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        error: 'Missing or invalid authorization header',
        message: 'Please provide a valid Bearer token'
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    // Create user-specific Supabase client
    const userSupabase = createUserClient(token);
    
    // Verify the token and get user
    const { data: { user }, error } = await userSupabase.auth.getUser(token);
    
    if (error || !user) {
      res.status(401).json({ 
        error: 'Invalid or expired token',
        message: 'Please log in again'
      });
      return;
    }

    // Attach user and supabase client to request
    req.user = user;
    req.supabase = userSupabase;
    
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ 
      error: 'Authentication failed',
      message: 'Internal server error during authentication'
    });
  }
};

/**
 * Middleware to optionally authenticate requests
 * Continues even if no token is provided
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const userSupabase = createUserClient(token);
      
      const { data: { user }, error } = await userSupabase.auth.getUser(token);
      
      if (!error && user) {
        req.user = user;
        req.supabase = userSupabase;
      }
    }
    
    next();
  } catch (error) {
    console.error('Optional authentication error:', error);
    // Continue without authentication
    next();
  }
};

/**
 * Middleware to check if user has required subscription tier
 */
export const requireSubscription = (requiredTier: 'pro' | 'enterprise') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user || !req.supabase) {
        res.status(401).json({ 
          error: 'Authentication required',
          message: 'Please log in to access this feature'
        });
        return;
      }

      // Get user profile to check subscription tier
      const { data: profile, error } = await req.supabase
        .from('profiles')
        .select('subscription_tier')
        .eq('id', req.user.id)
        .single();

      if (error || !profile) {
        res.status(404).json({ 
          error: 'Profile not found',
          message: 'User profile could not be retrieved'
        });
        return;
      }

      const tierHierarchy = { free: 0, pro: 1, enterprise: 2 };
      const userTierLevel = tierHierarchy[profile.subscription_tier];
      const requiredTierLevel = tierHierarchy[requiredTier];

      if (userTierLevel < requiredTierLevel) {
        res.status(403).json({ 
          error: 'Insufficient subscription',
          message: `This feature requires ${requiredTier} subscription or higher`,
          current_tier: profile.subscription_tier,
          required_tier: requiredTier
        });
        return;
      }

      next();
    } catch (error) {
      console.error('Subscription check error:', error);
      res.status(500).json({ 
        error: 'Subscription check failed',
        message: 'Internal server error during subscription verification'
      });
    }
  };
};