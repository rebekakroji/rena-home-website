// All user-facing text lives here, one dictionary per language.
// To change a text, edit it in both `sq` and `en` — the keys must stay identical.
// Headings with an italic accent are split into { before, em, after }.
// Values written as functions receive dynamic data (names, counts, years).

const sq = {
  meta: {
    title: 'RENA HOME — Mobilje dhe dizajn interieri në Fushë-Krujë',
    description:
      'RENA HOME — mobilje dhe dizajn interieri që nga viti 1993. Dhoma gjumi, kuzhina, sallone dhe garderoba të menduara me kujdes. Tirane - Fushe Kruje km 14 Nikel.',
  },

  skipLink: 'Kalo te përmbajtja',

  whatsapp: {
    label: 'Na kontaktoni në WhatsApp',
    chat: (number) => `Hap bisedën në WhatsApp me ${number}`,
  },

  site: {
    hours: 'Çdo ditë, 08:00–18:00',
  },

  nav: {
    kryefaqja: 'Kryefaqja',
    koleksionet: 'Koleksionet',
    projektet: 'Projektet',
    'rreth-nesh': 'Rreth nesh',
    kontakt: 'Kontakt',
  },

  header: {
    mainNav: 'Navigimi kryesor',
    mobileNav: 'Navigimi në celular',
    cta: 'Na kontaktoni',
    openMenu: 'Hap menunë',
    closeMenu: 'Mbyll menunë',
    language: 'Gjuha',
    languageNames: { sq: 'Shqip', en: 'Anglisht' },
  },

  logo: {
    aria: 'RENA HOME — Kryefaqja',
  },

  hero: {
    eyebrow: 'Mobileri & arredim i brendshëm',
    since: (year) => `që nga ${year}`,
    line1: 'Eleganca',
    line2: { before: 'fillon ', em: 'në shtëpi.' },
    lead: 'Mobilje të menduara për të krijuar ambiente që reflektojnë stilin dhe personalitetin tuaj.',
    ctaCollections: 'Eksploro koleksionet',
    ctaProjects: 'Shiko projektet',
    metaSince: 'Që nga',
    metaLocation: 'Vendndodhja',
    metaHours: 'Orari',
    insetCaption: 'Sallone',
    scroll: 'Lëviz poshtë',
    scrollAria: 'Lëviz te seksioni Rreth nesh',
  },

  about: {
    eyebrow: 'Rreth nesh',
    since: 'Që nga',
    title: { before: 'Mbi tri dekada përkushtim ndaj ', em: 'shtëpisë suaj', after: '.' },
    lead: (year) =>
      `Që nga viti ${year}, RENA HOME sjell mobilje dhe zgjidhje interieri ku cilësia, dizajni dhe vëmendja ndaj detajeve janë në qendër të çdo pune.`,
    body: 'Nga kuzhinat dhe dhomat e gjumit te sallonet dhe garderobat, çdo element mendohet që të përshtatet me hapësirën dhe me mënyrën si jetoni. Për ne, një ambient i bukur nuk është luks, por ndjesia e të qenit vërtet në shtëpi.',
    pillars: [
      {
        title: 'Cilësi',
        text: 'Materiale të përzgjedhura, punim profesional dhe garanci shumëvjeçare — për mobilje që i rezistojnë kohës.',
      },
      {
        title: 'Dizajn',
        text: 'Arredim i personalizuar që pasqyron stilin tuaj dhe shfrytëzon me zgjuarsi çdo hapësirë.',
      },
      {
        title: 'Detaje',
        text: 'Nga aksesorët te montimi përfundimtar, kujdesemi për çdo detaj që sjell rehati dhe përsos pamjen e ambientit tuaj.',
      },
    ],
  },

  collectionsSection: {
    eyebrow: 'Koleksionet',
    title: { before: 'Pesë hapësira, ', em: 'një filozofi', after: '.' },
    text: 'Zgjidhni një koleksion dhe zbuloni ambientet tona, nga qetësia e dhomës së gjumit deri te ngrohtësia e sallonit.',
  },

  card: {
    explore: 'Eksploro koleksionin',
    photos: (n) => `${n} fotografi`,
    aria: (name, n) => `${name} — eksploro koleksionin (${n} fotografi)`,
  },

  collectionPage: {
    docTitleMissing: 'Koleksioni nuk u gjet — RENA HOME',
    missing: 'Ky koleksion nuk u gjet.',
    back: 'Kthehu te koleksionet',
    crumbsAria: 'Gjurma e navigimit',
    crumbRoot: 'Koleksionet',
    number: 'Koleksioni',
    pagerAria: 'Koleksionet e tjera',
    prev: 'Koleksioni i mëparshëm',
    next: 'Koleksioni tjetër',
    projectsCount: (n) => `${n} projekte`,
    projectsAria: 'Projektet',
  },

  gallery: {
    listAria: (title) => `Fotografitë e koleksionit ${title}`,
    open: (i, n, alt) => `Hap fotografinë ${i} nga ${n}: ${alt}`,
  },

  lightbox: {
    aria: (title) => `Galeria: ${title}`,
    ariaDefault: 'Galeria e fotografive',
    close: 'Mbyll galerinë',
    prev: 'Fotografia e mëparshme',
    next: 'Fotografia tjetër',
  },

  projects: {
    eyebrow: 'Projektet',
    title: { before: 'Ambiente të realizuara, ', em: 'të jetuara çdo ditë', after: '.' },
    text: 'Një përzgjedhje fotografish nga projektet tona të realizuara, ku mobilja, materialet dhe ndriçimi punojnë së bashku si një e tërë.',
    // Short captions, in the same order as the photos of the "projekte" collection.
    captions: [
      'Ishull kuzhine dhe mur dollapësh',
      'Dru, travertin dhe dritë e butë',
      'Vitrinë e ndriçuar',
      'Banak me raft të ndriçuar',
      'Zona e ngrënies',
      'Detaj në travertin',
    ],
    viewFull: (alt) => `Shiko në ekran të plotë: ${alt}`,
    more: 'Hap galerinë e projekteve',
  },

  whyUs: {
    eyebrow: 'Pse RENA HOME',
    title: { before: 'Mobilje që ndërtohen ', em: 'me kujdes', after: ', për hapësira që jetohen.' },
    reasons: [
      {
        title: 'Përvojë që nga viti 1993',
        text: 'Mbi tri dekada punë na kanë mësuar se një shtëpi e mirë ndërtohet me durim, njohuri dhe respekt për materialin.',
      },
      {
        title: 'Kujdes ndaj detajeve',
        text: 'Nga përzgjedhja e materialeve te përfundimi i fundit, asnjë detaj nuk lihet pas dore.',
      },
      {
        title: 'Dizajn dhe funksionalitet',
        text: 'Çdo zgjidhje duhet të jetë e bukur për syrin dhe e lehtë për t’u jetuar, ditë pas dite.',
      },
      {
        title: 'Përkushtim ndaj çdo projekti',
        text: 'Çdo hapësirë është unike. E dëgjojmë, e kuptojmë dhe i përkushtohemi deri në fund.',
      },
    ],
  },

  contact: {
    eyebrow: 'Kontakt',
    title: { before: 'Le të krijojmë së bashku ', em: 'hapësirën tuaj', after: '.' },
    lead: 'Na vizitoni në showroom ose na shkruani. Do të jemi të lumtur t’ju ndihmojmë të gjeni zgjidhjen e duhur për shtëpinë tuaj.',
    address: 'Adresa',
    phone: 'Telefoni',
    email: 'Email',
    hours: 'Orari',
    instagram: 'Instagram',
    dm: 'Na shkruani në Instagram',
    maps: 'Hap në Google Maps',
    formTitle: 'Na dërgoni një mesazh',
    fields: {
      name: 'Emri dhe mbiemri',
      contact: 'Telefoni ose email-i',
      message: 'Mesazhi',
    },
    errors: {
      nameRequired: 'Ju lutemi shkruani emrin tuaj.',
      contactRequired: 'Ju lutemi shkruani numrin e telefonit ose email-in.',
      contactInvalid: 'Shkruani një numër telefoni ose email të vlefshëm.',
      messageShort: 'Mesazhi duhet të ketë të paktën 10 karaktere.',
    },
    submit: 'Dërgo mesazhin',
    note: 'Mesazhi dërgohet përmes Instagram-it. Të dhënat tuaja nuk ruhen në këtë faqe.',
    composed: ({ message, name, contact }) =>
      `Përshëndetje RENA HOME,\n\n${message}\n\n${name}\nKontakti: ${contact}`,
    thanks: (firstName) => `Faleminderit, ${firstName}.`,
    readyTitle: 'Mesazhi juaj është gati.',
    readyCopied: (handle) =>
      `E kopjuam mesazhin për ju. Hapni Instagram-in, ngjiteni dhe dërgojeni te ${handle}. Do t’ju përgjigjemi sa më shpejt.`,
    readyManual: (handle) =>
      `Kopjoni mesazhin më poshtë dhe dërgojeni te ${handle} në Instagram. Do t’ju përgjigjemi sa më shpejt.`,
    openInstagram: 'Hap Instagram',
    another: 'Shkruaj një mesazh tjetër',
  },

  footer: {
    brand: (year) =>
      `Mobilje dhe dizajn interieri që nga viti ${year}. Hapësira të menduara me kujdes, për stilin dhe personalitetin tuaj.`,
    navAria: 'Navigimi në fund të faqes',
    navHeading: 'Navigimi',
    collectionsHeading: 'Koleksionet',
    visitHeading: 'Na vizitoni',
    rights: 'Të gjitha të drejtat e rezervuara.',
    backToTop: 'Kthehu në krye ↑',
    call: 'Telefononi',
  },

  // Collection texts, keyed by slug. Image descriptions are keyed by file name.
  collections: {
    'dhoma-gjumi': {
      name: 'Dhoma gjumi',
      tagline: 'Qetësi e veshur me butësi',
      description:
        'Ambiente të qeta e të ngrohta, ku materialet e buta dhe linjat e pastra krijojnë ndjesinë e pushimit të vërtetë.',
      alts: {
        'dhoma-gjumi-01.jpeg':
          'Dollap i integruar në ngjyrë bezhë me pjesë qendrore xhami të ndriçuar, pranë një shtrati të veshur me stof',
        'dhoma-gjumi-02.jpeg':
          'Shtrat me kokë të veshur në gri përballë një muri me mermer dhe dru, me rafte të ndriçuara anash',
        'dhoma-gjumi-03.jpeg':
          'Tavolinë tualeti druri me pasqyrë të rrumbullakët të ndriçuar dhe mur televizori me ndriçim të integruar',
        'dhoma-gjumi-04.jpeg':
          'Garderobë me dyer xhami, rafte druri të ndriçuara dhe shtrat me mbulesë gri në plan të parë',
        'dhoma-gjumi-05.jpeg':
          'Dhomë gjumi me panele druri vertikale, llambë të varur dhe stol kadifeje jeshile në fund të shtratit',
      },
    },
    kuzhina: {
      name: 'Kuzhina',
      tagline: 'Zemra e shtëpisë, e menduar në çdo detaj',
      description:
        'Kuzhina funksionale dhe elegante, ku çdo dollap, sipërfaqe dhe ndriçim mendohet për përdorimin e përditshëm.',
      alts: {
        'kitchen-new-01.jpeg':
          'Kuzhinë në dru të çelët dhe bezhë me sfond mermeri, llambë të varura dhe tavolinë ngrënieje me karrige të veshura',
        'kitchen-new-02.jpeg':
          'Kolonë me furra të integruara dhe frigorifer vere, pranë dollapëve druri dhe sfondit me mermer të ndriçuar',
        'kitchen-new-03.jpeg':
          'Kuzhinë me banak mermeri, karrige bari të veshura, aspirator cilindrik dhe ndriçim i integruar nën dollapë',
        'kitchen4.jpeg': 'Kuzhinë — detaj i dollapëve',
        'kitchen5.jpeg': 'Kuzhinë — pamje nga ambienti',
        'kitchen5.1.jpeg': 'Kuzhinë — pamje nga një kënd tjetër',
        'kitchen7.jpeg': 'Kuzhinë në jeshile të errët mat me sfond mermeri dhe divan në plan të parë',
        'kitchen8.jpeg': 'Kuzhinë me dollapë në ngjyrë blu, dollapë të sipërm druri dhe tavolinë ngrënieje',
      },
    },
    sallone: {
      name: 'Sallone',
      tagline: 'Hapësira që mirëpresin',
      description:
        'Divanë, karrige dhe tavolina ngrënieje për ambiente ndenjeje që mirëpresin, frymëzojnë dhe zgjasin në kohë.',
      alts: {
        'living1.jpeg': 'Sallon me divan modular në ngjyrë krem, tavolina anësore druri dhe perde kafe',
        'living2.jpeg': 'Ambient i hapur me tavolinë druri, karrige kadifeje dhe kuzhinë në gri',
        'kendi1.jpeg': 'Sallon me divan modular në ngjyrë krem, kolltuk dhe tavolinë qendrore',
        'opal.jpeg': 'Divani Opal në stof ngjyrë konjaku me detaje lëkure',
        'orlando.jpeg': 'Divani Orlando në stof të teksturuar ngjyrë bezhë',
        'molivo.jpeg': 'Modeli Molivo',
        'tavoline ngrenie.jpeg': 'Tavolinë ngrënieje me karrige',
        'tavoline ngrenie 2.jpeg': 'Tavolinë ngrënieje — pamje tjetër',
        'chair1.jpeg': 'Karrige me ndenjëse dhe mbështetëse bouclé të bardhë dhe këmbë druri të errët',
        'chair2.jpeg': 'Karrige — model 2',
        'chair3.jpeg': 'Karrige — model 3',
        'chair4.jpeg': 'Karrige — model 4',
        'chair5.jpeg': 'Karrige — model 5',
        'chair6.jpeg': 'Karrige — model 6',
      },
    },
    garderoba: {
      name: 'Garderoba',
      tagline: 'Rend, dritë dhe estetikë',
      description:
        'Garderoba të organizuara me kujdes, që bashkojnë rendin, ndriçimin e integruar dhe estetikën e pastër.',
      alts: {
        'wardrobe-new-01.jpeg':
          'Dhomë-garderobë me dyer xhami në kornizë metalike, rafte të ndriçuara dhe sirtarë druri',
        'wardrobe-new-02.jpeg':
          'Korridor garderobe me dollapë xhami të ndriçuar në të dy anët dhe dysheme druri',
        'wardrobe-new-03.jpeg': 'Sistem garderobe i hapur me varëse, kuti me ndarje dhe sirtarë druri',
        'wardrobe-new-04.jpeg':
          'Vitrinë xhami me rafte të ndriçuara për çanta dhe këpucë, pranë një hyrjeje me varëse',
        'wardrobe-new-05.jpeg': 'Sistem garderobe i hapur me sirtarë të nxjerrë dhe organizues të brendshëm',
        'wardrobe-new-06.jpeg': 'Rafte me ndriçim të integruar dhe panele rimeso druri me teksturë',
        'wardrobe-new-07.jpeg': 'Mostër rimeso druri me teksturë në tone gri dhe të bardha',
        'wardrobe-new-08.jpeg':
          'Garderobë me profile metalike, rafte për çanta, sirtarë dhe ishull me ndarje për aksesorë',
        'wardrobe-new-09.jpeg': 'Mostra rimeso druri në tone të ndryshme, nga gri e çelët te kafe e errët',
        'wardrobe2.jpeg': 'Dhomë-garderobë me rafte të ndriçuara, sirtarë dhe dysheme druri',
      },
    },
    projekte: {
      name: 'Projekte të realizuara',
      tagline: 'Arkitekturë e brendshme e jetuar',
      description:
        'Një vështrim në ambientet e realizuara, ku mobilja dhe arkitektura e brendshme flasin të njëjtën gjuhë.',
      alts: {
        'projekt1.jpeg': 'Kuzhinë me ishull dhe mur dollapësh në dru të errët, me llambë të varur të zezë',
        'projekt2.jpeg': 'Ishull kuzhine me sipërfaqe travertini përpara një muri dollapësh druri',
        'projekt3.jpeg': 'Mur dollapësh druri me vitrinë të ndriçuar dhe tavolinë ngrënieje ovale',
        'projekt4.jpeg': 'Banak kuzhine me dollapë druri, sipërfaqe mermeri dhe raft të ndriçuar',
        'projekt5.jpeg': 'Zonë ngrënieje me tavolinë ovale travertini dhe karrige druri përballë dritareve',
        'projekt6.jpeg': 'Pamje nga lart e një tavoline travertini në dritën e mëngjesit',
      },
    },
  },

  // Project cards on the "Projekte të realizuara" page, keyed by slug.
  // Project names are kept in English in both languages by request.
  projectGalleries: {
    'projekt-01': {
      name: 'Timeless Elegance',
      tagline: 'Kuzhinë, vitrinë dhe zonë ngrënieje',
      cta: 'Hap galerinë',
      open: (name, n) => `Hap galerinë e projektit: ${name} (${n} fotografi)`,
    },
    'projekt-02': {
      name: 'Contemporary Harmony',
      tagline: 'Sallon, kuzhinë dhe zonë ngrënieje',
      cta: 'Hap galerinë',
      open: (name, n) => `Hap galerinë e projektit: ${name} (${n} fotografi)`,
      alts: {
        'projekt-02-01.jpeg':
          'Sallon me divan modular krem, kolltuk kadifeje jeshile dhe mur televizori me oxhak të integruar',
        'projekt-02-02.jpeg':
          'Zonë ngrënieje me llambë rrethore, rafte të ndriçuara dhe shkallë druri me xham, me kolltuqe në plan të parë',
        'projekt-02-03.jpeg':
          'Sallon me perde të gjata të ndriçuara, divan krem dhe tavolina të rrumbullakëta mermeri',
        'projekt-02-04.jpeg':
          'Ambient i hapur me divan modular, kuzhinë me banak dhe zonë ngrënieje pranë shkallëve',
        'projekt-02-05.jpeg':
          'Sallon me mur televizori, panele druri dhe kuzhinë me banak në sfond',
        'projekt-02-06.jpeg': 'Ambient i hapur — pamje e përgjithshme',
      },
    },
  },
};

const en = {
  meta: {
    title: 'RENA HOME — Furniture and Interior Design in Fushë-Krujë',
    description:
      'RENA HOME — furniture and interior design since 1993. Thoughtfully designed bedrooms, kitchens, living rooms and wardrobes. Tirane - Fushe Kruje km 14 Nikel.',
  },

  skipLink: 'Skip to content',

  whatsapp: {
    label: 'Contact us on WhatsApp',
    chat: (number) => `Open a WhatsApp chat with ${number}`,
  },

  site: {
    hours: 'Every day, 08:00–18:00',
  },

  nav: {
    kryefaqja: 'Home',
    koleksionet: 'Collections',
    projektet: 'Projects',
    'rreth-nesh': 'About',
    kontakt: 'Contact',
  },

  header: {
    mainNav: 'Main navigation',
    mobileNav: 'Mobile navigation',
    cta: 'Contact us',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    languageNames: { sq: 'Albanian', en: 'English' },
  },

  logo: {
    aria: 'RENA HOME — Home',
  },

  hero: {
    eyebrow: 'Furniture & interior design',
    since: (year) => `since ${year}`,
    line1: 'Elegance',
    line2: { before: 'begins ', em: 'at home.' },
    lead: 'Thoughtfully designed furniture that creates spaces reflecting your style and personality.',
    ctaCollections: 'Explore collections',
    ctaProjects: 'View projects',
    metaSince: 'Since',
    metaLocation: 'Location',
    metaHours: 'Hours',
    insetCaption: 'Living rooms',
    scroll: 'Scroll down',
    scrollAria: 'Scroll to the About section',
  },

  about: {
    eyebrow: 'About us',
    since: 'Since',
    title: { before: 'Over three decades of dedication to ', em: 'your home', after: '.' },
    lead: (year) =>
      `Since ${year}, RENA HOME has created furniture and interior solutions where quality, design and attention to detail are at the heart of everything we do.`,
    body: 'From kitchens and bedrooms to living rooms and wardrobes, every piece is designed to suit your space and the way you live. To us, a beautiful space is not a luxury — it is the feeling of truly being at home.',
    pillars: [
      {
        title: 'Quality',
        text: 'Carefully selected materials, professional craftsmanship and a multi-year warranty — for furniture that stands the test of time.',
      },
      {
        title: 'Design',
        text: 'Custom furnishing that reflects your style and makes smart use of every space.',
      },
      {
        title: 'Details',
        text: 'From accessories to final installation, we take care of every detail that brings comfort and perfects the look of your space.',
      },
    ],
  },

  collectionsSection: {
    eyebrow: 'Collections',
    title: { before: 'Five spaces, ', em: 'one philosophy', after: '.' },
    text: 'Choose a collection and discover our spaces, from the calm of the bedroom to the warmth of the living room.',
  },

  card: {
    explore: 'Explore the collection',
    photos: (n) => `${n} ${n === 1 ? 'photo' : 'photos'}`,
    aria: (name, n) => `${name} — explore the collection (${n} ${n === 1 ? 'photo' : 'photos'})`,
  },

  collectionPage: {
    docTitleMissing: 'Collection not found — RENA HOME',
    missing: 'This collection could not be found.',
    back: 'Back to collections',
    crumbsAria: 'Breadcrumb',
    crumbRoot: 'Collections',
    number: 'Collection',
    pagerAria: 'Other collections',
    prev: 'Previous collection',
    next: 'Next collection',
    projectsCount: (n) => `${n} ${n === 1 ? 'project' : 'projects'}`,
    projectsAria: 'Projects',
  },

  gallery: {
    listAria: (title) => `Photos from the ${title} collection`,
    open: (i, n, alt) => `Open photo ${i} of ${n}: ${alt}`,
  },

  lightbox: {
    aria: (title) => `Gallery: ${title}`,
    ariaDefault: 'Photo gallery',
    close: 'Close gallery',
    prev: 'Previous photo',
    next: 'Next photo',
  },

  projects: {
    eyebrow: 'Projects',
    title: { before: 'Completed spaces, ', em: 'lived in every day', after: '.' },
    text: 'A selection of photographs from our completed projects, where furniture, materials and lighting work together as one.',
    captions: [
      'Kitchen island and cabinet wall',
      'Wood, travertine and soft light',
      'Illuminated display cabinet',
      'Counter with an illuminated shelf',
      'The dining area',
      'Travertine detail',
    ],
    viewFull: (alt) => `View full screen: ${alt}`,
    more: 'Open the project gallery',
  },

  whyUs: {
    eyebrow: 'Why RENA HOME',
    title: { before: 'Furniture built ', em: 'with care', after: ', for spaces that are truly lived in.' },
    reasons: [
      {
        title: 'Experience since 1993',
        text: 'More than three decades of work have taught us that a good home is built with patience, knowledge and respect for the material.',
      },
      {
        title: 'Attention to detail',
        text: 'From the choice of materials to the final finish, no detail is overlooked.',
      },
      {
        title: 'Design and functionality',
        text: 'Every solution should be beautiful to look at and easy to live with, day after day.',
      },
      {
        title: 'Dedication to every project',
        text: 'Every space is unique. We listen, we understand and we stay committed to it until the very end.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contact',
    title: { before: 'Let’s create ', em: 'your space', after: ' together.' },
    lead: 'Visit our showroom or send us a message. We’ll be glad to help you find the right solution for your home.',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Opening hours',
    instagram: 'Instagram',
    dm: 'Message us on Instagram',
    maps: 'Open in Google Maps',
    formTitle: 'Send us a message',
    fields: {
      name: 'Full name',
      contact: 'Phone or email',
      message: 'Message',
    },
    errors: {
      nameRequired: 'Please enter your name.',
      contactRequired: 'Please enter your phone number or email.',
      contactInvalid: 'Please enter a valid phone number or email.',
      messageShort: 'Your message must be at least 10 characters long.',
    },
    submit: 'Send message',
    note: 'Your message is sent via Instagram. Your details are not stored on this website.',
    composed: ({ message, name, contact }) => `Hello RENA HOME,\n\n${message}\n\n${name}\nContact: ${contact}`,
    thanks: (firstName) => `Thank you, ${firstName}.`,
    readyTitle: 'Your message is ready.',
    readyCopied: (handle) =>
      `We’ve copied your message. Open Instagram, paste it and send it to ${handle}. We’ll get back to you as soon as possible.`,
    readyManual: (handle) =>
      `Copy the message below and send it to ${handle} on Instagram. We’ll get back to you as soon as possible.`,
    openInstagram: 'Open Instagram',
    another: 'Write another message',
  },

  footer: {
    brand: (year) =>
      `Furniture and interior design since ${year}. Thoughtfully designed spaces for your style and personality.`,
    navAria: 'Footer navigation',
    navHeading: 'Navigation',
    collectionsHeading: 'Collections',
    visitHeading: 'Visit us',
    rights: 'All rights reserved.',
    backToTop: 'Back to top ↑',
    call: 'Call',
  },

  collections: {
    'dhoma-gjumi': {
      name: 'Bedrooms',
      tagline: 'Calm, dressed in softness',
      description:
        'Calm, warm spaces where soft materials and clean lines create a feeling of true rest.',
      alts: {
        'dhoma-gjumi-01.jpeg':
          'Built-in beige wardrobe with an illuminated glass centre section, beside an upholstered bed',
        'dhoma-gjumi-02.jpeg':
          'Bed with a grey upholstered headboard against a marble and wood feature wall, with illuminated shelving',
        'dhoma-gjumi-03.jpeg':
          'Wooden dressing table with a round illuminated mirror and a TV wall with integrated lighting',
        'dhoma-gjumi-04.jpeg':
          'Glass-fronted wardrobe with illuminated wooden shelves and a bed with a grey throw in the foreground',
        'dhoma-gjumi-05.jpeg':
          'Bedroom with vertical wood panelling, a pendant lamp and a green velvet bench at the foot of the bed',
      },
    },
    kuzhina: {
      name: 'Kitchens',
      tagline: 'The heart of the home, considered in every detail',
      description:
        'Functional, elegant kitchens where every cabinet, surface and light is designed for everyday living.',
      alts: {
        'kitchen-new-01.jpeg':
          'Light wood and beige kitchen with a marble backsplash, pendant lights and a dining table with upholstered chairs',
        'kitchen-new-02.jpeg':
          'Tall unit with built-in ovens and a wine cooler beside wooden cabinets and a backlit marble backsplash',
        'kitchen-new-03.jpeg':
          'Kitchen with a marble breakfast bar, upholstered bar stools, a cylindrical hood and under-cabinet lighting',
        'kitchen4.jpeg': 'Kitchen — cabinet detail',
        'kitchen5.jpeg': 'Kitchen — view of the space',
        'kitchen5.1.jpeg': 'Kitchen — view from another angle',
        'kitchen7.jpeg': 'Matte dark green kitchen with a marble backsplash and a sofa in the foreground',
        'kitchen8.jpeg': 'Kitchen with blue cabinets, wooden upper cabinets and a dining table',
      },
    },
    sallone: {
      name: 'Living rooms',
      tagline: 'Spaces that welcome you',
      description:
        'Sofas, chairs and dining tables for living spaces that welcome, inspire and stand the test of time.',
      alts: {
        'living1.jpeg': 'Living room with a cream modular sofa, wooden side tables and brown curtains',
        'living2.jpeg': 'Open-plan space with a wooden table, velvet chairs and a grey kitchen',
        'kendi1.jpeg': 'Living room with a cream modular sofa, an armchair and a coffee table',
        'opal.jpeg': 'Opal sofa in cognac fabric with leather details',
        'orlando.jpeg': 'Orlando sofa in a beige textured fabric',
        'molivo.jpeg': 'Molivo model',
        'tavoline ngrenie.jpeg': 'Dining table with chairs',
        'tavoline ngrenie 2.jpeg': 'Dining table — another view',
        'chair1.jpeg': 'Chair with a white bouclé seat and backrest and dark wooden legs',
        'chair2.jpeg': 'Chair — model 2',
        'chair3.jpeg': 'Chair — model 3',
        'chair4.jpeg': 'Chair — model 4',
        'chair5.jpeg': 'Chair — model 5',
        'chair6.jpeg': 'Chair — model 6',
      },
    },
    garderoba: {
      name: 'Wardrobes',
      tagline: 'Order, light and aesthetics',
      description:
        'Carefully organised wardrobes that bring together order, integrated lighting and a clean aesthetic.',
      alts: {
        'wardrobe-new-01.jpeg':
          'Walk-in wardrobe with metal-framed glass doors, illuminated shelves and wooden drawers',
        'wardrobe-new-02.jpeg': 'Wardrobe corridor lined with illuminated glass cabinets and wooden flooring',
        'wardrobe-new-03.jpeg': 'Open wardrobe system with hanging rails, cubby shelving and wooden drawers',
        'wardrobe-new-04.jpeg':
          'Glass display cabinet with illuminated shelves for bags and shoes, beside an entryway with coat hooks',
        'wardrobe-new-05.jpeg': 'Open wardrobe system with pull-out drawers and internal organisers',
        'wardrobe-new-06.jpeg': 'Shelving with integrated lighting and textured burl wood veneer panels',
        'wardrobe-new-07.jpeg': 'Sample of textured wood veneer in grey and white tones',
        'wardrobe-new-08.jpeg':
          'Wardrobe with metal uprights, bag shelves, drawers and an island with accessory compartments',
        'wardrobe-new-09.jpeg': 'Wood veneer samples in a range of tones, from pale grey to dark brown',
        'wardrobe2.jpeg': 'Walk-in wardrobe with illuminated shelves, drawers and wooden flooring',
      },
    },
    projekte: {
      name: 'Completed projects',
      tagline: 'Interior architecture, lived in',
      description:
        'A look at our completed spaces, where furniture and interior architecture speak the same language.',
      alts: {
        'projekt1.jpeg': 'Kitchen with an island and a wall of dark wood cabinets, with a black pendant lamp',
        'projekt2.jpeg': 'Kitchen island with a travertine top in front of a wall of wooden cabinets',
        'projekt3.jpeg': 'Wall of wooden cabinets with an illuminated display cabinet and an oval dining table',
        'projekt4.jpeg': 'Kitchen counter with wooden cabinets, a marble top and an illuminated shelf',
        'projekt5.jpeg': 'Dining area with an oval travertine table and wooden chairs facing the windows',
        'projekt6.jpeg': 'Overhead view of a travertine table in the morning light',
      },
    },
  },

  projectGalleries: {
    'projekt-01': {
      name: 'Timeless Elegance',
      tagline: 'Kitchen, display cabinet and dining area',
      cta: 'Open the gallery',
      open: (name, n) => `Open the project gallery: ${name} (${n} ${n === 1 ? 'photo' : 'photos'})`,
    },
    'projekt-02': {
      name: 'Contemporary Harmony',
      tagline: 'Living room, kitchen and dining area',
      cta: 'Open the gallery',
      open: (name, n) => `Open the project gallery: ${name} (${n} ${n === 1 ? 'photo' : 'photos'})`,
      alts: {
        'projekt-02-01.jpeg':
          'Living room with a cream modular sofa, a green velvet armchair and a TV wall with a built-in fireplace',
        'projekt-02-02.jpeg':
          'Dining area with a ring chandelier, illuminated shelves and a wood-and-glass staircase, with armchairs in the foreground',
        'projekt-02-03.jpeg':
          'Living room with tall backlit curtains, a cream sofa and round marble coffee tables',
        'projekt-02-04.jpeg':
          'Open-plan space with a modular sofa, a kitchen with a breakfast bar and a dining area by the staircase',
        'projekt-02-05.jpeg':
          'Living room with a TV wall, wood panelling and a kitchen with a breakfast bar in the background',
        'projekt-02-06.jpeg': 'Open-plan space — overall view',
      },
    },
  },
};

export const translations = { sq, en };

export const LANGUAGES = [
  { code: 'sq', label: 'AL' },
  { code: 'en', label: 'EN' },
];

export const DEFAULT_LANG = 'sq';
