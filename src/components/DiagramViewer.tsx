"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, ZoomIn, AlertCircle, FileImage, X } from "lucide-react";

interface DiagramViewerProps {
  src: string;
  title: string;
  type: "wiring" | "pinout";
  slug: string;
}

export function DiagramViewer({ src, title, type, slug }: DiagramViewerProps) {
  const [hasError, setHasError] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const fallbackTitle = type === "wiring" ? "Wiring Diagram Coming Soon" : "Pinout Diagram Coming Soon";

  return (
    <div className="space-y-4">
      {/* Diagram Viewer Box */}
      <div className="relative w-full rounded-3xl bg-white border border-[#E8E2D9] overflow-hidden shadow-subtle">
        {/* Top Control Bar */}
        <div className="px-6 py-3.5 bg-[#FAF7F2] border-b border-[#E8E2D9] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <FileImage className="w-4 h-4 text-brand-500" />
            <span>{title}</span>
          </div>

          {!hasError && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsZoomed(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-[#E8E2D9] font-bold text-xs shadow-sm transition-all"
                title="Click to view bigger"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Enlarge</span>
              </button>
              <a
                href={src}
                download={`${slug}-${type}-schematic.png`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-brand-50 text-slate-700 hover:text-brand-700 border border-[#E8E2D9] font-bold text-xs shadow-sm transition-all"
                title="Save picture to your computer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save</span>
              </a>
            </div>
          )}
        </div>

        {/* Image Canvas Container */}
        <div className="p-4 sm:p-6 flex items-center justify-center bg-[#FAF7F2]/40 min-h-[360px] sm:min-h-[460px]">
          {!hasError ? (
            <div className="relative w-full max-w-4xl aspect-[3/2] rounded-2xl overflow-hidden shadow-sm border border-[#E8E2D9]/60 bg-white">
              <Image
                src={src}
                alt={title}
                fill
                className="object-contain"
                onError={() => setHasError(true)}
                unoptimized
              />
            </div>
          ) : (
            <div className="py-12 px-6 flex flex-col items-center justify-center text-center max-w-md space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h4 className="text-base font-extrabold text-slate-900">{fallbackTitle}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The visual {type} diagram for this project will be added soon. In the meantime, follow the step-by-step wiring guide and table below.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomed && !hasError && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsZoomed(false)}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#FAF7F2] border-b border-[#E8E2D9] flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm">{title} (Full View)</span>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-200 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full flex-1 min-h-[500px] p-4 bg-slate-50 flex items-center justify-center overflow-auto">
              <img
                src={src}
                alt={title}
                className="max-w-full max-h-[80vh] object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
