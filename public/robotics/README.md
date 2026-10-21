# RoboNest Modular Asset Architecture

Welcome to the central asset repository for RoboNest interactive 3D models, wiring schematics, and pinout diagrams.

All assets here are decoupled from the React user interface. **You can replace any asset by dropping a new file into the corresponding folder using the standard filename, without writing or editing any code.**

---

## 📁 Directory Structure Overview

```text
public/robotics/
├── models/                     # Interactive 3D Robot Models (.glb / .gltf)
│   ├── line-follower/model.glb
│   ├── drone-explorer/model.glb
│   ├── robosoccer/model.glb
│   └── robomaze/model.glb
│
├── wiring/                     # Schematic & Bus Connection Diagrams (.png / .svg / .webp / .jpg)
│   ├── line-follower/wiring.png
│   ├── drone-explorer/wiring.png
│   ├── robosoccer/wiring.png
│   └── robomaze/wiring.png
│
└── pinout/                     # Hardware Pin Mapping Diagrams (.png / .svg / .webp / .jpg)
    ├── line-follower/pinout.png
    ├── drone-explorer/pinout.png
    ├── robosoccer/pinout.png
    └── robomaze/pinout.png
```

---

## 🛠️ How to Replace Assets

### 1. Replacing 3D Models (`.glb` / `.gltf`)
- **Location**: `public/robotics/models/<project-slug>/model.glb`
- **Supported Formats**: `.glb` (recommended binary format) or `.gltf`.
- **Workflow**:
  1. Export your CAD / Blender / robot model as a `.glb` file.
  2. Name it `model.glb`.
  3. Drop it into `public/robotics/models/<project-slug>/` (e.g. `public/robotics/models/line-follower/model.glb`), overwriting the existing file.
  4. The 3D viewer will immediately render your new model with orbit controls, smooth lighting, and reset functions.
- **Component Hover/Click Mapping**:
  - In `src/data/projects3D.ts`, you can map 3D mesh names (e.g. `Chassis`, `ArduinoUno`, `MotorDriver`) to RoboNest BOM component IDs and descriptions.
  - If a mesh is unmapped, the viewer automatically formats its node name cleanly as a fallback.

### 2. Replacing Wiring Diagrams
- **Location**: `public/robotics/wiring/<project-slug>/wiring.png`
- **Supported Formats**: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`.
- **Workflow**:
  1. Save your Fritzing, KiCad, or high-res schematic image as `wiring.png`.
  2. Place it in `public/robotics/wiring/<project-slug>/wiring.png`.
  3. The website's Wiring tab will immediately display your new graphic with zoom and download capabilities.

### 3. Replacing Pinout Diagrams
- **Location**: `public/robotics/pinout/<project-slug>/pinout.png`
- **Supported Formats**: `.png`, `.jpg`, `.jpeg`, `.svg`, `.webp`.
- **Workflow**:
  1. Save your pinout diagram graphic as `pinout.png`.
  2. Place it in `public/robotics/pinout/<project-slug>/pinout.png`.
  3. The website's Pinout tab displays the new diagram alongside the interactive pin mapping table.

---

## 🛡️ Automatic Fallbacks
If an asset is missing or still being developed:
- The website **will not crash or show broken image icons**.
- The 3D viewer shows an educational placeholder: *"3D Model coming soon"* with the expected path.
- The diagram viewer shows a clean placeholder: *"Wiring diagram coming soon"* or *"Pinout diagram coming soon"*.
