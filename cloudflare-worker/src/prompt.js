// Option validation and prompt building. Only these ids are accepted (they mirror
// src/data/designOptions.js in the website); the prompt is assembled from fixed English
// phrases only, so nothing typed or sent by a visitor ever reaches the model as text.

const ROOMS = {
  kitchen: 'kitchen',
  living: 'living room',
  bedroom: 'bedroom',
  wardrobe: 'walk-in wardrobe and dressing area',
  other: 'interior space',
};
const STYLES = {
  modern: 'modern',
  minimalist: 'minimalist',
  luxury: 'luxurious, high-end',
  scandinavian: 'Scandinavian',
};
const COLORS = {
  white: 'white',
  beige: 'warm beige',
  grey: 'soft grey',
  black: 'black',
  brown: 'warm brown',
  wood: 'natural wood',
};
const MATERIALS = {
  wood: 'solid wood finishes',
  mdf: 'smooth lacquered MDF fronts',
  marble: 'marble surfaces',
  matte: 'matte finishes',
  glossy: 'high-gloss finishes',
};
const PREFERENCES = {
  lighting: 'integrated warm LED lighting',
  handleless: 'handleless fronts',
  island: 'a kitchen island or peninsula',
  storage: 'generous built-in storage',
  appliances: 'integrated built-in appliances',
  glass: 'glass-fronted display cabinets',
  softclose: 'soft-close drawers',
  open: 'open shelving',
};
const LANGS = ['sq', 'en', 'it'];
const MAX_OPTIONS_LENGTH = 2000;

export class OptionsError extends Error {}

const pickOptional = (value, allowed, name) => {
  if (value === null || value === undefined) return null;
  if (typeof value !== 'string' || !Object.hasOwn(allowed, value)) throw new OptionsError(`Invalid ${name}.`);
  return value;
};

/** Parses and strictly validates the "options" form field. Throws OptionsError on any problem. */
export function parseOptions(raw) {
  if (typeof raw !== 'string' || raw.length === 0 || raw.length > MAX_OPTIONS_LENGTH) throw new OptionsError('Missing or invalid options.');
  let o;
  try {
    o = JSON.parse(raw);
  } catch {
    throw new OptionsError('Options are not valid JSON.');
  }
  if (!o || typeof o !== 'object' || Array.isArray(o)) throw new OptionsError('Options must be an object.');

  if (typeof o.room !== 'string' || !Object.hasOwn(ROOMS, o.room)) throw new OptionsError('Invalid room.');
  const prefs = o.preferences ?? [];
  if (!Array.isArray(prefs) || prefs.length > Object.keys(PREFERENCES).length) throw new OptionsError('Invalid preferences.');
  for (const p of prefs) if (typeof p !== 'string' || !Object.hasOwn(PREFERENCES, p)) throw new OptionsError('Invalid preferences.');
  if (o.lang !== undefined && !LANGS.includes(o.lang)) throw new OptionsError('Invalid language.');

  return {
    room: o.room,
    style: pickOptional(o.style, STYLES, 'style'),
    color: pickOptional(o.color, COLORS, 'color'),
    material: pickOptional(o.material, MATERIALS, 'material'),
    preferences: [...new Set(prefs)],
  };
}

const list = (items) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items.at(-1)}`);

/** Builds the English prompt for FLUX.2 [klein]. The room photo is sent as input_image_0. */
export function buildPrompt({ room, style, color, material, preferences }) {
  const furniture = [
    `${style ? STYLES[style] + ' ' : ''}made-to-measure furniture and cabinetry`,
    color ? `in ${COLORS[color]} tones` : '',
    material ? `with ${MATERIALS[material]}` : '',
  ]
    .filter(Boolean)
    .join(' ');
  const extras = preferences.map((p) => PREFERENCES[p]);

  return [
    `Redesign the ${ROOMS[room]} shown in image 0 as a photorealistic interior photograph.`,
    'Keep the architecture exactly as in image 0: the same walls, windows, doors, ceiling, floor area and camera perspective.',
    `Replace the furniture with elegant ${furniture}.`,
    extras.length ? `Include ${list(extras)}.` : '',
    'Premium, minimalist interior design, balanced natural light, realistic materials and fine detail.',
    'No people, no text, no logos, no watermark.',
  ]
    .filter(Boolean)
    .join(' ');
}
