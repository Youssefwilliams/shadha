import { Perfume, Badge, EducationalArticle, CommunityPost } from './types';

// Predefined luxury perfumes for comparisons, preloaded simulations, and recommendations
export const PRESET_PERFUMES: Perfume[] = [
  {
    id: "bleu-de-chanel",
    name: "بلو دي شانيل",
    englishName: "Bleu de Chanel",
    brand: "شانيل (Chanel)",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    category: "خشبي - أروماتك",
    notes: {
      top: ["الجريب فروت", "الليمون", "النعناع", "الفلفل الوردي"],
      middle: ["الزنجبيل", "جوزة الطيب", "الياسمين", "الآيزو إي سوبر"],
      base: ["البخور", "النجيل الهندي", "الأرز", "خشب الصندل", "الباتشولي", "اللابدانوم", "المسك الأبيض"]
    },
    description: "عطر خشبي أروماتك للرجال، يمثل الحرية العميقة والجاذبية اللامتناهية. يتميز بتركيبته الغنية والمكثفة التي تعبر عن الأناقة الكلاسيكية بلمسة عصرية جريئة.",
    ingredients: ["كحول", "عطر", "ماء", "ليمونين", "لينالول", "سيترونيلول"],
    expectedDuration: "8 - 12 ساعة (ثبات ممتاز)",
    rating: 4.8,
    ratingsCount: 1420,
    reviewTips: "مثالي للمناسبات المسائية واللقاءات الرسمية. ضعه على خفقان النبض (المعصمين وخلف الأذنين) ووزعه بلمسات خفيفة دون فرك.",
    stores: [
      { name: "سيفورا (Sephora)", price: 620, link: "https://www.sephora.com", inStock: true, rating: 4.9 },
      { name: "أمازون (Amazon)", price: 585, link: "https://www.amazon.sa", inStock: true, rating: 4.5 },
      { name: "نون (Noon)", price: 590, link: "https://www.noon.com", inStock: false, rating: 4.4 }
    ],
    similarPerfumes: [
      {
        name: "سوفاج (Sauvage)",
        brand: "ديور (Dior)",
        notes: {
          top: ["فلفل سيتشوان", "برغموت كالابريا"],
          middle: ["الخزامى", "الفلفل الوردي", "الباتشولي", "الإليمي"],
          base: ["الأمبروكسان", "الأرز", "اللابدانوم"]
        },
        price: "540 ر.س",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "أكوا دي جيو بروفوندو",
        brand: "جورجيو أرماني (Armani)",
        notes: {
          top: ["نوتات مائية", "البرغموت", "الماندرين الأخضر"],
          middle: ["إكليل الجبل", "الخزامى", "العرعر"],
          base: ["الباتشولي", "المسك", "العنبر"]
        },
        price: "490 ر.س",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    id: "sauvage-dior",
    name: "سوفاج",
    englishName: "Sauvage Eau de Parfum",
    brand: "ديور (Dior)",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=400",
    category: "شرقي - فوجير",
    notes: {
      top: ["برغموت كالابريا", "الفلفل الحار"],
      middle: ["فلفل سيتشوان", "الخزامى", "الفلفل الوردي", "نجيل الهند", "الباتشولي"],
      base: ["الأمبروكسان", "الأرز", "غلابدانوم", "الفانيليا الفاخرة"]
    },
    description: "توليفة منعشة مفعمة بالقوة والغموض البالغ. يمتزج برغموت كالابريا الحيوي بنوتات خشبية حارة ودافئة من العنبر والأمبروكسان، ليخلق هالة ذكورية طاغية.",
    ingredients: ["دينات الكحول", "عطر", "ليمونين", "لينالول", "إيثيل هكسيل"],
    expectedDuration: "10 - 14 ساعة (ثبات قوي جداً وصاخب)",
    rating: 4.7,
    ratingsCount: 2350,
    reviewTips: "عطر ذو انتشار واسع ونفاذ. رشتين إلى ثلاثة تكفي تماماً لتدوم طوال اليوم. يفضل استخدامه في الطقس المعتدل أو البارد.",
    stores: [
      { name: "سيفورا (Sephora)", price: 540, link: "https://www.sephora.com", inStock: true, rating: 4.8 },
      { name: "نون (Noon)", price: 495, link: "https://www.noon.com", inStock: true, rating: 4.5 },
      { name: "أمازون (Amazon)", price: 510, link: "https://www.amazon.sa", inStock: true, rating: 4.6 }
    ],
    similarPerfumes: [
      {
        name: "برادا لونا روسا كربون",
        brand: "برادا (Prada)",
        notes: {
          top: ["الفلفل الأسود", "البرغموت"],
          middle: ["اللافندر", "نوتات معدنية", "الفحم"],
          base: ["الأمبروكسان", "الباتشولي"]
        },
        price: "430 ر.س",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "بلو دي شانيل",
        brand: "شانيل (Chanel)",
        notes: {
          top: ["الجريب فروت", "الليمون", "النعناع"],
          middle: ["الزنجبيل", "الياسمين"],
          base: ["البخور", "خشب الصندل"]
        },
        price: "620 ر.س",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    id: "oud-wood-tom-ford",
    name: "أود وود",
    englishName: "Oud Wood",
    brand: "توم فورد (Tom Ford)",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400",
    category: "شرقي - خشبي فاخر",
    notes: {
      top: ["الفلفل الوردي", "عشبة الهيل", "فلفل سيشوان"],
      middle: ["خشب العود الفاخر", "خشب الصندل", "نجيل الهند"],
      base: ["التونكا", "الفانيليا", "العنبر الدافئ"]
    },
    description: "واحد من أكثر المكونات فخامة وندرة وقيمة في ترسانة العطارين. يمتزج العود الغني بعبق التوابل الدافئة ونبتة الصندل الغامضة ليعطيك طابعاً ملوكياً لا ينسى.",
    ingredients: ["دينات الكحول", "المياه العطرية", "لينالول", "جيلارنيول", "كومارين"],
    expectedDuration: "6 - 10 ساعات (انتشار هادئ وفخم)",
    rating: 4.9,
    ratingsCount: 890,
    reviewTips: "رائع جداً لعشاق الفخامة العربية والعود المخفف بلمسة فرنسية. يفضل بخه على الصدر والملابس الشتوية الدافئة للشعور بالدفء والبهجة والوقار.",
    stores: [
      { name: "سيفورا (Sephora)", price: 1150, link: "https://www.sephora.com", inStock: true, rating: 4.9 },
      { name: "أمازون (Amazon)", price: 1090, link: "https://www.amazon.sa", inStock: true, rating: 4.7 },
      { name: "نون (Noon)", price: 1110, link: "https://www.noon.com", inStock: true, rating: 4.6 }
    ],
    similarPerfumes: [
      {
        name: "إنسينس عود",
        brand: "كيليان (Kilian)",
        notes: {
          top: ["الحبهان", "الزعفران"],
          middle: ["البخور", "الورد الجوري", "البابونج"],
          base: ["العود", "خشب الصندل", "الباتشولي"]
        },
        price: "1250 ر.س",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "مكتشف دير قاسم ملوك",
        brand: "عبد الصمد القرشي",
        notes: {
          top: ["دهن العود الكمبودي"],
          middle: ["المسك الملكي"],
          base: ["العنبر الأسود"]
        },
        price: "600 ر.س",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"
      }
    ]
  },
  {
    id: "libre-yves-saint-laurent",
    name: "ليبر إيف سان لوران",
    englishName: "Libre",
    brand: "إيف سان لوران (YSL)",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    category: "زهري - شرقي نسائي",
    notes: {
      top: ["الخزامى", "الماندرين (اليوسفي)", "الكشمش الأسود", "البرتقال المر"],
      middle: ["اللافندر", "شكوف البرتقال", "الياسمين التونسي"],
      base: ["فانيليا مدغشقر", "المسك", "خشب الأرز", "العنبر"]
    },
    description: "عطر الحرية للمرأة الأنيقة. نسيج دافئ وتناغم غير مألوف يجمع ببراعة بين اللافندر الفرنسي العشبي وحلاوة زهر البرتقال المغربي الرقيق ونفحة الفانيليا الفاتنة.",
    ingredients: ["ألكوهول دينيترات", "بارفيوم", "ليمونين", "ساليسيلات البنزيل", "ألفا إيزوميثيل إيونون"],
    expectedDuration: "8 - 11 ساعة (ثبات رائع وانتشار ساحر)",
    rating: 4.6,
    ratingsCount: 1680,
    reviewTips: "ملائم كعطر توقيع يومي ومحوري. يمنح حامله ثقة بالنفس ونعومة وحضور فخم. يفضل وضعه على الشعر وثنايا لفة العنق لانتشار يدوم أطول مع الحركة.",
    stores: [
      { name: "سيفورا (Sephora)", price: 590, link: "https://www.sephora.com", inStock: true, rating: 4.8 },
      { name: "أمازون (Amazon)", price: 540, link: "https://www.amazon.sa", inStock: true, rating: 4.5 },
      { name: "نون (Noon)", price: 545, link: "https://www.noon.com", inStock: true, rating: 4.4 }
    ],
    similarPerfumes: [
      {
        name: "مون جيرلان",
        brand: "جيرلان (Guerlain)",
        notes: {
          top: ["اللافندر", "البرغموت"],
          middle: ["ياسمين سامباك", "السوسن"],
          base: ["فانيليا تاهيتي", "خشب الصندل", "العرقسوس"]
        },
        price: "480 ر.س",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400"
      },
      {
        name: "كوكو مدمازيل",
        brand: "شانيل (Chanel)",
        notes: {
          top: ["البرتقال", "اليوسفي", "شكوف البرتقال"],
          middle: ["الورد التركي", "الياسمين", "اليلانغ يلانغ"],
          base: ["الباتشولي", "المسك", "الفانيليا", "العنبر"]
        },
        price: "630 ر.س",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400"
      }
    ]
  }
];

// Achievements Configuration
export const DEFAULT_BADGES: Badge[] = [
  {
    id: "first_scan",
    name: "خطوة الشذى الأولى",
    icon: "🌸",
    description: "قمت باكتشاف أول زجاجة عطر وصعدت على مدرج الهواة.",
    unlocked: true,
    unlockedAt: "2026-05-18"
  },
  {
    id: "oriental_lover",
    name: "سلطان العطور الشرقية",
    icon: "🕌",
    description: "قمت باكتشاف أو تقييم 3 عطور شرقيت تحتوي على نوتات العود أو العنبر.",
    unlocked: false
  },
  {
    id: "explorer_10",
    name: "خبير العطور الأعظم",
    icon: "🏆",
    description: "قمت بمسح وتحليل 10 عطور مختلفة باستخدام محرك الذكاء الاصطناعي.",
    unlocked: false
  },
  {
    id: "community_star",
    name: "ملهم الجمعية العطرية",
    icon: "💬",
    description: "نشرت أول مراجعة عطرية حازت على تفاعل من عشاق العطور الآخرين.",
    unlocked: true,
    unlockedAt: "2026-05-19"
  },
  {
    id: "perfume_collector",
    name: "جامع الكنوز السائلة",
    icon: "👑",
    description: "أنشأت 3 رفوف عطرية مخصصة لتنظيم عطورك الموسمية والمستقبلية.",
    unlocked: false
  }
];

// Educational Content
export const EDUCATIONAL_ARTICLES: EducationalArticle[] = [
  {
    id: "history-of-oud",
    title: "العود: الذهب السائل في تاريخ العطور الشرقية",
    summary: "كيف تحول صمغ تحميه شجرة مصابة بالفطريات إلى أثمن نوتة عطرية في العالم، يطلق عليها الملوك والأباطرة 'الذهب السائل'؟",
    content: "يعتبر العود اللغز والأسطورة القابعة في صميم عطور الشرق. يعود استخدامه إلى آلاف السنين في العبادات والمجالس العربية القديمة والمراسم الإمبراطورية في آسيا. يستخرج دهن العود من قلب أشجار الأكويلاريا بعد إصابتها بنوع نادر من الفطريات، وحيث يدافع جذع الشجرة عن نفسه بفرز هذا الراتنج الفواخر والداكن. سنتعرف في هذا المقال على كيفية دراسة جودة العود وفهم الفرق بين الأشكال الطبيعية والصناعية ونصائح لجعله يدوم طويلاً على ملابسك.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=400",
    readTime: "قراءة في 4 دقائق",
    date: "19 مايو 2026",
    author: "أحمد العتيبي (خبير نوتات العود)"
  },
  {
    id: "scent-pyramid-guide",
    title: "الدليلك العملي لفك طلاسم الهرم العطري",
    summary: "لماذا تختلف رائحة العطر بعد رشه بربع ساعة عن رائحته بعد ثماني ساعات؟ تعرف على النوتات العليا والوسطى والقاعدية وكيفية تفاعلها.",
    content: "ينقسم كل عطر إلى ثلاثة مستويات أساسية تدعى الهرم العطري. بمجرد أن يلامس الرذاذ الهواء، تبدأ النوتات العليا (عادة حمضيات وأعشاب) بالظهور والتبخر سريعًا في أول 10-15 دقيقة تعطي الانطباع الأول. تتبعها النوتات الوسطى أو ما يسمى 'قلب العطر' (زهور، فواكه، توابل) التي تحدد هوية العطر وتدوم لعدة ساعات. أخيراً، تترسب النوتات القاعدية العميقة مثل المسك والأرز والفانيليا، لتثبت الرائحة لساعات طوال وتحدد مدى استمرارية وثبات العطر على بشرتك.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400",
    readTime: "قراءة في 5 دقائق",
    date: "12 مايو 2026",
    author: "سارة الزهراني (باحثة عطرية كيميائية)"
  },
  {
    id: "how-to-choose-summer-perfume",
    title: "أسرار اختيار عطر صيفي منعش يواجه درجات الحرارة العالية",
    summary: "دليلك لانتقاء العطر الذي يدوم طويلاً برفقة نسيم البحر وفي أجواء الحر الشديد دون أن يصبح الخناق مزعجاً.",
    content: "إن درجات الحرارة المرتفعة تسرّع من عملية تبخر العطور بشكل دراماتيكي، وهذا هو السبب الرئيسي في أن العطور الثقيلة والدافئة قد تصبح خانقة ومزعجة في الصيف. من الحكمة اللجوء لعطور ذات نوتات مائية، حمضية، أو خضراء. إنها عطور خفيفة تمنح انتعاشاً دائماً ومبهجاً. سنناقش في هذا الدليل أفضل عطور الصيف للرجال والنساء، والمناطق المثالية لرش الرذاذ دون تسبب في تهيج الجلد تحت أشعة الشمس المباشرة.",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=400",
    readTime: "قراءة في 3 دقائق",
    date: "05 مايو 2026",
    author: "فرانسوا مارسيل (عطار فرنسي متقاعد)"
  }
];

// Predefined community posts for simulation
export const MOCK_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "خالد الشمري",
    authorAvatar: "👨‍💻",
    content: "جربت اليوم عطر 'أود وود' من توم فورد برفقة دهن عود هندي خفيف في المناسبة العائلية. الرائحة مذهلة وفخمة للغاية وتناغمت بشكل هائل! لمحبي العود الفريد لابد لكم من تجربة دمج العطور الغربية والشرقية معاً.",
    perfumeName: "أود وود (Tom Ford)",
    rating: 5,
    likes: 42,
    likedByUser: false,
    commentsCount: 8,
    createdAt: "منذ ساعتان"
  },
  {
    id: "post-2",
    author: "مروة فيصل",
    authorAvatar: "👩‍🎨",
    content: "عطر 'ليبر' من إيف سان لوران هو توقيعي الشخصي المفضل منذ عام. مزيج اللافندر وزهر البرتقال فريد لأنه حاد وناعم بنفس التوقيت. يثبت بملابسي حتى بعد غسلها!",
    perfumeName: "ليبر إيف سان لوران (YSL)",
    rating: 4.8,
    likes: 29,
    likedByUser: true,
    commentsCount: 3,
    createdAt: "منذ 5 ساعات"
  },
  {
    id: "post-3",
    author: "فيصل الحربي",
    authorAvatar: "🤠",
    content: "عطري المفضل دائمًا للصيف والعمل هو بلو دي شانيل. مريح جداً وغير مزعج لزملائي بالمكتب، ويشعرني بالنشاط التام، نوتات الليمون مع البخور في القاعدة تخلق مزيجاً عبقرياً.",
    perfumeName: "بلو دي شانيل (Chanel)",
    rating: 5,
    likes: 56,
    likedByUser: false,
    commentsCount: 14,
    createdAt: "أمس"
  }
];

// Available offline retail locations mock
export const MOCK_STORES_MAP = [
  {
    id: "shop-1",
    name: "سيفورا - الرياض غاليري (Sephora)",
    city: "الرياض",
    distance: "1.2 كم",
    address: "طريق الملك فهد، الرياض",
    rating: 4.8,
    phone: "920011322",
    hasDiscount: true,
    discountMessage: "خصم 15% على مجموعة شانيل المميزة",
    coordinates: { lat: 24.7425, lng: 46.6575 }
  },
  {
    id: "shop-2",
    name: "العربية للعود - النخيل مول",
    city: "الرياض",
    distance: "3.4 كم",
    address: "طريق الإمام سعود، الرياض",
    rating: 4.6,
    phone: "920009222",
    hasDiscount: false,
    discountMessage: "",
    coordinates: { lat: 24.7611, lng: 46.7118 }
  },
  {
    id: "shop-3",
    name: "عبد الصمد القرشي - مجمع العرب",
    city: "جدة",
    distance: "5.8 كم",
    address: "حي النزهة، طريق المدينة المنورة، جدة",
    rating: 4.9,
    phone: "920007111",
    hasDiscount: true,
    discountMessage: "اشترِ قطعة واحصل على الثانية مجاناً على دهن عود العرين",
    coordinates: { lat: 21.6322, lng: 39.1561 }
  },
  {
    id: "shop-4",
    name: "سيفورا - رد سي مول (Sephora)",
    city: "جدة",
    distance: "2.1 كم",
    address: "طريق الملك عبد العزيز، جدة",
    rating: 4.7,
    phone: "920011323",
    hasDiscount: false,
    discountMessage: "",
    coordinates: { lat: 21.6275, lng: 39.1122 }
  },
  {
    id: "shop-5",
    name: "باريس غاليري - أبراج البيت",
    city: "مكة المكرمة",
    distance: "0.5 كم",
    address: "ساحة الحرم، مكة",
    rating: 4.5,
    phone: "0125712211",
    hasDiscount: true,
    discountMessage: "كود خصم SHADHA5 يمنحك 5% خصم إضافي فوري",
    coordinates: { lat: 21.4192, lng: 39.8258 }
  }
];
