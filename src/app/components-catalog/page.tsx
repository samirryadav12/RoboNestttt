"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { COMPONENTS, ComponentItem } from "@/data/components";
import { 
  Search, 
  Layers, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  Plus, 
  Check, 
  SlidersHorizontal,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function ComponentLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});

  const categories = [
    { label: "All", count: COMPONENTS.length },
    { label: "Microcontrollers", count: COMPONENTS.filter(c => c.category === "Microcontrollers").length },
    { label: "Sensors", count: COMPONENTS.filter(c => c.category === "Sensors").length },
    { label: "Motors & Actuators", count: COMPONENTS.filter(c => c.category === "Motors & Actuators").length },
    { label: "Motor Drivers", count: COMPONENTS.filter(c => c.category === "Motor Drivers").length },
    { label: "Power & Batteries", count: COMPONENTS.filter(c => c.category === "Power & Batteries").length },
  ];

  const filteredComponents = useMemo(() => {
    return COMPONENTS.filter((comp) => {
      if (selectedCategory !== "All" && comp.category !== selectedCategory) {
        return false;
      }
      if (inStockOnly && !comp.inStock) {
        return false;
      }
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesDesc = comp.description.toLowerCase().includes(q);
        const matchesCategory = comp.category.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesCategory) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedCategory, inStockOnly]);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const downloadBOM = () => {
    const csvContent = "ID,Name,Category,Price,Voltage,Interface\n" +
      COMPONENTS.map(c => `"${c.id}","${c.name}","${c.category}","${c.price}","${c.voltage}","${c.interface}"`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "RoboNest_Components_Catalog.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-brand-50/70 to-transparent pt-12 pb-8 border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-brand-500" />
            <span>ROBOT PARTS CATALOG</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Robot Parts Library
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Learn about every part used in our robots. Each component includes what it does, how it works, and which robot projects use it.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto pt-2">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search parts (e.g. Arduino, motor, sensor, battery)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-[#E8E2D9] shadow-sm text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
          </div>
        </div>
      </section>

      {/* 2. CATEGORY PILLS & CONTROLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  selectedCategory === cat.label
                    ? "bg-brand-500 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-brand-50 border border-[#E8E2D9]"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  selectedCategory === cat.label ? "bg-white text-brand-700" : "bg-slate-100 text-slate-600"
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Stock toggle and export */}
          <div className="flex items-center gap-3 shrink-0">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded border-slate-300 focus:ring-brand-500"
              />
              <span>In Stock Only</span>
            </label>
            <button
              onClick={downloadBOM}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-brand-50 border border-[#E8E2D9] text-xs font-bold text-slate-700 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-brand-500" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* 3. COMPONENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((item) => {
            const isSaved = !!savedItems[item.id];
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-[#E8E2D9] p-5 shadow-subtle hover:shadow-lift transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Photo & Tag */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-brand-50/50">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[11px] font-bold text-brand-700 px-2.5 py-1 rounded-full shadow-sm">
                      {item.category}
                    </div>
                    <div className="absolute top-3 right-3 bg-slate-900/90 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                      {item.voltage}
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-lg text-slate-900 leading-snug">
                      {item.name}
                    </h3>
                    {item.whatItIs && (
                      <div className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-1 rounded-lg border border-brand-100">
                        What it is: {item.whatItIs}
                      </div>
                    )}
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Electrical Specs Table */}
                  <div className="bg-[#FAF7F2] rounded-2xl p-3 border border-[#E8E2D9] space-y-1.5 text-xs">
                    {item.specs.map((sp, i) => (
                      <div key={i} className="flex justify-between items-center text-slate-600">
                        <span className="text-[11px] text-slate-500">{sp.label}:</span>
                        <span className="font-bold text-slate-800 font-mono text-[11px]">{sp.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Used in projects */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Used In Robots:</span>
                    <div className="flex flex-wrap gap-1">
                      {item.featuredIn.map((proj, i) => (
                        <span key={i} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-brand-100/70 text-brand-800">
                          {proj}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Bar: Price & Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="text-xl font-extrabold text-slate-900">{item.price}</div>
                    <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.stockCount} in stock
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSave(item.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      isSaved
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-brand-50 text-brand-700 hover:bg-brand-500 hover:text-white"
                    }`}
                  >
                    {isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    <span>{isSaved ? "Saved" : "Save Part"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CLASSROOM KITS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-brand-600 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> RoboNest Classroom &amp; Group Kits
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Need Parts for a Group or Classroom?
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We provide complete, pre-tested parts kits with beginner guides and spare parts so anyone can learn robotics with confidence.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={downloadBOM}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Parts Checklist</span>
            </button>
            <Link
              href="/availability"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-brand-100 text-brand-700 border border-brand-300 font-bold text-sm transition-colors"
            >
              <span>Check Store Availability</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
