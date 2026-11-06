# ORBITFORGE — Space Mission Design Simulator

**Design. Simulate. Explore.**

ORBITFORGE is an interactive space mission design simulator where players take on the role of a spacecraft mission designer. Select a destination, configure spacecraft systems, balance engineering resources, and test whether your spacecraft is ready for launch.

The project aims to make the fundamentals of spacecraft engineering and mission planning accessible through an interactive, browser-based experience.

## 🚀 Project Overview

Space missions require careful planning. Every spacecraft must operate within engineering constraints such as mass, power consumption, available energy, and mission budget.

ORBITFORGE introduces these challenges through a simulation game featuring two mission destinations:

- **Moon — Echoes of the Moon:** Investigate the lunar south pole and search for signs of water ice.
- **Mars — Red Planet Survey:** Study the Martian atmosphere and map the planet's surface.

Players configure their spacecraft and evaluate whether their designs satisfy the selected mission's requirements.

## ✨ Current Features

- **Mission Selection:** Choose between Moon and Mars exploration missions.
- **Spacecraft Configuration:** Customize five spacecraft systems:
  - Spacecraft bus
  - Scientific instrument
  - Propulsion system
  - Power system
  - Communication system
- **Engineering Calculator:** Calculate total spacecraft mass, power consumption, power generation, and estimated mission cost.
- **Live Resource Dashboard:** Monitor mass limits, power balance, and remaining budget.
- **Mission Simulation:** Run engineering checks and receive pass/fail results with explanations.
- **Launch Preparation:** Start a countdown when the spacecraft passes its engineering checks.
- **Interactive 3D Spacecraft:** Inspect and rotate a 3D spacecraft model in the mission designer.

## 🛰️ Engineering Simulation

The simulator evaluates spacecraft configurations against three primary constraints:

| Engineering Constraint | What It Checks |
|---|---|
| Mass | Whether the spacecraft stays within the mission mass limit |
| Power | Whether available power generation meets system consumption |
| Budget | Whether the configuration stays within the mission budget |

Current game assumptions:

| Mission | Maximum Spacecraft Mass |
|---|---:|
| Moon | 350 kg |
| Mars | 400 kg |

The current mission budget is **$100 million**.

*These values are illustrative gameplay assumptions, not official NASA mission specifications.*

## 🛠️ Technology Stack

- **React** — User interface and application logic
- **Vite** — Development server and build tooling
- **JavaScript** — Simulation logic and interactivity
- **CSS** — Interface styling and responsive layout
- **Three.js** — 3D graphics rendering
- **React Three Fiber** — React renderer for Three.js
- **React Three Drei** — 3D scene utilities and controls

## 💻 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/SifatNycto/space-mission-design-game.git
```

Navigate into the project directory:

```bash
cd space-mission-design-game
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal, usually:

```text
http://localhost:5173/
```

## 📁 Project Structure

```text
space-mission-design-game/
├── public/
├── src/
│   ├── components/
│   │   └── Spacecraft3D.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

## 🗺️ Development Roadmap

ORBITFORGE is under active development. Planned improvements include:

- More realistic spacecraft 3D models and materials
- Mission-specific spacecraft configurations
- More detailed mission environments
- Improved launch and mission animations
- Expanded engineering parameters and simulation logic
- Mission progression and performance evaluation

## 🎯 Project Goal

The goal of ORBITFORGE is to combine space exploration, engineering concepts, and interactive game design into an engaging educational simulation.

Players should not simply launch a spacecraft — they should understand the engineering decisions that make a mission possible.

## 👨‍💻 Developer

**Mehedi Hasan Sifat**

GitHub: [@SifatNycto](https://github.com/SifatNycto)

---

*ORBITFORGE — Design your mission. Engineer your spacecraft. Explore beyond Earth.*