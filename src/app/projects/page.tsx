"use client";

import { useState, useMemo } from "react";
import { PROJECTS, Project } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { 
  Search, 
  Sparkles, 
  Bot, 
  HelpCircle, 
  ArrowRight,
  Wrench
} from "lucide-react";
import Link from "next/link";

export default function ExploreProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedMcu, setSelectedMcu] = useState<string>("All");

  const categories = [
    "All",
    "Autonomous Rovers",
    "Aerial Robotics",
    "Competitive Bots",
    "Maze Solvers",
    "Robotic Arms",
    "IoT & Sensors",
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const mcus = ["All", "Arduino", "ESP32", "Raspberry Pi"];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      // Category filter
      if (selectedCategory !== "All" && project.category !== selectedCategory) {
        return false;
      }
      // Level filter
      if (selectedLevel !== "All" && project.level !== selectedLevel) {
        return false;
      }
      // MCU filter
      if (selectedMcu !== "All") {
        if (!project.microcontroller.toLowerCase().includes(selectedMcu.toLowerCase())) {
          return false;
        }
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(q);
        const matchesDesc = project.description.toLowerCase().includes(q);
        const matchesSensors = project.sensors.some((s) => s.toLowerCase().includes(q));
        const matchesMcu = project.microcontroller.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSensors && !matchesMcu) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, selectedLevel, selectedMcu]);

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-brand-50/60 to-transparent pt-12 pb-8 border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>CHOOSE A ROBOT TO BUILD</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Explore Robot Projects
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Pick a robot that excites you. Every build includes a complete parts list, easy color-coded wiring, and step-by-step instructions made for beginners.
          </p>

          {/* Search Input */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by robot name or component (e.g. Line Follower, Arduino, Ultrasonic)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#E8E2D9] shadow-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>
      </section>

      {/* 2. FILTERS & GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-brand-50 border border-[#E8E2D9]"
              }`}
            >
              {cat === "All" ? "All Projects" : cat}
            </button>
          ))}
        </div>

        {/* Level & MCU Sub-filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-white border border-[#E8E2D9] shadow-subtle">
          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Difficulty:</span>
            <div className="flex items-center gap-1.5">
              {levels.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    selectedLevel === lvl
                      ? "bg-brand-100 text-brand-800 border border-brand-300"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {lvl === "Beginner" && <span className="mr-1">🌱</span>}
                  {lvl === "Intermediate" && <span className="mr-1">⚡</span>}
                  {lvl === "Advanced" && <span className="mr-1">🔥</span>}
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* MCU Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Controller:</span>
            <div className="flex items-center gap-1.5">
              {mcus.map((mcu) => (
                <button
                  key={mcu}
                  onClick={() => setSelectedMcu(mcu)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    selectedMcu === mcu
                      ? "bg-brand-100 text-brand-800 border border-brand-300"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {mcu === "All" ? "All Controllers" : mcu}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <div className="text-xs font-bold text-slate-500">
            Showing <span className="text-brand-600 font-extrabold">{filteredProjects.length}</span> of {PROJECTS.length} Robots
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9] space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-500 mx-auto">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No matching robots found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms or resetting the filter to explore all available robot guides.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLevel("All");
                setSelectedMcu("All");
              }}
              className="px-5 py-2.5 rounded-full bg-brand-500 text-white font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 3. LAB STATS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#E8E2D9] p-8 sm:p-10 shadow-subtle grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600">8</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Beginner Robot Guides</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Ready-to-Run Code</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600">Color-Coded</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Wiring Diagrams</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">Step by Step</div>
            <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">Assembly Checkpoints</div>
          </div>
        </div>
      </section>

      {/* 4. STARTER RECOMMENDATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-brand-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4" /> Need help picking your first robot?
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              New to robotics? Start here!
            </h3>
            <p className="text-sm text-slate-600">
              We recommend the <strong className="text-brand-700">Line Follower Bot</strong>. It teaches you how motors spin, how light sensors see, and how computer code controls a robot in under 4 hours.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/projects/line-follower"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-colors"
            >
              <span>Build Line Follower</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-brand-100 text-brand-700 border border-brand-300 font-bold text-sm transition-colors"
            >
              <Wrench className="w-4 h-4" />
              <span>Ask the Assistant</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
