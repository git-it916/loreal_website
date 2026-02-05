// ============================================
// L'Oréal ODORable - Mock Data & Types
// ============================================

// ============ TYPES ============

export interface Perfume {
  id: string;
  name: string;
  brand: string;
  baseNotes: string[];
  middleNotes: string[];
  topNotes: string[];
  dominantNote: string;
  family: string;
  description: string;
  imageUrl: string;
  color: string; // Theme color for UI
}

export interface UserProfile {
  id: string;
  age: number;
  gender: "male" | "female" | "non-binary" | "prefer-not-to-say";
  isMenopausal: boolean;
  smokingStatus: "never" | "former" | "current";
  hasRhinitis: boolean;
  preferredPerfume: string;
  trainingClass: "prevention" | "recovery" | "maintenance";
  createdAt: Date;
}

export interface TDIScore {
  threshold: number; // 0-16
  discrimination: number; // 0-16
  identification: number; // 0-16
  total: number; // Sum, max 48
  percentile: number;
}

export interface TrainingSession {
  id: string;
  date: Date;
  perfumeId: string;
  tdiScore: TDIScore;
  keywords: string[];
  generatedImageUrl?: string;
  duration: number; // minutes
}

export interface DailyProgress {
  date: string;
  completed: boolean;
  score?: number;
  perfumeUsed?: string;
}

export interface WeeklyStats {
  week: string;
  avgThreshold: number;
  avgDiscrimination: number;
  avgIdentification: number;
  sessionsCompleted: number;
  improvement: number; // percentage
}

// ============ PERFUME DATA ============

export const perfumes: Perfume[] = [
  {
    id: "ysl-myslf",
    name: "MYSLF",
    brand: "Yves Saint Laurent",
    topNotes: ["Bergamot", "Orange Blossom"],
    middleNotes: ["Orange Flower Absolute", "White Floral Accord"],
    baseNotes: ["Bourbon Vanilla", "Indonesian Patchouli"],
    dominantNote: "Orange Blossom",
    family: "Floral Woody",
    description:
      "A floral fragrance that challenges conventions, celebrating a new vision of masculinity with the luminous intensity of orange flower.",
    imageUrl: "/images/ysl-myslf.jpg",
    color: "#2E4057",
  },
  {
    id: "lancome-lavie",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    topNotes: ["Blackcurrant", "Pear"],
    middleNotes: ["Iris", "Jasmine", "Orange Blossom"],
    baseNotes: ["Praline", "Vanilla", "Patchouli", "Tonka Bean"],
    dominantNote: "Iris",
    family: "Floral Gourmand",
    description:
      "A declaration of happiness embodied in a bottle. The essence of femininity expressed through the rarest and most precious ingredients.",
    imageUrl: "/images/lancome-lavie.jpg",
    color: "#D4A5A5",
  },
  {
    id: "armani-si",
    name: "Sì",
    brand: "Giorgio Armani",
    topNotes: ["Blackcurrant Nectar", "Mandarin"],
    middleNotes: ["Rose de Mai", "Freesia", "Neroli"],
    baseNotes: ["Vanilla", "Ambroxan", "Woody Notes"],
    dominantNote: "Blackcurrant",
    family: "Chypre Fruity",
    description:
      "A modern chypre fragrance embodying strength and femininity. A sophisticated blend of blackcurrant and chypre accord.",
    imageUrl: "/images/armani-si.jpg",
    color: "#1A1A2E",
  },
];

// ============ MOCK USER DATA ============

export const mockUserProfile: UserProfile = {
  id: "user-001",
  age: 42,
  gender: "female",
  isMenopausal: false,
  smokingStatus: "never",
  hasRhinitis: false,
  preferredPerfume: "lancome-lavie",
  trainingClass: "prevention",
  createdAt: new Date("2024-01-15"),
};

export const mockTDIScores: TDIScore[] = [
  { threshold: 8, discrimination: 10, identification: 11, total: 29, percentile: 45 },
  { threshold: 9, discrimination: 11, identification: 11, total: 31, percentile: 52 },
  { threshold: 10, discrimination: 11, identification: 12, total: 33, percentile: 58 },
  { threshold: 10, discrimination: 12, identification: 13, total: 35, percentile: 65 },
  { threshold: 11, discrimination: 13, identification: 13, total: 37, percentile: 72 },
];

export const ageGroupAverage: TDIScore = {
  threshold: 9.5,
  discrimination: 11.2,
  identification: 12.0,
  total: 32.7,
  percentile: 50,
};

// ============ TRAINING CALENDAR DATA ============

export const mockDailyProgress: DailyProgress[] = [
  { date: "2024-07-01", completed: true, score: 29, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-02", completed: true, score: 30, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-03", completed: false },
  { date: "2024-07-04", completed: true, score: 31, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-05", completed: true, score: 32, perfumeUsed: "ysl-myslf" },
  { date: "2024-07-06", completed: false },
  { date: "2024-07-07", completed: true, score: 33, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-08", completed: true, score: 33, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-09", completed: true, score: 34, perfumeUsed: "armani-si" },
  { date: "2024-07-10", completed: false },
  { date: "2024-07-11", completed: true, score: 35, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-12", completed: true, score: 35, perfumeUsed: "lancome-lavie" },
  { date: "2024-07-13", completed: true, score: 36, perfumeUsed: "ysl-myslf" },
  { date: "2024-07-14", completed: true, score: 37, perfumeUsed: "lancome-lavie" },
];

export const mockWeeklyStats: WeeklyStats[] = [
  {
    week: "Week 1",
    avgThreshold: 8.5,
    avgDiscrimination: 10.2,
    avgIdentification: 11.0,
    sessionsCompleted: 5,
    improvement: 0,
  },
  {
    week: "Week 2",
    avgThreshold: 9.2,
    avgDiscrimination: 11.0,
    avgIdentification: 11.8,
    sessionsCompleted: 6,
    improvement: 8.5,
  },
  {
    week: "Week 3",
    avgThreshold: 10.0,
    avgDiscrimination: 11.8,
    avgIdentification: 12.5,
    sessionsCompleted: 6,
    improvement: 12.3,
  },
  {
    week: "Week 4",
    avgThreshold: 10.8,
    avgDiscrimination: 12.5,
    avgIdentification: 13.2,
    sessionsCompleted: 7,
    improvement: 15.7,
  },
];

// ============ TDI GAME DATA ============

export const thresholdDistances = [
  { value: 30, label: "30cm", description: "Arm's length - Can you detect the scent?" },
  { value: 15, label: "15cm", description: "Half arm - Getting closer to the source" },
  { value: 5, label: "5cm", description: "Close range - Near the perfume strip" },
];

export const discriminationTrials = [
  {
    id: 1,
    options: ["Vanilla", "Vanilla", "Rose"],
    correctIndex: 2,
    hint: "One of these has a floral top note",
  },
  {
    id: 2,
    options: ["Bergamot", "Lemon", "Lemon"],
    correctIndex: 0,
    hint: "Look for the Italian citrus",
  },
  {
    id: 3,
    options: ["Musk", "Amber", "Musk"],
    correctIndex: 1,
    hint: "Find the warm, resinous note",
  },
  {
    id: 4,
    options: ["Jasmine", "Jasmine", "Tuberose"],
    correctIndex: 2,
    hint: "One flower is more intense",
  },
  {
    id: 5,
    options: ["Cedar", "Sandalwood", "Sandalwood"],
    correctIndex: 0,
    hint: "Look for the drier wood",
  },
];

export const identificationQuestions = [
  {
    id: 1,
    question: "Which note is dominant in this perfume?",
    options: ["Vanilla", "Lemon", "Rose", "Pepper"],
    correctAnswer: "Vanilla",
    hint: "Think of a warm, sweet dessert",
    imageHint: "/images/hints/vanilla.jpg",
  },
  {
    id: 2,
    question: "What type of scent family does this belong to?",
    options: ["Floral", "Woody", "Oriental", "Fresh"],
    correctAnswer: "Floral",
    hint: "Imagine a blooming garden",
    imageHint: "/images/hints/floral.jpg",
  },
  {
    id: 3,
    question: "Identify the citrus note you detect:",
    options: ["Bergamot", "Orange", "Grapefruit", "Lemon"],
    correctAnswer: "Bergamot",
    hint: "Earl Grey tea uses this",
    imageHint: "/images/hints/bergamot.jpg",
  },
  {
    id: 4,
    question: "Which base note anchors this fragrance?",
    options: ["Musk", "Amber", "Patchouli", "Sandalwood"],
    correctAnswer: "Patchouli",
    hint: "A earthy, slightly sweet woody note",
    imageHint: "/images/hints/patchouli.jpg",
  },
  {
    id: 5,
    question: "What season does this scent evoke?",
    options: ["Spring", "Summer", "Autumn", "Winter"],
    correctAnswer: "Spring",
    hint: "New beginnings and fresh blooms",
    imageHint: "/images/hints/spring.jpg",
  },
];

// ============ AI SYNESTHESIA KEYWORDS ============

export const scentKeywordCategories = {
  emotions: ["Fresh", "Warm", "Romantic", "Mysterious", "Energetic", "Calming", "Sensual", "Playful"],
  colors: ["Golden", "Pink", "Blue", "Green", "Purple", "White", "Red", "Orange"],
  textures: ["Silky", "Velvety", "Crisp", "Soft", "Smooth", "Light", "Dense", "Airy"],
  places: ["Garden", "Beach", "Forest", "Desert", "Mountain", "City", "Meadow", "Ocean"],
  seasons: ["Spring Morning", "Summer Night", "Autumn Sunset", "Winter Dawn"],
  memories: ["First Love", "Childhood", "Adventure", "Celebration", "Serenity", "Power"],
};

export const mockGeneratedImages = [
  {
    keywords: ["Fresh", "Golden", "Garden"],
    imageUrl: "/images/generated/fresh-golden-garden.jpg",
    description: "A sun-drenched garden with golden light filtering through fresh blooms",
  },
  {
    keywords: ["Warm", "Pink", "Romantic"],
    imageUrl: "/images/generated/warm-pink-romantic.jpg",
    description: "Soft pink petals floating in warm ambient light, evoking tender emotions",
  },
  {
    keywords: ["Mysterious", "Purple", "Forest"],
    imageUrl: "/images/generated/mysterious-purple-forest.jpg",
    description: "An enchanted forest bathed in purple twilight, shrouded in mystery",
  },
];

// ============ PRODUCT RECOMMENDATIONS ============

export const productRecommendations = [
  {
    id: "prada-paradoxe",
    name: "Paradoxe",
    brand: "Prada",
    price: 145,
    matchScore: 94,
    scentProfile: ["Floral", "Amber", "Neroli"],
    imageUrl: "/images/products/prada-paradoxe.jpg",
    shopUrl: "https://www.loreal.com",
    reason: "Based on your strong floral recognition and preference for modern femininity",
  },
  {
    id: "valentino-donna",
    name: "Donna Born in Roma",
    brand: "Valentino",
    price: 155,
    matchScore: 89,
    scentProfile: ["Vanilla", "Jasmine", "Woody"],
    imageUrl: "/images/products/valentino-donna.jpg",
    shopUrl: "https://www.loreal.com",
    reason: "Your identification scores show excellent vanilla recognition",
  },
  {
    id: "mugler-angel",
    name: "Angel Elixir",
    brand: "Mugler",
    price: 135,
    matchScore: 85,
    scentProfile: ["Gourmand", "Vanilla", "Woody"],
    imageUrl: "/images/products/mugler-angel.jpg",
    shopUrl: "https://www.loreal.com",
    reason: "Complements your training progress with gourmand notes",
  },
];

// ============ HELPER FUNCTIONS ============

export const calculateTrainingClass = (
  age: number,
  smokingStatus: string,
  hasRhinitis: boolean
): "prevention" | "recovery" | "maintenance" => {
  const isMenopauseAge = age >= 45 && age <= 65;
  const hasRiskFactors = smokingStatus === "current" || hasRhinitis;

  if (hasRiskFactors || isMenopauseAge) {
    return "recovery";
  }
  if (smokingStatus === "former") {
    return "maintenance";
  }
  return "prevention";
};

export const getTDIInterpretation = (score: TDIScore): string => {
  if (score.total >= 40) {
    return "Exceptional olfactory ability! You have a highly refined sense of smell.";
  }
  if (score.total >= 35) {
    return "Above average olfactory function. Your training is showing excellent results.";
  }
  if (score.total >= 30) {
    return "Normal olfactory function. Continue training to enhance your abilities.";
  }
  if (score.total >= 25) {
    return "Mild reduction in olfactory function. Consistent training will help improve.";
  }
  return "Significant room for improvement. Daily training is recommended.";
};

export const getProgressComment = (currentWeek: WeeklyStats, previousWeek?: WeeklyStats): string => {
  if (!previousWeek) {
    return "Welcome to your olfactory journey! Complete more sessions to track your progress.";
  }

  const thresholdChange =
    ((currentWeek.avgThreshold - previousWeek.avgThreshold) / previousWeek.avgThreshold) * 100;
  const discChange =
    ((currentWeek.avgDiscrimination - previousWeek.avgDiscrimination) /
      previousWeek.avgDiscrimination) *
    100;
  const idChange =
    ((currentWeek.avgIdentification - previousWeek.avgIdentification) /
      previousWeek.avgIdentification) *
    100;

  if (discChange > 10) {
    return `Impressive! Your discrimination ability improved by ${discChange.toFixed(1)}% this week. You're developing a refined palate.`;
  }
  if (thresholdChange > 8) {
    return `Your scent detection range has expanded by ${thresholdChange.toFixed(1)}%. You're becoming more sensitive to subtle notes.`;
  }
  if (idChange > 5) {
    return `Great progress in identification! You correctly named ${idChange.toFixed(1)}% more scents this week.`;
  }
  if (currentWeek.improvement > 0) {
    return `Steady improvement of ${currentWeek.improvement.toFixed(1)}% overall. Keep up the consistent practice!`;
  }
  return "Maintain your training routine. Olfactory skills develop gradually with practice.";
};
