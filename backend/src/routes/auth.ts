import { Router, Request, Response } from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import { authenticateUser } from '../middleware/auth';
import { createUserClient } from '../config/supabase';
import { logger } from '../utils/logger';

const router = Router();

// POST /api/auth/login
router.post('/login', asyncHandler(async (req: Request, res: Response) => {
  logger.info('Login attempt', { email: req.body.email });
  
  // TODO: Implement Supabase authentication
  res.status(501).json({
    message: 'Authentication endpoint - implementation pending',
    endpoint: 'POST /api/auth/login',
  });
}));

// POST /api/auth/register
router.post('/register', asyncHandler(async (req: Request, res: Response) => {
  logger.info('Registration attempt', { email: req.body.email });
  
  // TODO: Implement Supabase user registration
  res.status(501).json({
    message: 'Registration endpoint - implementation pending',
    endpoint: 'POST /api/auth/register',
  });
}));

// POST /api/auth/logout
router.post('/logout', asyncHandler(async (req: Request, res: Response) => {
  logger.info('Logout attempt');
  
  // TODO: Implement logout logic
  res.status(501).json({
    message: 'Logout endpoint - implementation pending',
    endpoint: 'POST /api/auth/logout',
  });
}));

// GET /api/auth/me - Protected route
router.get('/me', authenticateUser, asyncHandler(async (req: Request, res: Response) => {
  if (!req.user || !req.supabase) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    // Get user profile from database
    const { data: profile, error } = await req.supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      logger.error('Error fetching user profile:', error);
      return res.status(500).json({ error: 'Failed to fetch user profile' });
    }

    // If profile doesn't exist, create it
    if (!profile) {
      const { data: newProfile, error: createError } = await req.supabase
        .from('profiles')
        .insert({
          id: req.user.id,
          email: req.user.email || '',
          name: req.user.user_metadata?.name || req.user.email?.split('@')[0] || 'User',
          subscription_tier: 'free'
        })
        .select()
        .single();

      if (createError) {
        logger.error('Error creating user profile:', createError);
        return res.status(500).json({ error: 'Failed to create user profile' });
      }

      return res.json({
        user: req.user,
        profile: newProfile
      });
    }

    res.json({
      user: req.user,
      profile
    });
  } catch (error) {
    logger.error('Unexpected error in /me endpoint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}));

// POST /api/auth/refresh
router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
  // TODO: Implement token refresh
  res.status(501).json({
    message: 'Token refresh endpoint - implementation pending',
    endpoint: 'POST /api/auth/refresh',
  });
}));

export default router;