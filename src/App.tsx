import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './presentation/components/Navbar';
import Footer from './presentation/components/Footer';
import { AnimatePresence } from 'framer-motion';
import { ProgressProvider } from './presentation/context/ProgressContext';
import ErrorBoundary from './presentation/components/ErrorBoundary';
import CommandPalette from './presentation/components/CommandPalette';
import ScrollToTop from './presentation/components/ScrollToTop';

// Lazy Load Pages for Fault Isolation & Performance
const HomePage = lazy(() => import('./presentation/pages/home'));
const CleanArchPage = lazy(() => import('./presentation/pages/clean-arch'));
const ClientServerPage = lazy(() => import('./presentation/pages/client-server'));
const IntentArchitecturePage = lazy(() => import('./presentation/pages/fna-concept'));
const DDDPage = lazy(() => import('./presentation/pages/ddd'));
const HexagonalPage = lazy(() => import('./presentation/pages/hexagonal'));
const OnionPage = lazy(() => import('./presentation/pages/onion'));
const FSDPage = lazy(() => import('./presentation/pages/fsd'));
const VerticalSlicePage = lazy(() => import('./presentation/pages/vertical'));
const CQRSPage = lazy(() => import('./presentation/pages/cqrs'));
const HorizontalPage = lazy(() => import('./presentation/pages/horizontal'));
const EDAPage = lazy(() => import('./presentation/pages/eda'));
const ComparisonPage = lazy(() => import('./presentation/pages/compare'));
const MicrokernelPage = lazy(() => import('./presentation/pages/microkernel'));
const ServerlessPage = lazy(() => import('./presentation/pages/serverless'));
const ProjectPage = lazy(() => import('./presentation/pages/project-arch'));
const SOLIDPage = lazy(() => import('./presentation/pages/solid'));
const GlossaryPage = lazy(() => import('./presentation/pages/glossary'));
const MicroservicesPage = lazy(() => import('./presentation/pages/microservices'));
const AssessmentPage = lazy(() => import('./presentation/pages/assessment'));
const RefactoringPage = lazy(() => import('./presentation/pages/refactoring'));
const RoadmapPage = lazy(() => import('./presentation/pages/roadmap'));
const CleanCodePage = lazy(() => import('./presentation/pages/clean-code'));
const WorkshopPage = lazy(() => import('./presentation/pages/workshop'));
const EvolutionaryPage = lazy(() => import('./presentation/pages/evolution'));
const SpaceBasedPage = lazy(() => import('./presentation/pages/space-based'));
const P2PPage = lazy(() => import('./presentation/pages/p2p'));
const SOAPage = lazy(() => import('./presentation/pages/soa'));
const CatalogPage = lazy(() => import('./presentation/pages/catalog'));
const ObjectOrientedPage = lazy(() => import('./presentation/pages/object-oriented'));
const PipeFilterPage = lazy(() => import('./presentation/pages/pipe-filter'));
const InterpreterPage = lazy(() => import('./presentation/pages/interpreter'));
const BrokerPage = lazy(() => import('./presentation/pages/broker'));
const OrchestrationPage = lazy(() => import('./presentation/pages/orchestration'));
const ChoreographyPage = lazy(() => import('./presentation/pages/choreography'));
const LambdaKappaPage = lazy(() => import('./presentation/pages/lambda-kappa'));
const EventSourcingPage = lazy(() => import('./presentation/pages/event-sourcing'));
const MVCPage = lazy(() => import('./presentation/pages/mvc'));
const MVVMPage = lazy(() => import('./presentation/pages/mvvm'));
const PlugInPage = lazy(() => import('./presentation/pages/plugin'));
const MVPPage = lazy(() => import('./presentation/pages/mvp'));
const PubSubPage = lazy(() => import('./presentation/pages/pub-sub'));
const PrimarySecondaryPage = lazy(() => import('./presentation/pages/primary-secondary'));
const ECSPage = lazy(() => import('./presentation/pages/ecs'));
const SecurityPage = lazy(() => import('./presentation/pages/security'));
const RobustnessPage = lazy(() => import('./presentation/pages/robustness'));
const DocumentationPage = lazy(() => import('./presentation/pages/docs-annotations'));
const TestingPage = lazy(() => import('./presentation/pages/testing'));
const AbstractionPage = lazy(() => import('./presentation/pages/abstraction'));
const DependencyManagementPage = lazy(() => import('./presentation/pages/dependency-management'));
const ModerateAbstractionPage = lazy(() => import('./presentation/pages/moderate-abstraction'));
const DisciplineCatalogPage = lazy(() => import('./presentation/pages/discipline-catalog'));
const LeanArchitecturePage = lazy(() => import('./presentation/pages/lean-architecture'));
const DesignTokensPage = lazy(() => import('./presentation/pages/design-tokens'));
const AtomicDesignPage = lazy(() => import('./presentation/pages/atomic-design'));
const ServerDrivenUIPage = lazy(() => import('./presentation/pages/server-driven-ui'));
const IslandsArchPage = lazy(() => import('./presentation/pages/islands-arch'));
const UIArchitectureCatalogPage = lazy(() => import('./presentation/pages/ui-catalog'));
const MicroFrontendsPage = lazy(() => import('./presentation/pages/micro-frontends'));
const GitOpsPage = lazy(() => import('./presentation/pages/gitops'));
const ContainerizationPage = lazy(() => import('./presentation/pages/containerization'));
const ZeroTrustPage = lazy(() => import('./presentation/pages/zero-trust'));
const RAGPage = lazy(() => import('./presentation/pages/rag-arch'));
const AgenticAIPage = lazy(() => import('./presentation/pages/agentic-ai'));
const LLMOpsPage = lazy(() => import('./presentation/pages/llm-ops'));
const StateDrivenPage = lazy(() => import('./presentation/pages/state-driven'));
const ComponentDrivenPage = lazy(() => import('./presentation/pages/component-driven'));
const CompositeUIPage = lazy(() => import('./presentation/pages/composite-ui'));
const DataAICatalogPage = lazy(() => import('./presentation/pages/data-ai-catalog'));
const CloudCatalogPage = lazy(() => import('./presentation/pages/cloud-catalog'));
const DesignPatternsPage = lazy(() => import('./presentation/pages/design-patterns'));
const BookshelfPage = lazy(() => import('./presentation/pages/library'));
const SynthesisLabPage = lazy(() => import('./presentation/pages/synthesis-lab'));
const TDDPage = lazy(() => import('./presentation/pages/tdd'));
const OOPFundamentalsPage = lazy(() => import('./presentation/pages/oop-fundamentals'));
const CAPTheoremPage = lazy(() => import('./presentation/pages/cap-theorem'));
const ACIDPage = lazy(() => import('./presentation/pages/acid'));
const VIPERPage = lazy(() => import('./presentation/pages/viper'));
const MVVMCPage = lazy(() => import('./presentation/pages/mvvm-c'));
const AntiPatternsPage = lazy(() => import('./presentation/pages/anti-patterns'));
const NotFoundPage = lazy(() => import('./presentation/pages/not-found'));
const VectorDBPage = lazy(() => import('./presentation/pages/vector-dbs'));
const BFFPage = lazy(() => import('./presentation/pages/bff'));
const MVIPage = lazy(() => import('./presentation/pages/mvi'));
const SPAvsMPAPage = lazy(() => import('./presentation/pages/spa-vs-mpa'));
const ComponentStatePage = lazy(() => import('./presentation/pages/component-state'));
const EliteArchitecturePage = lazy(() => import('./presentation/pages/elite-architecture'));



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
                    <Route path="/fna-concept" element={<IntentArchitecturePage />} />
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
                    <Route path="/microservices" element={<MicroservicesPage />} />
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
                    <Route path="/lambda-kappa" element={<LambdaKappaPage />} />
                    <Route path="/event-sourcing" element={<EventSourcingPage />} />
                    <Route path="/mvc" element={<MVCPage />} />
                    <Route path="/mvvm" element={<MVVMPage />} />
                    <Route path="/plugin" element={<PlugInPage />} />
                    <Route path="/mvp" element={<MVPPage />} />
                    <Route path="/client-server" element={<ClientServerPage />} />
                    <Route path="/pub-sub" element={<PubSubPage />} />
                    <Route path="/primary-secondary" element={<PrimarySecondaryPage />} />
                    <Route path="/ecs" element={<ECSPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/robustness" element={<RobustnessPage />} />
                    <Route path="/docs-annotations" element={<DocumentationPage />} />
                    <Route path="/testing" element={<TestingPage />} />
                    <Route path="/abstraction" element={<AbstractionPage />} />
                    <Route path="/dependency-management" element={<DependencyManagementPage />} />
                    <Route path="/moderate-abstraction" element={<ModerateAbstractionPage />} />
                    <Route path="/discipline-catalog" element={<DisciplineCatalogPage />} />
                    <Route path="/lean-architecture" element={<LeanArchitecturePage />} />
                    <Route path="/design-tokens" element={<DesignTokensPage />} />
                    <Route path="/atomic-design" element={<AtomicDesignPage />} />
                    <Route path="/server-driven-ui" element={<ServerDrivenUIPage />} />
                    <Route path="/islands-arch" element={<IslandsArchPage />} />
                    <Route path="/ui-catalog" element={<UIArchitectureCatalogPage />} />
                    <Route path="/micro-frontends" element={<MicroFrontendsPage />} />
                    <Route path="/gitops" element={<GitOpsPage />} />
                    <Route path="/containerization" element={<ContainerizationPage />} />
                    <Route path="/zero-trust" element={<ZeroTrustPage />} />
                    <Route path="/rag-arch" element={<RAGPage />} />
                    <Route path="/agentic-ai" element={<AgenticAIPage />} />
                    <Route path="/llm-ops" element={<LLMOpsPage />} />
                    <Route path="/state-driven" element={<StateDrivenPage />} />
                    <Route path="/component-driven" element={<ComponentDrivenPage />} />
                    <Route path="/composite-ui" element={<CompositeUIPage />} />
                    <Route path="/data-ai-catalog" element={<DataAICatalogPage />} />
                    <Route path="/cloud-catalog" element={<CloudCatalogPage />} />
                    <Route path="/design-patterns" element={<DesignPatternsPage />} />
                    <Route path="/library" element={<BookshelfPage />} />
                    <Route path="/synthesis-lab" element={<SynthesisLabPage />} />
                    <Route path="/tdd" element={<TDDPage />} />
                    <Route path="/oop-fundamentals" element={<OOPFundamentalsPage />} />
                    <Route path="/cap-theorem" element={<CAPTheoremPage />} />
                    <Route path="/acid" element={<ACIDPage />} />
                    <Route path="/viper" element={<VIPERPage />} />
                    <Route path="/mvvm-c" element={<MVVMCPage />} />
                    <Route path="/anti-patterns" element={<AntiPatternsPage />} />
                    <Route path="/vector-dbs" element={<VectorDBPage />} />
                    <Route path="/bff" element={<BFFPage />} />
                    <Route path="/mvi" element={<MVIPage />} />
                    <Route path="/spa-vs-mpa" element={<SPAvsMPAPage />} />
                    <Route path="/component-state" element={<ComponentStatePage />} />
                    <Route path="/elite-architecture" element={<EliteArchitecturePage />} />


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
