// ============================================
// packages.js — Tour Packages Page Logic
// ============================================

// ── ALL PACKAGES DATA ─────────────────────────────────────────────────────────
// Later this will come from GET /api/plans via Express
const ALL_PACKAGES = [
  // VARANASI
  {
    id: "varanasi-starter", destination: "varanasi", destName: "Varanasi",
    emoji: "🪔", tier: "Starter", name: "Sacred Glow",
    tagline: "First steps on holy ground",
    price: 4999, duration: 3, nights: 2, rating: 4.2, reviews: 128,
    featured: false,
    features: ["Ganga Aarti", "Kashi Vishwanath Temple", "Old city walk", "Sarnath day trip"],
  },
  {
    id: "varanasi-explorer", destination: "varanasi", destName: "Varanasi",
    emoji: "🪔", tier: "Explorer", name: "River & Ritual",
    tagline: "Where the Ganges tells her stories",
    price: 8499, duration: 5, nights: 4, rating: 4.8, reviews: 342,
    featured: true,
    features: ["Sunrise boat ride", "Ganga Aarti front-row", "Heritage stay 3★", "Silk workshop"],
  },
  {
    id: "varanasi-signature", destination: "varanasi", destName: "Varanasi",
    emoji: "🪔", tier: "Signature", name: "The Kashi Immersion",
    tagline: "Live Varanasi like a scholar of souls",
    price: 15999, duration: 7, nights: 6, rating: 4.9, reviews: 87,
    featured: false,
    features: ["Private sunrise boat", "All 84 ghats walk", "Luxury haveli 4★", "All meals"],
  },
  // RAJASTHAN
  {
    id: "rajasthan-starter", destination: "rajasthan", destName: "Rajasthan",
    emoji: "🏯", tier: "Starter", name: "Desert Dip",
    tagline: "A quick taste of the royal life",
    price: 5999, duration: 3, nights: 2, rating: 4.1, reviews: 95,
    featured: false,
    features: ["Amber Fort", "Hawa Mahal", "Pink City bazaar", "Local guide"],
  },
  {
    id: "rajasthan-explorer", destination: "rajasthan", destName: "Rajasthan",
    emoji: "🏯", tier: "Explorer", name: "Royal Circuit",
    tagline: "Forts, deserts and royal feasts",
    price: 11999, duration: 6, nights: 5, rating: 4.7, reviews: 215,
    featured: true,
    features: ["Jaipur + Jodhpur + Jaisalmer", "Camel safari", "Heritage hotel 3★", "Cultural dinner"],
  },
  {
    id: "rajasthan-signature", destination: "rajasthan", destName: "Rajasthan",
    emoji: "🏯", tier: "Signature", name: "Maharaja Experience",
    tagline: "Live like royalty across Rajputana",
    price: 24999, duration: 9, nights: 8, rating: 5.0, reviews: 43,
    featured: false,
    features: ["4 cities tour", "Palace hotel 4★", "Hot air balloon", "All meals"],
  },
  // KERALA
  {
    id: "kerala-starter", destination: "kerala", destName: "Kerala",
    emoji: "🌴", tier: "Starter", name: "Backwater Glimpse",
    tagline: "Dip your toes in paradise",
    price: 5499, duration: 3, nights: 2, rating: 4.3, reviews: 174,
    featured: false,
    features: ["Alleppey day cruise", "Kathakali show", "Local breakfast", "Beach walk"],
  },
  {
    id: "kerala-explorer", destination: "kerala", destName: "Kerala",
    emoji: "🌴", tier: "Explorer", name: "Malabar Magic",
    tagline: "Backwaters, spices and the sea",
    price: 10499, duration: 6, nights: 5, rating: 4.6, reviews: 298,
    featured: true,
    features: ["Overnight houseboat", "Munnar tea tour", "Ayurvedic spa", "Spice garden"],
  },
  {
    id: "kerala-signature", destination: "kerala", destName: "Kerala",
    emoji: "🌴", tier: "Signature", name: "God's Own Odyssey",
    tagline: "Every inch of Kerala's soul",
    price: 19999, duration: 9, nights: 8, rating: 4.9, reviews: 61,
    featured: false,
    features: ["Luxury houseboat 2 nights", "Wildlife safari", "Full Ayurveda day", "All meals"],
  },
  // SHIMLA
  {
    id: "shimla-starter", destination: "shimla", destName: "Shimla",
    emoji: "🏔️", tier: "Starter", name: "Hill Escape",
    tagline: "Breathe the mountain air",
    price: 3999, duration: 3, nights: 2, rating: 4.0, reviews: 112,
    featured: false,
    features: ["Mall Road walk", "Jakhu Temple trek", "Toy train", "Local sightseeing"],
  },
  {
    id: "shimla-explorer", destination: "shimla", destName: "Shimla",
    emoji: "🏔️", tier: "Explorer", name: "Mountain Wanderer",
    tagline: "Hills, snow and colonial charm",
    price: 7999, duration: 5, nights: 4, rating: 4.5, reviews: 189,
    featured: true,
    features: ["Shimla + Kufri + Naldehra", "Snow activities", "Heritage hotel 3★", "Toy train"],
  },
  {
    id: "shimla-signature", destination: "shimla", destName: "Shimla",
    emoji: "🏔️", tier: "Signature", name: "The Himalayan Crown",
    tagline: "The grandest hills experience",
    price: 13999, duration: 7, nights: 6, rating: 4.8, reviews: 54,
    featured: false,
    features: ["4 locations", "Luxury resort 4★", "Paragliding", "All meals + bonfire"],
  },
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let filtered = [...ALL_PACKAGES];

// ── RENDER CARDS ─────────────────────────────────────────────────────────────
function renderCards(packages) {
  const grid     = document.getElementById('packagesGrid');
  const noResult = document.getElementById('noResults');
  const count    = document.getElementById('resultsCount');

  count.textContent = `Showing ${packages.length} package${packages.length !== 1 ? 's' : ''}`;

  if (packages.length === 0) {
    grid.innerHTML = '';
    noResult.style.display = 'block';
    return;
  }

  noResult.style.display = 'none';

  grid.innerHTML = packages.map((pkg, i) => {
    const tierClass = {
      Starter:   'badge-starter',
      Explorer:  'badge-explorer',
      Signature: 'badge-signature',
    }[pkg.tier] || 'badge-starter';

    const stars = '★'.repeat(Math.floor(pkg.rating)) + (pkg.rating % 1 >= 0.5 ? '☆' : '');

    const bgColors = {
      varanasi:  'linear-gradient(135deg, #C4873A 0%, #8B4A2B 100%)',
      rajasthan: 'linear-gradient(135deg, #B85042 0%, #6B3A2A 100%)',
      kerala:    'linear-gradient(135deg, #6B7A52 0%, #3A5E3A 100%)',
      shimla:    'linear-gradient(135deg, #4A7FA5 0%, #2A3E5E 100%)',
    };

    return `
      <div class="pkg-card" style="animation-delay: ${i * 0.07}s"
           data-id="${pkg.id}" data-price="${pkg.price}" data-tier="${pkg.tier}"
           data-dest="${pkg.destination}" data-duration="${pkg.duration}">

        <div class="pkg-card-top">
          <div class="pkg-card-bg" style="background: ${bgColors[pkg.destination]}">
            <span style="opacity:0.25; font-size:6rem">${pkg.emoji}</span>
          </div>
          <div class="pkg-card-overlay"></div>
          <span class="pkg-badge ${tierClass}">${pkg.tier}</span>
          ${pkg.featured ? '<span class="pkg-badge badge-popular" style="top:1rem;left:1rem">⭐ Popular</span>' : ''}
          <div class="pkg-dest-label">📍 ${pkg.destName}</div>
        </div>

        <div class="pkg-card-body">
          <div class="pkg-tier">${pkg.tier} Package</div>
          <div class="pkg-name">${pkg.name}</div>
          <div class="pkg-tagline">"${pkg.tagline}"</div>

          <div class="pkg-rating">
            ${stars}
            <span>${pkg.rating} (${pkg.reviews} reviews)</span>
          </div>

          <div class="pkg-meta">
            <div class="pkg-meta-item"><span>📅</span> ${pkg.duration} Days / ${pkg.nights} Nights</div>
            <div class="pkg-meta-item"><span>👥</span> Per person</div>
          </div>

          <ul class="pkg-features">
            ${pkg.features.slice(0, 4).map(f => `<li>${f}</li>`).join('')}
          </ul>

          <div class="pkg-footer">
            <div class="pkg-price">
              ₹${pkg.price.toLocaleString('en-IN')}
              <small>/ person</small>
            </div>
            <a href="booking.html?pkg=${pkg.id}" class="pkg-book-btn">Book Now</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ── FILTER LOGIC ─────────────────────────────────────────────────────────────
function applyFilters() {
  const dest     = document.getElementById('filterDest').value;
  const budget   = document.getElementById('filterBudget').value;
  const duration = document.getElementById('filterDuration').value;
  const tier     = document.getElementById('filterTier').value;
  const sortBy   = document.getElementById('sortBy').value;

  filtered = ALL_PACKAGES.filter(pkg => {
    if (dest !== 'all' && pkg.destination !== dest) return false;
    if (tier !== 'all' && pkg.tier !== tier) return false;

    if (budget === 'low'  && pkg.price >= 6000)  return false;
    if (budget === 'mid'  && (pkg.price < 6000 || pkg.price > 12000)) return false;
    if (budget === 'high' && pkg.price <= 12000) return false;

    if (duration === 'short'  && pkg.duration > 4)  return false;
    if (duration === 'medium' && (pkg.duration < 5 || pkg.duration > 6)) return false;
    if (duration === 'long'   && pkg.duration < 7)  return false;

    return true;
  });

  // Sort
  if (sortBy === 'price-asc')      filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === 'duration-asc') filtered.sort((a, b) => a.duration - b.duration);
  else if (sortBy === 'rating')     filtered.sort((a, b) => b.rating - a.rating);
  else {
    // Default: featured first
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }

  renderCards(filtered);
}

function resetFilters() {
  document.getElementById('filterDest').value     = 'all';
  document.getElementById('filterBudget').value   = 'all';
  document.getElementById('filterDuration').value = 'all';
  document.getElementById('filterTier').value     = 'all';
  document.getElementById('sortBy').value         = 'default';
  applyFilters();
}

// ── EVENT LISTENERS ───────────────────────────────────────────────────────────
document.getElementById('applyFilter').addEventListener('click', applyFilters);
document.getElementById('sortBy').addEventListener('change', applyFilters);

// ── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyFilters(); // render all on load

  // Check if URL has a destination query param e.g. packages.html?dest=kerala
  const params = new URLSearchParams(window.location.search);
  const destParam = params.get('dest');
  if (destParam) {
    document.getElementById('filterDest').value = destParam;
    applyFilters();
  }
});