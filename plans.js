// ============================================
// routes/plans.js
// All API endpoints for destinations & plans
// ============================================

const express = require('express');
const router  = express.Router();
const plans   = require('../data/plans.json');

// ── GET /api/destinations
// Returns list of all destinations (id, name, state, tagline, emoji)
router.get('/destinations', (req, res) => {
  const destinations = plans.destinations.map(d => ({
    id:      d.id,
    name:    d.name,
    state:   d.state,
    tagline: d.tagline,
    emoji:   d.emoji
  }));
  res.json({ success: true, data: destinations });
});

// ── GET /api/plans/:destinationId
// Returns all 3 plans for a specific destination
router.get('/plans/:destinationId', (req, res) => {
  const { destinationId } = req.params;

  const destination = plans.destinations.find(
    d => d.id === destinationId.toLowerCase()
  );

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: `No destination found for "${destinationId}". Try: varanasi, rajasthan, kerala, shimla`
    });
  }

  res.json({
    success: true,
    destination: {
      id:      destination.id,
      name:    destination.name,
      state:   destination.state,
      tagline: destination.tagline,
      emoji:   destination.emoji
    },
    plans: destination.plans
  });
});

// ── GET /api/plans/:destinationId/compare
// Returns a side-by-side comparison of all plans for a destination
router.get('/plans/:destinationId/compare', (req, res) => {
  const { destinationId } = req.params;

  const destination = plans.destinations.find(
    d => d.id === destinationId.toLowerCase()
  );

  if (!destination) {
    return res.status(404).json({
      success: false,
      message: `Destination "${destinationId}" not found.`
    });
  }

  // Build a unified feature comparison table
  // Gather all unique inclusions across all plans
  const allFeatures = [];
  destination.plans.forEach(plan => {
    plan.inclusions.forEach(inc => {
      if (!allFeatures.includes(inc)) allFeatures.push(inc);
    });
  });

  const comparison = {
    destination: destination.name,
    features: allFeatures,
    plans: destination.plans.map(plan => ({
      id:       plan.id,
      tier:     plan.tier,
      name:     plan.name,
      price:    plan.price,
      duration: plan.duration,
      rating:   plan.rating,
      featured: plan.featured,
      // For each feature, does this plan include it?
      featureMap: allFeatures.map(feature => ({
        feature,
        included: plan.inclusions.includes(feature)
      }))
    }))
  };

  res.json({ success: true, data: comparison });
});

// ── GET /api/search?q=varanasi
// Search destinations by name (used by search bar)
router.get('/search', (req, res) => {
  const query = (req.query.q || '').toLowerCase().trim();

  if (!query) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a search query using ?q=destination'
    });
  }

  const results = plans.destinations.filter(d =>
    d.name.toLowerCase().includes(query) ||
    d.state.toLowerCase().includes(query) ||
    d.tagline.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    return res.status(404).json({
      success: false,
      message: `No destinations found for "${query}".`,
      available: plans.destinations.map(d => d.name)
    });
  }

  res.json({
    success: true,
    query,
    count: results.length,
    data: results.map(d => ({
      id:      d.id,
      name:    d.name,
      state:   d.state,
      tagline: d.tagline,
      emoji:   d.emoji
    }))
  });
});

module.exports = router;
