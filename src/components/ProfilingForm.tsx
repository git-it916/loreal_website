"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  User,
  Heart,
  Sparkles,
  Wind,
  Check,
} from "lucide-react";
import { useStore } from "@/store/useStore";
import { perfumes, type UserProfile } from "@/data/data";
import { cn } from "@/lib/utils";

// ============ TYPES ============

type FormStep = "personal" | "lifestyle" | "preference" | "confirm";

interface FormData {
  age: number | "";
  gender: UserProfile["gender"] | "";
  smokingStatus: UserProfile["smokingStatus"] | "";
  hasRhinitis: boolean;
  preferredPerfume: string;
}

// ============ STEP COMPONENTS ============

interface PersonalStepProps {
  data: FormData;
  onChange: (field: keyof FormData, value: unknown) => void;
  onNext: () => void;
}

const PersonalStep: React.FC<PersonalStepProps> = ({
  data,
  onChange,
  onNext,
}) => {
  const isValid = data.age !== "" && data.gender !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gold-100 rounded-full flex items-center justify-center">
          <User className="w-8 h-8 text-gold-600" />
        </div>
        <h2 className="font-serif text-2xl text-luxury-black">About You</h2>
        <p className="text-luxury-graphite mt-2">
          Help us personalize your olfactory journey
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Age Input */}
        <div>
          <label className="block text-sm font-medium text-luxury-black mb-2">
            Age
          </label>
          <input
            type="number"
            min={18}
            max={100}
            value={data.age}
            onChange={(e) =>
              onChange("age", e.target.value ? parseInt(e.target.value) : "")
            }
            placeholder="Enter your age"
            className="input-luxury"
          />
          {data.age !== "" && data.age >= 45 && data.age <= 65 && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-sm text-lavender-600"
            >
              ✨ Your age group often benefits from targeted olfactory training
            </motion.p>
          )}
        </div>

        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-luxury-black mb-3">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "female", label: "Female" },
              { value: "male", label: "Male" },
              { value: "non-binary", label: "Non-binary" },
              { value: "prefer-not-to-say", label: "Prefer not to say" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onChange("gender", option.value)}
                className={cn(
                  "px-4 py-3 border-2 rounded-lg text-sm font-medium transition-all",
                  data.gender === option.value
                    ? "border-gold-500 bg-gold-50 text-gold-700"
                    : "border-luxury-pearl bg-white text-luxury-graphite hover:border-gold-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn("btn-gold", !isValid && "opacity-50 cursor-not-allowed")}
        >
          Continue
          <ChevronRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface LifestyleStepProps {
  data: FormData;
  onChange: (field: keyof FormData, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

const LifestyleStep: React.FC<LifestyleStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  const isValid = data.smokingStatus !== "";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-lavender-100 rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-lavender-600" />
        </div>
        <h2 className="font-serif text-2xl text-luxury-black">
          Lifestyle & Health
        </h2>
        <p className="text-luxury-graphite mt-2">
          These factors can influence olfactory sensitivity
        </p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {/* Smoking Status */}
        <div>
          <label className="block text-sm font-medium text-luxury-black mb-3">
            Smoking Status
          </label>
          <div className="space-y-2">
            {[
              {
                value: "never",
                label: "Never smoked",
                description: "Optimal baseline for olfactory training",
              },
              {
                value: "former",
                label: "Former smoker",
                description: "Recovery potential is excellent",
              },
              {
                value: "current",
                label: "Current smoker",
                description: "Training can help maintain sensitivity",
              },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => onChange("smokingStatus", option.value)}
                className={cn(
                  "w-full p-4 border-2 rounded-lg text-left transition-all",
                  data.smokingStatus === option.value
                    ? "border-gold-500 bg-gold-50"
                    : "border-luxury-pearl bg-white hover:border-gold-300"
                )}
              >
                <span className="font-medium text-luxury-black">
                  {option.label}
                </span>
                <span className="block text-sm text-luxury-silver mt-1">
                  {option.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Rhinitis */}
        <div>
          <label className="block text-sm font-medium text-luxury-black mb-3">
            Do you have a history of rhinitis or nasal issues?
          </label>
          <div className="flex gap-3">
            {[
              { value: true, label: "Yes" },
              { value: false, label: "No" },
            ].map((option) => (
              <button
                key={String(option.value)}
                onClick={() => onChange("hasRhinitis", option.value)}
                className={cn(
                  "flex-1 px-6 py-3 border-2 rounded-lg font-medium transition-all",
                  data.hasRhinitis === option.value
                    ? "border-gold-500 bg-gold-50 text-gold-700"
                    : "border-luxury-pearl bg-white text-luxury-graphite hover:border-gold-300"
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
          {data.hasRhinitis && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-sm text-lavender-600"
            >
              🌸 Olfactory training has shown promising results for rhinitis
              recovery
            </motion.p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-luxury-graphite hover:text-luxury-black transition-colors"
        >
          <ChevronLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={cn("btn-gold", !isValid && "opacity-50 cursor-not-allowed")}
        >
          Continue
          <ChevronRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface PreferenceStepProps {
  data: FormData;
  onChange: (field: keyof FormData, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
}

const PreferenceStep: React.FC<PreferenceStepProps> = ({
  data,
  onChange,
  onNext,
  onBack,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-rose-100 rounded-full flex items-center justify-center">
          <Wind className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="font-serif text-2xl text-luxury-black">
          Select Your Signature Scent
        </h2>
        <p className="text-luxury-graphite mt-2">
          Choose the fragrance you'd like to train with
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {perfumes.map((perfume) => (
          <motion.button
            key={perfume.id}
            whileHover={{ y: -4 }}
            onClick={() => onChange("preferredPerfume", perfume.id)}
            className={cn(
              "scent-card p-6 text-left border-2 transition-all",
              data.preferredPerfume === perfume.id
                ? "border-gold-500 bg-gold-50 shadow-gold"
                : "border-luxury-pearl bg-white"
            )}
          >
            {/* Perfume Visual */}
            <div
              className="w-full h-32 rounded-lg mb-4 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${perfume.color}22, ${perfume.color}44)`,
              }}
            >
              <div
                className="w-12 h-20 rounded-t-full"
                style={{
                  background: `linear-gradient(180deg, ${perfume.color}, ${perfume.color}88)`,
                }}
              />
            </div>

            {/* Brand & Name */}
            <p className="text-xs text-luxury-silver uppercase tracking-wider">
              {perfume.brand}
            </p>
            <h3 className="font-serif text-xl text-luxury-black mt-1">
              {perfume.name}
            </h3>

            {/* Scent Family */}
            <p className="text-sm text-luxury-graphite mt-2">{perfume.family}</p>

            {/* Key Notes */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[...perfume.topNotes.slice(0, 2), perfume.dominantNote].map(
                (note) => (
                  <span
                    key={note}
                    className="px-2 py-1 text-xs bg-luxury-pearl rounded-full text-luxury-graphite"
                  >
                    {note}
                  </span>
                )
              )}
            </div>

            {/* Selected indicator */}
            {data.preferredPerfume === perfume.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-3 right-3 w-6 h-6 bg-gold-500 rounded-full flex items-center justify-center"
              >
                <Check className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-luxury-graphite hover:text-luxury-black transition-colors"
        >
          <ChevronLeft className="inline-block mr-2 w-4 h-4" />
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.preferredPerfume}
          className={cn(
            "btn-gold",
            !data.preferredPerfume && "opacity-50 cursor-not-allowed"
          )}
        >
          Continue
          <ChevronRight className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

interface ConfirmStepProps {
  data: FormData;
  onConfirm: () => void;
  onBack: () => void;
}

const ConfirmStep: React.FC<ConfirmStepProps> = ({
  data,
  onConfirm,
  onBack,
}) => {
  const selectedPerfume = perfumes.find((p) => p.id === data.preferredPerfume);

  // Determine training class
  const isMenopauseAge = data.age !== "" && data.age >= 45 && data.age <= 65;
  const hasRiskFactors = data.smokingStatus === "current" || data.hasRhinitis;
  const trainingClass =
    hasRiskFactors || isMenopauseAge
      ? "Recovery Class"
      : data.smokingStatus === "former"
      ? "Maintenance Class"
      : "Prevention Class";

  const classDescriptions: Record<string, string> = {
    "Recovery Class":
      "Focused on restoring and enhancing olfactory function through intensive training protocols.",
    "Maintenance Class":
      "Designed to maintain your current olfactory abilities and prevent decline.",
    "Prevention Class":
      "Proactive training to keep your sense of smell sharp and sensitive.",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold">
          <Sparkles className="w-8 h-8 text-luxury-black" />
        </div>
        <h2 className="font-serif text-2xl text-luxury-black">
          Your Personalized Program
        </h2>
        <p className="text-luxury-graphite mt-2">
          Review your profile and begin your journey
        </p>
      </div>

      <div className="card-luxury p-8 max-w-lg mx-auto space-y-6">
        {/* Training Class Assignment */}
        <div className="text-center pb-6 border-b border-luxury-pearl">
          <p className="text-sm text-luxury-silver uppercase tracking-wider mb-2">
            Assigned To
          </p>
          <h3 className="font-serif text-3xl text-gradient-gold">
            {trainingClass}
          </h3>
          <p className="text-sm text-luxury-graphite mt-2">
            {classDescriptions[trainingClass]}
          </p>
        </div>

        {/* Profile Summary */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-luxury-silver">Age</span>
            <span className="font-medium text-luxury-black">{data.age}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-luxury-silver">Gender</span>
            <span className="font-medium text-luxury-black capitalize">
              {data.gender?.replace("-", " ")}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-luxury-silver">Smoking History</span>
            <span className="font-medium text-luxury-black capitalize">
              {data.smokingStatus} smoker
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-luxury-silver">Rhinitis</span>
            <span className="font-medium text-luxury-black">
              {data.hasRhinitis ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Selected Perfume */}
        {selectedPerfume && (
          <div className="pt-6 border-t border-luxury-pearl">
            <p className="text-sm text-luxury-silver mb-3">Training Scent</p>
            <div className="flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${selectedPerfume.color}22, ${selectedPerfume.color}44)`,
                }}
              >
                <div
                  className="w-6 h-10 rounded-t-full"
                  style={{
                    background: `linear-gradient(180deg, ${selectedPerfume.color}, ${selectedPerfume.color}88)`,
                  }}
                />
              </div>
              <div>
                <p className="text-xs text-luxury-silver">
                  {selectedPerfume.brand}
                </p>
                <p className="font-serif text-lg text-luxury-black">
                  {selectedPerfume.name}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-3 text-luxury-graphite hover:text-luxury-black transition-colors"
        >
          <ChevronLeft className="inline-block mr-2 w-4 h-4" />
          Edit Profile
        </button>
        <button onClick={onConfirm} className="btn-gold">
          Begin Training
          <Sparkles className="inline-block ml-2 w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

// ============ MAIN PROFILING FORM ============

export const ProfilingForm: React.FC = () => {
  const { completeOnboarding } = useStore();
  const [step, setStep] = useState<FormStep>("personal");
  const [formData, setFormData] = useState<FormData>({
    age: "",
    gender: "",
    smokingStatus: "",
    hasRhinitis: false,
    preferredPerfume: "",
  });

  const handleChange = (field: keyof FormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    if (
      formData.age !== "" &&
      formData.gender &&
      formData.smokingStatus &&
      formData.preferredPerfume
    ) {
      const isMenopauseAge = formData.age >= 45 && formData.age <= 65;

      completeOnboarding({
        age: formData.age,
        gender: formData.gender as UserProfile["gender"],
        isMenopausal: isMenopauseAge && formData.gender === "female",
        smokingStatus: formData.smokingStatus as UserProfile["smokingStatus"],
        hasRhinitis: formData.hasRhinitis,
        preferredPerfume: formData.preferredPerfume,
      });
    }
  };

  const steps: FormStep[] = ["personal", "lifestyle", "preference", "confirm"];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="min-h-screen bg-luxury-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl text-luxury-black">
            L'Oréal <span className="text-gradient-gold">ODORable</span>
          </h1>
          <p className="text-luxury-graphite mt-2">
            Your Personal Olfactory Journey Begins
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-12">
          {steps.map((s, index) => (
            <React.Fragment key={s}>
              <div
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  index <= currentStepIndex
                    ? "bg-gold-500"
                    : "bg-luxury-pearl"
                )}
              />
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 h-0.5 transition-colors",
                    index < currentStepIndex ? "bg-gold-500" : "bg-luxury-pearl"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Steps */}
        <AnimatePresence mode="wait">
          {step === "personal" && (
            <PersonalStep
              key="personal"
              data={formData}
              onChange={handleChange}
              onNext={() => setStep("lifestyle")}
            />
          )}
          {step === "lifestyle" && (
            <LifestyleStep
              key="lifestyle"
              data={formData}
              onChange={handleChange}
              onNext={() => setStep("preference")}
              onBack={() => setStep("personal")}
            />
          )}
          {step === "preference" && (
            <PreferenceStep
              key="preference"
              data={formData}
              onChange={handleChange}
              onNext={() => setStep("confirm")}
              onBack={() => setStep("lifestyle")}
            />
          )}
          {step === "confirm" && (
            <ConfirmStep
              key="confirm"
              data={formData}
              onConfirm={handleConfirm}
              onBack={() => setStep("preference")}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilingForm;
