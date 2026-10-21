import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { 
  ArrowRight, 
  Sparkles, 
  Bot, 
  FlaskConical, 
  BrainCircuit, 
  Play, 
  Wrench, 
  Cpu 
} from "lucide-react";

export default function HomePage() {
  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div className="space-y-16 md:space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 pb-8 md:pt-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            
            {/* Left Column: Headlines & CTAs */}
            <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5">
              {/* Eyebrow */}
              <div className="text-[11px] sm:text-xs font-bold tracking-[0.24em] text-[#5A626A] uppercase select-none">
                BUILD &nbsp;/&nbsp; LEARN &nbsp;/&nbsp; EXPLORE
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-extrabold text-[#1E252B] tracking-tight leading-[1.06] max-w-[520px]">
                Robotics that <br />
                makes{" "}
                <span className="text-[#C85A32] italic font-serif">
                  curiosity
                </span>{" "}
                <br />
                come alive.
              </h1>

              {/* Description */}
              <p className="text-[15px] sm:text-base lg:text-[17px] text-[#5A626A] font-normal leading-relaxed max-w-[500px]">
                Learn robotics step by step. Choose a robot, see every part you need, and follow easy guides made for complete beginners.
              </p>

              {/* Action buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 h-11 rounded-full bg-[#C85A32] hover:bg-[#B04A23] text-white font-medium text-sm shadow-sm hover:shadow transition-all duration-200 group"
                >
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="#how-it-works"
                  className="inline-flex items-center gap-2.5 px-5 h-11 rounded-full bg-transparent hover:bg-white/80 border border-[#DCD4C8] text-[#1E252B] font-medium text-sm shadow-none transition-all duration-200"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1E252B] flex items-center justify-center shrink-0">
                    <Play className="w-2.5 h-2.5 fill-white text-white ml-0.5" />
                  </span>
                  <span>How It Works</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Featured Editorial Robot Photo */}
            <div className="lg:col-span-5 xl:col-span-6 flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-[460px] lg:max-w-[490px]">
                <div
                  className="relative overflow-hidden"
                  style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 6%, rgba(0,0,0,0.55) 16%, rgba(0,0,0,0.9) 24%, #000 30%, #000 100%)",
                    maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.12) 6%, rgba(0,0,0,0.55) 16%, rgba(0,0,0,0.9) 24%, #000 30%, #000 100%)",
                  }}
                >
                  <Image
                    src="/hero-robot.png"
                    alt="RoboNest Educational Robot Workbench"
                    width={764}
                    height={570}
                    priority
                    sizes="(max-width: 768px) 100vw, 490px"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: WHY ROBONEST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <span className="text-brand-600 font-extrabold text-xs uppercase tracking-widest">Why RoboNest?</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Robotics Made Simple for Everyone
          </h2>
          <p className="text-slate-600 text-base">
            Never built a robot before? We explain every wire, sensor, and screw in everyday words so you always know what to do next.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-subtle hover:shadow-lift transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center text-brand-600">
              <Bot className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Build With Confidence</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Turn a box of parts into a real robot. Follow clear 3D views, simple parts lists, and easy color-coded wire diagrams.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                Clear Steps Every Time <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-subtle hover:shadow-lift transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700">
              <FlaskConical className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Learn By Doing</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Test your robot as you build. If a motor spins backward or a sensor needs adjusting, we show you how to fix it in seconds.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                Easy Testing Guides <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-8 border border-[#E8E2D9] shadow-subtle hover:shadow-lift transition-all duration-300 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">Understand How It Works</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Learn how motors spin, how sensors see, and how computer code brings physical machines to life.
            </p>
            <div className="pt-2">
              <span className="text-xs font-bold text-stone-700 flex items-center gap-1">
                Ready-to-Use Code Included <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS IN THE LAB */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-brand-600 font-extrabold text-xs uppercase tracking-widest">Featured Robots</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Robots You Can Build
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Tested beginner projects with full parts lists, easy wiring diagrams, and working programs.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-brand-50 border border-[#E8E2D9] text-brand-700 font-bold text-sm shadow-sm transition-colors"
          >
            <span>View All 8 Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS (3 STEPS) */}
      <section id="how-it-works" className="bg-white border-y border-[#E8E2D9] py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-brand-600 font-extrabold text-xs uppercase tracking-widest">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 text-base">
              From an unopened box of parts to a driving robot in three easy steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8E2D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                01
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Choose a Robot</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Pick a robot project you want to build. Check the complete parts list and see where to get the parts online with one click.
              </p>
              <Link href="/availability" className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 pt-2">
                <span>Check Store Stock</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8E2D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                02
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Follow the Wiring</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Connect each wire using our color-coded connection guides. We tell you exactly which pin each wire plugs into.
              </p>
              <Link href="/projects/line-follower#wiring" className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 pt-2">
                <span>See Wiring Diagram</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="relative bg-[#FAF7F2] rounded-3xl p-8 border border-[#E8E2D9] space-y-4">
              <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-extrabold text-lg flex items-center justify-center shadow-md">
                03
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Upload &amp; Drive</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Upload the ready-to-use code into your controller. Turn on the battery switch and watch your robot start exploring.
              </p>
              <Link href="/assistant" className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 pt-2">
                <span>Open Build Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE WORKBENCH TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1E252B] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C85A32_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-bold border border-brand-500/30">
                <Wrench className="w-3.5 h-3.5 text-brand-400" />
                <span>HELPFUL LAB ASSISTANT</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Have a question or stuck on a wire?
              </h2>
              <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
                Our Build Assistant helps you fix loose wires, check motor directions, and test sensor signals before turning on your robot.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <span>Open Build Assistant</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/components-catalog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition-colors"
                >
                  <Cpu className="w-4 h-4 text-brand-400" />
                  <span>See Components</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl p-5 border border-slate-700 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-700">
                <span>VIRTUAL SENSOR CHECK</span>
                <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> READY
                </span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Left Sensor (D2):</span>
                  <span className="text-brand-400 font-bold">Sees Black Line</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Right Sensor (D4):</span>
                  <span className="text-slate-400">Sees White Floor</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Left Motor:</span>
                  <span className="text-amber-400">Slow Down</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Right Motor:</span>
                  <span className="text-emerald-400">Drive Forward</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] text-slate-300 bg-slate-900/60 p-2.5 rounded-xl border border-slate-700">
                What the robot does: Steers left to get back on top of the black line.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALLOUT BANNER (FOOTER CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1E252B] p-8 sm:p-14 text-white text-center space-y-6 shadow-xl relative overflow-hidden">
          {/* Subtle circle overlay */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-black/20 blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to build your first robot?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Start with our popular Line Follower Bot. It includes a complete parts list, easy wiring diagram, and step-by-step instructions.
            </p>
            <div className="pt-2">
              <Link
                href="/projects/line-follower"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-base shadow-lg transition-transform hover:scale-105"
              >
                <span>Start Line Follower Guide</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
