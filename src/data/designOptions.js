// Options for "DESIGN WITH RENA HOME". Only ids live here; the visible labels are in
// src/i18n/translations.js under designStudio (rooms, styles, colors, materials, prefs).

// `cover` reuses an existing collection cover photo for the room tiles.
export const ROOMS = [
  { id: 'kitchen', cover: 'kuzhina' },
  { id: 'living', cover: 'sallone' },
  { id: 'bedroom', cover: 'dhoma-gjumi' },
  { id: 'wardrobe', cover: 'garderoba' },
  { id: 'other', cover: 'projekte' },
];

export const STYLES = ['modern', 'minimalist', 'luxury', 'scandinavian'];

// `swatch` is the CSS background used for the color chip.
export const COLORS = [
  { id: 'white', swatch: '#f7f5f0' },
  { id: 'beige', swatch: '#d9c7ab' },
  { id: 'grey', swatch: '#8f8b86' },
  { id: 'black', swatch: '#1f1d1b' },
  { id: 'brown', swatch: '#6b4430' },
  { id: 'wood', swatch: 'linear-gradient(135deg, #c79a6a 0%, #a8774a 45%, #d2a877 70%, #9a6b40 100%)' },
];

export const MATERIALS = ['wood', 'mdf', 'marble', 'matte', 'glossy'];

export const PREFERENCES = ['lighting', 'handleless', 'island', 'storage', 'appliances', 'glass', 'softclose', 'open'];

// Accepted uploads. The photo stays in browser memory (object URL) and is never sent anywhere
// until an AI endpoint is configured (see src/services/designGeneration.js).
export const UPLOAD = {
  accept: '.jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp',
  types: ['image/jpeg', 'image/png', 'image/webp'],
  extensions: /\.(jpe?g|png|webp)$/i,
  maxBytes: 15 * 1024 * 1024,
};
