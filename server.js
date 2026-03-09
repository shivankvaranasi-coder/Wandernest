// ============================================
// server/server.js
// Wandernest — Express Backend
// ============================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const plansRouter = require('./routes/plans');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── MIDDLEWARE ────────────────────────────────────────────────────────────────

// Allow requests from the frontend (CORS)
app.use(cors());

// Parse incoming JSON bodies
app.use(express.json());

// Serve the public folder as static files
// index.html, style.css, script.js all live in /public
app.use(express.static(path.join(__dirname, '../public')));

// ── API ROUTES ────────────────────────────────────────────────────────────────

// All plan/destination API routes under /api
app.use('/api', plansRouter);

// ── ROOT HEALTH CHECK ─────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: '🌍 Wandernest API is running!',
    endpoints: [
      'GET /api/destinations             → all destinations',
      'GET /api/plans/:id                → plans for a destination',
      'GET /api/plans/:id/compare        → side-by-side comparison',
      'GET /api/search?q=query           → search destinations'
    ]
  });
});

// ── FALLBACK: serve index.html for any unknown route ─────────────────────────
// This lets the frontend handle routing if you add more pages later
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// ── START SERVER ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌍 Wandernest server running!`);
  console.log(`   Local:   http://localhost:${PORT}`);
  console.log(`   API:     http://localhost:${PORT}/api/health\n`);
});
