"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Target,
  Brain,
  Award,
  ArrowRight,
  Play,
  ChevronRight,
} from "lucide-react";
import { useStore, useIsOnboarded, useUserProfile } from "@/store/useStore";
import { perfumes } from "@/data/data";
import { cn } from "@/lib/utils";

export const HomePage: React.FC = () => {
  const isOnboarded = useIsOnboarded();
  const userProfile = useUserProfile();
  const { setCurrentPage } = useStore();

  const handleGetStarted = () => {
    if (isOnboarded) {
      setCurrentPage("training");
    } else {
      setCurrentPage("onboarding");
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: "AI Synesthesia",
      description:
        "Transform your scent perception into unique visual artwork using AI technology",
      color: "from-lavender-400 to-lavender-600",
    },
    {
      icon: Target,
      title: "TDI Training",
      description:
        "Scientific method to measure and improve your olfactory abilities",
      color: "from-emerald-400 to-emerald-600",
    },
    {
      icon: Brain,
      title: "Personalized Journey",
      description:
        "Training programs tailored to your age, lifestyle, and preferences",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Award,
      title: "Track Progress",
      description:
        "Visualize your improvement with detailed charts and weekly reports",
      color: "from-gold-400 to-gold-600",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-black via-luxury-charcoal to-luxury-black" />

        {/* Animated circles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-gold-500/20"
              style={{
                width: `${400 + i * 200}px`,
                height: `${400 + i * 200}px`,
                left: "50%",
                top: "50%",
                marginLeft: `-${(400 + i * 200) / 2}px`,
                marginTop: `-${(400 + i * 200) / 2}px`,
              }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-gold-500/10 border border-gold-500/30 rounded-full text-gold-400 text-sm mb-8">
              L'Oréal Luxury Division
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl text-white mb-6"
          >
            Discover Your{" "}
            <span className="text-gradient-gold">Olfactory</span> Potential
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-luxury-silver max-w-2xl mx-auto mb-10"
          >
            Experience the art of scent through scientific training. Enhance
            your sense of smell with our premium olfactory program powered by AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={handleGetStarted} className="btn-gold group">
              {isOnboarded ? "Continue Training" : "Begin Your Journey"}
              <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 text-white border border-white/30 rounded-none hover:bg-white/10 transition-colors flex items-center gap-2">
              <Play className="w-4 h-4" />
              Watch Demo
            </button>
          </motion.div>
        </div>

      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-luxury-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-500 text-sm font-medium uppercase tracking-wider"
            >
              The Experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-luxury-black mt-4"
            >
              A New Era of Scent Training
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-luxury p-8 text-center group"
                >
                  <div
                    className={cn(
                      "w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                      feature.color
                    )}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-serif text-xl text-luxury-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-luxury-graphite text-sm">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Perfume Selection Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-luxury-pearl to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold-500 text-sm font-medium uppercase tracking-wider"
            >
              Premium Collection
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-4xl md:text-5xl text-luxury-black mt-4"
            >
              Train With Iconic Fragrances
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {perfumes.map((perfume, index) => (
              <motion.div
                key={perfume.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="scent-card bg-white p-8 border border-luxury-pearl"
              >
                <div
                  className="w-full h-48 rounded-lg mb-6 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${perfume.color}22, ${perfume.color}44)`,
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-16 h-28 rounded-t-full shadow-lg"
                    style={{
                      background: `linear-gradient(180deg, ${perfume.color}, ${perfume.color}88)`,
                    }}
                  />
                </div>

                <p className="text-xs text-luxury-silver uppercase tracking-wider">
                  {perfume.brand}
                </p>
                <h3 className="font-serif text-2xl text-luxury-black mt-1 mb-3">
                  {perfume.name}
                </h3>
                <p className="text-sm text-luxury-graphite mb-4">
                  {perfume.family}
                </p>

                <div className="flex flex-wrap gap-2">
                  {[...perfume.topNotes.slice(0, 2), perfume.dominantNote].map(
                    (note) => (
                      <span
                        key={note}
                        className="px-3 py-1 bg-luxury-pearl rounded-full text-xs text-luxury-graphite"
                      >
                        {note}
                      </span>
                    )
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TDI Explanation Section */}
      <section className="py-24 px-4 bg-luxury-black text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-gold-400 text-sm font-medium uppercase tracking-wider"
              >
                Scientific Method
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-4xl md:text-5xl text-white mt-4 mb-6"
              >
                TDI Testing: The Gold Standard
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-luxury-silver mb-8"
              >
                The TDI (Threshold, Discrimination, Identification) test is a
                clinically validated method for measuring olfactory function.
                Our gamified approach makes this scientific assessment engaging
                and effective.
              </motion.p>

              <div className="space-y-6">
                {[
                  {
                    letter: "T",
                    title: "Threshold",
                    desc: "Measure the minimum concentration you can detect",
                  },
                  {
                    letter: "D",
                    title: "Discrimination",
                    desc: "Test your ability to distinguish between scents",
                  },
                  {
                    letter: "I",
                    title: "Identification",
                    desc: "Evaluate your scent recognition and naming",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.letter}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="font-serif text-xl text-luxury-black font-bold">
                        {item.letter}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{item.title}</h4>
                      <p className="text-sm text-luxury-silver mt-1">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold-500/20 to-lavender-500/20 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gradient-gold rounded-full flex items-center justify-center shadow-gold animate-breathe">
                    <Target className="w-16 h-16 text-luxury-black" />
                  </div>
                  <p className="mt-8 text-gold-400 font-serif text-xl">
                    Precision Olfactory Training
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-luxury-white">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-luxury-black mb-6"
          >
            Ready to Awaken Your Senses?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-luxury-graphite text-lg mb-10"
          >
            Join thousands who have enhanced their olfactory abilities through
            our premium training program.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={handleGetStarted}
            className="btn-gold text-lg px-12 py-5"
          >
            Start Free Training
            <ChevronRight className="inline-block ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-black text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl">L'Oréal</h3>
              <p className="text-gradient-gold font-serif">ODORable</p>
            </div>
            <p className="text-luxury-silver text-sm">
              © 2024 L'Oréal Luxury Division. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
