import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import HomePage from './presentation/pages/HomePage';
import CleanArchPage from './presentation/pages/CleanArchPage';
import DDDPage from './presentation/pages/DDDPage';
import HexagonalPage from './presentation/pages/HexagonalPage';
import OnionPage from './presentation/pages/OnionPage';
import FSDPage from './presentation/pages/FSDPage';
import VerticalSlicePage from './presentation/pages/VerticalSlicePage';
import CQRSPage from './presentation/pages/CQRSPage';
import HorizontalPage from './presentation/pages/HorizontalPage';
import EDAPage from './presentation/pages/EDAPage';
import ComparisonPage from './presentation/pages/ComparisonPage';
import ProjectPage from './presentation/pages/ProjectPage';
import SOLIDPage from './presentation/pages/SOLIDPage';
import GlossaryPage from './presentation/pages/GlossaryPage';
import SystemPage from './presentation/pages/SystemPage';
import AssessmentPage from './presentation/pages/AssessmentPage';
import RefactoringPage from './presentation/pages/RefactoringPage';
import RoadmapPage from './presentation/pages/RoadmapPage';
import DesignSystemPage from './presentation/pages/DesignSystemPage';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
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
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </Router>
    </ProgressProvider>
  );
}

export default App;
