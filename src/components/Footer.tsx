"use client";

import Link from "next/link";
import { RoboLogo } from "./RoboLogo";
import { Github, Youtube, Sparkles, Heart, ShieldCheck, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#E8E2D9] bg-[#FAF7F2] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E8E2D9]">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <RoboLogo size={44} />
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              RoboNest makes robotics easy and fun for everyone. We provide beginner-friendly build guides, clear wiring diagrams, and simple step-by-step instructions so anyone can build their first robot.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5" /> 100% Open Hardware
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Beginner Friendly
              </span>
            </div>
          </div>

          {/* Column 1: Projects */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Robot Projects</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/projects/line-follower" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Line Follower Bot
                </Link>
              </li>
              <li>
                <Link href="/projects/robotic-arm" className="text-slate-600 hover:text-brand-600 transition-colors">
                  4-DOF Robotic Arm
                </Link>
              </li>
              <li>
                <Link href="/projects/robosoccer" className="text-slate-600 hover:text-brand-600 transition-colors">
                  RoboSoccer Bot
                </Link>
              </li>
              <li>
                <Link href="/projects/drone-explorer" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Drone Explorer Quad
                </Link>
              </li>
              <li>
                <Link href="/projects/robomaze" className="text-slate-600 hover:text-brand-600 transition-colors">
                  RoboMaze Ultrasonic
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Resources */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Helpful Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/assistant" className="text-slate-600 hover:text-brand-600 transition-colors flex items-center gap-1.5">
                  <span>Build Assistant</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-brand-500 text-white font-bold">HELP</span>
                </Link>
              </li>
              <li>
                <Link href="/components-catalog" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Parts Library
                </Link>
              </li>
              <li>
                <Link href="/availability" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Where to Buy Parts
                </Link>
              </li>
              <li>
                <Link href="/projects/line-follower" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Wiring Diagrams
                </Link>
              </li>
              <li>
                <Link href="/projects/line-follower" className="text-slate-600 hover:text-brand-600 transition-colors">
                  Robot Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Educator Dispatch */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Robotics Newsletter</h4>
            <p className="text-xs text-slate-600 mb-3">
              Weekly robotics tips, simple project ideas, and beginner guides sent directly to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input 
                type="email" 
                placeholder="educator@school.edu" 
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-[#E8E2D9] bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900" 
              />
              <button 
                type="submit" 
                className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-brand-500 hover:bg-brand-600 text-white transition-colors flex items-center justify-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Subscribe Free</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" /> for young roboticists &amp; educators worldwide.
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-brand-600 transition-colors">Open Hardware License (CERN-OHL)</span>
            <span className="hover:text-brand-600 transition-colors">CC-BY-SA 4.0</span>
            <span className="text-slate-400">© 2026 RoboNest Labs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
