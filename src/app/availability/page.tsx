"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PROJECTS } from "@/data/projects";
import { getStoreBundlesForProject, getStorePricingForProject } from "@/data/stores";
import { 
  Download, 
  Printer, 
  ExternalLink, 
  ShoppingCart, 
  ArrowRight, 
  Truck, 
  AlertCircle,
  Building2,
  RefreshCw,
  Search,
  Check,
  MapPin,
  Clock,
  Layers,
  Award
} from "lucide-react";

function AvailabilityContent() {
  const searchParams = useSearchParams();
  const projectParam = searchParams.get("project") || "";

  const initialProject = PROJECTS.find(
    (p) => p.slug === projectParam || p.title.toLowerCase().includes(projectParam.toLowerCase())
  ) || PROJECTS[0];

  const [selectedSlug, setSelectedSlug] = useState<string>(initialProject.slug);
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (projectParam) {
      const match = PROJECTS.find(
        (p) => p.slug === projectParam || p.title.toLowerCase().includes(projectParam.toLowerCase())
      );
      if (match) {
        setSelectedSlug(match.slug);
      }
    }
  }, [projectParam]);

  const currentProject = PROJECTS.find((p) => p.slug === selectedSlug) || PROJECTS[0];
  const storeBundles = getStoreBundlesForProject(currentProject);
  const storePricing = getStorePricingForProject(currentProject);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const filteredPricing = storePricing.filter((item) =>
    item.partName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.spec && item.spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleExportCSV = () => {
    const csvRows = [
      ["Part Name", "SKU", "Robu.in (INR)", "Quartz Components (INR)", "Robocraze (INR)", "Zbotic (INR)"],
      ...storePricing.map((row) => [
        `"${row.partName}"`,
        `"${row.sku}"`,
        `"${row.robu.price} (${row.robu.stockNote})"`,
        `"${row.quartz.price} (${row.quartz.stockNote})"`,
        `"${row.robocraze.price} (${row.robocraze.stockNote})"`,
        `"${row.zbotic.price} (${row.zbotic.stockNote})"`,
      ]),
    ];
    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `RoboNest_${currentProject.slug}_Store_Matrix_INR.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-brand-50/70 to-transparent pt-12 pb-8 border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>PARTS STORES &amp; DELIVERY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Where to Buy Parts (India)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Find where to buy every component in India with real stock levels, estimated delivery times, and direct store links. All prices in Indian Rupees (₹).
          </p>

          {/* Project Selector Pills */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
            {PROJECTS.map((p) => {
              const isSelected = p.slug === selectedSlug;
              return (
                <button
                  key={p.slug}
                  onClick={() => setSelectedSlug(p.slug)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand-500 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-[#E8E2D9] hover:bg-brand-50"
                  }`}
                >
                  <span>{p.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}>
                    {p.bom?.length || p.partsCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Controls Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-brand-50 border border-[#E8E2D9] text-xs font-bold text-slate-700 shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-brand-500" />
              <span>Export Parts List (.csv)</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white hover:bg-brand-50 border border-[#E8E2D9] text-xs font-bold text-slate-700 shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print Parts List</span>
            </button>
            <button
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
              <span>Refresh Stock</span>
            </button>
          </div>

          {/* Key Insights Pill Row */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-semibold shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span><strong>Has All Parts:</strong> Robu.in &amp; Quartz ({currentProject.bom?.length || 0}/{currentProject.bom?.length || 0}, 100%)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold shadow-xs">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>Fastest Delivery:</strong> Robu.in (2–3 Days Air)</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-semibold shadow-xs">
              <Layers className="w-3.5 h-3.5 text-stone-600" />
              <span><strong>Selected Robot:</strong> {currentProject.title} ({currentProject.bom?.length || 0} Parts)</span>
            </span>
          </div>
        </div>
      </section>

      {/* 2. STORE FULFILLMENT PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-brand-600 font-extrabold text-xs uppercase tracking-wider">Trusted Stores</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Compare Stores &amp; Delivery Times for {currentProject.title}
          </h2>
          <p className="text-sm text-slate-600">
            See which store has all parts in stock, how fast they deliver, and order directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeBundles.map((store) => (
            <div
              key={store.id}
              className={`bg-white rounded-3xl p-6 border shadow-subtle flex flex-col justify-between space-y-6 transition-all duration-300 hover:shadow-lift ${
                store.isTopStock ? "border-brand-500 ring-2 ring-brand-500/20" : "border-[#E8E2D9]"
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge & Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full truncate ${
                    store.isTopStock
                      ? "bg-brand-500 text-white shadow-xs"
                      : "bg-slate-100 text-slate-700"
                  }`}>
                    {store.badge}
                  </span>
                  <span className="text-xs font-bold text-amber-600 flex items-center gap-1 shrink-0">
                    ★ {store.rating}
                  </span>
                </div>

                {/* Name, Hyperlink & Origin */}
                <div>
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-2xl font-extrabold text-slate-900">{store.name}</h3>
                    <a
                      href={store.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline inline-flex items-center gap-0.5"
                      title={`Visit ${store.name}`}
                    >
                      <span>Visit</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{store.location}</span>
                  </div>
                </div>

                {/* Component Match bar */}
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-700">Stock Availability:</span>
                    <span className={store.availableParts === store.totalParts ? "text-emerald-600 font-extrabold" : "text-amber-600"}>
                      {store.availableParts}/{store.totalParts} Parts ({Math.round((store.availableParts / (store.totalParts || 1)) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        store.availableParts === store.totalParts ? "bg-emerald-500" : "bg-amber-500"
                      }`}
                      style={{ width: `${(store.availableParts / (store.totalParts || 1)) * 100}%` }}
                    />
                  </div>
                  {store.availableParts === store.totalParts ? (
                    <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-0.5">
                      <Check className="w-3.5 h-3.5 shrink-0" />
                      <span>Offers all required components</span>
                    </div>
                  ) : store.missingItem ? (
                    <div className="text-[11px] text-amber-700 font-medium flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="line-clamp-2">{store.missingItem}</span>
                    </div>
                  ) : null}
                </div>

                {/* Pricing & Transit Speed */}
                <div className="space-y-2 pt-1">
                  <div className="text-3xl font-extrabold text-slate-900">
                    {store.partsCost}
                    <span className="text-xs font-normal text-slate-500 ml-2">kit estimate</span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1.5 pt-1">
                    <div className="flex items-start gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800">{store.shippingSpeed}</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      📦 {store.freeShippingThreshold}
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Store Hyperlink CTA */}
              <a
                href={store.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className={`w-full py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm ${
                  store.isTopStock
                    ? "bg-brand-500 hover:bg-brand-600 text-white hover:shadow-md"
                    : "bg-[#1E252B] hover:bg-[#2A343D] text-white"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Open Cart on {store.name}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. GRANULAR COMPONENT AVAILABILITY TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-brand-600 font-extrabold text-xs uppercase tracking-wider">Price Comparison</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Prices by Store for {currentProject.title} (INR ₹)
            </h2>
            <p className="text-sm text-slate-600">
              Check prices and stock levels for every part in {currentProject.title} across 4 major Indian electronics stores.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search parts in this robot..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-[#E8E2D9] text-xs focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8E2D9] overflow-hidden shadow-subtle">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#FAF7F2] border-b border-[#E8E2D9] text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6 min-w-[200px]">Part Name &amp; Spec</th>
                  <th className="py-4 px-4">Part Code</th>
                  <th className="py-4 px-4">Qty</th>
                  <th className="py-4 px-5">
                    <a
                      href="https://robu.in/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-600 font-extrabold"
                    >
                      <span>Robu.in</span>
                      <ExternalLink className="w-3 h-3 text-brand-500" />
                    </a>
                  </th>
                  <th className="py-4 px-5">
                    <a
                      href="https://quartzcomponents.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-600 font-extrabold"
                    >
                      <span>Quartz</span>
                      <ExternalLink className="w-3 h-3 text-brand-500" />
                    </a>
                  </th>
                  <th className="py-4 px-5">
                    <a
                      href="https://robocraze.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-600 font-extrabold"
                    >
                      <span>Robocraze</span>
                      <ExternalLink className="w-3 h-3 text-brand-500" />
                    </a>
                  </th>
                  <th className="py-4 px-5">
                    <a
                      href="https://zbotic.in/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-slate-900 hover:text-brand-600 font-extrabold"
                    >
                      <span>Zbotic</span>
                      <ExternalLink className="w-3 h-3 text-brand-500" />
                    </a>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E2D9]">
                {filteredPricing.map((item, i) => (
                  <tr key={i} className="hover:bg-brand-50/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-extrabold text-slate-900">{item.partName}</div>
                      {item.spec && (
                        <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{item.spec}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 font-mono text-xs text-slate-500">{item.sku}</td>
                    <td className="py-4 px-4 font-bold text-xs text-slate-700">{item.qty || 1}x</td>
                    
                    {/* Robu.in */}
                    <td className="py-4 px-5">
                      <a
                        href={item.robu.url || "https://robu.in/"}
                        target="_blank"
                        rel="noreferrer"
                        className="group block hover:text-brand-600"
                      >
                        <div className="font-extrabold text-slate-900 group-hover:text-brand-600 inline-flex items-center gap-1">
                          <span>{item.robu.price}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] font-semibold text-emerald-600">{item.robu.stockNote}</div>
                      </a>
                    </td>

                    {/* Quartz Components */}
                    <td className="py-4 px-5">
                      <a
                        href={item.quartz.url || "https://quartzcomponents.com/"}
                        target="_blank"
                        rel="noreferrer"
                        className="group block hover:text-brand-600"
                      >
                        <div className="font-extrabold text-slate-900 group-hover:text-brand-600 inline-flex items-center gap-1">
                          <span>{item.quartz.price}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="text-[11px] font-semibold text-emerald-600">{item.quartz.stockNote}</div>
                      </a>
                    </td>

                    {/* Robocraze */}
                    <td className="py-4 px-5">
                      <a
                        href={item.robocraze.url || "https://robocraze.com/"}
                        target="_blank"
                        rel="noreferrer"
                        className="group block hover:text-brand-600"
                      >
                        <div className="font-extrabold text-slate-900 group-hover:text-brand-600 inline-flex items-center gap-1">
                          <span>{item.robocraze.price}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className={`text-[11px] font-semibold ${item.robocraze.inStock ? "text-emerald-600" : "text-rose-600"}`}>
                          {item.robocraze.stockNote}
                        </div>
                      </a>
                    </td>

                    {/* Zbotic */}
                    <td className="py-4 px-5">
                      <a
                        href={item.zbotic.url || "https://zbotic.in/"}
                        target="_blank"
                        rel="noreferrer"
                        className="group block hover:text-brand-600"
                      >
                        <div className="font-extrabold text-slate-900 group-hover:text-brand-600 inline-flex items-center gap-1">
                          <span>{item.zbotic.price}</span>
                          <ExternalLink className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className={`text-[11px] font-semibold ${item.zbotic.inStock ? "text-emerald-600" : "text-rose-600"}`}>
                          {item.zbotic.stockNote}
                        </div>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. EDUCATOR GUIDANCE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-50 border border-brand-200 p-8 sm:p-12 space-y-4">
          <div className="flex items-center gap-2 text-brand-600 font-extrabold text-xs uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>School &amp; Robotics Clubs</span>
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900">
            Need parts for a school or robotics club?
          </h3>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            We help schools and robotics clubs order complete parts kits in bulk for {currentProject.title}. Get parts pre-sorted so every student has what they need to start building immediately.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href={currentProject.slug === "line-follower" ? "/projects/line-follower" : `/projects/${currentProject.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              <span>View Build Guide for {currentProject.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-brand-100 text-brand-700 border border-brand-300 font-bold text-xs transition-colors"
            >
              <span>Ask Build Assistant</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function AvailabilityPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-600 text-sm font-semibold">Loading Store Availability...</p>
      </div>
    }>
      <AvailabilityContent />
    </Suspense>
  );
}
