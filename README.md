# RoboNest

RoboNest is a beginner-friendly robotics learning website. It helps makers explore robot projects, understand the parts and wiring involved, and find guidance for building and troubleshooting.

## Features

- Browse robotics projects and filter them by category, skill level, or microcontroller.
- Open project guides with build steps, parts lists, wiring and pinout references, and 3D model assets where available.
- Search a catalog of robotics components and export the catalog as CSV.
- Compare project parts and sample pricing and availability from electronics stores.
- Use the robotics assistant page for troubleshooting guides and an interactive line-follower pin simulator.

## Pages

| Path | Description |
| --- | --- |
| `/` | RoboNest homepage and featured projects |
| `/projects` | Search and filter the project catalog |
| `/projects/[slug]` | Project detail and build guide |
| `/projects/line-follower` | Line-follower project page |
| `/components-catalog` | Searchable component catalog |
| `/availability` | Compare project parts and store availability |
| `/assistant` | Troubleshooting guides and interactive simulator |

## Getting started

### Requirements

- Node.js 20.9 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server (run `npm run build` first) |
| `npm run lint` | Run the configured Next.js lint command |
| `npm run tunnel` | Forward local port 3000 using the configured SSH tunnel command |

## Tech stack

- Next.js 15 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- Three.js for 3D content
- Lucide icons

## Project structure

```text
src/
  app/          App Router pages and global styles
  components/   Shared UI and 3D/wiring viewers
  data/         Project, component, store, and troubleshooting data
public/
  projects/     Project images
  robotics/     Robot photos, 3D models, wiring, and pinout diagrams
scripts/        Scripts for generating diagrams and models
```

Project and catalog content is maintained in TypeScript under `src/data/`. Product imagery and build references are served from `public/`. Prices and availability shown in the site are informational and may change; confirm details with the relevant supplier before purchasing.
