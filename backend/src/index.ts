// Load environment variables first, before any other imports
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';
import { validateEnvAndExit, validateSupabaseConnection, validateExternalServices, getEnvironmentInfo } from './utils/validateEnv';

// Import routes
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import meetingRoutes from './routes/meetings';
import transcriptionRoutes from './routes/transcription';
import analysisRoutes from './routes/analysis';

// Validate required environment variables and exit if validation fails
validateEnvAndExit();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(limiter); // Rate limiting
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(requestLogger); // Request logging

// Health check routes
app.use('/health', healthRoutes);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/meetings', meetingRoutes);
app.use('/api/transcription', transcriptionRoutes);
app.use('/api/analysis', analysisRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Log environment information
  const envInfo = getEnvironmentInfo();
  logger.info('Environment configuration:', envInfo);
  
  // Validate external services
  try {
    const supabaseConnected = await validateSupabaseConnection();
    if (!supabaseConnected) {
      logger.warn('Supabase connection validation failed - some features may not work properly');
    }
    
    const serviceValidation = await validateExternalServices();
    logger.info('External service validation:', serviceValidation);
    
    if (!serviceValidation.openai) {
      logger.warn('OpenAI API key validation failed - AI features may not work properly');
    }
    
    if (!serviceValidation.huggingface) {
      logger.warn('Hugging Face API key validation failed - sentiment analysis may not work properly');
    }
    
  } catch (error) {
    logger.error('Service validation error:', error);
  }
});

export default app;