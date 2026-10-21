import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { 
  Clock, 
  Wrench, 
  ChevronRight, 
  ListChecks,
  Code2
} from "lucide-react";
import { ProjectTabsContainer } from "@/components/ProjectTabsContainer";

interface Props {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ tab?: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.filter(p => p.slug !== "line-follower").map((p) => ({
    slug: p.slug,
  }));
}

export default async function GenericProjectPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-brand-50/70 via-white to-transparent pt-8 pb-12 border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/projects" className="hover:text-brand-600 transition-colors">Projects</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-brand-600 font-bold">{project.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-brand-500 text-white font-extrabold text-xs uppercase tracking-wider">
                  {project.level}
                </span>
                <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-800 font-bold text-xs">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-bold text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {project.timeEstimate}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                {project.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-white rounded-2xl p-3 border border-[#E8E2D9] shadow-subtle">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Brain / Controller</div>
                  <div className="text-xs font-bold text-slate-800 truncate">{project.microcontroller}</div>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#E8E2D9] shadow-subtle">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Motor Control</div>
                  <div className="text-xs font-bold text-slate-800 truncate">{project.motorDriver}</div>
                </div>
                <div className="bg-white rounded-2xl p-3 border border-[#E8E2D9] shadow-subtle">
                  <div className="text-[11px] font-bold text-slate-400 uppercase">Parts Needed</div>
                  <div className="text-xs font-bold text-slate-800">{project.partsCount} items</div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${project.slug}?tab=steps#project-content`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-md transition-colors"
                >
                  <ListChecks className="w-4 h-4" />
                  <span>Start Step-by-Step Guide</span>
                </Link>

                {project.arduinoCode && (
                  <Link
                    href={`/projects/${project.slug}?tab=code#project-content`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-brand-50 border border-brand-200 text-brand-700 font-bold text-sm shadow-sm transition-colors"
                  >
                    <Code2 className="w-4 h-4 text-brand-500" />
                    <span>View Program Code</span>
                  </Link>
                )}

                <Link
                  href="/assistant"
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-brand-100 hover:bg-brand-200 text-brand-800 font-bold text-sm transition-colors"
                >
                  <Wrench className="w-4 h-4 text-brand-600" />
                  <span>Ask the Assistant</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative w-full h-[380px] rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-brand-100">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover object-center"
                  unoptimized
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-[#E8E2D9] flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Assembled Robot Platform
                  </span>
                  <span className="text-slate-500 font-medium">Ready to Build</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Project Content Tabs */}
      <section id="project-content" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectTabsContainer 
          project={project} 
          initialTab={resolvedSearchParams.tab as any} 
        />
      </section>
    </div>
  );
}
