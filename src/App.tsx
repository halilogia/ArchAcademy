import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import ErrorBoundary from './presentation/components/ErrorBoundary';
import CommandPalette from './presentation/components/CommandPalette';

// Lazy Load Pages for Fault Isolation & Performance
const HomePage = lazy(() => import('./presentation/pages/HomePage'));
const CleanArchPage = lazy(() => import('./presentation/pages/CleanArchPage'));
const DDDPage = lazy(() => import('./presentation/pages/DDDPage'));
const HexagonalPage = lazy(() => import('./presentation/pages/HexagonalPage'));
const OnionPage = lazy(() => import('./presentation/pages/OnionPage'));
const FSDPage = lazy(() => import('./presentation/pages/FSDPage'));
const VerticalSlicePage = lazy(() => import('./presentation/pages/VerticalSlicePage'));
const CQRSPage = lazy(() => import('./presentation/pages/CQRSPage'));
const HorizontalPage = lazy(() => import('./presentation/pages/HorizontalPage'));
const EDAPage = lazy(() => import('./presentation/pages/EDAPage'));
const ComparisonPage = lazy(() => import('./presentation/pages/ComparisonPage'));
const ProjectPage = lazy(() => import('./presentation/pages/ProjectPage'));
const SOLIDPage = lazy(() => import('./presentation/pages/SOLIDPage'));
const GlossaryPage = lazy(() => import('./presentation/pages/GlossaryPage'));
const SystemPage = lazy(() => import('./presentation/pages/SystemPage'));
const AssessmentPage = lazy(() => import('./presentation/pages/AssessmentPage'));
const RefactoringPage = lazy(() => import('./presentation/pages/RefactoringPage'));
const RoadmapPage = lazy(() => import('./presentation/pages/RoadmapPage'));
const DesignSystemPage = lazy(() => import('./presentation/pages/DesignSystemPage'));
const CleanCodePage = lazy(() => import('./presentation/pages/CleanCodePage'));
const WorkshopPage = lazy(() => import('./presentation/pages/WorkshopPage'));
const EvolutionaryPage = lazy(() => import('./presentation/pages/EvolutionaryPage'));

const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
    <div className="loader">Yükleniyor...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <CommandPalette />
          <main style={{ flex: 1 }}>
            <ErrorBoundary>
              <Suspense fallback={<LoadingFallback />}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/clean-arch" element={<CleanArchPage />} />
                    <Route path="/ddd" element={<DDDPage />} />
                    <Route path="/hexagonal" element={<HexagonalPage />} />
                    <Route path="/onion" element={<OnionPage />} />
                    <Route path="/fsd" element={<FSDPage />} />
                    <Route path="/vertical" element={<VerticalSlicePage />} />
                    <Route path="/cqrs" element={<CQRSPage />} />
                    <Route path="/horizontal" element={<HorizontalPage />} />
                    <Route path="/eda" element={<EDAPage />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/project-arch" element={<ProjectPage />} />
                    <Route path="/solid" element={<SOLIDPage />} />
                    <Route path="/glossary" element={<GlossaryPage />} />
                    <Route path="/system" element={<SystemPage />} />
                    <Route path="/assessment" element={<AssessmentPage />} />
                    <Route path="/refactoring" element={<RefactoringPage />} />
                    <Route path="/roadmap" element={<RoadmapPage />} />
                    <Route path="/design-system" element={<DesignSystemPage />} />
                    <Route path="/clean-code" element={<CleanCodePage />} />
                    <Route path="/evolution" element={<EvolutionaryPage />} />
                    <Route path="/workshop" element={<WorkshopPage />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </ErrorBoundary>
          </main>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
