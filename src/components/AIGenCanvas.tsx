"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Plus,
  Wand2,
  ImageIcon,
  RefreshCw,
  ArrowRight,
} from "lucide-react";
import { useStore, useTraining } from "@/store/useStore";
import { scentKeywordCategories, perfumes } from "@/data/data";
import { cn } from "@/lib/utils";

// ============ KEYWORD CHIP ============

interface KeywordChipProps {
  keyword: string;
  isSelected: boolean;
  onClick: () => void;
}

const KeywordChip: React.FC<KeywordChipProps> = ({
  keyword,
  isSelected,
  onClick,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium transition-all",
      isSelected
        ? "bg-gold-500 text-white shadow-gold"
        : "bg-luxury-pearl text-luxury-graphite hover:bg-gold-100 hover:text-gold-700"
    )}
  >
    {isSelected && <X className="inline-block w-3 h-3 mr-1" />}
    {keyword}
  </motion.button>
);

// ============ CATEGORY SECTION ============

interface CategorySectionProps {
  title: string;
  keywords: string[];
  selectedKeywords: string[];
  onToggle: (keyword: string) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  keywords,
  selectedKeywords,
  onToggle,
}) => (
  <div className="space-y-3">
    <h4 className="text-sm font-medium text-luxury-silver uppercase tracking-wider">
      {title}
    </h4>
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword) => (
        <KeywordChip
          key={keyword}
          keyword={keyword}
          isSelected={selectedKeywords.includes(keyword)}
          onClick={() => onToggle(keyword)}
        />
      ))}
    </div>
  </div>
);

// ============ GENERATED IMAGE DISPLAY ============

interface ImageDisplayProps {
  imageUrl: string | null;
  isGenerating: boolean;
  brandImageUrl: string;
  keywords: string[];
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  imageUrl,
  isGenerating,
  brandImageUrl,
  keywords,
}) => (
  <div className="grid md:grid-cols-2 gap-8">
    {/* Generated Image */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-lavender-500" />
        <span className="text-sm font-medium text-luxury-black">
          Your Visualization
        </span>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-lavender-100 to-lavender-200">
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-4 border-lavender-300 border-t-lavender-600 rounded-full"
              />
              <p className="mt-4 text-lavender-700 font-medium">
                Generating your scent visualization...
              </p>
              <div className="mt-2 flex gap-1">
                {keywords.slice(0, 3).map((kw, i) => (
                  <motion.span
                    key={kw}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="px-2 py-1 bg-lavender-200/50 rounded text-xs text-lavender-700"
                  >
                    {kw}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ) : imageUrl ? (
            <motion.img
              key="image"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              src={imageUrl}
              alt="Generated scent visualization"
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-lavender-400"
            >
              <ImageIcon className="w-16 h-16 mb-4" />
              <p className="text-sm">Your visualization will appear here</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keywords overlay */}
        {imageUrl && keywords.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury-black/80 to-transparent"
          >
            <div className="flex flex-wrap gap-1">
              {keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-xs text-white"
                >
                  {kw}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <p className="text-xs text-luxury-silver text-center italic">
        Powered by AI Synesthesia • Gemini Nano
      </p>
    </motion.div>

    {/* Brand Image */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-2">
        <Wand2 className="w-4 h-4 text-gold-500" />
        <span className="text-sm font-medium text-luxury-black">
          Brand Vision
        </span>
      </div>

      <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gold-100 to-gold-200">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-36 bg-gradient-to-b from-gold-400 to-gold-600 rounded-t-full flex items-center justify-center shadow-gold">
            <Sparkles className="w-8 h-8 text-white/80" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-luxury-black/60 to-transparent">
          <p className="text-white text-sm font-medium text-center">
            Official Brand Imagery
          </p>
        </div>
      </div>

      <p className="text-xs text-luxury-silver text-center italic">
        Compare your perception with the intended brand experience
      </p>
    </motion.div>
  </div>
);

// ============ MAIN AI GEN CANVAS ============

export const AIGenCanvas: React.FC = () => {
  const training = useTraining();
  const { addKeyword, removeKeyword, clearKeywords, generateImage, selectPerfume, setCurrentPage } =
    useStore();
  const [activeCategory, setActiveCategory] = useState<string>("emotions");

  const selectedPerfume = perfumes.find(
    (p) => p.id === training.selectedPerfumeId
  );

  const handleKeywordToggle = (keyword: string) => {
    if (training.keywords.includes(keyword)) {
      removeKeyword(keyword);
    } else if (training.keywords.length < 5) {
      addKeyword(keyword);
    }
  };

  const handleGenerate = async () => {
    if (training.keywords.length > 0) {
      await generateImage();
    }
  };

  const handleStartTDI = () => {
    setCurrentPage("tdi");
  };

  const categories = Object.entries(scentKeywordCategories);

  return (
    <div className="min-h-screen bg-luxury-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-lavender-100 rounded-full text-lavender-700 text-sm mb-4"
          >
            <Sparkles className="w-4 h-4" />
            AI Synesthesia Experience
          </motion.div>
          <h1 className="font-serif text-4xl text-luxury-black mb-3">
            Visualize Your Scent
          </h1>
          <p className="text-luxury-graphite max-w-2xl mx-auto">
            Smell your selected perfume and describe what you experience using
            keywords. Our AI will transform your sensory perception into a
            unique visual artwork.
          </p>
        </div>

        {/* Selected Perfume Info */}
        {selectedPerfume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card-luxury p-6 mb-8 flex items-center gap-6"
          >
            <div
              className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${selectedPerfume.color}22, ${selectedPerfume.color}44)`,
              }}
            >
              <div
                className="w-8 h-14 rounded-t-full"
                style={{
                  background: `linear-gradient(180deg, ${selectedPerfume.color}, ${selectedPerfume.color}88)`,
                }}
              />
            </div>
            <div>
              <p className="text-xs text-luxury-silver uppercase tracking-wider">
                Training With
              </p>
              <h3 className="font-serif text-xl text-luxury-black">
                {selectedPerfume.brand} {selectedPerfume.name}
              </h3>
              <p className="text-sm text-luxury-graphite mt-1">
                {selectedPerfume.description}
              </p>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Keyword Selection */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl text-luxury-black mb-2">
                Describe Your Experience
              </h2>
              <p className="text-luxury-graphite text-sm">
                Select up to 5 keywords that capture what you smell (
                {training.keywords.length}/5)
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-luxury-pearl">
              {categories.map(([key, _]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                    activeCategory === key
                      ? "bg-luxury-black text-white"
                      : "bg-luxury-pearl text-luxury-graphite hover:bg-gold-100"
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            {/* Keywords */}
            <AnimatePresence mode="wait">
              {categories.map(
                ([key, keywords]) =>
                  activeCategory === key && (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <CategorySection
                        title={key}
                        keywords={keywords}
                        selectedKeywords={training.keywords}
                        onToggle={handleKeywordToggle}
                      />
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Selected Keywords Summary */}
            {training.keywords.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="p-4 bg-gold-50 rounded-lg border border-gold-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-luxury-black">
                    Selected Keywords
                  </span>
                  <button
                    onClick={clearKeywords}
                    className="text-xs text-luxury-silver hover:text-luxury-black transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {training.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gold-500 text-white rounded-full text-sm"
                    >
                      {kw}
                      <button
                        onClick={() => removeKeyword(kw)}
                        className="hover:bg-gold-600 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Generate Button */}
            <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                disabled={training.keywords.length === 0 || training.isGenerating}
                className={cn(
                  "btn-gold flex-1",
                  (training.keywords.length === 0 || training.isGenerating) &&
                    "opacity-50 cursor-not-allowed"
                )}
              >
                {training.isGenerating ? (
                  <>
                    <RefreshCw className="inline-block w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="inline-block w-4 h-4 mr-2" />
                    Generate Visualization
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Image Display */}
          <div className="space-y-8">
            <ImageDisplay
              imageUrl={training.generatedImageUrl}
              isGenerating={training.isGenerating}
              brandImageUrl=""
              keywords={training.keywords}
            />

            {/* Continue to TDI */}
            {training.generatedImageUrl && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="divider-gold my-6" />
                <p className="text-luxury-graphite mb-4">
                  Ready to test your olfactory abilities?
                </p>
                <button onClick={handleStartTDI} className="btn-dark">
                  Continue to TDI Training
                  <ArrowRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIGenCanvas;
