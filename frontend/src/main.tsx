import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { validateEnv, getEnvironmentInfo } from './config/env';

// Validate environment variables on startup
const validationResult = validateEnv();

// Log environment information in development
if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
  console.log('Environment Info:', getEnvironmentInfo());
}

// Show error if validation fails in development
if (!validationResult.success && import.meta.env.VITE_NODE_ENV === 'development') {
  console.error('Environment validation failed. The application may not work correctly.');
  console.error('Errors:', validationResult.errors);
  console.error('Missing required variables:', validationResult.missingRequired);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
