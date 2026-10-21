const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, Table, TableRow, TableCell, WidthType,
  BorderStyle, ShadingType, TableLayoutType, VerticalAlign,
  PageBreak, NumberFormat, LevelFormat, Footer, PageNumber,
  convertInchesToTwip, UnderlineType, Header
} = require("docx");
const fs = require("fs");
const path = require("path");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function h(text, level = HeadingLevel.HEADING_1, color = "2C3E50") {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 340, after: 120 },
    run: { color, bold: true }
  });
}

function h1(t) { return h(t, HeadingLevel.HEADING_1, "1A3A5C"); }
function h2(t) { return h(t, HeadingLevel.HEADING_2, "2C5282"); }
function h3(t) { return h(t, HeadingLevel.HEADING_3, "C85A32"); }

function p(text, options = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: [new TextRun({ text, size: 22, color: "2D3748", ...options })]
  });
}

function bold(text) {
  return new TextRun({ text, bold: true, size: 22, color: "1A202C" });
}

function code(text) {
  return new TextRun({ text, font: "Courier New", size: 19, color: "C85A32", bold: true });
}

function bullet(text, indent = 0) {
  return new Paragraph({
    bullet: { level: indent },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, color: "2D3748" })]
  });
}

function spacer() {
  return new Paragraph({ text: "", spacing: { before: 60, after: 60 } });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

function divider() {
  return new Paragraph({
    text: "─────────────────────────────────────────────────────────────",
    spacing: { before: 100, after: 100 },
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "─────────────────────────────────────────────────────────────", color: "CBD5E0", size: 16 })]
  });
}

function inlineCode(parts) {
  // parts: array of {text, isCode}
  return new Paragraph({
    spacing: { before: 60, after: 100 },
    children: parts.map(part =>
      part.isCode
        ? new TextRun({ text: part.text, font: "Courier New", size: 19, color: "C85A32", bold: true, shading: { type: ShadingType.SOLID, color: "FEF3ED", fill: "FEF3ED" } })
        : new TextRun({ text: part.text, size: 22, color: "2D3748" })
    )
  });
}

function tableRow(cells, isHeader = false) {
  return new TableRow({
    tableHeader: isHeader,
    children: cells.map((cell, i) =>
      new TableCell({
        shading: isHeader ? { type: ShadingType.SOLID, fill: "2C5282", color: "2C5282" } : (i % 2 === 0 ? { type: ShadingType.SOLID, fill: "EBF4FF", color: "EBF4FF" } : {}),
        verticalAlign: VerticalAlign.CENTER,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({
          children: [new TextRun({
            text: cell,
            bold: isHeader,
            color: isHeader ? "FFFFFF" : "2D3748",
            size: isHeader ? 21 : 20
          })]
        })]
      })
    )
  });
}

function makeTable(headers, rows) {
  return new Table({
    layout: TableLayoutType.FIXED,
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      tableRow(headers, true),
      ...rows.map(r => tableRow(r, false))
    ]
  });
}

// ─── Document Content ──────────────────────────────────────────────────────────

const doc = new Document({
  creator: "RoboNest Development",
  title: "RoboNest – Technical Implementation Document",
  description: "Full technical specification of the RoboNest robotics education platform",
  styles: {
    default: {
      document: {
        run: { font: "Calibri", size: 22, color: "2D3748" },
        paragraph: { spacing: { line: 276 } }
      },
      heading1: {
        run: { font: "Calibri", bold: true, size: 34, color: "1A3A5C" },
        paragraph: { spacing: { before: 400, after: 160 } }
      },
      heading2: {
        run: { font: "Calibri", bold: true, size: 28, color: "2C5282" },
        paragraph: { spacing: { before: 300, after: 120 } }
      },
      heading3: {
        run: { font: "Calibri", bold: true, size: 24, color: "C85A32" },
        paragraph: { spacing: { before: 240, after: 100 } }
      }
    }
  },
  sections: [{
    properties: {
      page: {
        margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 }
      }
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [new TextRun({ text: "RoboNest — Technical Implementation Document", size: 18, color: "888888", italics: true })]
          })
        ]
      })
    },
    footers: {
      default: new Footer({
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({ text: "Page ", size: 18, color: "888888" }),
              new PageNumber({ type: "current", size: 18, color: "888888" })
            ]
          })
        ]
      })
    },
    children: [

      // ── COVER PAGE ────────────────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 1200, after: 200 },
        children: [new TextRun({ text: "ROBONEST", font: "Calibri", size: 80, bold: true, color: "C85A32" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 100 },
        children: [new TextRun({ text: "Technical Implementation Document", font: "Calibri", size: 36, color: "2C5282" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
        children: [new TextRun({ text: "A Beginner Robotics Education Platform", font: "Calibri", size: 24, color: "718096", italics: true })]
      }),
      divider(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 80, after: 60 },
        children: [new TextRun({ text: "Version 2.1   |   October 2026", font: "Calibri", size: 22, color: "718096" })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 60, after: 60 },
        children: [new TextRun({ text: "Project: Dev_Dash2.1   |   Stack: Next.js 15 + React 19 + TypeScript + Tailwind CSS + Three.js", font: "Courier New", size: 18, color: "888888" })]
      }),
      pageBreak(),

      // ── 1. EXECUTIVE SUMMARY ──────────────────────────────────────────────────
      h1("1. Executive Summary"),
      p("RoboNest is a web-based robotics education platform built for complete beginners. Its purpose is to guide a first-time builder through the entire process of assembling a physical robot — from purchasing parts, to soldering, to programming — using clear, jargon-free language."),
      spacer(),
      p("The platform currently covers four robot projects with varying difficulty levels:"),
      bullet("Line Follower Bot (Beginner)"),
      bullet("Drone Explorer Quad (Intermediate / Aerial Robotics)"),
      bullet("Robotic Arm 4-DOF (Intermediate / Robotic Arms)"),
      bullet("RoboSoccer Bot (Intermediate / Competitive Bots)"),
      spacer(),
      p("Each project exposes an identical tabbed interface containing: an Overview, Bill of Materials, Color-coded Wiring Diagrams, Pinout Tables, Step-by-Step Build Instructions, an interactive 3D Model Viewer, Program Code, a Part Availability / Where-to-Buy section, and a Troubleshooting FAQ."),
      pageBreak(),

      // ── 2. TECHNOLOGY STACK ───────────────────────────────────────────────────
      h1("2. Technology Stack"),

      h2("2.1 Core Framework"),
      makeTable(
        ["Technology", "Version", "Purpose"],
        [
          ["Next.js", "^15.2.1", "Full-stack React framework — App Router, SSG/SSR, image optimization"],
          ["React", "^19.0.0", "UI component library with hooks and suspense"],
          ["TypeScript", "^5.7.3", "Strict type checking across all source files"],
          ["Tailwind CSS", "^3.4.17", "Utility-first CSS with a custom design system"],
          ["Three.js", "^0.186.1", "WebGL-powered interactive 3D robot model viewer"],
          ["Lucide React", "^0.475.0", "Consistent SVG icon library"],
          ["clsx + tailwind-merge", "^2.1.1 / ^3.0.2", "Conditional class string composition helpers"],
        ]
      ),
      spacer(),

      h2("2.2 Typography & Design System"),
      p("Font: Plus Jakarta Sans loaded via next/font/google at weights 300–800. The custom brand color palette in tailwind.config.ts uses a warm terracotta scale:"),
      bullet("brand-500 (#C85A32) — Primary action color (buttons, links, accents)"),
      bullet("brand-50 (#FAF4EF) — Background tints and section shading"),
      bullet("surface (#FAF7F2) — Main page background (warm off-white)"),
      bullet("outline-variant (#E8E2D9) — All card and section borders"),
      spacer(),
      p("Custom Tailwind extensions include: three box-shadow tokens (subtle, lift, glow), enlarged border-radius scale (1rem default → 3rem max), and five blob-mask CSS classes for organic shape decorations."),
      spacer(),

      h2("2.3 Development & Deployment Tooling"),
      makeTable(
        ["Tool", "Purpose"],
        [
          ["next dev (port 3000)", "Local hot-reload development server (Fast Refresh)"],
          ["proxy-6000.cjs", "Custom Node.js HTTP + WebSocket transparent proxy forwarding port 6000 → 3000 (enables LAN access)"],
          ["tunnel.cjs / localtunnel", "SSH or localtunnel public URL for external testing"],
          ["PostCSS + autoprefixer", "CSS transformation pipeline used by Tailwind"],
        ]
      ),
      pageBreak(),

      // ── 3. FILE ARCHITECTURE ──────────────────────────────────────────────────
      h1("3. File Architecture & Project Structure"),
      inlineCode([
        { text: "Dev_Dash/\n", isCode: false },
        { text: "├── src/\n│   ├── app/                    ", isCode: true },
        { text: "(Next.js App Router pages)\n", isCode: false },
        { text: "│   │   ├── layout.tsx          ", isCode: true },
        { text: "(Root layout: Navbar + Footer wrapping all pages)\n", isCode: false },
        { text: "│   │   ├── globals.css         ", isCode: true },
        { text: "(Tailwind imports + custom CSS classes)\n", isCode: false },
        { text: "│   │   ├── page.tsx            ", isCode: true },
        { text: "(Homepage — hero, featured projects, stats)\n", isCode: false },
        { text: "│   │   ├── projects/\n│   │   │   ├── page.tsx        ", isCode: true },
        { text: "(Project catalog with search & filters)\n", isCode: false },
        { text: "│   │   │   └── [slug]/page.tsx  ", isCode: true },
        { text: "(Dynamic project detail page)\n", isCode: false },
        { text: "│   │   ├── availability/page.tsx ", isCode: true },
        { text: "(Project-aware 'Where to Buy' page)\n", isCode: false },
        { text: "│   │   ├── components-catalog/   ", isCode: true },
        { text: "(Electronics component reference)\n", isCode: false },
        { text: "│   │   └── assistant/            ", isCode: true },
        { text: "(AI troubleshooting assistant)\n", isCode: false },
        { text: "│   ├── components/              ", isCode: true },
        { text: "(Reusable UI components)\n", isCode: false },
        { text: "│   │   ├── ProjectTabsContainer.tsx ", isCode: true },
        { text: "(Main tabbed UI — 1,073 lines)\n", isCode: false },
        { text: "│   │   ├── ProjectBomSection.tsx    ", isCode: true },
        { text: "(Bill of Materials + store pricing)\n", isCode: false },
        { text: "│   │   ├── RobotViewer3D.tsx       ", isCode: true },
        { text: "(Three.js WebGL 3D model viewer)\n", isCode: false },
        { text: "│   │   ├── DiagramViewer.tsx        ", isCode: true },
        { text: "(Wiring diagram image viewer)\n", isCode: false },
        { text: "│   │   ├── Project3DComparison.tsx  ", isCode: true },
        { text: "(3D vs real photo side-by-side)\n", isCode: false },
        { text: "│   │   ├── Navbar.tsx + Footer.tsx  ", isCode: true },
        { text: "(Site-wide navigation/footer)\n", isCode: false },
        { text: "│   │   └── ProjectCard.tsx          ", isCode: true },
        { text: "(Project thumbnail card on catalog)\n", isCode: false },
        { text: "│   └── data/                   ", isCode: true },
        { text: "(All static data — no database)\n", isCode: false },
        { text: "│       ├── projects.ts          ", isCode: true },
        { text: "(Master project data — 2,649 lines)\n", isCode: false },
        { text: "│       ├── stores.ts            ", isCode: true },
        { text: "(Store pricing, dynamic BOM pricing helpers)\n", isCode: false },
        { text: "│       ├── projects3D.ts        ", isCode: true },
        { text: "(3D viewer config and component mappings)\n", isCode: false },
        { text: "│       ├── components.ts        ", isCode: true },
        { text: "(Electronics component catalog)\n", isCode: false },
        { text: "│       └── troubleshooting.ts   ", isCode: true },
        { text: "(Diagnostic guides for line follower)\n", isCode: false },
        { text: "├── public/robotics/             ", isCode: true },
        { text: "(Static images: models, wiring, real photos)\n", isCode: false },
        { text: "├── next.config.mjs              ", isCode: true },
        { text: "(Remote image hostname allowlist)\n", isCode: false },
        { text: "├── tailwind.config.ts           ", isCode: true },
        { text: "(Design tokens: brand colors, shadows, radii)\n", isCode: false },
        { text: "├── proxy-6000.cjs               ", isCode: true },
        { text: "(LAN proxy server)\n", isCode: false },
        { text: "└── tsconfig.json                ", isCode: true },
        { text: "(TypeScript config with @/ path aliases)", isCode: false },
      ]),
      pageBreak(),

      // ── 4. DATA ARCHITECTURE ─────────────────────────────────────────────────
      h1("4. Data Architecture"),

      h2("4.1 Overview"),
      p("RoboNest uses no backend database or API server. All content is stored as static TypeScript files in src/data/. The advantage of this approach is zero deployment cost, instant page loads (data is bundled at build time), and full type safety across the entire data layer."),

      h2("4.2 The Project Interface (projects.ts)"),
      p("Every robot project conforms to the Project interface. This interface is the single source of truth for all project data across the site. Key fields include:"),
      makeTable(
        ["Field", "Type", "Description"],
        [
          ["slug", "string", "URL identifier (e.g. 'drone-explorer')"],
          ["title", "string", "Human-readable project name"],
          ["category", "union string", "One of 6 categories (Autonomous Rovers, Aerial Robotics, etc.)"],
          ["level", "Beginner | Intermediate | Advanced", "Difficulty badge shown on cards and project header"],
          ["bom", "BomItem[]", "Complete Bill of Materials array"],
          ["steps", "Step[]", "Ordered build instructions array"],
          ["pinout", "PinConnection[]", "Component pin-to-microcontroller mapping table"],
          ["arduinoCode", "string", "Full program code (Arduino C++ or Betaflight config)"],
          ["faqs", "{q, a}[]", "Frequently asked questions for this project"],
          ["realImage", "string", "Path to actual photograph of the built robot"],
          ["wiringImage", "string", "Path to wiring diagram photograph"],
          ["assemblyVideoUrl", "string?", "Optional external video link (e.g. Drone assembly video)"],
        ]
      ),
      spacer(),

      h2("4.3 Bill of Materials (BomItem Interface)"),
      p("Each item in a project's BOM contains these fields:"),
      makeTable(
        ["Field", "Description"],
        [
          ["id", "Unique SKU-style identifier (e.g. 'lf-mcu-01')"],
          ["name", "Full product name"],
          ["whatIsIt", "Plain-English description of the component for beginners"],
          ["whyUsed", "Explains why this specific part is used in this robot"],
          ["qty", "Quantity required"],
          ["spec", "Technical specification string"],
          ["category", "Electronics | Movement | Power | Structure"],
          ["priceEst", "Estimated price in Indian Rupees (₹)"],
          ["inStock", "Boolean stock availability flag"],
          ["storesAvailable", "Number of stores known to carry this part (1–4)"],
          ["alternative", "Optional substitute part with useCase and whyItWorks fields"],
        ]
      ),
      spacer(),

      h2("4.4 Build Steps (Step Interface)"),
      p("Each step object in the steps array contains:"),
      makeTable(
        ["Field", "Description"],
        [
          ["stepNumber", "Ordered integer (1-based)"],
          ["stage", "Short label shown in the step header (e.g. 'Step 3: 4-in-1 ESC')"],
          ["title", "Full step title"],
          ["time", "Estimated time (e.g. '20 mins')"],
          ["description", "One-sentence overview"],
          ["whatToDo", "Goal of the step in one sentence"],
          ["howToDo", "Detailed action instructions"],
          ["whatYouSee", "What the builder should observe upon success"],
          ["checkpoints", "string[]  — verification bullet points"],
          ["commonProblems", "{ problem, reason, solution }[] — beginner troubleshooting (Drone only currently)"],
          ["tip", "Optional pro tip shown at bottom of the step card"],
        ]
      ),
      spacer(),

      h2("4.5 Store Pricing — Dynamic Generation (stores.ts)"),
      p("The stores.ts file provides two key exported functions that generate project-specific store data from a project's BOM at runtime (client-side):"),
      bullet("getStorePricingForProject(project) — Maps each BOM item to per-store pricing rows. Applies relative price multipliers: Quartz 96%, Robocraze 104%, Zbotic 92% of the base price estimate. Generates direct search URLs for each store."),
      bullet("getStoreBundlesForProject(project) — Generates store 'bundle cards' by computing the total kit cost from summing all BOM item prices × quantities."),
      p("This design means new projects automatically get correct store pricing just by having a BOM — no separate store data configuration needed."),
      pageBreak(),

      // ── 5. ROUTING ────────────────────────────────────────────────────────────
      h1("5. Routing & Page Structure"),

      h2("5.1 Routes"),
      makeTable(
        ["Route", "File", "Type", "Description"],
        [
          ["/", "src/app/page.tsx", "Server Component", "Homepage: hero, featured projects, stats, newsletter CTA"],
          ["/projects", "src/app/projects/page.tsx", "Client Component", "Filterable project catalog with search, category, difficulty, MCU filters"],
          ["/projects/[slug]", "src/app/projects/[slug]/page.tsx", "Server Component", "Dynamic project detail page with header + ProjectTabsContainer"],
          ["/projects/line-follower", "src/app/projects/line-follower/", "Static Page", "Dedicated Line Follower page (separate from [slug] route)"],
          ["/availability", "src/app/availability/page.tsx", "Client Component", "Project-aware 'Where to Buy' page (reads ?project= query param)"],
          ["/components-catalog", "src/app/components-catalog/", "Page", "Component encyclopedia / electronics reference"],
          ["/assistant", "src/app/assistant/", "Page", "AI robotics troubleshooting assistant"],
        ]
      ),
      spacer(),

      h2("5.2 URL-Based Tab Deep Linking"),
      p("The [slug] project page supports deep-linking directly to any tab via a URL query parameter. For example:"),
      bullet("/projects/drone-explorer?tab=steps — Opens directly on Build Steps"),
      bullet("/projects/drone-explorer?tab=code — Opens on Program Code"),
      bullet("/projects/drone-explorer?tab=stores — Opens on Where to Buy"),
      spacer(),
      p("ProjectTabsContainer reads the ?tab= query param on mount via URLSearchParams and sets the initial active tab state. URL hash navigation (#steps, #code etc.) is also supported as a fallback."),

      h2("5.3 Static Generation (SSG)"),
      p("The [slug]/page.tsx file exports generateStaticParams(), which pre-renders all project detail pages at build time. The Line Follower project is excluded from this generator because it has its own dedicated route folder. This means the site loads with zero server-side computation per request for all project pages."),
      pageBreak(),

      // ── 6. COMPONENT ARCHITECTURE ────────────────────────────────────────────
      h1("6. Component Architecture"),

      h2("6.1 ProjectTabsContainer — The Core UI Engine"),
      p("ProjectTabsContainer.tsx (1,073 lines) is the most important component in the codebase. It receives a single project prop and renders the entire interactive project experience through nine tabs:"),
      makeTable(
        ["Tab Key", "Label", "Content"],
        [
          ["overview", "Overview", "Project description, how it works, what you learn, real photograph, assembly video button (Drone only)"],
          ["bom", "Parts List", "Bill of Materials rendered via ProjectBomSection with expandable alternatives"],
          ["wiring", "Wiring", "Color-coded wiring diagram image + color legend table"],
          ["pinout", "Pinouts", "Pin connections table rendered from the pinout data array"],
          ["steps", "Build Steps", "Ordered step cards with What To Do / How To / What You See / Checkpoints / Common Problems / Helpful Tip"],
          ["view3d", "3D View", "RobotViewer3D WebGL scene with component click selection"],
          ["code", "Code", "Syntax-highlighted program code with Copy and Download (.ino or .txt) buttons"],
          ["stores", "Where to Buy", "Store comparison cards + per-part pricing table (dynamic from BOM)"],
          ["faq", "FAQ", "Accordion-style frequently asked questions"],
        ]
      ),
      spacer(),
      p("Key state managed inside ProjectTabsContainer:"),
      bullet("activeTab: ProjectTabType — controls which tab panel is visible"),
      bullet("completedSteps: Record<number, boolean> — tracks which build steps the user has checked off"),
      bullet("codeCopied: boolean — controls the clipboard copy confirmation animation"),
      bullet("openFaq: number | null — which FAQ accordion panel is expanded"),
      spacer(),

      h2("6.2 RobotViewer3D — WebGL 3D Model Component"),
      p("RobotViewer3D.tsx (442 lines) implements a full Three.js scene inside a React component for interactive 3D robot model exploration."),
      spacer(),
      p("Three.js implementation details:"),
      bullet("Scene setup: THREE.Scene with a warm FAF7F2 background color matching the site palette."),
      bullet("Camera: PerspectiveCamera with project-specific position and target vectors loaded from projects3D.ts config."),
      bullet("Renderer: THREE.WebGLRenderer with antialiasing enabled, outputColorSpace set to SRGBColorSpace."),
      bullet("Lighting: AmbientLight at intensity 0.7 plus a DirectionalLight at position (5, 8, 6) with shadow casting enabled."),
      bullet("Model loading: GLTFLoader loads .glb binary model files from /public/robotics/models/."),
      bullet("Interaction: Raycaster detects mouse hover and click on meshes. Intersected objects are highlighted by modifying their material emissive color to the brand-500 orange (#C85A32)."),
      bullet("Controls: OrbitControls enable drag-to-rotate, pinch-to-zoom, and right-click pan."),
      bullet("Component selection: Clicking a 3D mesh looks up the mesh name in the Project3DConfig.componentMapping dictionary and shows a side panel with the component's display name, description, category, and spec."),
      bullet("Cleanup: The useEffect returns a cleanup function that calls renderer.dispose() and cancels the animation frame to prevent memory leaks on route change."),
      spacer(),

      h2("6.3 ProjectBomSection — Parts List & Store Integration"),
      p("ProjectBomSection.tsx renders the Bill of Materials tab. It receives the project object and a projectSlug prop for building the 'Where to Buy' deep-link URL."),
      p("The component groups BOM items by category (Electronics, Movement, Power, Structure) and renders each as an expandable row showing: name, whatIsIt description, whyUsed explanation, quantity, spec, price estimate, stock indicator, and — if available — an alternative component card."),
      spacer(),

      h2("6.4 DiagramViewer — Wiring Image Viewer"),
      p("DiagramViewer.tsx renders the wiring diagram image with zoom and pan controls. It uses CSS transform with a scale state variable and pointer events for drag panning. Images are loaded from /public/robotics/wiring/ or remote URLs."),
      spacer(),

      h2("6.5 Navbar & Footer"),
      p("Navbar.tsx renders the top navigation bar with the RoboNest logo, main nav links (Home, Projects, Where to Buy, Components, Assistant), and a mobile hamburger menu. Footer.tsx renders the bottom site footer with quick links and brand description."),
      pageBreak(),

      // ── 7. BUILD STEPS FEATURE ───────────────────────────────────────────────
      h1("7. Build Steps Feature — Detailed Implementation"),

      h2("7.1 Data Structure"),
      p("Build steps are stored as an array of step objects directly inside each project entry in PROJECTS (projects.ts). There is no separate build steps data file."),

      h2("7.2 Step Rendering (ProjectTabsContainer)"),
      p("When the 'steps' tab is active, ProjectTabsContainer maps over project.steps and renders each step as a card panel. The visual order of sections within each step card is:"),
      bullet("1. Step header — stage label, step number badge, time estimate, and the completion checkbox"),
      bullet("2. Description — one-sentence overview"),
      bullet("3. What to do — goal statement"),
      bullet("4. How to do it — detailed action instructions"),
      bullet("5. What you will see — success indicator"),
      bullet("6. Checkpoints to verify — green check bullet list"),
      bullet("7. Common Problems — amber warning cards (conditional: only rendered if step.commonProblems exists)"),
      bullet("8. Helpful Tip — brand-colored tip card (conditional: only rendered if step.tip exists)"),

      h2("7.3 Progress Tracking"),
      p("The completedSteps state in ProjectTabsContainer is a Record<number, boolean> keyed by stepNumber. Clicking the circular checkbox on any step card calls toggleStep(step.stepNumber), which flips the boolean for that key. Completed steps show a filled green circle and their card gets a green-tinted background. A progress bar above the steps grid shows the percentage of completed steps."),

      h2("7.4 Common Problems (Drone Explorer Quad)"),
      p("The Drone Explorer Quad is the only project currently implementing the commonProblems field. All 12 of its build steps include 2–3 problem entries each. The amber-styled problem cards appear between the checkpoints section and the helpful tip, presenting:"),
      bullet("Problem — what the builder will notice"),
      bullet("Why it happens — plain-language technical explanation"),
      bullet("What to do — concrete actionable fix"),
      p("The rendering is fully conditional: because other projects do not set commonProblems on their steps, the amber section is invisible on Line Follower, Robotic Arm, and RoboSoccer pages."),
      pageBreak(),

      // ── 8. WHERE TO BUY / AVAILABILITY ───────────────────────────────────────
      h1("8. Where to Buy — Availability System"),

      h2("8.1 Architecture"),
      p("The availability system was architected to be fully project-dynamic. Earlier versions had hardcoded Line Follower parts in the stores section for all projects — this was fixed by introducing the two generator functions in stores.ts."),

      h2("8.2 Data Flow"),
      bullet("1. User opens a project page and selects the 'stores' tab."),
      bullet("2. ProjectTabsContainer calls getStoreBundlesForProject(project) and getStorePricingForProject(project) with the current project object."),
      bullet("3. The generator functions iterate over project.bom and compute per-store pricing from the BOM item price estimates."),
      bullet("4. The resulting storeBundles and storePricing arrays are passed as props to ProjectBomSection."),
      bullet("5. ProjectBomSection renders store comparison cards (Robu.in, Quartz, Robocraze, Zbotic) and a per-part pricing comparison table."),
      spacer(),

      h2("8.3 Standalone Availability Page (/availability)"),
      p("The /availability page is a standalone 'Where to Buy' page that supports deep-linking via the ?project= URL query parameter. If the user navigates from the Drone project's stores tab to the full availability page, the URL contains ?project=drone-explorer. The page reads this parameter via useSearchParams() and automatically selects the Drone project and loads its BOM-derived store data."),

      h2("8.4 Indian Robotics Component Stores"),
      makeTable(
        ["Store", "City", "Rating", "Characteristic"],
        [
          ["Robu.in", "Pune, Maharashtra", "4.8 ★", "Largest stock — typically 100% BOM match"],
          ["Quartz Components", "Jaipur, Rajasthan", "4.7 ★", "Best value pricing (96% of Robu price)"],
          ["Robocraze", "Bengaluru, Karnataka", "4.7 ★", "Fast South India and metro dispatch"],
          ["Zbotic", "Surat, Gujarat", "4.5 ★", "Budget-focused (91% of Robu price)"],
        ]
      ),
      pageBreak(),

      // ── 9. PROJECTS — TECHNICAL SPECIFICATIONS ────────────────────────────────
      h1("9. Projects — Technical Specifications"),

      h2("9.1 Line Follower Bot"),
      makeTable(
        ["Field", "Value"],
        [
          ["Category", "Autonomous Rovers"],
          ["Level", "Beginner"],
          ["Time", "4 Hours"],
          ["Microcontroller", "Arduino Uno R3 (ATmega328P)"],
          ["Motor Driver", "L298N Dual H-Bridge"],
          ["Sensors", "2x TCRT5000 Dual IR Line Sensors"],
          ["Parts Count", "14 items"],
          ["Build Steps", "14 steps"],
          ["BOM Items", "14 items across Electronics / Movement / Power / Structure"],
          ["Code Language", "Arduino C++ (Arduino IDE .ino sketch)"],
          ["Troubleshooting", "4 Diagnostic Guides (Power & Battery, Sensors, Motors, Code)"],
        ]
      ),
      spacer(),

      h2("9.2 Drone Explorer Quad"),
      makeTable(
        ["Field", "Value"],
        [
          ["Category", "Aerial Robotics"],
          ["Level", "Intermediate"],
          ["Time", "6 Hours"],
          ["Flight Controller", "SpeedyBee F405 Mini (STM32F405 MCU)"],
          ["ESC", "4-in-1 ESC (DShot600 protocol)"],
          ["Motors", "4x 2205 Brushless Motors"],
          ["Radio", "ExpressLRS (CRSF Serial UART)"],
          ["Parts Count", "11 items"],
          ["Build Steps", "12 steps (each with 2–3 Common Problems entries)"],
          ["Code Type", "Betaflight CLI configuration commands (not Arduino C++)"],
          ["Assembly Video", "External Google Drive video link (opens in new tab)"],
        ]
      ),
      spacer(),

      h2("9.3 Robotic Arm 4-DOF"),
      makeTable(
        ["Field", "Value"],
        [
          ["Category", "Robotic Arms"],
          ["Level", "Intermediate"],
          ["Microcontroller", "Arduino Uno R3"],
          ["Actuators", "4x SG90 / MG996R Servo Motors (4 degrees of freedom)"],
          ["Control", "Joystick or potentiometer-based manual control"],
          ["Build Steps", "10 steps"],
          ["Code Language", "Arduino C++"],
        ]
      ),
      spacer(),

      h2("9.4 RoboSoccer Bot"),
      makeTable(
        ["Field", "Value"],
        [
          ["Category", "Competitive Bots"],
          ["Level", "Intermediate"],
          ["Microcontroller", "Arduino Uno R3"],
          ["Control", "Bluetooth RF remote control (HC-05 module)"],
          ["Drive System", "Differential 4-wheel drive with L298N"],
          ["Build Steps", "12 steps"],
          ["Code Language", "Arduino C++ with serial Bluetooth parsing"],
        ]
      ),
      pageBreak(),

      // ── 10. 3D VIEWER CONFIGURATION ──────────────────────────────────────────
      h1("10. 3D Model Viewer — Configuration System"),

      h2("10.1 projects3D.ts Configuration"),
      p("Each project that has a 3D model is configured in PROJECTS_3D_CONFIG in projects3D.ts. The configuration object (Project3DConfig interface) contains:"),
      makeTable(
        ["Field", "Description"],
        [
          ["slug", "Project identifier — must match the Project.slug"],
          ["modelUrl", "Path to the .glb binary 3D model file in /public/robotics/models/"],
          ["wiringUrl", "Path to the wiring diagram image file"],
          ["pinoutUrl", "Path to the pinout diagram image"],
          ["realImageUrl", "Path to real photograph of the assembled robot"],
          ["cameraPosition", "[x, y, z] — initial camera position vector"],
          ["cameraTarget", "[x, y, z] — orbit controls target (look-at point)"],
          ["modelScale", "Uniform scale applied to the loaded GLTF model"],
          ["componentMapping", "Record<string, Component3DInfo> — mesh name → component display data"],
        ]
      ),
      spacer(),
      p("The componentMapping dictionary maps Three.js mesh names (as they appear in the .glb file) to display information shown in the side panel when the user clicks on a component. Categories include: Microcontroller, Drivers, Sensors, Mechanical, Power, Firmware & Logic, and General."),

      h2("10.2 3D Asset Storage"),
      p("3D model files are stored as binary GLTF (.glb) files at /public/robotics/models/[projectslug]/model.glb. Real project photographs are stored at /public/robotics/[projectslug]-real.[ext]. Wiring diagrams are stored at /public/robotics/wiring/[projectslug]/[filename]."),
      pageBreak(),

      // ── 11. SEO & METADATA ────────────────────────────────────────────────────
      h1("11. SEO & Metadata"),

      h2("11.1 Global Metadata"),
      p("Global SEO metadata is defined in src/app/layout.tsx using Next.js Metadata API:"),
      bullet("Title: 'RoboNest - Learn Robotics Step by Step | Beginner Friendly'"),
      bullet("Description: 'Learn robotics step by step. Beginner-friendly robot projects, clear wiring diagrams, easy build instructions, and live help for anyone building their first robot.'"),
      bullet("Keywords: Robotics, STEM Education, Arduino, Line Follower, ESP32, Maker, DIY Robots, Beginner Robotics"),

      h2("11.2 Image Optimization"),
      p("The project uses next/image for all project header images. Remote image domains are allowlisted in next.config.mjs: lh3.googleusercontent.com and images.unsplash.com. Local images in /public/ are served directly. All image components use fill layout with object-cover for responsive display."),
      pageBreak(),

      // ── 12. ASSISTANT & TROUBLESHOOTING ──────────────────────────────────────
      h1("12. Assistant & Troubleshooting System"),

      h2("12.1 Diagnostic Guides"),
      p("The troubleshooting.ts file defines 4 DiagnosticGuide entries specifically for the Line Follower Bot:"),
      makeTable(
        ["Guide ID", "Category", "Problem"],
        [
          ["brownout-reset", "Power & Battery", "Robot turns off when motors start moving (voltage sag)"],
          ["ir-sunlight-noise", "Sensors & Lights", "Sensors confused by bright room lights / sunlight"],
          ["reverse-motor-spin", "Motors & Steering", "Robot spins in circles (reversed motor wires)"],
          ["baud-rate-clash", "Computer & Code", "Code won't upload or Serial Monitor shows garbage"],
        ]
      ),
      spacer(),
      p("Each guide contains: severity (High/Medium/Low), symptom description, probable cause, a stepByStepFix string array, and a multimeterCheck instruction for users with a multimeter."),

      h2("12.2 Inline Common Problems (Drone)"),
      p("The Drone Explorer Quad uses a different approach: commonProblems are embedded directly in each build step object. This is more contextually precise than the global troubleshooting approach, since each problem entry is specific to the task being performed at that exact step."),
      pageBreak(),

      // ── 13. PROXY & NETWORK ───────────────────────────────────────────────────
      h1("13. Proxy Server & Network Architecture"),

      h2("13.1 proxy-6000.cjs"),
      p("proxy-6000.cjs is a simple Node.js HTTP proxy server that forwards all traffic from port 6000 to localhost:3000 where the Next.js development server runs. It supports WebSocket proxying (required for Next.js Fast Refresh / Hot Module Replacement). The proxy runs with node proxy-6000.cjs and listens on 0.0.0.0:6000, allowing LAN access from other devices on the same network."),

      h2("13.2 Tunnel / External Access"),
      p("The tunnel.cjs script and the npm run tunnel script (package.json) establish an SSH reverse tunnel to localhost.run, exposing the local port 3000 to a temporary public HTTPS URL for external device testing or sharing."),
      pageBreak(),

      // ── 14. KEY DESIGN DECISIONS ──────────────────────────────────────────────
      h1("14. Key Design Decisions & Architecture Rationale"),
      makeTable(
        ["Decision", "Rationale"],
        [
          ["No database — static TypeScript data files", "Zero cost, zero latency, full type safety, simple Git-based content management"],
          ["All content in one PROJECTS array", "Unified source of truth eliminates data synchronization bugs between pages"],
          ["Tabbed UI for project content", "Groups 8+ content types without overwhelming the user with a long scrolling page"],
          ["Dynamic BOM pricing from project data", "Adding a new project automatically generates correct store pages without extra configuration"],
          ["Build steps embedded in project objects", "Keeps step data co-located with project context; enables step-specific commonProblems"],
          ["Three.js without React Three Fiber", "Direct Three.js API gives full control over the render loop, raycasting, and cleanup"],
          ["No external CMS or API", "Suitable for a student/maker project where simplicity and cost matter more than editorial tooling"],
          ["Proxy on port 6000", "Allows testing from phones and tablets on local network without exposing port 3000"],
          ["Plus Jakarta Sans", "Warm, friendly humanist font appropriate for a beginner-facing education platform"],
          ["Brand color: #C85A32 (terracotta)", "Distinctive, warm, non-corporate — fits the maker/DIY aesthetic"],
        ]
      ),
      pageBreak(),

      // ── 15. COMPONENT CATALOG ─────────────────────────────────────────────────
      h1("15. Electronics Component Catalog (components.ts)"),
      p("The components-catalog page is backed by components.ts which defines an array of electronics components used across all projects. Each component entry includes:"),
      bullet("name — Full part name"),
      bullet("category — Type of component (Microcontroller, Sensor, Motor Driver, etc.)"),
      bullet("description — Beginner-friendly explanation of what it is and how it works"),
      bullet("usedIn — List of projects that use this component"),
      bullet("buyLinks — Links to purchase from Indian component stores"),
      spacer(),
      p("This page serves as an electronics encyclopedia for beginners who want to understand components independently from a specific project build guide."),
      pageBreak(),

      // ── 16. DEPENDENCY MAP ────────────────────────────────────────────────────
      h1("16. Component Dependency Map"),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "Data Flow: ", bold: true, size: 22, color: "1A3A5C" }),
          new TextRun({ text: "projects.ts → ProjectTabsContainer → (ProjectBomSection, RobotViewer3D, DiagramViewer)", font: "Courier New", size: 19, color: "C85A32" })
        ]
      }),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "Store Data Flow: ", bold: true, size: 22, color: "1A3A5C" }),
          new TextRun({ text: "project.bom → getStorePricingForProject() → ProjectBomSection (Where to Buy tab)", font: "Courier New", size: 19, color: "C85A32" })
        ]
      }),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "3D Data Flow: ", bold: true, size: 22, color: "1A3A5C" }),
          new TextRun({ text: "projects3D.ts → RobotViewer3D → Three.js scene → componentMapping → side panel", font: "Courier New", size: 19, color: "C85A32" })
        ]
      }),
      new Paragraph({
        spacing: { before: 80, after: 80 },
        children: [
          new TextRun({ text: "Routing: ", bold: true, size: 22, color: "1A3A5C" }),
          new TextRun({ text: "[slug]/page.tsx reads slug → finds project in PROJECTS[] → passes to ProjectTabsContainer", font: "Courier New", size: 19, color: "C85A32" })
        ]
      }),
      spacer(),

      divider(),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 200, after: 60 },
        children: [new TextRun({ text: "End of Document", font: "Calibri", size: 22, color: "888888", italics: true })]
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 40, after: 60 },
        children: [new TextRun({ text: "RoboNest — Dev_Dash v2.1 — October 2026", font: "Calibri", size: 20, color: "AAAAAA" })]
      }),

    ]
  }]
});

const outputPath = path.join(__dirname, "RoboNest_Technical_Implementation.docx");

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputPath, buffer);
  console.log("SUCCESS: Document written to:", outputPath);
}).catch((err) => {
  console.error("ERROR:", err.message);
});
