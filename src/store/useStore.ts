import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  UserProfile,
  TDIScore,
  TrainingSession,
  DailyProgress,
} from "@/data/data";
import { calculateTrainingClass } from "@/data/data";

// ============ TDI GAME STATE ============

export type TDIStep = "threshold" | "discrimination" | "identification" | "complete";

interface TDIGameState {
  currentStep: TDIStep;
  thresholdValue: number | null;
  discriminationAnswers: number[];
  discriminationCorrect: number;
  identificationAnswers: string[];
  identificationCorrect: number;
  showHint: boolean;
  currentTrialIndex: number;
  isAnimating: boolean;
}

// ============ TRAINING STATE ============

interface TrainingState {
  selectedPerfumeId: string | null;
  keywords: string[];
  generatedImageUrl: string | null;
  isGenerating: boolean;
}

// ============ MAIN STORE INTERFACE ============

interface AppState {
  // User Profile
  userProfile: UserProfile | null;
  isOnboarded: boolean;

  // TDI Game
  tdiGame: TDIGameState;
  tdiScores: TDIScore[];
  currentSession: TrainingSession | null;

  // Training
  training: TrainingState;
  dailyProgress: DailyProgress[];

  // UI State
  currentPage: "home" | "onboarding" | "training" | "tdi" | "dashboard" | "report";
  isLoading: boolean;

  // Actions - User Profile
  setUserProfile: (profile: Partial<UserProfile>) => void;
  completeOnboarding: (profile: Omit<UserProfile, "id" | "createdAt" | "trainingClass">) => void;

  // Actions - TDI Game
  initTDIGame: () => void;
  setTDIStep: (step: TDIStep) => void;
  setThresholdValue: (value: number) => void;
  submitDiscriminationAnswer: (answer: number, isCorrect: boolean) => void;
  submitIdentificationAnswer: (answer: string, isCorrect: boolean) => void;
  toggleHint: () => void;
  nextTrial: () => void;
  completeTDIGame: () => TDIScore;
  resetTDIGame: () => void;

  // Actions - Training
  selectPerfume: (perfumeId: string) => void;
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  clearKeywords: () => void;
  generateImage: () => Promise<void>;

  // Actions - Progress
  markDayComplete: (date: string, score: number, perfumeId: string) => void;
  addTDIScore: (score: TDIScore) => void;

  // Actions - Navigation
  setCurrentPage: (
    page: "home" | "onboarding" | "training" | "tdi" | "dashboard" | "report"
  ) => void;
  setLoading: (loading: boolean) => void;
}

// ============ INITIAL STATES ============

const initialTDIGameState: TDIGameState = {
  currentStep: "threshold",
  thresholdValue: null,
  discriminationAnswers: [],
  discriminationCorrect: 0,
  identificationAnswers: [],
  identificationCorrect: 0,
  showHint: false,
  currentTrialIndex: 0,
  isAnimating: false,
};

const initialTrainingState: TrainingState = {
  selectedPerfumeId: null,
  keywords: [],
  generatedImageUrl: null,
  isGenerating: false,
};

// ============ STORE IMPLEMENTATION ============

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      userProfile: null,
      isOnboarded: false,
      tdiGame: initialTDIGameState,
      tdiScores: [],
      currentSession: null,
      training: initialTrainingState,
      dailyProgress: [],
      currentPage: "home",
      isLoading: false,

      // User Profile Actions
      setUserProfile: (profile) =>
        set((state) => ({
          userProfile: state.userProfile
            ? { ...state.userProfile, ...profile }
            : null,
        })),

      completeOnboarding: (profile) => {
        const trainingClass = calculateTrainingClass(
          profile.age,
          profile.smokingStatus,
          profile.hasRhinitis
        );

        const fullProfile: UserProfile = {
          ...profile,
          id: `user-${Date.now()}`,
          trainingClass,
          createdAt: new Date(),
        };

        set({
          userProfile: fullProfile,
          isOnboarded: true,
          currentPage: "training",
        });
      },

      // TDI Game Actions
      initTDIGame: () =>
        set({
          tdiGame: initialTDIGameState,
          currentSession: {
            id: `session-${Date.now()}`,
            date: new Date(),
            perfumeId: get().training.selectedPerfumeId || "",
            tdiScore: { threshold: 0, discrimination: 0, identification: 0, total: 0, percentile: 0 },
            keywords: get().training.keywords,
            duration: 0,
          },
        }),

      setTDIStep: (step) =>
        set((state) => ({
          tdiGame: { ...state.tdiGame, currentStep: step, currentTrialIndex: 0 },
        })),

      setThresholdValue: (value) =>
        set((state) => ({
          tdiGame: { ...state.tdiGame, thresholdValue: value },
        })),

      submitDiscriminationAnswer: (answer, isCorrect) =>
        set((state) => ({
          tdiGame: {
            ...state.tdiGame,
            discriminationAnswers: [...state.tdiGame.discriminationAnswers, answer],
            discriminationCorrect: isCorrect
              ? state.tdiGame.discriminationCorrect + 1
              : state.tdiGame.discriminationCorrect,
          },
        })),

      submitIdentificationAnswer: (answer, isCorrect) =>
        set((state) => ({
          tdiGame: {
            ...state.tdiGame,
            identificationAnswers: [...state.tdiGame.identificationAnswers, answer],
            identificationCorrect: isCorrect
              ? state.tdiGame.identificationCorrect + 1
              : state.tdiGame.identificationCorrect,
            showHint: false,
          },
        })),

      toggleHint: () =>
        set((state) => ({
          tdiGame: { ...state.tdiGame, showHint: !state.tdiGame.showHint },
        })),

      nextTrial: () =>
        set((state) => ({
          tdiGame: {
            ...state.tdiGame,
            currentTrialIndex: state.tdiGame.currentTrialIndex + 1,
            showHint: false,
          },
        })),

      completeTDIGame: () => {
        const state = get();
        const { tdiGame } = state;

        // Calculate scores (scaled to 0-16 range)
        const thresholdScore = tdiGame.thresholdValue
          ? Math.round(16 - (tdiGame.thresholdValue / 30) * 8)
          : 8;
        const discriminationScore = Math.round(
          (tdiGame.discriminationCorrect / 5) * 16
        );
        const identificationScore = Math.round(
          (tdiGame.identificationCorrect / 5) * 16
        );
        const total = thresholdScore + discriminationScore + identificationScore;

        // Calculate percentile (simplified)
        const percentile = Math.min(99, Math.round((total / 48) * 100));

        const score: TDIScore = {
          threshold: thresholdScore,
          discrimination: discriminationScore,
          identification: identificationScore,
          total,
          percentile,
        };

        set((currentState) => ({
          tdiGame: { ...currentState.tdiGame, currentStep: "complete" },
          tdiScores: [...currentState.tdiScores, score],
        }));

        return score;
      },

      resetTDIGame: () =>
        set({
          tdiGame: initialTDIGameState,
        }),

      // Training Actions
      selectPerfume: (perfumeId) =>
        set((state) => ({
          training: { ...state.training, selectedPerfumeId: perfumeId },
        })),

      addKeyword: (keyword) =>
        set((state) => ({
          training: {
            ...state.training,
            keywords: state.training.keywords.includes(keyword)
              ? state.training.keywords
              : [...state.training.keywords, keyword].slice(0, 5), // Max 5 keywords
          },
        })),

      removeKeyword: (keyword) =>
        set((state) => ({
          training: {
            ...state.training,
            keywords: state.training.keywords.filter((k) => k !== keyword),
          },
        })),

      clearKeywords: () =>
        set((state) => ({
          training: { ...state.training, keywords: [] },
        })),

      generateImage: async () => {
        set((state) => ({
          training: { ...state.training, isGenerating: true },
        }));

        // Simulate API call to Gemini Nano
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Mock generated image URL based on keywords
        const mockUrls = [
          "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600",
          "https://images.unsplash.com/photo-1518882605630-8a6b6fbf8c07?w=600",
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        ];
        const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)];

        set((state) => ({
          training: {
            ...state.training,
            isGenerating: false,
            generatedImageUrl: randomUrl,
          },
        }));
      },

      // Progress Actions
      markDayComplete: (date, score, perfumeId) =>
        set((state) => ({
          dailyProgress: [
            ...state.dailyProgress.filter((d) => d.date !== date),
            { date, completed: true, score, perfumeUsed: perfumeId },
          ],
        })),

      addTDIScore: (score) =>
        set((state) => ({
          tdiScores: [...state.tdiScores, score],
        })),

      // Navigation Actions
      setCurrentPage: (page) => set({ currentPage: page }),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "loreal-odorable-storage",
      partialize: (state) => ({
        userProfile: state.userProfile,
        isOnboarded: state.isOnboarded,
        tdiScores: state.tdiScores,
        dailyProgress: state.dailyProgress,
      }),
    }
  )
);

// ============ SELECTORS ============

export const useUserProfile = () => useStore((state) => state.userProfile);
export const useIsOnboarded = () => useStore((state) => state.isOnboarded);
export const useTDIGame = () => useStore((state) => state.tdiGame);
export const useTDIScores = () => useStore((state) => state.tdiScores);
export const useTraining = () => useStore((state) => state.training);
export const useDailyProgress = () => useStore((state) => state.dailyProgress);
export const useCurrentPage = () => useStore((state) => state.currentPage);

// Get latest TDI score
export const useLatestTDIScore = () =>
  useStore((state) => state.tdiScores[state.tdiScores.length - 1] ?? null);

// Get completion streak
export const useCompletionStreak = () =>
  useStore((state) => {
    const sorted = [...state.dailyProgress]
      .filter((d) => d.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < sorted.length; i++) {
      const date = new Date(sorted[i].date);
      date.setHours(0, 0, 0, 0);
      const daysDiff = Math.floor(
        (today.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === i) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  });
