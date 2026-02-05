"use client";

import React, { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  Volume2,
  Check,
  X,
  Target,
  Eye,
  Brain,
  Sparkles,
  Award,
} from "lucide-react";
import { useStore, useTDIGame } from "@/store/useStore";
import {
  thresholdDistances,
  discriminationTrials,
  identificationQuestions,
} from "@/data/data";
import { cn, shuffleArray } from "@/lib/utils";

// ============ TYPES ============

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

interface ThresholdGameProps {
  onComplete: (value: number) => void;
}

interface DiscriminationGameProps {
  onComplete: (score: number) => void;
}

interface IdentificationGameProps {
  onComplete: (score: number) => void;
}

// ============ STEP INDICATOR ============

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  const steps = [
    { icon: Target, label: "Threshold", description: "Detection Range" },
    { icon: Eye, label: "Discrimination", description: "Find the Different" },
    { icon: Brain, label: "Identification", description: "Name the Scent" },
  ];

  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;
        const isComplete = index < currentStep;

        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isComplete
                    ? "#C6A665"
                    : isActive
                    ? "#1A1A1A"
                    : "#E5E5E5",
                }}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  isActive && "ring-4 ring-gold-500/30"
                )}
              >
                {isComplete ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <Icon
                    className={cn(
                      "w-5 h-5",
                      isActive ? "text-white" : "text-luxury-silver"
                    )}
                  />
                )}
              </motion.div>
              <span
                className={cn(
                  "mt-2 text-xs font-medium tracking-wide",
                  isActive ? "text-luxury-black" : "text-luxury-silver"
                )}
              >
                {step.label}
              </span>
              <span className="text-[10px] text-luxury-silver">
                {step.description}
              </span>
            </div>
            {index < totalSteps - 1 && (
              <div
                className={cn(
                  "w-16 h-0.5 mb-8",
                  index < currentStep ? "bg-gold-500" : "bg-luxury-pearl"
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ============ THRESHOLD GAME ============

const ThresholdGame: React.FC<ThresholdGameProps> = ({ onComplete }) => {
  const [selectedDistance, setSelectedDistance] = useState<number | null>(null);
  const [isSmelling, setIsSmelling] = useState(false);
  const [detected, setDetected] = useState<number | null>(null);

  const handleSmell = async (distance: number) => {
    setIsSmelling(true);
    setSelectedDistance(distance);

    // Simulate smelling animation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSmelling(false);
    setDetected(distance);
  };

  const handleConfirm = () => {
    if (detected !== null) {
      onComplete(detected);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Instructions */}
      <div className="text-center space-y-3">
        <h3 className="font-serif text-2xl text-luxury-black">
          Threshold Detection
        </h3>
        <p className="text-luxury-graphite max-w-md mx-auto">
          Hold your perfume strip at each distance. Record the distance where
          you first detect the scent.
        </p>
      </div>

      {/* Distance Slider Visual */}
      <div className="relative py-12">
        {/* Perfume bottle illustration */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-24 bg-gradient-to-b from-gold-400 to-gold-600 rounded-t-full flex items-center justify-center"
          animate={isSmelling ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1, repeat: isSmelling ? Infinity : 0 }}
        >
          <Sparkles className="w-6 h-6 text-white/80" />
        </motion.div>

        {/* Scent waves animation */}
        <AnimatePresence>
          {isSmelling && (
            <>
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.5, opacity: 0.8 }}
                  animate={{ scale: 2 + i * 0.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                  className="absolute left-1/2 top-12 -translate-x-1/2 w-16 h-16 rounded-full border-2 border-lavender-400"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        {/* Distance markers */}
        <div className="flex justify-between items-end mt-32 px-8">
          {thresholdDistances.map((dist, index) => (
            <motion.button
              key={dist.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSmell(dist.value)}
              disabled={isSmelling}
              className={cn(
                "flex flex-col items-center gap-3 p-6 rounded-lg transition-all",
                selectedDistance === dist.value
                  ? "bg-gold-50 border-2 border-gold-500"
                  : "bg-white border-2 border-luxury-pearl hover:border-gold-300",
                detected === dist.value && "ring-4 ring-emerald-500/30"
              )}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center text-2xl font-serif",
                  detected === dist.value
                    ? "bg-emerald-500 text-white"
                    : selectedDistance === dist.value
                    ? "bg-gold-500 text-white"
                    : "bg-luxury-pearl text-luxury-graphite"
                )}
              >
                {dist.value}
              </div>
              <span className="font-medium text-luxury-black">{dist.label}</span>
              <span className="text-xs text-luxury-silver text-center max-w-24">
                {dist.description}
              </span>
              {detected === dist.value && (
                <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" /> Detected
                </span>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      {detected !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button onClick={handleConfirm} className="btn-gold">
            Confirm Detection at {detected}cm
            <ChevronRight className="inline-block ml-2 w-4 h-4" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

// ============ DISCRIMINATION GAME ============

const DiscriminationGame: React.FC<DiscriminationGameProps> = ({
  onComplete,
}) => {
  const [currentTrial, setCurrentTrial] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Shuffle options for each trial
  const shuffledTrials = useMemo(() => {
    return discriminationTrials.map((trial) => {
      const indices = [0, 1, 2];
      const shuffled = shuffleArray(indices);
      return {
        ...trial,
        shuffledOptions: shuffled.map((i) => trial.options[i]),
        correctShuffledIndex: shuffled.indexOf(trial.correctIndex),
      };
    });
  }, []);

  const trial = shuffledTrials[currentTrial];

  const handleSelect = async (index: number) => {
    if (showResult) return;

    setSelected(index);
    setShowResult(true);

    const isCorrect = index === trial.correctShuffledIndex;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }

    // Wait before showing next trial
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (currentTrial < discriminationTrials.length - 1) {
      setCurrentTrial((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      onComplete(isCorrect ? correctCount + 1 : correctCount);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Instructions */}
      <div className="text-center space-y-3">
        <h3 className="font-serif text-2xl text-luxury-black">
          Find the Different One
        </h3>
        <p className="text-luxury-graphite max-w-md mx-auto">
          Three scent strips are shown. One is different from the others.
          Identify the odd one out.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-luxury-silver">Trial</span>
        <span className="font-serif text-xl text-luxury-black">
          {currentTrial + 1}
        </span>
        <span className="text-sm text-luxury-silver">
          of {discriminationTrials.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex justify-center gap-6">
        <AnimatePresence mode="wait">
          {trial.shuffledOptions.map((scent, index) => {
            const isCorrectAnswer = index === trial.correctShuffledIndex;
            const isSelected = selected === index;

            return (
              <motion.button
                key={`${currentTrial}-${index}`}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleSelect(index)}
                disabled={showResult}
                className={cn(
                  "game-card w-36 h-48 flex flex-col items-center justify-center gap-4",
                  showResult && isCorrectAnswer && "correct",
                  showResult && isSelected && !isCorrectAnswer && "incorrect"
                )}
              >
                {/* Scent strip visual */}
                <div
                  className={cn(
                    "w-4 h-24 rounded-full transition-colors",
                    showResult && isCorrectAnswer
                      ? "bg-emerald-400"
                      : showResult && isSelected
                      ? "bg-rose-400"
                      : "bg-gradient-to-b from-gold-300 to-gold-500"
                  )}
                />
                <span className="font-serif text-lg text-luxury-black">
                  #{index + 1}
                </span>

                {/* Result icon */}
                {showResult && isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={cn(
                      "absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center",
                      isCorrectAnswer ? "bg-emerald-500" : "bg-rose-500"
                    )}
                  >
                    {isCorrectAnswer ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <X className="w-4 h-4 text-white" />
                    )}
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hint */}
      <div className="text-center">
        <button
          onClick={() => setShowHint((h) => !h)}
          disabled={showResult}
          className="inline-flex items-center gap-2 text-sm text-lavender-600 hover:text-lavender-700 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? "Hide Hint" : "Need a Hint?"}
        </button>
        <AnimatePresence>
          {showHint && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 text-sm text-lavender-700 italic"
            >
              {trial.hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="text-sm text-luxury-silver">
          Correct: {correctCount} / {currentTrial + (showResult ? 1 : 0)}
        </span>
      </div>
    </motion.div>
  );
};

// ============ IDENTIFICATION GAME ============

const IdentificationGame: React.FC<IdentificationGameProps> = ({
  onComplete,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const question = identificationQuestions[currentQuestion];

  const handleSelect = async (answer: string) => {
    if (showResult) return;

    setSelected(answer);
    setShowResult(true);

    const isCorrect = answer === question.correctAnswer;
    if (isCorrect) {
      setCorrectCount((c) => c + 1);
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (currentQuestion < identificationQuestions.length - 1) {
      setCurrentQuestion((c) => c + 1);
      setSelected(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      onComplete(isCorrect ? correctCount + 1 : correctCount);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Instructions */}
      <div className="text-center space-y-3">
        <h3 className="font-serif text-2xl text-luxury-black">
          Identify the Scent
        </h3>
        <p className="text-luxury-graphite max-w-md mx-auto">
          Based on what you smell, answer the question below.
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-luxury-silver">Question</span>
        <span className="font-serif text-xl text-luxury-black">
          {currentQuestion + 1}
        </span>
        <span className="text-sm text-luxury-silver">
          of {identificationQuestions.length}
        </span>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="card-luxury p-8 max-w-xl mx-auto"
      >
        <p className="font-serif text-xl text-center text-luxury-black mb-8">
          {question.question}
        </p>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {question.options.map((option) => {
            const isCorrect = option === question.correctAnswer;
            const isSelected = selected === option;

            return (
              <motion.button
                key={option}
                whileHover={{ scale: showResult ? 1 : 1.02 }}
                whileTap={{ scale: showResult ? 1 : 0.98 }}
                onClick={() => handleSelect(option)}
                disabled={showResult}
                className={cn(
                  "p-4 rounded-lg border-2 text-left transition-all",
                  showResult && isCorrect
                    ? "border-emerald-500 bg-emerald-50"
                    : showResult && isSelected && !isCorrect
                    ? "border-rose-500 bg-rose-50"
                    : isSelected
                    ? "border-gold-500 bg-gold-50"
                    : "border-luxury-pearl hover:border-gold-300 bg-white"
                )}
              >
                <span
                  className={cn(
                    "font-medium",
                    showResult && isCorrect
                      ? "text-emerald-700"
                      : showResult && isSelected
                      ? "text-rose-700"
                      : "text-luxury-black"
                  )}
                >
                  {option}
                </span>
                {showResult && isCorrect && (
                  <Check className="inline-block ml-2 w-4 h-4 text-emerald-600" />
                )}
                {showResult && isSelected && !isCorrect && (
                  <X className="inline-block ml-2 w-4 h-4 text-rose-600" />
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Hint */}
      <div className="text-center">
        <button
          onClick={() => setShowHint((h) => !h)}
          disabled={showResult}
          className="inline-flex items-center gap-2 text-sm text-lavender-600 hover:text-lavender-700 transition-colors"
        >
          <Lightbulb className="w-4 h-4" />
          {showHint ? "Hide Hint" : "Reveal Image Hint"}
        </button>
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="w-32 h-32 mx-auto rounded-lg bg-gradient-to-br from-lavender-200 to-lavender-400 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-lavender-700" />
              </div>
              <p className="mt-2 text-sm text-lavender-700 italic">
                {question.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Score */}
      <div className="text-center">
        <span className="text-sm text-luxury-silver">
          Correct: {correctCount} / {currentQuestion + (showResult ? 1 : 0)}
        </span>
      </div>
    </motion.div>
  );
};

// ============ RESULTS SCREEN ============

interface ResultsScreenProps {
  score: {
    threshold: number;
    discrimination: number;
    identification: number;
    total: number;
    percentile: number;
  };
  onContinue: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, onContinue }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-24 h-24 mx-auto bg-gradient-gold rounded-full flex items-center justify-center shadow-gold"
      >
        <Award className="w-12 h-12 text-luxury-black" />
      </motion.div>

      <div className="space-y-2">
        <h2 className="font-serif text-3xl text-luxury-black">
          Training Complete!
        </h2>
        <p className="text-luxury-graphite">
          You've finished today's olfactory training session.
        </p>
      </div>

      {/* Score breakdown */}
      <div className="card-luxury p-8 max-w-md mx-auto">
        <div className="space-y-4">
          {[
            { label: "Threshold", value: score.threshold, max: 16 },
            { label: "Discrimination", value: score.discrimination, max: 16 },
            { label: "Identification", value: score.identification, max: 16 },
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <span className="text-luxury-graphite">{item.label}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-luxury-pearl rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / item.max) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className="h-full bg-gradient-gold"
                  />
                </div>
                <span className="font-serif text-lg text-luxury-black w-12 text-right">
                  {item.value}/{item.max}
                </span>
              </div>
            </motion.div>
          ))}

          <div className="divider-gold my-4" />

          <div className="flex items-center justify-between">
            <span className="font-medium text-luxury-black">Total Score</span>
            <span className="font-serif text-2xl text-gradient-gold">
              {score.total}/48
            </span>
          </div>

          <div className="pt-4 text-center">
            <span className="inline-block px-4 py-2 bg-lavender-50 text-lavender-700 rounded-full text-sm">
              Top {100 - score.percentile}% of your age group
            </span>
          </div>
        </div>
      </div>

      <button onClick={onContinue} className="btn-gold">
        View Dashboard
        <ChevronRight className="inline-block ml-2 w-4 h-4" />
      </button>
    </motion.div>
  );
};

// ============ MAIN TDI GAME ENGINE ============

export const TDIGameEngine: React.FC = () => {
  const tdiGame = useTDIGame();
  const {
    setTDIStep,
    setThresholdValue,
    submitDiscriminationAnswer,
    submitIdentificationAnswer,
    completeTDIGame,
    resetTDIGame,
    setCurrentPage,
  } = useStore();

  const [score, setScore] = useState<{
    threshold: number;
    discrimination: number;
    identification: number;
    total: number;
    percentile: number;
  } | null>(null);

  const currentStepIndex =
    tdiGame.currentStep === "threshold"
      ? 0
      : tdiGame.currentStep === "discrimination"
      ? 1
      : tdiGame.currentStep === "identification"
      ? 2
      : 3;

  const handleThresholdComplete = useCallback(
    (value: number) => {
      setThresholdValue(value);
      setTDIStep("discrimination");
    },
    [setThresholdValue, setTDIStep]
  );

  const handleDiscriminationComplete = useCallback(
    (correctCount: number) => {
      // Store discrimination results
      setTDIStep("identification");
    },
    [setTDIStep]
  );

  const handleIdentificationComplete = useCallback(
    (correctCount: number) => {
      const finalScore = completeTDIGame();
      setScore(finalScore);
    },
    [completeTDIGame]
  );

  const handleContinue = () => {
    resetTDIGame();
    setCurrentPage("dashboard");
  };

  const handleBack = () => {
    if (tdiGame.currentStep === "discrimination") {
      setTDIStep("threshold");
    } else if (tdiGame.currentStep === "identification") {
      setTDIStep("discrimination");
    }
  };

  return (
    <div className="min-h-screen bg-luxury-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl text-luxury-black mb-2">
            TDI Training Zone
          </h1>
          <p className="text-luxury-graphite">
            Complete all three exercises to measure your olfactory abilities
          </p>
        </div>

        {/* Step Indicator */}
        {tdiGame.currentStep !== "complete" && (
          <StepIndicator currentStep={currentStepIndex} totalSteps={3} />
        )}

        {/* Back Button */}
        {tdiGame.currentStep !== "threshold" &&
          tdiGame.currentStep !== "complete" && (
            <button
              onClick={handleBack}
              className="mb-6 inline-flex items-center gap-2 text-luxury-silver hover:text-luxury-black transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
          )}

        {/* Game Content */}
        <AnimatePresence mode="wait">
          {tdiGame.currentStep === "threshold" && (
            <ThresholdGame
              key="threshold"
              onComplete={handleThresholdComplete}
            />
          )}
          {tdiGame.currentStep === "discrimination" && (
            <DiscriminationGame
              key="discrimination"
              onComplete={handleDiscriminationComplete}
            />
          )}
          {tdiGame.currentStep === "identification" && (
            <IdentificationGame
              key="identification"
              onComplete={handleIdentificationComplete}
            />
          )}
          {tdiGame.currentStep === "complete" && score && (
            <ResultsScreen
              key="results"
              score={score}
              onContinue={handleContinue}
            />
          )}
        </AnimatePresence>

        {/* Audio instruction button (placeholder) */}
        {tdiGame.currentStep !== "complete" && (
          <div className="fixed bottom-8 right-8">
            <button className="w-12 h-12 bg-luxury-black text-white rounded-full flex items-center justify-center shadow-luxury hover:scale-110 transition-transform">
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TDIGameEngine;
