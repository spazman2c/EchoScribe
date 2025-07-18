import { Router, Request, Response } from 'express';
import { databaseService } from '../services/database';
import { StorageService } from '../services/storage';
import { supabase } from '../config/supabase';

const router = Router();

/**
 * Basic health check endpoint
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    res.status(200).json(health);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Comprehensive health check including database and storage
 */
router.get('/detailed', async (req: Request, res: Response) => {
  try {
    const [
      dbHealth,
      migrationsTest,
      storageTest
    ] = await Promise.all([
      databaseService.healthCheck(),
      databaseService.testMigrations(),
      databaseService.testStorageBuckets()
    ]);

    const overallHealth = {
      status: dbHealth.connected && migrationsTest.success && storageTest.success ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: {
          connected: dbHealth.connected,
          latency: dbHealth.latency,
          error: dbHealth.error
        },
        migrations: {
          success: migrationsTest.success,
          tables: migrationsTest.tables,
          error: migrationsTest.error
        },
        storage: {
          success: storageTest.success,
          buckets: storageTest.buckets,
          error: storageTest.error
        }
      }
    };

    const statusCode = overallHealth.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(overallHealth);
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error during health check'
    });
  }
});

/**
 * Database-specific health check
 */
router.get('/database', async (req: Request, res: Response) => {
  try {
    const dbHealth = await databaseService.healthCheck();
    
    const statusCode = dbHealth.connected ? 200 : 503;
    res.status(statusCode).json({
      service: 'database',
      ...dbHealth,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      service: 'database',
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown database error',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Storage-specific health check
 */
router.get('/storage', async (req: Request, res: Response) => {
  try {
    const storageService = new StorageService(supabase);
    const storageTest = await databaseService.testStorageBuckets();
    
    const statusCode = storageTest.success ? 200 : 503;
    res.status(statusCode).json({
      service: 'storage',
      ...storageTest,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      service: 'storage',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown storage error',
      timestamp: new Date().toISOString()
    });
  }
});

export default router;