"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import {
  TrendingUp,
  Calendar,
  Award,
  Target,
  Eye,
  Brain,
  Flame,
  Flower2,
  ChevronRight,
} from "lucide-react";
import {
  useTDIScores,
  useDailyProgress,
  useLatestTDIScore,
  useCompletionStreak,
  useUserProfile,
} from "@/store/useStore";
import {
  ageGroupAverage,
  mockWeeklyStats,
  mockDailyProgress,
  getProgressComment,
  getTDIInterpretation,
} from "@/data/data";
import { cn } from "@/lib/utils";

// ============ TDI RADAR CHART ============

interface TDIRadarChartProps {
  userScore: {
    threshold: number;
    discrimination: number;
    identification: number;
  };
  averageScore?: {
    threshold: number;
    discrimination: number;
    identification: number;
  };
}

export const TDIRadarChart: React.FC<TDIRadarChartProps> = ({
  userScore,
  averageScore = ageGroupAverage,
}) => {
  const data = [
    {
      subject: "Threshold",
      user: userScore.threshold,
      average: averageScore.threshold,
      fullMark: 16,
    },
    {
      subject: "Discrimination",
      user: userScore.discrimination,
      average: averageScore.discrimination,
      fullMark: 16,
    },
    {
      subject: "Identification",
      user: userScore.identification,
      average: averageScore.identification,
      fullMark: 16,
    },
  ];

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#E5E5E5" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#404040", fontSize: 12 }}
          />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 16]}
            tick={{ fill: "#9A9A9A", fontSize: 10 }}
          />
          <Radar
            name="Age Group Average"
            dataKey="average"
            stroke="#9A83D0"
            fill="#9A83D0"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Your Score"
            dataKey="user"
            stroke="#C6A665"
            fill="#C6A665"
            fillOpacity={0.4}
            strokeWidth={3}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "none",
              borderRadius: "8px",
              color: "#FAFAFA",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============ PROGRESS AREA CHART ============

interface ProgressChartProps {
  data: Array<{
    week: string;
    avgThreshold: number;
    avgDiscrimination: number;
    avgIdentification: number;
  }>;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartData = data.map((week) => ({
    name: week.week,
    total: week.avgThreshold + week.avgDiscrimination + week.avgIdentification,
    threshold: week.avgThreshold,
    discrimination: week.avgDiscrimination,
    identification: week.avgIdentification,
  }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C6A665" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#C6A665" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fill: "#9A9A9A", fontSize: 12 }}
            axisLine={{ stroke: "#E5E5E5" }}
          />
          <YAxis
            tick={{ fill: "#9A9A9A", fontSize: 12 }}
            axisLine={{ stroke: "#E5E5E5" }}
            domain={[0, 48]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1A1A1A",
              border: "none",
              borderRadius: "8px",
              color: "#FAFAFA",
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#C6A665"
            fill="url(#colorTotal)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// ============ HEATMAP CALENDAR ============

interface HeatmapCalendarProps {
  data: Array<{
    date: string;
    completed: boolean;
    score?: number;
  }>;
}

export const HeatmapCalendar: React.FC<HeatmapCalendarProps> = ({ data }) => {
  // Generate calendar grid for current month
  const calendarData = useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();

    const days: Array<{
      date: string | null;
      completed: boolean;
      score?: number;
      isToday: boolean;
    }> = [];

    // Add empty cells for padding
    for (let i = 0; i < startPadding; i++) {
      days.push({ date: null, completed: false, isToday: false });
    }

    // Add actual days
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const dayData = data.find((d) => d.date === dateStr);
      const isToday = day === today.getDate();

      days.push({
        date: dateStr,
        completed: dayData?.completed ?? false,
        score: dayData?.score,
        isToday,
      });
    }

    return days;
  }, [data]);

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthName = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg text-luxury-black">{monthName}</h4>
        <div className="flex items-center gap-2 text-xs text-luxury-silver">
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-luxury-pearl" />
            Incomplete
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-3 rounded bg-gold-500" />
            Complete
          </span>
        </div>
      </div>

      {/* Week day headers */}
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center text-xs text-luxury-silver"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarData.map((day, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.01 }}
            className={cn(
              "h-10 rounded-lg flex items-center justify-center relative",
              day.date === null
                ? "bg-transparent"
                : day.completed
                ? "bg-gradient-gold"
                : "bg-luxury-pearl",
              day.isToday && "ring-2 ring-luxury-black ring-offset-2"
            )}
          >
            {day.date && (
              <>
                {day.completed ? (
                  <Flower2 className="w-5 h-5 text-luxury-black" />
                ) : (
                  <span className="text-xs text-luxury-silver">
                    {parseInt(day.date.split("-")[2])}
                  </span>
                )}
                {day.score && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full text-[8px] text-white flex items-center justify-center">
                    {day.score}
                  </span>
                )}
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============ SCORE BREAKDOWN CARD ============

interface ScoreBreakdownProps {
  score: {
    threshold: number;
    discrimination: number;
    identification: number;
    total: number;
    percentile: number;
  };
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ score }) => {
  const metrics = [
    {
      icon: Target,
      label: "Threshold",
      value: score.threshold,
      max: 16,
      color: "text-emerald-500",
      bgColor: "bg-emerald-100",
    },
    {
      icon: Eye,
      label: "Discrimination",
      value: score.discrimination,
      max: 16,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      icon: Brain,
      label: "Identification",
      value: score.identification,
      max: 16,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const percentage = (metric.value / metric.max) * 100;

        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4"
          >
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                metric.bgColor
              )}
            >
              <Icon className={cn("w-5 h-5", metric.color)} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-luxury-graphite">
                  {metric.label}
                </span>
                <span className="text-sm font-medium text-luxury-black">
                  {metric.value}/{metric.max}
                </span>
              </div>
              <div className="h-2 bg-luxury-pearl rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.8 }}
                  className={cn("h-full rounded-full", "bg-gradient-gold")}
                />
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="divider-gold my-4" />

      <div className="flex items-center justify-between">
        <span className="font-medium text-luxury-black">Total TDI Score</span>
        <div className="text-right">
          <span className="font-serif text-3xl text-gradient-gold">
            {score.total}
          </span>
          <span className="text-luxury-silver">/48</span>
        </div>
      </div>

      <p className="text-sm text-luxury-graphite italic">
        {getTDIInterpretation(score)}
      </p>
    </div>
  );
};

// ============ STREAK COUNTER ============

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => (
  <motion.div
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-rose-50 rounded-lg border border-orange-200"
  >
    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-rose-500 rounded-full flex items-center justify-center">
      <Flame className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs text-luxury-silver uppercase tracking-wider">
        Current Streak
      </p>
      <p className="font-serif text-2xl text-luxury-black">
        {streak} {streak === 1 ? "Day" : "Days"}
      </p>
    </div>
    {streak >= 7 && (
      <div className="ml-auto">
        <Award className="w-8 h-8 text-gold-500" />
      </div>
    )}
  </motion.div>
);

// ============ MAIN DASHBOARD ============

export const DashboardCharts: React.FC = () => {
  const userProfile = useUserProfile();
  const tdiScores = useTDIScores();
  const latestScore = useLatestTDIScore();
  const streak = useCompletionStreak();
  const dailyProgress = useDailyProgress();

  // Use mock data if no real data available
  const displayScore = latestScore || {
    threshold: 10,
    discrimination: 12,
    identification: 13,
    total: 35,
    percentile: 65,
  };

  const displayProgress =
    dailyProgress.length > 0 ? dailyProgress : mockDailyProgress;
  const weeklyStats = mockWeeklyStats;

  const currentWeek = weeklyStats[weeklyStats.length - 1];
  const previousWeek = weeklyStats[weeklyStats.length - 2];
  const progressComment = getProgressComment(currentWeek, previousWeek);

  return (
    <div className="min-h-screen bg-luxury-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl text-luxury-black mb-2"
          >
            My Olfactory Journey
          </motion.h1>
          <p className="text-luxury-graphite">
            Track your progress and discover your scent potential
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Sessions",
              value: tdiScores.length || 14,
              icon: Calendar,
              color: "text-blue-500",
            },
            {
              label: "Average Score",
              value: displayScore.total,
              icon: Target,
              color: "text-emerald-500",
            },
            {
              label: "Percentile",
              value: `${displayScore.percentile}%`,
              icon: TrendingUp,
              color: "text-purple-500",
            },
            {
              label: "Day Streak",
              value: streak || 7,
              icon: Flame,
              color: "text-orange-500",
            },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-luxury p-6 text-center"
              >
                <Icon className={cn("w-6 h-6 mx-auto mb-2", stat.color)} />
                <p className="text-2xl font-serif text-luxury-black">
                  {stat.value}
                </p>
                <p className="text-xs text-luxury-silver mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {/* TDI Radar Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-luxury-black">
                  TDI Performance
                </h3>
                <div className="flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-gold-500" />
                    You
                  </span>
                  <span className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-lavender-500" />
                    Avg
                  </span>
                </div>
              </div>
              <TDIRadarChart userScore={displayScore} />
            </motion.div>

            {/* Progress Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-luxury-black">
                  Weekly Progress
                </h3>
                <TrendingUp className="w-5 h-5 text-emerald-500" />
              </div>
              <ProgressChart data={weeklyStats} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Score Breakdown */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-luxury p-6"
            >
              <h3 className="font-serif text-xl text-luxury-black mb-6">
                Latest Score Breakdown
              </h3>
              <ScoreBreakdown score={displayScore} />
            </motion.div>

            {/* Training Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="card-luxury p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl text-luxury-black">
                  Training Calendar
                </h3>
                <Calendar className="w-5 h-5 text-gold-500" />
              </div>
              <HeatmapCalendar data={displayProgress} />
            </motion.div>

            {/* Streak Counter */}
            <StreakCounter streak={streak || 7} />
          </div>
        </div>

        {/* Dynamic Comment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-gradient-to-r from-lavender-50 to-gold-50 rounded-lg border border-lavender-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-lavender-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-luxury-black mb-1">
                Weekly Analysis
              </h4>
              <p className="text-luxury-graphite">{progressComment}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardCharts;
