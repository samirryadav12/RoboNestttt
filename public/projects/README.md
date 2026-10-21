# Real Project Photographs

This folder contains high-resolution physical photographs of completed projects, displayed directly beneath the interactive 3D model in the **"3D View"** tab.

---

## 📁 File Structure

```text
public/projects/
├── line-follower-real.png     # Real Line Follower Bot physical workbench photo
├── drone-real.jpg             # Real Drone Explorer Quad flight photograph
├── robosoccer-real.jpg        # Real RoboSoccer Bot competition photograph
├── robomaze-real.jpg          # Real RoboMaze Solver micro-rover photograph
└── robotic-arm-real.jpg       # Real Robotic Arm 4-DOF manipulator photograph
```

---

## 🛠️ How to Replace a Real Photograph

1. Choose or take a photo of the completed robot.
2. Save it with the filename corresponding to the project (e.g., `line-follower-real.png` or `drone-real.jpg`).
3. Place it in `public/projects/`, overwriting the existing file.
4. The 3D View comparison section will immediately display your new photograph.

*(Alternatively, you can update the `realImage` path for any project in `src/data/projects.ts` or `src/data/projects3D.ts`.)*
