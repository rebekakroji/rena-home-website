// Language-neutral collection data. All paths point to real files in /public/images.
// Dimensions are the intrinsic sizes of each file, used to reserve space and avoid layout shift.
// Names, taglines, descriptions and image descriptions live in src/i18n/translations.js
// (keyed by slug and file name) and are merged in by the LanguageProvider.

const img = (folder, file, w, h) => ({
  src: encodeURI(`/images/${folder}/${file}`),
  file,
  width: w,
  height: h,
});

export const collections = [
  {
    slug: 'dhoma-gjumi',
    cover: 1,
    images: [
      img('dhoma-gjumi', 'dhoma-gjumi-01.jpeg', 1032, 1280),
      img('dhoma-gjumi', 'dhoma-gjumi-02.jpeg', 1041, 1280),
      img('dhoma-gjumi', 'dhoma-gjumi-03.jpeg', 1032, 1280),
      img('dhoma-gjumi', 'dhoma-gjumi-04.jpeg', 999, 1280),
      img('dhoma-gjumi', 'dhoma-gjumi-05.jpeg', 1051, 1280),
    ],
  },
  {
    slug: 'kuzhina',
    cover: 2,
    images: [
      img('kuzhina', 'kitchen-new-01.jpeg', 1320, 1301),
      img('kuzhina', 'kitchen-new-02.jpeg', 1320, 1302),
      img('kuzhina', 'kitchen-new-03.jpeg', 1320, 1305),
      img('kuzhina', 'kitchen4.jpeg', 1179, 873),
      img('kuzhina', 'kitchen5.jpeg', 1179, 1142),
      img('kuzhina', 'kitchen5.1.jpeg', 1179, 1152),
      img('kuzhina', 'kitchen7.jpeg', 1179, 1075),
      img('kuzhina', 'kitchen8.jpeg', 1179, 1328),
    ],
  },
  {
    slug: 'sallone',
    cover: 2,
    images: [
      img('sallone', 'living1.jpeg', 1179, 996),
      img('sallone', 'living2.jpeg', 1179, 1161),
      img('sallone', 'kendi1.jpeg', 1179, 1344),
      img('sallone', 'opal.jpeg', 1156, 1487),
      img('sallone', 'orlando.jpeg', 1030, 1600),
      img('sallone', 'molivo.jpeg', 992, 1600),
      img('sallone', 'tavoline ngrenie.jpeg', 1179, 1051),
      img('sallone', 'tavoline ngrenie 2.jpeg', 1079, 1186),
      img('sallone', 'chair1.jpeg', 1179, 1333),
      img('sallone', 'chair2.jpeg', 1179, 1325),
      img('sallone', 'chair3.jpeg', 1157, 1315),
      img('sallone', 'chair4.jpeg', 1179, 1344),
      img('sallone', 'chair5.jpeg', 1179, 1330),
      img('sallone', 'chair6.jpeg', 1178, 1345),
    ],
  },
  {
    slug: 'garderoba',
    cover: 0,
    images: [
      img('garderoba', 'wardrobe-new-01.jpeg', 1222, 1600),
      img('garderoba', 'wardrobe-new-02.jpeg', 1220, 1600),
      img('garderoba', 'wardrobe-new-03.jpeg', 1312, 1600),
      img('garderoba', 'wardrobe-new-04.jpeg', 1222, 1600),
      img('garderoba', 'wardrobe-new-05.jpeg', 1222, 1600),
      img('garderoba', 'wardrobe-new-06.jpeg', 1224, 1600),
      img('garderoba', 'wardrobe-new-07.jpeg', 1236, 1600),
      img('garderoba', 'wardrobe-new-08.jpeg', 1302, 1600),
      img('garderoba', 'wardrobe-new-09.jpeg', 1100, 1600),
      img('garderoba', 'wardrobe2.jpeg', 1179, 1282),
    ],
  },
  {
    slug: 'projekte',
    cover: 2,
    images: [
      img('projects', 'projekt1.jpeg', 1179, 1548),
      img('projects', 'projekt2.jpeg', 1179, 1560),
      img('projects', 'projekt3.jpeg', 1179, 1553),
      img('projects', 'projekt4.jpeg', 1179, 1563),
      img('projects', 'projekt5.jpeg', 1179, 1553),
      img('projects', 'projekt6.jpeg', 1179, 1546),
    ],
  },
];

// Completed projects, shown as identical cards on their parent collection page
// ("Projekte të realizuara"). Each card opens its own full-screen gallery.
// `imagesFrom` reuses an existing collection's photos (and their descriptions) as-is.
// Texts live in src/i18n/translations.js under `projectGalleries`.
export const projectGalleries = [
  {
    slug: 'projekt-01',
    parent: 'projekte',
    number: 1,
    cover: 2,
    imagesFrom: 'projekte',
  },
  {
    slug: 'projekt-02',
    parent: 'projekte',
    number: 2,
    cover: 3,
    images: [
      img('projects', 'projekt-02-01.jpeg', 1024, 1280),
      img('projects', 'projekt-02-02.jpeg', 1024, 1280),
      img('projects', 'projekt-02-03.jpeg', 1024, 1280),
      img('projects', 'projekt-02-04.jpeg', 1024, 1280),
      img('projects', 'projekt-02-05.jpeg', 1024, 1280),
      img('projects', 'projekt-02-06.jpeg', 1024, 1280),
    ],
  },
];

export const coverOf =(collection) => collection.images[collection.cover];
