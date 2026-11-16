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
    dizajno: 'Dizajno',
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
    languageNames: { sq: 'Shqip', en: 'Anglisht', it: 'Italisht' },
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

  // DESIGN WITH RENA HOME (#/dizajno). The title stays in English in every language.
  designStudio: {
    docTitle: 'DESIGN WITH RENA HOME — RENA HOME',
    eyebrow: 'Studio dizajni',
    title: 'DESIGN WITH RENA HOME',
    subtitle: 'Transformoni hapësirën tuaj. Vizualizoni idetë tuaja.',
    intro:
      'Ngarkoni një foto të ambientit tuaj, zgjidhni stilin, ngjyrat dhe materialet që ju pëlqejnë dhe shikoni si mund ta transformojnë mobiljet RENA HOME. Më pas, ekipi ynë i kthen idetë tuaja në një projekt me porosi.',
    introPoints: ['Zgjidhni hapësirën', 'Ngarkoni një foto', 'Personalizoni stilin dhe materialet', 'Kërkoni një ofertë'],
    badge: 'Vizualizim me AI · së shpejti',
    badgeLive: 'Vizualizim me AI',
    start: 'Filloni dizajnin',
    stepsAria: 'Hapat e dizajnit',
    stepLabel: (n, total) => `Hapi ${n} nga ${total}`,
    steps: { room: 'Hapësira', upload: 'Fotoja', customize: 'Personalizimi', result: 'Dizajni juaj' },
    back: 'Kthehu',
    next: 'Vazhdo',
    restart: 'Fillo nga e para',
    notSelected: 'Pa zgjedhur',
    none: 'Asnjë',
    room: {
      title: 'Cilën hapësirë po dizajnoni?',
      text: 'Zgjidhni ambientin që dëshironi të transformoni.',
      options: { kitchen: 'Kuzhinë', living: 'Sallon', bedroom: 'Dhomë gjumi', wardrobe: 'Garderobë', other: 'Hapësirë tjetër' },
    },
    upload: {
      title: 'Ngarkoni një foto të hapësirës suaj',
      text: 'Një foto e ndriçuar mirë, e bërë nga përballë, jep rezultatin më të mirë.',
      privacy: 'Fotoja juaj mbetet në shfletuesin tuaj. Nuk ngarkohet dhe nuk ruhet askund.',
      privacyAi:
        'Fotoja mbetet në shfletuesin tuaj derisa të klikoni “Gjeneroni dizajnin tim”. Atëherë një kopje e zvogëluar (maks. 512 px, pa të dhëna vendndodhjeje) dërgohet te Cloudflare Workers AI për të krijuar dizajnin. RENA HOME nuk e ruan foton tuaj.',
      drop: 'Tërhiqni dhe lëshoni foton këtu',
      dropActive: 'Lëshojeni për ta ngarkuar',
      or: 'ose',
      browse: 'Zgjidhni një foto',
      formats: 'JPG, JPEG, PNG ose WEBP · deri në 15 MB',
      replace: 'Zëvendësoni',
      remove: 'Hiqni',
      previewAlt: 'Fotoja e ngarkuar e hapësirës suaj',
      errorType: 'Ju lutemi zgjidhni një foto JPG, JPEG, PNG ose WEBP.',
      errorSize: 'Kjo foto është më e madhe se 15 MB. Ju lutemi zgjidhni një më të vogël.',
      errorRead: 'Kjo foto nuk mund të hapet. Provoni një foto tjetër.',
    },
    customize: {
      title: 'Personalizoni dizajnin tuaj',
      style: 'Stili i interierit',
      color: 'Ngjyra e mobiljeve',
      material: 'Materiali',
      preferences: 'Preferenca shtesë',
      preferencesHint: 'Zgjidhni sa të doni.',
      styles: { modern: 'Modern', minimalist: 'Minimalist', luxury: 'Luksoz', scandinavian: 'Skandinav' },
      colors: { white: 'E bardhë', beige: 'Bezhë', grey: 'Gri', black: 'E zezë', brown: 'Kafe', wood: 'Dru natyral' },
      materials: { wood: 'Dru', mdf: 'MDF', marble: 'Mermer', matte: 'Mat', glossy: 'Me shkëlqim' },
      prefs: {
        lighting: 'Ndriçim LED i integruar',
        handleless: 'Fasada pa doreza',
        island: 'Ishull ose banak',
        storage: 'Më shumë hapësirë ruajtjeje',
        appliances: 'Pajisje të integruara',
        glass: 'Vitrina xhami',
        softclose: 'Sirtarë me mbyllje të butë',
        open: 'Rafte të hapura',
      },
      generate: 'Gjeneroni dizajnin tim',
      generating: 'Duke gjeneruar…',
      aiNotice: 'Fotoja do të dërgohet te Cloudflare Workers AI për përpunim.',
    },
    result: {
      title: 'Dizajni juaj',
      pendingTitle: 'Gjenerimi i dizajnit me AI vjen së shpejti',
      pendingText:
        'Vizualizimi me AI do të aktivizohet sapo të lidhet shërbimi ynë i gjenerimit të imazheve. Fotoja dhe zgjedhjet tuaja janë gati — kërkoni një ofertë dhe dizajnerët tanë do ta përgatisin propozimin tuaj personalisht.',
      errorTitle: 'Dizajni nuk mund të gjenerohej',
      errorText: 'Provoni përsëri pas pak, ose kërkoni një ofertë dhe ekipi ynë do t’ju ndihmojë drejtpërdrejt.',
      generatedAlt: 'Dizajn i gjeneruar me AI për hapësirën tuaj',
      download: 'Shkarkoni dizajnin',
      downloadHint: 'Shkarkimi bëhet i mundur pasi të gjenerohet dizajni.',
      quote: 'Kërkoni një ofertë',
      quoteChoose: 'Zgjidhni një numër WhatsApp',
      quoteHint: 'Zgjedhjet tuaja shtohen automatikisht në mesazh. Foton e ambientit mund ta dërgoni në bisedë.',
      edit: 'Ndryshoni zgjedhjet',
      tryAgain: 'Provoni përsëri',
    },
    quoteMessage: ({ room, style, color, material, preferences }) =>
      `Përshëndetje RENA HOME,\n\nDëshiroj një ofertë për një dizajn me këto preferenca (DESIGN WITH RENA HOME):\n• Hapësira: ${room}\n• Stili: ${style}\n• Ngjyra: ${color}\n• Materiali: ${material}\n• Preferencat: ${preferences}\n\nDo t’ju dërgoj një foto të ambientit në këtë bisedë.`,
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
    dizajno: 'Design',
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
    languageNames: { sq: 'Albanian', en: 'English', it: 'Italian' },
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

  designStudio: {
    docTitle: 'DESIGN WITH RENA HOME — RENA HOME',
    eyebrow: 'Design studio',
    title: 'DESIGN WITH RENA HOME',
    subtitle: 'Transform your space. Visualize your ideas.',
    intro:
      'Upload a photo of your room, choose the style, colours and materials you love, and see how RENA HOME furniture could transform it. Our team then turns your ideas into a made-to-measure design.',
    introPoints: ['Choose your space', 'Upload a photo', 'Personalise style and materials', 'Request a quote'],
    badge: 'AI visualisation · coming soon',
    badgeLive: 'AI visualisation',
    start: 'Start designing',
    stepsAria: 'Design steps',
    stepLabel: (n, total) => `Step ${n} of ${total}`,
    steps: { room: 'Space', upload: 'Photo', customize: 'Customize', result: 'Your design' },
    back: 'Back',
    next: 'Continue',
    restart: 'Start over',
    notSelected: 'Not selected',
    none: 'None',
    room: {
      title: 'Which space are you designing?',
      text: 'Choose the room you would like to transform.',
      options: { kitchen: 'Kitchen', living: 'Living room', bedroom: 'Bedroom', wardrobe: 'Wardrobe', other: 'Other space' },
    },
    upload: {
      title: 'Upload a photo of your space',
      text: 'A well-lit photo taken straight on gives the best result.',
      privacy: 'Your photo stays in your browser. It is not uploaded or stored anywhere.',
      privacyAi:
        'Your photo stays in your browser until you click “Generate my design”. A reduced copy (max. 512 px, without location data) is then sent to Cloudflare Workers AI to create your design. RENA HOME does not store your photo.',
      drop: 'Drag and drop your photo here',
      dropActive: 'Release to upload',
      or: 'or',
      browse: 'Choose a photo',
      formats: 'JPG, JPEG, PNG or WEBP · up to 15 MB',
      replace: 'Replace',
      remove: 'Remove',
      previewAlt: 'Uploaded photo of your space',
      errorType: 'Please choose a JPG, JPEG, PNG or WEBP image.',
      errorSize: 'This photo is larger than 15 MB. Please choose a smaller one.',
      errorRead: 'This image could not be opened. Please try another photo.',
    },
    customize: {
      title: 'Customize your design',
      style: 'Interior style',
      color: 'Furniture colour',
      material: 'Material',
      preferences: 'Additional preferences',
      preferencesHint: 'Select as many as you like.',
      styles: { modern: 'Modern', minimalist: 'Minimalist', luxury: 'Luxury', scandinavian: 'Scandinavian' },
      colors: { white: 'White', beige: 'Beige', grey: 'Grey', black: 'Black', brown: 'Brown', wood: 'Natural wood' },
      materials: { wood: 'Wood', mdf: 'MDF', marble: 'Marble', matte: 'Matte', glossy: 'Glossy' },
      prefs: {
        lighting: 'Integrated LED lighting',
        handleless: 'Handleless fronts',
        island: 'Island or peninsula',
        storage: 'Extra storage',
        appliances: 'Built-in appliances',
        glass: 'Glass display units',
        softclose: 'Soft-close drawers',
        open: 'Open shelving',
      },
      generate: 'Generate my design',
      generating: 'Generating…',
      aiNotice: 'Your photo will be sent to Cloudflare Workers AI for processing.',
    },
    result: {
      title: 'Your design',
      pendingTitle: 'AI design generation is coming soon',
      pendingText:
        'The AI visualisation will be activated once our image-generation service is connected. Your photo and selections are ready — request a quote and our designers will prepare your proposal personally.',
      errorTitle: 'The design could not be generated',
      errorText: 'Please try again in a moment, or request a quote and our team will help you directly.',
      generatedAlt: 'AI-generated design of your space',
      download: 'Download design',
      downloadHint: 'Downloading becomes available once a design has been generated.',
      quote: 'Request a quote',
      quoteChoose: 'Choose a WhatsApp number',
      quoteHint: 'Your selections are added to the message automatically. You can send your room photo in the chat.',
      edit: 'Edit selections',
      tryAgain: 'Try again',
    },
    quoteMessage: ({ room, style, color, material, preferences }) =>
      `Hello RENA HOME,\n\nI would like a quote for a design with these preferences (DESIGN WITH RENA HOME):\n• Space: ${room}\n• Style: ${style}\n• Colour: ${color}\n• Material: ${material}\n• Preferences: ${preferences}\n\nI will send a photo of my space in this chat.`,
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

// Italian. Addresses visitors with the polite plural ("voi"), matching the Albanian "ju/juaj".
const it = {
  meta: {
    title: 'RENA HOME — Arredamento e interior design a Fushë-Krujë',
    description:
      'RENA HOME — arredamento e interior design dal 1993. Camere da letto, cucine, soggiorni e cabine armadio progettati con cura. Tirane - Fushe Kruje km 14 Nikel.',
  },

  skipLink: 'Vai al contenuto',

  whatsapp: {
    label: 'Contattateci su WhatsApp',
    chat: (number) => `Apri una chat WhatsApp con ${number}`,
  },

  site: {
    hours: 'Tutti i giorni, 08:00–18:00',
  },

  nav: {
    kryefaqja: 'Home',
    koleksionet: 'Collezioni',
    projektet: 'Progetti',
    dizajno: 'Progetta',
    'rreth-nesh': 'Chi siamo',
    kontakt: 'Contatti',
  },

  header: {
    mainNav: 'Navigazione principale',
    mobileNav: 'Navigazione mobile',
    cta: 'Contattateci',
    openMenu: 'Apri il menu',
    closeMenu: 'Chiudi il menu',
    language: 'Lingua',
    languageNames: { sq: 'Albanese', en: 'Inglese', it: 'Italiano' },
  },

  logo: {
    aria: 'RENA HOME — Home',
  },

  hero: {
    eyebrow: 'Arredamento & interior design',
    since: (year) => `dal ${year}`,
    line1: 'L’eleganza',
    line2: { before: 'inizia ', em: 'a casa.' },
    lead: 'Arredi pensati per creare ambienti che rispecchiano il vostro stile e la vostra personalità.',
    ctaCollections: 'Scopri le collezioni',
    ctaProjects: 'Guarda i progetti',
    metaSince: 'Dal',
    metaLocation: 'Sede',
    metaHours: 'Orari',
    insetCaption: 'Soggiorni',
    scroll: 'Scorri',
    scrollAria: 'Vai alla sezione Chi siamo',
  },

  about: {
    eyebrow: 'Chi siamo',
    since: 'Dal',
    title: { before: 'Oltre trent’anni di dedizione alla ', em: 'vostra casa', after: '.' },
    lead: (year) =>
      `Dal ${year}, RENA HOME realizza arredi e soluzioni d’interni in cui qualità, design e cura dei dettagli sono al centro di ogni progetto.`,
    body: 'Dalle cucine alle camere da letto, dai soggiorni alle cabine armadio, ogni elemento è pensato per adattarsi al vostro spazio e al vostro modo di vivere. Per noi un ambiente bello non è un lusso, ma la sensazione di sentirsi davvero a casa.',
    pillars: [
      {
        title: 'Qualità',
        text: 'Materiali selezionati, lavorazione professionale e garanzia pluriennale — per arredi che resistono nel tempo.',
      },
      {
        title: 'Design',
        text: 'Arredamento su misura che rispecchia il vostro stile e valorizza con intelligenza ogni spazio.',
      },
      {
        title: 'Dettagli',
        text: 'Dagli accessori al montaggio finale, curiamo ogni dettaglio che porta comfort e perfeziona l’aspetto dei vostri ambienti.',
      },
    ],
  },

  collectionsSection: {
    eyebrow: 'Collezioni',
    title: { before: 'Cinque spazi, ', em: 'un’unica filosofia', after: '.' },
    text: 'Scegliete una collezione e scoprite i nostri ambienti, dalla quiete della camera da letto al calore del soggiorno.',
  },

  card: {
    explore: 'Scopri la collezione',
    photos: (n) => `${n} foto`,
    aria: (name, n) => `${name} — scopri la collezione (${n} foto)`,
  },

  collectionPage: {
    docTitleMissing: 'Collezione non trovata — RENA HOME',
    missing: 'Questa collezione non è stata trovata.',
    back: 'Torna alle collezioni',
    crumbsAria: 'Percorso di navigazione',
    crumbRoot: 'Collezioni',
    number: 'Collezione',
    pagerAria: 'Altre collezioni',
    prev: 'Collezione precedente',
    next: 'Collezione successiva',
    projectsCount: (n) => `${n} ${n === 1 ? 'progetto' : 'progetti'}`,
    projectsAria: 'Progetti',
  },

  gallery: {
    listAria: (title) => `Foto della collezione ${title}`,
    open: (i, n, alt) => `Apri la foto ${i} di ${n}: ${alt}`,
  },

  lightbox: {
    aria: (title) => `Galleria: ${title}`,
    ariaDefault: 'Galleria fotografica',
    close: 'Chiudi la galleria',
    prev: 'Foto precedente',
    next: 'Foto successiva',
  },

  projects: {
    eyebrow: 'Progetti',
    title: { before: 'Ambienti realizzati, ', em: 'vissuti ogni giorno', after: '.' },
    text: 'Una selezione di immagini dei nostri progetti realizzati, in cui arredi, materiali e illuminazione dialogano in perfetta armonia.',
    // Short captions, in the same order as the photos of the "projekte" collection.
    captions: [
      'Isola e parete attrezzata',
      'Legno, travertino e luce soffusa',
      'Vetrina illuminata',
      'Bancone con mensola illuminata',
      'La zona pranzo',
      'Dettaglio in travertino',
    ],
    viewFull: (alt) => `Visualizza a schermo intero: ${alt}`,
    more: 'Apri la galleria dei progetti',
  },

  whyUs: {
    eyebrow: 'Perché RENA HOME',
    title: { before: 'Arredi realizzati ', em: 'con cura', after: ', per spazi da vivere davvero.' },
    reasons: [
      {
        title: 'Esperienza dal 1993',
        text: 'Oltre trent’anni di lavoro ci hanno insegnato che una bella casa si costruisce con pazienza, competenza e rispetto per la materia.',
      },
      {
        title: 'Cura dei dettagli',
        text: 'Dalla scelta dei materiali alla rifinitura finale, nessun dettaglio è lasciato al caso.',
      },
      {
        title: 'Design e funzionalità',
        text: 'Ogni soluzione deve essere bella da vedere e semplice da vivere, giorno dopo giorno.',
      },
      {
        title: 'Dedizione a ogni progetto',
        text: 'Ogni spazio è unico. Ascoltiamo, comprendiamo e seguiamo ogni progetto con dedizione fino alla fine.',
      },
    ],
  },

  contact: {
    eyebrow: 'Contatti',
    title: { before: 'Creiamo insieme ', em: 'il vostro spazio', after: '.' },
    lead: 'Venite a trovarci nel nostro showroom o scriveteci. Saremo lieti di aiutarvi a trovare la soluzione giusta per la vostra casa.',
    address: 'Indirizzo',
    phone: 'Telefono',
    email: 'Email',
    hours: 'Orari di apertura',
    instagram: 'Instagram',
    dm: 'Scriveteci su Instagram',
    maps: 'Apri in Google Maps',
    formTitle: 'Inviateci un messaggio',
    fields: {
      name: 'Nome e cognome',
      contact: 'Telefono o email',
      message: 'Messaggio',
    },
    errors: {
      nameRequired: 'Inserite il vostro nome.',
      contactRequired: 'Inserite il vostro numero di telefono o la vostra email.',
      contactInvalid: 'Inserite un numero di telefono o un’email validi.',
      messageShort: 'Il messaggio deve contenere almeno 10 caratteri.',
    },
    submit: 'Invia messaggio',
    note: 'Il messaggio viene inviato tramite Instagram. I vostri dati non vengono salvati su questo sito.',
    composed: ({ message, name, contact }) => `Buongiorno RENA HOME,\n\n${message}\n\n${name}\nContatto: ${contact}`,
    thanks: (firstName) => `Grazie, ${firstName}.`,
    readyTitle: 'Il vostro messaggio è pronto.',
    readyCopied: (handle) =>
      `Abbiamo copiato il vostro messaggio. Aprite Instagram, incollatelo e inviatelo a ${handle}. Vi risponderemo il prima possibile.`,
    readyManual: (handle) =>
      `Copiate il messaggio qui sotto e inviatelo a ${handle} su Instagram. Vi risponderemo il prima possibile.`,
    openInstagram: 'Apri Instagram',
    another: 'Scrivi un altro messaggio',
  },

  footer: {
    brand: (year) =>
      `Arredamento e interior design dal ${year}. Spazi progettati con cura, per il vostro stile e la vostra personalità.`,
    navAria: 'Navigazione a piè di pagina',
    navHeading: 'Navigazione',
    collectionsHeading: 'Collezioni',
    visitHeading: 'Venite a trovarci',
    rights: 'Tutti i diritti riservati.',
    backToTop: 'Torna su ↑',
    call: 'Chiama',
  },

  designStudio: {
    docTitle: 'DESIGN WITH RENA HOME — RENA HOME',
    eyebrow: 'Design studio',
    title: 'DESIGN WITH RENA HOME',
    subtitle: 'Trasformate il vostro spazio. Visualizzate le vostre idee.',
    intro:
      'Caricate una foto del vostro ambiente, scegliete lo stile, i colori e i materiali che preferite e scoprite come gli arredi RENA HOME potrebbero trasformarlo. Il nostro team trasformerà poi le vostre idee in un progetto su misura.',
    introPoints: ['Scegliete lo spazio', 'Caricate una foto', 'Personalizzate stile e materiali', 'Richiedete un preventivo'],
    badge: 'Visualizzazione con IA · in arrivo',
    badgeLive: 'Visualizzazione con IA',
    start: 'Iniziate a progettare',
    stepsAria: 'Fasi del progetto',
    stepLabel: (n, total) => `Fase ${n} di ${total}`,
    steps: { room: 'Spazio', upload: 'Foto', customize: 'Personalizza', result: 'Il vostro progetto' },
    back: 'Indietro',
    next: 'Continua',
    restart: 'Ricomincia',
    notSelected: 'Non selezionato',
    none: 'Nessuna',
    room: {
      title: 'Quale spazio state progettando?',
      text: 'Scegliete l’ambiente che desiderate trasformare.',
      options: { kitchen: 'Cucina', living: 'Soggiorno', bedroom: 'Camera da letto', wardrobe: 'Cabina armadio', other: 'Altro spazio' },
    },
    upload: {
      title: 'Caricate una foto del vostro spazio',
      text: 'Una foto ben illuminata, scattata frontalmente, offre il risultato migliore.',
      privacy: 'La vostra foto resta nel vostro browser. Non viene caricata né salvata da nessuna parte.',
      privacyAi:
        'La foto resta nel vostro browser finché non cliccate su “Genera il mio progetto”. A quel punto una copia ridotta (max. 512 px, senza dati di posizione) viene inviata a Cloudflare Workers AI per creare il progetto. RENA HOME non conserva la vostra foto.',
      drop: 'Trascinate qui la vostra foto',
      dropActive: 'Rilasciate per caricare',
      or: 'oppure',
      browse: 'Scegliete una foto',
      formats: 'JPG, JPEG, PNG o WEBP · fino a 15 MB',
      replace: 'Sostituisci',
      remove: 'Rimuovi',
      previewAlt: 'Foto caricata del vostro spazio',
      errorType: 'Scegliete un’immagine JPG, JPEG, PNG o WEBP.',
      errorSize: 'Questa foto supera i 15 MB. Sceglietene una più leggera.',
      errorRead: 'Impossibile aprire questa immagine. Provate con un’altra foto.',
    },
    customize: {
      title: 'Personalizzate il vostro progetto',
      style: 'Stile d’interni',
      color: 'Colore degli arredi',
      material: 'Materiale',
      preferences: 'Preferenze aggiuntive',
      preferencesHint: 'Selezionate tutte quelle che desiderate.',
      styles: { modern: 'Moderno', minimalist: 'Minimalista', luxury: 'Lusso', scandinavian: 'Scandinavo' },
      colors: { white: 'Bianco', beige: 'Beige', grey: 'Grigio', black: 'Nero', brown: 'Marrone', wood: 'Legno naturale' },
      materials: { wood: 'Legno', mdf: 'MDF', marble: 'Marmo', matte: 'Opaco', glossy: 'Lucido' },
      prefs: {
        lighting: 'Illuminazione LED integrata',
        handleless: 'Ante senza maniglie',
        island: 'Isola o penisola',
        storage: 'Più spazio contenitivo',
        appliances: 'Elettrodomestici da incasso',
        glass: 'Vetrine',
        softclose: 'Cassetti con chiusura ammortizzata',
        open: 'Mensole a giorno',
      },
      generate: 'Genera il mio progetto',
      generating: 'Generazione in corso…',
      aiNotice: 'La foto verrà inviata a Cloudflare Workers AI per l’elaborazione.',
    },
    result: {
      title: 'Il vostro progetto',
      pendingTitle: 'La generazione del progetto con l’IA arriverà a breve',
      pendingText:
        'La visualizzazione con l’IA sarà attivata non appena verrà collegato il nostro servizio di generazione delle immagini. La vostra foto e le vostre scelte sono pronte: richiedete un preventivo e i nostri designer prepareranno personalmente la vostra proposta.',
      errorTitle: 'Non è stato possibile generare il progetto',
      errorText: 'Riprovate tra poco, oppure richiedete un preventivo e il nostro team vi aiuterà direttamente.',
      generatedAlt: 'Progetto del vostro spazio generato con l’IA',
      download: 'Scarica il progetto',
      downloadHint: 'Il download sarà disponibile dopo la generazione del progetto.',
      quote: 'Richiedi un preventivo',
      quoteChoose: 'Scegliete un numero WhatsApp',
      quoteHint: 'Le vostre scelte vengono aggiunte automaticamente al messaggio. Potete inviare la foto dell’ambiente nella chat.',
      edit: 'Modifica le scelte',
      tryAgain: 'Riprova',
    },
    quoteMessage: ({ room, style, color, material, preferences }) =>
      `Buongiorno RENA HOME,\n\nvorrei un preventivo per un progetto con queste preferenze (DESIGN WITH RENA HOME):\n• Spazio: ${room}\n• Stile: ${style}\n• Colore: ${color}\n• Materiale: ${material}\n• Preferenze: ${preferences}\n\nInvierò una foto del mio ambiente in questa chat.`,
  },

  collections: {
    'dhoma-gjumi': {
      name: 'Camere da letto',
      tagline: 'Quiete avvolta nella morbidezza',
      description:
        'Ambienti quieti e accoglienti, dove materiali morbidi e linee pulite creano una sensazione di vero riposo.',
      alts: {
        'dhoma-gjumi-01.jpeg':
          'Armadio a incasso beige con vano centrale in vetro illuminato, accanto a un letto imbottito',
        'dhoma-gjumi-02.jpeg':
          'Letto con testiera imbottita grigia davanti a una parete in marmo e legno, con mensole illuminate',
        'dhoma-gjumi-03.jpeg':
          'Toeletta in legno con specchio rotondo illuminato e parete TV con illuminazione integrata',
        'dhoma-gjumi-04.jpeg':
          'Armadio con ante in vetro e ripiani in legno illuminati, con un letto e un plaid grigio in primo piano',
        'dhoma-gjumi-05.jpeg':
          'Camera da letto con boiserie a listelli di legno, lampada a sospensione e panca in velluto verde ai piedi del letto',
      },
    },
    kuzhina: {
      name: 'Cucine',
      tagline: 'Il cuore della casa, pensato in ogni dettaglio',
      description:
        'Cucine funzionali ed eleganti, in cui ogni mobile, superficie e punto luce è pensato per la vita di tutti i giorni.',
      alts: {
        'kitchen-new-01.jpeg':
          'Cucina in legno chiaro e beige con schienale in marmo, lampade a sospensione e tavolo da pranzo con sedie imbottite',
        'kitchen-new-02.jpeg':
          'Colonna con forni da incasso e cantinetta per il vino, accanto a mobili in legno e a uno schienale in marmo retroilluminato',
        'kitchen-new-03.jpeg':
          'Cucina con penisola in marmo, sgabelli imbottiti, cappa cilindrica e illuminazione sotto i pensili',
        'kitchen4.jpeg': 'Cucina — dettaglio dei mobili',
        'kitchen5.jpeg': 'Cucina — vista dell’ambiente',
        'kitchen5.1.jpeg': 'Cucina — vista da un’altra angolazione',
        'kitchen7.jpeg': 'Cucina verde scuro opaco con schienale in marmo e divano in primo piano',
        'kitchen8.jpeg': 'Cucina con mobili blu, pensili in legno e tavolo da pranzo',
      },
    },
    sallone: {
      name: 'Soggiorni',
      tagline: 'Spazi che accolgono',
      description:
        'Divani, sedie e tavoli da pranzo per zone giorno che accolgono, ispirano e resistono nel tempo.',
      alts: {
        'living1.jpeg': 'Soggiorno con divano componibile color crema, tavolini in legno e tende marroni',
        'living2.jpeg': 'Open space con tavolo in legno, sedie in velluto e cucina grigia',
        'kendi1.jpeg': 'Soggiorno con divano componibile color crema, poltrona e tavolino',
        'opal.jpeg': 'Divano Opal in tessuto color cognac con dettagli in pelle',
        'orlando.jpeg': 'Divano Orlando in tessuto materico beige',
        'molivo.jpeg': 'Modello Molivo',
        'tavoline ngrenie.jpeg': 'Tavolo da pranzo con sedie',
        'tavoline ngrenie 2.jpeg': 'Tavolo da pranzo — un’altra vista',
        'chair1.jpeg': 'Sedia con seduta e schienale in bouclé bianco e gambe in legno scuro',
        'chair2.jpeg': 'Sedia — modello 2',
        'chair3.jpeg': 'Sedia — modello 3',
        'chair4.jpeg': 'Sedia — modello 4',
        'chair5.jpeg': 'Sedia — modello 5',
        'chair6.jpeg': 'Sedia — modello 6',
      },
    },
    garderoba: {
      name: 'Cabine armadio',
      tagline: 'Ordine, luce ed estetica',
      description:
        'Cabine armadio organizzate con cura, che uniscono ordine, illuminazione integrata ed estetica essenziale.',
      alts: {
        'wardrobe-new-01.jpeg':
          'Cabina armadio con ante in vetro e telaio metallico, ripiani illuminati e cassetti in legno',
        'wardrobe-new-02.jpeg':
          'Corridoio della cabina armadio con vetrine illuminate su entrambi i lati e pavimento in legno',
        'wardrobe-new-03.jpeg': 'Sistema guardaroba a giorno con barre appendiabiti, vani a giorno e cassetti in legno',
        'wardrobe-new-04.jpeg':
          'Vetrina con ripiani illuminati per borse e scarpe, accanto a un ingresso con appendiabiti',
        'wardrobe-new-05.jpeg': 'Sistema guardaroba a giorno con cassetti estraibili e organizer interni',
        'wardrobe-new-06.jpeg': 'Mensole con illuminazione integrata e pannelli impiallacciati in radica materica',
        'wardrobe-new-07.jpeg': 'Campione di impiallacciatura in legno materico nei toni del grigio e del bianco',
        'wardrobe-new-08.jpeg':
          'Cabina armadio con montanti metallici, ripiani per borse, cassetti e isola con scomparti per accessori',
        'wardrobe-new-09.jpeg':
          'Campioni di impiallacciatura in legno in diverse tonalità, dal grigio chiaro al marrone scuro',
        'wardrobe2.jpeg': 'Cabina armadio con ripiani illuminati, cassetti e pavimento in legno',
      },
    },
    projekte: {
      name: 'Progetti realizzati',
      tagline: 'Architettura d’interni, vissuta',
      description:
        'Uno sguardo agli ambienti che abbiamo realizzato, dove arredo e architettura d’interni parlano la stessa lingua.',
      alts: {
        'projekt1.jpeg': 'Cucina con isola e parete di mobili in legno scuro, con lampada a sospensione nera',
        'projekt2.jpeg': 'Isola da cucina con piano in travertino davanti a una parete di mobili in legno',
        'projekt3.jpeg': 'Parete di mobili in legno con vetrina illuminata e tavolo da pranzo ovale',
        'projekt4.jpeg': 'Bancone da cucina con mobili in legno, piano in marmo e mensola illuminata',
        'projekt5.jpeg': 'Zona pranzo con tavolo ovale in travertino e sedie in legno di fronte alle finestre',
        'projekt6.jpeg': 'Vista dall’alto di un tavolo in travertino nella luce del mattino',
      },
    },
  },

  projectGalleries: {
    'projekt-01': {
      name: 'Timeless Elegance',
      tagline: 'Cucina, vetrina e zona pranzo',
      cta: 'Apri la galleria',
      open: (name, n) => `Apri la galleria del progetto: ${name} (${n} foto)`,
    },
    'projekt-02': {
      name: 'Contemporary Harmony',
      tagline: 'Soggiorno, cucina e zona pranzo',
      cta: 'Apri la galleria',
      open: (name, n) => `Apri la galleria del progetto: ${name} (${n} foto)`,
      alts: {
        'projekt-02-01.jpeg':
          'Soggiorno con divano componibile color crema, poltrona in velluto verde e parete TV con camino integrato',
        'projekt-02-02.jpeg':
          'Zona pranzo con lampadario ad anelli, mensole illuminate e scala in legno e vetro, con poltrone in primo piano',
        'projekt-02-03.jpeg':
          'Soggiorno con lunghe tende retroilluminate, divano color crema e tavolini rotondi in marmo',
        'projekt-02-04.jpeg':
          'Open space con divano componibile, cucina con penisola e zona pranzo accanto alla scala',
        'projekt-02-05.jpeg':
          'Soggiorno con parete TV, rivestimento in legno e cucina con penisola sullo sfondo',
        'projekt-02-06.jpeg': 'Open space — vista d’insieme',
      },
    },
  },
};

export const translations = { sq, en, it };

export const LANGUAGES = [
  { code: 'sq', label: 'AL' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
];

export const DEFAULT_LANG = 'sq';
