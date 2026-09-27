# 🏛️ ArchAcademy: The Senior Architect Portal

<div align="center">
  <a href="README.md">🇬🇧 English</a> | <a href="README.tr.md">🇹🇷 Türkçe</a>
</div>

<br />

[![GPL-3.0 License](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7-purple.svg)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://vite-pwa-org.netlify.app/)
[![i18n](https://img.shields.io/badge/i18n-TR%2FEN-green.svg)](https://www.i18next.com/)

**ArchAcademy** is a premium, high-performance educational portal designed for software engineers transitioning into senior architectural roles. It provides deep insights into sustainable software design, architectural patterns, and decision-making frameworks through an interactive, glassmorphic UI.

---

## 🌟 Core Pillars

ArchAcademy is built upon three fundamental teaching philosophies:

1.  **Visual First Philosophy**: Concepts like Clean Architecture or EDA are not just explained with text, but visualized through interactive diagrams and simulations.
2.  **Trade-off Mindset**: Every architectural choice is a trade-off. ArchAcademy focuses on *why* and *when* to choose a pattern, rather than just *how*.
3.  **Modern AI-Native Approach**: Covers contemporary patterns including Agentic AI, RAG (Retrieval-Augmented Generation), and LLM-Ops, alongside classic industry standards.

## 🚀 Key Features

### 🧩 Master Matrix
A comprehensive comparison tool for major architectural styles (Clean, Vertical Slice, Hexagonal, Event-Driven, etc.), analyzed by development speed, testability, and scalability.

### 🧭 Architect's Compass (Wizard)
An intelligent discovery tool that analyzes your project requirements (team size, time horizon, domain complexity) and recommends the most suitable architectural starting point.

### 🛣️ Architect's Journey (Roadmap)
A step-by-step career path from **The Craftsman** to **The Visionary**, covering SOLID principles, patterns, and strategic leadership.

### 🧪 System Design Sandbox (`/sandbox`)
Drag and drop load balancers, API gateways, microservices, message queues, workers, caches, databases, object stores and search engines onto a topology canvas. Draw connections, set replica counts, and let the topology reviewer score your design and flag single points of failure, client-exposed databases, unconsumed queues, missing cache layers and request cycles.

### 📄 ADR Generator (`/adr-generator`)
Turns your sandbox topology into a **MADR 3.0.0** decision record: context, decision drivers, considered options, the decision, a component inventory, a redundancy plan, an auto-generated Mermaid flowchart, consequences, open architectural risks and review triggers. Copy to clipboard or download the `.md` for your repository.

### ☁️ Cloud-synced progress
Lesson completion, quiz scores and saved designs are held in a Zustand store and pushed to a REST endpoint with conflict merging, retry and offline queueing. The legacy local storage state is migrated automatically, and the app stays fully usable offline.

### 📚 Content behind a CMS port
Lessons, glossary and search content are resolved through a `ContentRepository`: remote CMS first when `VITE_CMS_ENDPOINT` is configured, bundled seed snapshot otherwise. Content can ship from a CMS without a rebuild.

### 📜 Architect's Cheat Sheet (`/acronyms`)
Comprehensive reference guide for software engineering acronyms & core principles: **KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, CAP, FIRST, STUPID**, and more.

### 🔍 Advanced Fuzzy Search
Powered by **Fuse.js**, find any architectural concept instantly across 90+ pages with intelligent keyword matching.

### 🌍 Multi-language & SEO
Full **i18n** support (TR/EN) and optimized for search engines with dynamic meta tags, sitemaps, and structured data.

### 🤖 AI-Native & Vibe Coding Mimari Matrisi (AI Context & Locality)
ArchAcademy, mimarileri sadece geleneksel metriklerle değil; **AI-Native geliştirme (Vibe Coding, Context Locality, Klasör Atlama)** ekseninde de değerlendirir:

| Mimari / Stil | 📁 AI Locality (Klasör Atlama) | ⭐ GitHub Popülaritesi | 🧘 Vibe Coding (Anlaşılabilirlik) | 🎯 Toplam |
| :--- | :---: | :---: | :---: | :---: |
| 👑 **Vertical Slice Architecture** | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | **14 / 15** |
| 🚀 **Pragmatic Monolith (Modular)** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐⭐ (5/5) | **14 / 15** |
| ⚛️ **Component-Driven / Islands** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | **13 / 15** |
| 🌐 **Classic MVC** | ⭐⭐⭐ (3/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐⭐ (4/5) | **12 / 15** |
| ⚡ **Serverless / FaaS** | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐⭐ (3/5) | **11 / 15** |
| 🧱 **n-Tier / Katmanlı Mimari** | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐⭐ (3/5) | **10 / 15** |
| 💎 **Clean Architecture** | ⭐⭐ (2/5) | ⭐⭐⭐⭐⭐ (5/5) | ⭐⭐ (2/5) | **9 / 15** |
| ⬡ **Hexagonal (Ports & Adapters)** | ⭐⭐ (2/5) | ⭐⭐⭐⭐ (4/5) | ⭐⭐ (2/5) | **8 / 15** |

### 📱 PWA & Offline Support
Installable as a standalone app on desktop and mobile. All architectural guides are available offline for on-the-go learning.

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 7](https://vitejs.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Routing**: [React Router DOM 7](https://reactrouter.com/)
- **State Management**: [Zustand 5](https://zustand-demo.pmnd.rs/)
- **Search Engine**: [Fuse.js](https://www.fusejs.io/)
- **Localization**: [i18next](https://www.i18next.com/)
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **PWA**: [Vite PWA Plugin](https://vite-pwa-org.netlify.app/)
- **Animations**: [Framer Motion 12](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS (Modern CSS Variables & Glassmorphism)
- **Testing**: [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/)

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
.
├── .github/workflows/         # CI/CD Pipelines (Build, Test, Deploy)
├── public/                    # Static assets & Manifest (PWA, Sitemap, Robots)
├── scripts/                   # Project graph generator and content audits
├── src/
│   ├── domain/                # Pure business logic (Entities, Use Cases, Repository Ports)
│   │   ├── entities/          # CmsEntry, Sandbox, Progress
│   │   ├── repositories/      # ContentRepository, ProgressRepository (ports)
│   │   └── usecases/          # TopologyAnalyzer, AdrGenerator, QuizScorer, ProgressMerger
│   ├── infrastructure/        # Adapters: CMS client, cloud sync, offline cache, stores
│   │   ├── cms/               # Remote-first content repository + bundled seed snapshots
│   │   ├── config/            # Typed environment configuration
│   │   ├── repositories/      # CloudProgress, LocalProgressCache, SyncingProgressRepository
│   │   ├── storage/           # Safe storage wrapper (quota tolerant)
│   │   └── stores/            # Zustand stores (progress, sandbox)
│   ├── i18n/                  # Localization configuration and translations
│   ├── presentation/          # UI layer
│   │   ├── components/        # Reusable UI elements (SEO, Navbar, CommandPalette, sandbox/, adr/)
│   │   ├── pages/             # 90+ architecture pages (Clean Arch, Agentic AI, Sandbox, etc.)
│   │   ├── context/           # Thin adapter over the progress store
│   │   ├── hooks/             # Custom React hooks (useCmsCollection, useAssessmentQuiz, useLocalStorage)
│   │   ├── navigation/        # Routing configuration (AppRouter)
│   │   └── themes/            # Design tokens and theme configuration
│   ├── tests/                 # Unit and integration tests (Vitest)
│   └── assets/                # Local images and styles
├── eslint.config.js           # Modern ESLint (v9+) configuration
└── vite.config.js             # Vite configuration with PWA and Vitest setup
```

### Configuration

All runtime configuration is optional; the app runs fully offline without it. Copy `.env.example` to `.env` to enable remote services.

| Variable | Purpose |
|----------|---------|
| `VITE_CMS_ENDPOINT` | Headless CMS base URL serving `GET {endpoint}/collections/{name}` |
| `VITE_CMS_TOKEN` | Optional bearer token for the CMS |
| `VITE_CMS_TIMEOUT_MS` | CMS request timeout (default `6000`) |
| `VITE_PROGRESS_SYNC_ENDPOINT` | REST base URL for progress sync (`GET`/`PUT {endpoint}/progress/{ownerId}`) |
| `VITE_PROGRESS_SYNC_TOKEN` | Optional bearer token for the sync endpoint |
| `VITE_PROGRESS_SYNC_TIMEOUT_MS` | Sync request timeout (default `8000`) |
| `VITE_PROGRESS_USER_ID` | Owner id used to scope progress on the server (default `local-learner`) |

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (PWA included) |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run test suite with Vitest in watch mode |
| `npm run test:run` | Run test suite once |
| `npm run lint` | Run ESLint check |
| `npm run lint:fix` | Run ESLint and automatically fix issues |
| `npm run check` | Type-check with TypeScript |
| `npm run scan` | Generate project dependency graph |
| `node scripts/audit_search_and_wiki.mjs` | Audit search index coverage and glossary completeness |

## 📜 License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

---