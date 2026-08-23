import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security and Performance Middlewares
app.use(compression());

// Set essential HTTP security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Static file serving with efficient cache policy
app.use(express.static(__dirname, {
  maxAge: '1d',
  etag: true,
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else if (
      filepath.endsWith('.webp') ||
      filepath.endsWith('.png') ||
      filepath.endsWith('.svg') ||
      filepath.endsWith('.pdf') ||
      filepath.endsWith('.css') ||
      filepath.endsWith('.js')
    ) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

// SPA Fallback Route
app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Global Centralized Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err.stack || err.message || err);
  res.status(500).type('text/plain').send('500 Internal Server Error');
});

// Start Server with Graceful Shutdown handling
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});

const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Shutting down server gracefully...`);
  server.close(() => {
    console.log('Server closed gracefully.');
    process.exit(0);
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

