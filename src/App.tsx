import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './context/ProgressContext';
import ErrorBoundary from './presentation/components/ErrorBoundary';
import CommandPalette from './presentation/components/CommandPalette';
import ScrollToTop from './presentation/components/ScrollToTop';

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
const MicrokernelPage = lazy(() => import('./presentation/pages/MicrokernelPage'));
const ServerlessPage = lazy(() => import('./presentation/pages/ServerlessPage'));
const ProjectPage = lazy(() => import('./presentation/pages/ProjectPage'));
const SOLIDPage = lazy(() => import('./presentation/pages/SOLIDPage'));
const GlossaryPage = lazy(() => import('./presentation/pages/GlossaryPage'));
const SystemPage = lazy(() => import('./presentation/pages/SystemPage'));
const AssessmentPage = lazy(() => import('./presentation/pages/AssessmentPage'));
const RefactoringPage = lazy(() => import('./presentation/pages/RefactoringPage'));
const RoadmapPage = lazy(() => import('./presentation/pages/RoadmapPage'));
const CleanCodePage = lazy(() => import('./presentation/pages/CleanCodePage'));
const WorkshopPage = lazy(() => import('./presentation/pages/WorkshopPage'));
const EvolutionaryPage = lazy(() => import('./presentation/pages/EvolutionaryPage'));
const SpaceBasedPage = lazy(() => import('./presentation/pages/SpaceBasedPage'));
const P2PPage = lazy(() => import('./presentation/pages/P2PPage'));
const SOAPage = lazy(() => import('./presentation/pages/SOAPage'));
const CatalogPage = lazy(() => import('./presentation/pages/CatalogPage'));
const ObjectOrientedPage = lazy(() => import('./presentation/pages/ObjectOrientedPage'));
const PipeFilterPage = lazy(() => import('./presentation/pages/PipeFilterPage'));
const InterpreterPage = lazy(() => import('./presentation/pages/InterpreterPage'));
const BrokerPage = lazy(() => import('./presentation/pages/BrokerPage'));
const OrchestrationPage = lazy(() => import('./presentation/pages/OrchestrationPage'));
const ChoreographyPage = lazy(() => import('./presentation/pages/ChoreographyPage'));
const BigDataPage = lazy(() => import('./presentation/pages/BigDataPage'));
const EventSourcingPage = lazy(() => import('./presentation/pages/EventSourcingPage'));
const MVCPage = lazy(() => import('./presentation/pages/MVCPage'));
const MVVMPage = lazy(() => import('./presentation/pages/MVVMPage'));
const LambdaPage = lazy(() => import('./presentation/pages/LambdaPage'));
const PlugInPage = lazy(() => import('./presentation/pages/PlugInPage'));
const MVPPage = lazy(() => import('./presentation/pages/MVPPage'));
const PubSubPage = lazy(() => import('./presentation/pages/PubSubPage'));
const PrimarySecondaryPage = lazy(() => import('./presentation/pages/PrimarySecondaryPage'));
const KappaPage = lazy(() => import('./presentation/pages/KappaPage'));
const ECSPage = lazy(() => import('./presentation/pages/ECSPage'));
const SecurityPage = lazy(() => import('./presentation/pages/SecurityPage'));
const RobustnessPage = lazy(() => import('./presentation/pages/RobustnessPage'));
const DocumentationPage = lazy(() => import('./presentation/pages/DocumentationPage'));
const TestingPage = lazy(() => import('./presentation/pages/TestingPage'));
const AbstractionPage = lazy(() => import('./presentation/pages/AbstractionPage'));
const DisciplineCatalogPage = lazy(() => import('./presentation/pages/DisciplineCatalogPage'));
const LeanArchitecturePage = lazy(() => import('./presentation/pages/LeanArchitecturePage'));
const DesignTokensPage = lazy(() => import('./presentation/pages/DesignTokensPage'));
const AtomicDesignPage = lazy(() => import('./presentation/pages/AtomicDesignPage'));
const DesignPatternsPage = lazy(() => import('./presentation/pages/DesignPatternsPage'));
const BookshelfPage = lazy(() => import('./presentation/pages/BookshelfPage'));
const NotFoundPage = lazy(() => import('./presentation/pages/NotFoundPage'));

const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
    <div className="loader">Yükleniyor...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <ProgressProvider>
      <Router>
        <ScrollToTop />
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
                    <Route path="/microkernel" element={<MicrokernelPage />} />
                    <Route path="/serverless" element={<ServerlessPage />} />
                    <Route path="/compare" element={<ComparisonPage />} />
                    <Route path="/project-arch" element={<ProjectPage />} />
                    <Route path="/solid" element={<SOLIDPage />} />
                    <Route path="/glossary" element={<GlossaryPage />} />
                    <Route path="/system" element={<SystemPage />} />
                    <Route path="/assessment" element={<AssessmentPage />} />
                    <Route path="/refactoring" element={<RefactoringPage />} />
                    <Route path="/roadmap" element={<RoadmapPage />} />
                    <Route path="/clean-code" element={<CleanCodePage />} />
                    <Route path="/evolution" element={<EvolutionaryPage />} />
                    <Route path="/space-based" element={<SpaceBasedPage />} />
                    <Route path="/p2p" element={<P2PPage />} />
                    <Route path="/soa" element={<SOAPage />} />
                    <Route path="/catalog" element={<CatalogPage />} />
                    <Route path="/workshop" element={<WorkshopPage />} />
                    <Route path="/object-oriented" element={<ObjectOrientedPage />} />
                    <Route path="/pipe-filter" element={<PipeFilterPage />} />
                    <Route path="/interpreter" element={<InterpreterPage />} />
                    <Route path="/broker" element={<BrokerPage />} />
                    <Route path="/orchestration" element={<OrchestrationPage />} />
                    <Route path="/choreography" element={<ChoreographyPage />} />
                    <Route path="/big-data" element={<BigDataPage />} />
                    <Route path="/event-sourcing" element={<EventSourcingPage />} />
                    <Route path="/mvc-mvvm" element={<MVCPage />} />
                    <Route path="/mvvm" element={<MVVMPage />} />
                    <Route path="/lambda" element={<LambdaPage />} />
                    <Route path="/plugin" element={<PlugInPage />} />
                    <Route path="/mvp" element={<MVPPage />} />
                    <Route path="/pub-sub" element={<PubSubPage />} />
                    <Route path="/primary-secondary" element={<PrimarySecondaryPage />} />
                    <Route path="/kappa" element={<KappaPage />} />
                    <Route path="/ecs" element={<ECSPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/robustness" element={<RobustnessPage />} />
                    <Route path="/docs-annotations" element={<DocumentationPage />} />
                    <Route path="/testing" element={<TestingPage />} />
                    <Route path="/abstraction" element={<AbstractionPage />} />
                    <Route path="/discipline-catalog" element={<DisciplineCatalogPage />} />
                    <Route path="/lean-architecture" element={<LeanArchitecturePage />} />
                    <Route path="/design-tokens" element={<DesignTokensPage />} />
                    <Route path="/atomic-design" element={<AtomicDesignPage />} />
                    <Route path="/design-patterns" element={<DesignPatternsPage />} />
                    <Route path="/library" element={<BookshelfPage />} />
                    <Route path="*" element={<NotFoundPage />} />
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
