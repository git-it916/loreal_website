"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  ShoppingBag,
  ExternalLink,
  TrendingUp,
  Award,
  Star,
  ChevronRight,
  Sparkles,
  Target,
  Eye,
  Brain,
  Calendar,
} from "lucide-react";
import {
  useLatestTDIScore,
  useUserProfile,
  useTDIScores,
  useCompletionStreak,
} from "@/store/useStore";
import {
  productRecommendations,
  mockWeeklyStats,
  getTDIInterpretation,
  perfumes,
} from "@/data/data";
import { cn } from "@/lib/utils";

// ============ WEEKLY SUMMARY CARD ============

interface WeeklySummaryProps {
  weekStats: {
    sessionsCompleted: number;
    improvement: number;
    avgThreshold: number;
    avgDiscrimination: number;
    avgIdentification: number;
  };
  streak: number;
}

const WeeklySummary: React.FC<WeeklySummaryProps> = ({ weekStats, streak }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-luxury p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl text-luxury-black">Weekly Summary</h3>
        <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium">
          This Week
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            icon: Calendar,
            label: "Sessions",
            value: weekStats.sessionsCompleted,
            color: "text-blue-500",
            bgColor: "bg-blue-100",
          },
          {
            icon: TrendingUp,
            label: "Improvement",
            value: `+${weekStats.improvement.toFixed(1)}%`,
            color: "text-emerald-500",
            bgColor: "bg-emerald-100",
          },
          {
            icon: Award,
            label: "Streak",
            value: `${streak} days`,
            color: "text-orange-500",
            bgColor: "bg-orange-100",
          },
          {
            icon: Star,
            label: "Avg Score",
            value: Math.round(
              weekStats.avgThreshold +
                weekStats.avgDiscrimination +
                weekStats.avgIdentification
            ),
            color: "text-purple-500",
            bgColor: "bg-purple-100",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div
                className={cn(
                  "w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3",
                  stat.bgColor
                )}
              >
                <Icon className={cn("w-5 h-5", stat.color)} />
              </div>
              <p className="font-serif text-2xl text-luxury-black">{stat.value}</p>
              <p className="text-xs text-luxury-silver mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bars */}
      <div className="mt-8 space-y-4">
        {[
          { label: "Threshold", value: weekStats.avgThreshold, max: 16 },
          { label: "Discrimination", value: weekStats.avgDiscrimination, max: 16 },
          { label: "Identification", value: weekStats.avgIdentification, max: 16 },
        ].map((metric, index) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-luxury-graphite">{metric.label}</span>
              <span className="font-medium text-luxury-black">
                {metric.value.toFixed(1)}/{metric.max}
              </span>
            </div>
            <div className="h-2 bg-luxury-pearl rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                className="h-full bg-gradient-gold rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// ============ PRODUCT RECOMMENDATION CARD ============

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    matchScore: number;
    scentProfile: string[];
    imageUrl: string;
    shopUrl: string;
    reason: string;
  };
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="card-luxury p-6 hover:shadow-gold transition-shadow"
    >
      {/* Match Score Badge */}
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
          {product.matchScore}% Match
        </span>
        {index === 0 && (
          <span className="px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" />
            Top Pick
          </span>
        )}
      </div>

      {/* Product Visual */}
      <div className="w-full h-48 bg-gradient-to-br from-luxury-pearl to-gold-100 rounded-lg mb-4 flex items-center justify-center">
        <div className="w-16 h-28 bg-gradient-to-b from-gold-400 to-gold-600 rounded-t-full shadow-gold" />
      </div>

      {/* Product Info */}
      <p className="text-xs text-luxury-silver uppercase tracking-wider">
        {product.brand}
      </p>
      <h4 className="font-serif text-xl text-luxury-black mt-1">{product.name}</h4>

      {/* Scent Profile */}
      <div className="flex flex-wrap gap-2 mt-3">
        {product.scentProfile.map((note) => (
          <span
            key={note}
            className="px-2 py-1 bg-lavender-100 text-lavender-700 rounded text-xs"
          >
            {note}
          </span>
        ))}
      </div>

      {/* Recommendation Reason */}
      <p className="text-sm text-luxury-graphite mt-4 italic">
        "{product.reason}"
      </p>

      {/* Price & CTA */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-luxury-pearl">
        <span className="font-serif text-2xl text-luxury-black">
          ${product.price}
        </span>
        <a
          href={product.shopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold py-2 px-4 text-sm flex items-center gap-2"
        >
          Shop Now
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
};

// ============ INSIGHTS SECTION ============

interface InsightsSectionProps {
  score: {
    threshold: number;
    discrimination: number;
    identification: number;
    total: number;
    percentile: number;
  };
}

const InsightsSection: React.FC<InsightsSectionProps> = ({ score }) => {
  const insights = [
    {
      icon: Target,
      title: "Threshold Strength",
      description:
        score.threshold >= 12
          ? "Excellent scent detection range. You can perceive subtle fragrances at greater distances."
          : score.threshold >= 8
          ? "Good detection ability. Continue training to expand your perception range."
          : "Room for improvement. Focus on distance exercises in your training.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: Eye,
      title: "Discrimination Ability",
      description:
        score.discrimination >= 12
          ? "Superior ability to distinguish between similar scents. Perfect for fragrance layering."
          : score.discrimination >= 8
          ? "Solid discrimination skills. You can tell apart most scent families."
          : "Developing your palate. Practice with contrasting scent families.",
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: Brain,
      title: "Identification Skills",
      description:
        score.identification >= 12
          ? "Impressive scent memory and naming accuracy. You have a refined olfactory vocabulary."
          : score.identification >= 8
          ? "Good scent recognition. Expanding your fragrance knowledge will help further."
          : "Building your scent library. Expose yourself to more fragrance families.",
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="card-luxury p-8"
    >
      <h3 className="font-serif text-2xl text-luxury-black mb-6">
        Personalized Insights
      </h3>

      <div className="space-y-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <motion.div
              key={insight.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex gap-4"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0",
                  insight.bgColor
                )}
              >
                <Icon className={cn("w-6 h-6", insight.color)} />
              </div>
              <div>
                <h4 className="font-medium text-luxury-black">{insight.title}</h4>
                <p className="text-sm text-luxury-graphite mt-1">
                  {insight.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-gold-50 rounded-lg border border-gold-200">
        <p className="text-luxury-graphite">{getTDIInterpretation(score)}</p>
      </div>
    </motion.div>
  );
};

// ============ MAIN REPORT PAGE ============

export const ReportPage: React.FC = () => {
  const userProfile = useUserProfile();
  const latestScore = useLatestTDIScore();
  const tdiScores = useTDIScores();
  const streak = useCompletionStreak();

  const displayScore = latestScore || {
    threshold: 10,
    discrimination: 12,
    identification: 13,
    total: 35,
    percentile: 65,
  };

  const weekStats = mockWeeklyStats[mockWeeklyStats.length - 1];
  const selectedPerfume = perfumes.find(
    (p) => p.id === userProfile?.preferredPerfume
  );

  return (
    <div className="min-h-screen bg-luxury-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl text-luxury-black mb-2"
            >
              Weekly Report
            </motion.h1>
            <p className="text-luxury-graphite">
              Your olfactory training summary and personalized recommendations
            </p>
          </div>

          <div className="flex gap-3 mt-4 md:mt-0">
            <button className="btn-outline-gold py-2 px-4 text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
            <button className="btn-outline-gold py-2 px-4 text-sm flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>

        {/* User Profile Card */}
        {userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-luxury p-6 mb-8 flex items-center gap-6"
          >
            <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="font-serif text-2xl text-luxury-black">
                {userProfile.gender === "female" ? "👩" : "🧑"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm text-luxury-silver">
                {userProfile.trainingClass === "recovery"
                  ? "Recovery Class"
                  : userProfile.trainingClass === "maintenance"
                  ? "Maintenance Class"
                  : "Prevention Class"}
              </p>
              <h3 className="font-serif text-xl text-luxury-black">
                {userProfile.age} years old •{" "}
                {tdiScores.length || 14} sessions completed
              </h3>
            </div>
            {selectedPerfume && (
              <div className="text-right">
                <p className="text-xs text-luxury-silver">Training with</p>
                <p className="font-medium text-luxury-black">
                  {selectedPerfume.brand} {selectedPerfume.name}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Weekly Summary */}
          <WeeklySummary weekStats={weekStats} streak={streak || 7} />

          {/* Insights */}
          <InsightsSection score={displayScore} />
        </div>

        {/* Product Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-5 h-5 text-gold-500" />
                <span className="text-sm text-gold-600 font-medium uppercase tracking-wider">
                  Curated For You
                </span>
              </div>
              <h2 className="font-serif text-3xl text-luxury-black">
                Recommended Fragrances
              </h2>
              <p className="text-luxury-graphite mt-2">
                Based on your olfactory profile and training performance
              </p>
            </div>
            <Sparkles className="w-8 h-8 text-gold-500" />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {productRecommendations.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Continue Training CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 bg-gradient-to-r from-luxury-black to-luxury-charcoal rounded-lg"
        >
          <h3 className="font-serif text-2xl text-white mb-3">
            Ready for Your Next Session?
          </h3>
          <p className="text-luxury-silver mb-6">
            Consistent training is key to enhancing your olfactory abilities
          </p>
          <button className="btn-gold">
            Start Today's Training
            <ChevronRight className="inline-block ml-2 w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ReportPage;
