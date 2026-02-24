export interface Apartment {
  id: string;
  name: string;
  size: string;
  beds: string;
  description: string;
  amenities: string[];
  price: string;
  images: string[];
}

export const apartments: Apartment[] = [
  {
    id: "alpine-suite",
    name: "Apartment pr Fejtnǝ",
    size: "45 m²",
    beds: "1 Double, 1 Sofa bed",
    description: "Experience the ultimate alpine getaway in our spacious Apartment pr Fejtnǝ. This beautifully designed apartment combines modern comfort with traditional mountain charm. Enjoy breathtaking views of the Julian Alps from your private balcony. The suite features a fully equipped kitchen, a cozy living area with a sofa bed, and a luxurious double bedroom.",
    amenities: ["Kitchen", "Balcony", "Free WiFi", "Mountain View", "TV", "Coffee Machine", "Hairdryer"],
    price: "€120 - €150 / night",
    images: [
      "https://picsum.photos/seed/apt1-1/1200/800",
      "https://picsum.photos/seed/apt1-2/1200/800",
      "https://picsum.photos/seed/apt1-3/1200/800"
    ]
  },
  {
    id: "valley-view-studio",
    name: "Apartment Flajs",
    size: "30 m²",
    beds: "1 Double",
    description: "Our Apartment Flajs is the perfect retreat for couples or solo travelers. This compact yet airy studio offers direct access to our lush garden and stunning views of the Soca Valley. It features a modern kitchenette, a comfortable double bed, and a sleek bathroom. Everything you need for a relaxing stay in Bovec.",
    amenities: ["Kitchenette", "Free WiFi", "Garden Access", "Mountain View", "TV", "Kettle", "Shower"],
    price: "€90 - €110 / night",
    images: [
      "https://picsum.photos/seed/apt2-1/1200/800",
      "https://picsum.photos/seed/apt2-2/1200/800",
      "https://picsum.photos/seed/apt2-3/1200/800"
    ]
  },
  {
    id: "apartment-kuhala",
    name: "Apartment Kuhala",
    size: "75 m²",
    beds: "2 Double beds",
    description: "Experience a spacious alpine retreat in Apartment Kuhala. This comfortable and beautifully furnished apartment offers a relaxing atmosphere with modern amenities and traditional mountain charm. Enjoy peaceful surroundings, mountain views, and a fully equipped kitchen, making it perfect for families or groups seeking comfort and convenience in Bovec.",
    amenities: ["Kitchen", "Balcony", "Free WiFi", "Free private parking", "Mountain view", "Private bathroom", "Family rooms", "Terrace"],
    price: "€140 – €180 / night",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804589.jpg?k=5b18a18124f99c7405998022fb41a88e15bdd5db71c2d1adc411ac3d6dd3959f&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799999.jpg?k=7053170f57fa9c68f891dc976ec4168e3b2961db2d1daca9d25f1e5af159a705&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799981.jpg?k=9a5eb1ff122d11d623b2f7a0ba6177ba6c64b3a7050d52c3ff4d4b011ccda836&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/193745942.jpg?k=004eeec39bab2dee5dba90b77357530ce2a2b44cfce1332baa9beede52335c1d&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/259024826.jpg?k=49f2562a06775a8e687fc6e608b333534201d85dc075d5aea2b457d0ac06be84&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/197009867.jpg?k=148aa6b06ada3267b8703997706d1aa3f7a9e4c3636faa6712d7724813680a98&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561795566.jpg?k=52604b28ff37debe29a2c61e74ab4e85ca352d39a97f9014a93c42344bb35d72&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561794948.jpg?k=3af989e328bd1f418c50a25fdca9013882ec14e55a045cc7bde576c5fdfe29cd&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804572.jpg?k=5fcdc7dbd2d893d600dab37525453b6a011d9cf4e3d344cf1d4e5526b48444ae&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799572.jpg?k=2e92fce8494fc2256a1b535531ee0c37b20870ff3cd925a10f33b8cf8ca81dc4&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799584.jpg?k=332c98e75b22e1eb10a3b66bfc18210f19c9f70be8a43d0e919f07f594e3439a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799583.jpg?k=0d7e504ea9d2809e2e21126eaf773f40758fd064aedfc7243abb48d80fa593c5&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804546.jpg?k=91125ba8eedd75b0b38bddcd8c0a2b4b7a8be03f656e55cd78208fb122ce6c60&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804541.jpg?k=c23adcb1d68e31b93130041cf75f4da857d5b3d2da0f7308b134e29ebf75eb82&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561804552.jpg?k=b44035e9e28b76754419909d0cd8b451869dc32170537671aadff0296659d2d2&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561799997.jpg?k=df7873602026a71858302d4f4892de29d574bc4b46865778886e5f0917a0cc15&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561805908.jpg?k=0ba6cd3e94c59bd58b6501553f9452f18198d0926412d9530dadc54643090e5a&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/197009874.jpg?k=56661ae07941da6800ebb5829703d8fb31bb63bf15fb3523f82049f1b29bfe0c&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204957781.jpg?k=1f8ccfe0f8fa0e77e358f3ec0022a54e1f4bb8e726d0ee5dd83dd1cfb9620760&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/204957707.jpg?k=1739ee59582e56985b3b59dedc40f7d50509e9c85a2ac0df7b38d198a020cebf&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/273686352.jpg?k=d499ae6df9619916ae5beb1c4f11c911e66b030541b254e9c16cfc0d37ba5d13&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/203408423.jpg?k=0774db4dba4295630d1b2386bf607206cf3bf08085227141708e6fd2a943db31&o=",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/273686840.jpg?k=cef332fe53313a02a4f0dbf7d9d5fe695e72553a201995dc07709f50187c8b57&o="
    ]
  }
];

export interface HikingActivity {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  highlights: string[];
  image: string;
}

export const hikingActivities: HikingActivity[] = [
  {
    id: "soca-trail",
    title: "Soca Trail (Soška pot)",
    description: "Easy riverside walk along the turquoise Soca River.",
    difficulty: "Easy",
    duration: "2–4 hours",
    highlights: ["Wooden bridges", "Emerald water", "Family-friendly trail"],
    image: "https://picsum.photos/seed/soca-trail/800/600"
  },
  {
    id: "virje-waterfall",
    title: "Virje Waterfall",
    description: "Short scenic hike to one of Slovenia’s most photogenic waterfalls.",
    difficulty: "Easy",
    duration: "30 minutes",
    highlights: ["Natural pool", "Great photo spot"],
    image: "https://picsum.photos/seed/virje/800/600"
  },
  {
    id: "boka-waterfall",
    title: "Boka Waterfall",
    description: "One of Slovenia’s highest waterfalls with dramatic views.",
    difficulty: "Easy to Moderate",
    duration: "1–2 hours",
    highlights: ["Powerful waterfall", "Viewing platform"],
    image: "https://picsum.photos/seed/boka/800/600"
  },
  {
    id: "slemenova-spica",
    title: "Slemenova Špica",
    description: "Panoramic alpine viewpoint with breathtaking scenery.",
    difficulty: "Moderate",
    duration: "3–4 hours",
    highlights: ["Views of Jalovec", "Alpine meadows"],
    image: "https://picsum.photos/seed/slemenova/800/600"
  },
  {
    id: "mount-krn",
    title: "Mount Krn",
    description: "Iconic summit with incredible 360° views.",
    difficulty: "Challenging",
    duration: "6–8 hours",
    highlights: ["WWI remains", "Panoramic summit views"],
    image: "https://picsum.photos/seed/krn-summit/800/600"
  },
  {
    id: "krn-lakes",
    title: "Krn Lakes",
    description: "Beautiful alpine lake surrounded by mountain peaks.",
    difficulty: "Moderate to Challenging",
    duration: "5–7 hours",
    highlights: ["Crystal-clear lake", "Alpine scenery"],
    image: "https://picsum.photos/seed/krn-lakes/800/600"
  },
  {
    id: "mangart-saddle-hike",
    title: "Mangart Saddle",
    description: "One of the most scenic alpine routes in Slovenia.",
    difficulty: "Moderate",
    duration: "3–5 hours",
    highlights: ["Dramatic mountain views"],
    image: "https://picsum.photos/seed/mangart/800/600"
  },
  {
    id: "svinjak",
    title: "Svinjak",
    description: "The \"Matterhorn of Bovec\" with rewarding summit views.",
    difficulty: "Moderate",
    duration: "3–5 hours",
    highlights: ["360° valley views"],
    image: "https://picsum.photos/seed/svinjak/800/600"
  },
  {
    id: "lepena-valley",
    title: "Lepena Valley",
    description: "Peaceful valley walk through untouched alpine nature.",
    difficulty: "Easy to Moderate",
    duration: "Flexible",
    highlights: ["Forest trails", "Alpine streams"],
    image: "https://picsum.photos/seed/lepena/800/600"
  },
  {
    id: "tolmin-gorges",
    title: "Tolmin Gorges",
    description: "Unique canyon trail with wooden bridges and emerald water.",
    difficulty: "Easy",
    duration: "1.5–2 hours",
    highlights: ["Turquoise river", "Rock formations"],
    image: "https://picsum.photos/seed/tolmin/800/600"
  }
];

export interface RaftingPartner {
  name: string;
  description: string;
  website?: string;
}

export const raftingPartners: RaftingPartner[] = [
  {
    name: "Soca Rafting",
    description: "One of the oldest and most experienced providers in the valley.",
    website: "https://www.socarafting.si"
  },
  {
    name: "Soca Adventure",
    description: "Professional team offering a wide range of water sports.",
    website: "https://www.soca-adventure.com"
  },
  {
    name: "Everything Bovec",
    description: "Your one-stop shop for all Bovec adventures and activities.",
    website: "https://everythingbovec.com/"
  },
  {
    name: "Alpin Action",
    description: "Specialized in high-quality rafting and kayaking experiences.",
    website: "https://www.alpinaction.it"
  },
  {
    name: "Sport Mix",
    description: "Friendly local guides with deep knowledge of the Soca River.",
    website: "https://www.sportmix.si"
  }
];

export interface CyclingRoute {
  id: string;
  title: string;
  elevation?: string;
  difficulty: string;
  highlights: string[];
  image: string;
  description?: string;
}

export const roadCyclingRoutes: CyclingRoute[] = [
  {
    id: "mangart-saddle",
    title: "Mangart Saddle",
    elevation: "2,055 m",
    difficulty: "Challenging",
    highlights: ["Dramatic switchbacks", "Panoramic views"],
    image: "https://picsum.photos/seed/mangart-cycle/800/600"
  },
  {
    id: "predil-pass",
    title: "Predil Pass",
    difficulty: "Moderate",
    highlights: ["Cross-border route", "Scenic alpine landscape"],
    image: "https://picsum.photos/seed/predil-cycle/800/600"
  },
  {
    id: "trenta-valley",
    title: "Trenta Valley",
    difficulty: "Easy to moderate",
    highlights: ["Turquoise river views", "Peaceful valley ride"],
    image: "https://picsum.photos/seed/trenta-cycle/800/600"
  },
  {
    id: "vrsic-pass",
    title: "Vršič Pass",
    difficulty: "Technical and rewarding",
    highlights: ["50+ hairpin turns", "Iconic Slovenian climb"],
    image: "https://picsum.photos/seed/vrsic-cycle/800/600"
  }
];

export const mtbRoutes: CyclingRoute[] = [
  {
    id: "lepena-valley-trails",
    title: "Lepena Valley Trails",
    difficulty: "Moderate",
    highlights: ["Forest and gravel paths"],
    image: "https://picsum.photos/seed/lepena-mtb/800/600",
    description: "Forest and gravel paths"
  },
  {
    id: "kanin-mountain-area",
    title: "Kanin Mountain Area",
    difficulty: "Technical alpine terrain",
    highlights: ["High-altitude views"],
    image: "https://picsum.photos/seed/kanin-mtb/800/600",
    description: "Technical alpine terrain"
  },
  {
    id: "soca-riverside-gravel",
    title: "Soca Riverside Gravel Routes",
    difficulty: "Easy scenic ride",
    highlights: ["Suitable for beginners"],
    image: "https://picsum.photos/seed/soca-mtb/800/600",
    description: "Easy scenic ride"
  }
];
