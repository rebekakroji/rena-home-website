// Only verified business information, as provided by the business.
// Translatable text (opening hours, navigation labels) lives in src/i18n/translations.js.

// WhatsApp chat link in the official wa.me format: international number, digits only.
export const whatsappUrl = (tel) => `https://wa.me/${tel.replace(/\D/g, '')}`;

export const site = {
  name: 'RENA HOME',
  since: 1993,
  address: 'Tirane - Fushe Kruje km 14 Nikel',
  // `display` is shown to visitors; `tel` is the dialable form used in tel: links.
  phones: [
    { display: '+355 68 200 0776', tel: '+355682000776' },
    { display: '+355 68 803 8291', tel: '+355688038291' },
    { display: '+355 69 452 8877', tel: '+355694528877' },
  ],
  email: 'mobilerirena1993@gmail.com',
  instagramHandle: '@mobileri_rena',
  instagramUrl: 'https://www.instagram.com/mobileri_rena/',
  instagramDmUrl: 'https://ig.me/m/mobileri_rena',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('RENA HOME, Tirane - Fushe Kruje km 14, Nikel'),
  logo: '/images/logo/rena-logo.jpeg',
};

// Section ids double as URL anchors, so they stay the same in every language.
// Labels come from `t.nav[id]`.
export const navLinks = [
  { id: 'kryefaqja' },
  { id: 'koleksionet' },
  { id: 'projektet' },
  { id: 'rreth-nesh' },
  { id: 'kontakt' },
];
