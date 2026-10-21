"use client";

import { useState } from "react";
import Link from "next/link";
import { DIAGNOSTIC_GUIDES, DiagnosticGuide } from "@/data/troubleshooting";
import { 
  Bot, 
  Wrench, 
  Sparkles, 
  Send, 
  Cpu, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  Check, 
  HelpCircle, 
  ArrowRight,
  Zap,
  Play,
  RotateCcw,
  ShieldAlert,
  Flame,
  Activity
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  actionSnippet?: string;
}

export default function AssistantPage() {
  // Live Pin Simulator state
  const [leftSensorValue, setLeftSensorValue] = useState<0 | 1>(0);
  const [rightSensorValue, setRightSensorValue] = useState<0 | 1>(0);
  const [pwmSpeed, setPwmSpeed] = useState<number>(160);

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi! I'm here to help you build and troubleshoot your robot. Are you having trouble with wiring, motors spinning backwards, or getting sensors to work? Ask me anything!",
      timestamp: "Just now",
      actionSnippet: "Ready to help: Line Follower Robot"
    }
  ]);
  const [inputQuestion, setInputQuestion] = useState("");

  // Determine robot behavior based on simulated pins
  let behaviorTitle = "Driving Forward";
  let leftMotor = `FORWARD (${pwmSpeed} speed)`;
  let rightMotor = `FORWARD (${pwmSpeed} speed)`;
  let behaviorDesc = "Both sensors see the white floor. Robot moves straight ahead.";
  let statusColor = "text-emerald-400";

  if (leftSensorValue === 1 && rightSensorValue === 0) {
    behaviorTitle = "Turning LEFT";
    leftMotor = "REVERSE (Slow)";
    rightMotor = `FORWARD (${Math.min(255, pwmSpeed + 30)} speed)`;
    behaviorDesc = "The left sensor saw the black line! The right wheel pushes forward to turn the robot back onto the track.";
    statusColor = "text-amber-400";
  } else if (leftSensorValue === 0 && rightSensorValue === 1) {
    behaviorTitle = "Turning RIGHT";
    leftMotor = `FORWARD (${Math.min(255, pwmSpeed + 30)} speed)`;
    rightMotor = "REVERSE (Slow)";
    behaviorDesc = "The right sensor saw the black line! The left wheel pushes forward to turn the robot back onto the track.";
    statusColor = "text-amber-400";
  } else if (leftSensorValue === 1 && rightSensorValue === 1) {
    behaviorTitle = "Crossing Line or Stop";
    leftMotor = `SLOW (${Math.max(60, pwmSpeed - 60)} speed)`;
    rightMotor = `SLOW (${Math.max(60, pwmSpeed - 60)} speed)`;
    behaviorDesc = "Both sensors see black tape at the same time. The robot slows down.";
    statusColor = "text-purple-400";
  }

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputQuestion;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: "user",
      text,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuestion("");

    // Simulated intelligent response
    setTimeout(() => {
      let botResponse = "Great question! Let's check a few simple things.";
      let snippet: string | undefined = undefined;

      const lower = text.toLowerCase();
      if (lower.includes("heating") || lower.includes("heatsink") || lower.includes("hot")) {
        botResponse = "The motor driver chip naturally gets warm as it powers the motors. But if it gets too hot to touch: 1. Make sure both wheels can spin freely by hand without jamming. 2. Check that your battery is 12V or less. 3. Turn off the power immediately if you smell anything hot.";
        snippet = "Tip: Make sure the wheels are not stuck against the robot body.";
      } else if (lower.includes("brownout") || lower.includes("reset") || lower.includes("reboot")) {
        botResponse = "When the motors start spinning, they pull a burst of electrical power. If the battery is low, the Arduino computer reboots! 1. Put in fresh, fully charged batteries. 2. Make sure the Arduino GND pin is connected to the motor driver GND pin.";
        snippet = "Fix: Use fresh batteries and connect Arduino GND to motor driver GND.";
      } else if (lower.includes("circle") || lower.includes("spin") || lower.includes("reverse")) {
        botResponse = "If your robot spins in circles on the spot, one motor is turning the wrong way! 1. Turn off the battery switch. 2. Swap the two wires connected to that motor on the motor driver board. 3. Turn it back on and test.";
        snippet = "Fix: Swap the two wires for the spinning motor.";
      } else if (lower.includes("sensor") || lower.includes("trimpot") || lower.includes("calibrate")) {
        botResponse = "To adjust the line sensors: 1. Place one sensor over white paper and the other over black tape. 2. Use a small screwdriver to gently turn the small blue knob on the sensor. 3. Stop turning when the indicator light turns on and off cleanly.";
        snippet = "Tip: Keep the sensor about 6mm to 8mm above the floor.";
      } else {
        botResponse = `Got it! Let's check "${text}". Make sure your battery is charged, all ground (GND) wires are connected together, and the wires are plugged into the correct pins.`;
        snippet = "Tip: Try the interactive simulator below to see how the sensors work.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          sender: "bot",
          text: botResponse,
          timestamp: "Just now",
          actionSnippet: snippet,
        },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-gradient-to-b from-brand-50/70 to-transparent pt-12 pb-8 border-b border-[#f1e5e9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            <span>ROBOT BUILD HELPER</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Build Assistant &amp; Problem Solver
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Stuck on wiring, motors spinning backwards, or sensors not detecting the line? Ask questions or test how the robot thinks below.
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E2D9] text-xs font-mono text-slate-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Line Follower Robot Guide Ready • Ready for Questions
            </span>
          </div>
        </div>
      </section>

      {/* 2. CHAT ASSISTANT & VIRTUAL PIN BENCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: AI Debugger Chat */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#E8E2D9] shadow-subtle p-6 flex flex-col h-[580px]">
            {/* Chat header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-500 flex items-center justify-center text-white shadow-sm">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">RoboNest Build Helper</h3>
                  <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online Assistant
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                Project: Line Follower
              </span>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      m.sender === "user"
                        ? "bg-brand-500 text-white rounded-br-xs"
                        : "bg-[#FAF7F2] border border-[#E8E2D9] text-slate-800 rounded-bl-xs"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.actionSnippet && (
                      <div className="mt-2 pt-2 border-t border-brand-200/40 text-[11px] font-mono font-bold text-brand-700 bg-white/70 p-2 rounded-lg">
                        ⚡ {m.actionSnippet}
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Quick question prompt pills */}
            <div className="pt-2 pb-3 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {[
                "Why does robot spin in circles?",
                "Arduino reboots when motors start",
                "Motor board is very hot",
                "How to adjust the sensor sensitivity?",
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(q)}
                  className="px-3 py-1 rounded-full bg-brand-50 hover:bg-brand-100 text-brand-800 text-[11px] font-semibold whitespace-nowrap transition-colors border border-brand-100"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="pt-2 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuestion}
                onChange={(e) => setInputQuestion(e.target.value)}
                placeholder="Ask about wiring, motors, sensors, batteries, code..."
                className="flex-1 px-4 py-3 rounded-full bg-slate-50 border border-[#E8E2D9] text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shrink-0 shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Right: Live Interactive Pin Simulator */}
          <div className="lg:col-span-6 bg-slate-950 text-slate-100 rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-brand-400" />
                <div>
                  <h3 className="text-base font-extrabold text-white">Live Robot Brain Simulator</h3>
                  <div className="text-[11px] text-slate-400">See how sensor signals tell the motors which way to turn</div>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            {/* Digital Pin Input Toggles */}
            <div className="space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Click a sensor below to simulate what it sees:
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Left Sensor Button */}
                <button
                  type="button"
                  onClick={() => setLeftSensorValue(leftSensorValue === 1 ? 0 : 1)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    leftSensorValue === 1
                      ? "bg-brand-950/80 border-brand-500 ring-2 ring-brand-500/30"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs text-slate-400">LEFT SENSOR (Pin D2)</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      leftSensorValue === 1 ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {leftSensorValue === 1 ? "1 (Line)" : "0 (Floor)"}
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {leftSensorValue === 1 ? "Sees Black Line" : "Sees White Floor"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Click to switch</div>
                </button>

                {/* Right Sensor Button */}
                <button
                  type="button"
                  onClick={() => setRightSensorValue(rightSensorValue === 1 ? 0 : 1)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    rightSensorValue === 1
                      ? "bg-brand-950/80 border-brand-500 ring-2 ring-brand-500/30"
                      : "bg-slate-900 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono text-xs text-slate-400">RIGHT SENSOR (Pin D4)</span>
                    <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                      rightSensorValue === 1 ? "bg-brand-500 text-white" : "bg-slate-800 text-slate-400"
                    }`}>
                      {rightSensorValue === 1 ? "1 (Line)" : "0 (Floor)"}
                    </span>
                  </div>
                  <div className="text-sm font-extrabold text-white">
                    {rightSensorValue === 1 ? "Sees Black Line" : "Sees White Floor"}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Click to switch</div>
                </button>
              </div>
            </div>

            {/* PWM Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-400 uppercase">Motor Speed:</span>
                <span className="font-mono font-bold text-brand-400">{pwmSpeed} / 255</span>
              </div>
              <input
                type="range"
                min="80"
                max="255"
                value={pwmSpeed}
                onChange={(e) => setPwmSpeed(Number(e.target.value))}
                className="w-full accent-brand-500 cursor-pointer"
              />
            </div>

            {/* Virtual Motor Output Display */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Robot Decision:</span>
                <span className={`font-extrabold ${statusColor}`}>{behaviorTitle}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">LEFT WHEEL MOTOR</div>
                  <div className="font-bold text-emerald-400 mt-1">{leftMotor}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-slate-400 text-[11px]">RIGHT WHEEL MOTOR</div>
                  <div className="font-bold text-emerald-400 mt-1">{rightMotor}</div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                {behaviorDesc}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. COMMON PITFALLS & EDUCATOR FIELD NOTES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-brand-600 font-extrabold text-xs uppercase tracking-wider">HELPFUL TIPS</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Common Problems &amp; How to Fix Them
          </h2>
          <p className="text-sm text-slate-600">
            These are the most common issues beginners run into. Check these before taking your robot apart.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIAGNOSTIC_GUIDES.map((guide) => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8E2D9] shadow-subtle space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-brand-100 text-brand-800">
                  {guide.category}
                </span>
                <span className={`text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  guide.severity === "High" ? "bg-rose-100 text-rose-700" :
                  guide.severity === "Medium" ? "bg-amber-100 text-amber-700" :
                  "bg-slate-100 text-slate-700"
                }`}>
                  {guide.severity} Priority
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-slate-900">{guide.title}</h3>

              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-slate-900">What happens:</strong>{" "}
                  <span className="text-slate-600">{guide.symptom}</span>
                </div>
                <div>
                  <strong className="text-slate-900">Why it happens:</strong>{" "}
                  <span className="text-slate-600">{guide.probableCause}</span>
                </div>
              </div>

              {/* Fix steps */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="text-xs font-extrabold text-brand-700 uppercase">Try this to fix it:</div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {guide.stepByStepFix.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Multimeter */}
              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E8E2D9] text-xs text-slate-700 flex items-start gap-2">
                <Activity className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Quick Check with a Meter:</strong> {guide.multimeterCheck}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CHASSIS BLOCKED CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1E252B] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-extrabold">Need step-by-step instructions?</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Follow our beginner-friendly build guide with clear instructions for every single step and wire.
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href="/projects/line-follower"
              className="px-6 py-3 rounded-full bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              View Line Follower Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
