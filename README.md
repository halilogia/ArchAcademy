# 🏛️ ArchAcademy: The Senior Architect Portal

[![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)

**ArchAcademy** is a premium, high-performance educational portal designed for software engineers transitioning into senior architectural roles. It provides deep insights into sustainable software design, architectural patterns, and decision-making frameworks through an interactive, glassmorphic UI.

---

## 🌟 Core Pillars

ArchAcademy is built upon three fundamental teaching philosophies:

1.  **Visual First Philosophy**: Concepts like Clean Architecture or EDA are not just explained with text, but visualized through interactive diagrams and simulations.
2.  **Trade-off Mindset**: Every architectural choice is a trade-off. ArchAcademy focuses on *why* and *when* to choose a pattern, rather than just *how*.
3.  **Modern Aesthetics**: A premium Glassmorphic design system that reflects the quality and precision expected in high-level software architecture.

## 🚀 Key Features

### 🧩 Master Matrix
A comprehensive comparison tool for major architectural styles (Clean, Vertical Slice, Hexagonal, Event-Driven, etc.), analyzed by development speed, testability, and scalability.

### 🧭 Architect's Compass (Wizard)
An intelligent discovery tool that analyzes your project requirements (team size, time horizon, domain complexity) and recommends the most suitable architectural starting point.

### 🛣️ Architect's Journey (Roadmap)
A step-by-step career path from **The Craftsman** to **The Visionary**, covering SOLID principles, patterns, and strategic leadership.

### 📖 The Architect's Glossary
A specialized dictionary of architectural terms (from *Inversion of Control* to *Vertical Slices*) with "Guru Tips" for practical understanding and interview preparation.

### 🎮 Architecture Workshop
Interactive quizzes and level-based challenges that test your ability to structure folders, manage dependencies, and split monoliths.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern CSS Variables & Glassmorphism)

## 📥 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/halilogia/ArchAcademy.git
   ```

2. Navigate to the project directory:
   ```bash
   cd CA
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

The project follows a modified Clean Architecture structure for the frontend:

```text
src/
├── domain/           # Pure business logic (Entities, Use Cases)
├── infrastructure/   # Data repositories, External APIs
├── presentation/     # UI Components, Pages, Styling
│   ├── components/   # Reusable UI elements
│   ├── pages/        # Main application views
│   └── styles/       # Global CSS & Design Tokens
└── context/          # Global State Management (Progress)
```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Designed with ❤️ by **Antigravity** & **ArchAcademy Team**.
