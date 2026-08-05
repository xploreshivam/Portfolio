import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable gzip compression
app.use(compression());

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

app.use((req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
});
