import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Lazy Load Pages for Fault Isolation & Performance
const HomePage = lazy(() => import('../pages/home'));
const CleanArchPage = lazy(() => import('../pages/clean-arch'));
const ClientServerPage = lazy(() => import('../pages/client-server'));
const IntentArchitecturePage = lazy(() => import('../pages/fna-concept'));
const DDDPage = lazy(() => import('../pages/ddd'));
const HexagonalPage = lazy(() => import('../pages/hexagonal'));
const OnionPage = lazy(() => import('../pages/onion'));
const FSDPage = lazy(() => import('../pages/fsd'));
const VerticalSlicePage = lazy(() => import('../pages/vertical'));
const CQRSPage = lazy(() => import('../pages/cqrs'));
const HorizontalPage = lazy(() => import('../pages/horizontal'));
const EDAPage = lazy(() => import('../pages/eda'));
const ComparisonPage = lazy(() => import('../pages/compare'));
const MicrokernelPage = lazy(() => import('../pages/microkernel'));
const ServerlessPage = lazy(() => import('../pages/serverless'));
const ProjectPage = lazy(() => import('../pages/project-arch'));
const SOLIDPage = lazy(() => import('../pages/solid'));
const GlossaryPage = lazy(() => import('../pages/glossary'));
const MicroservicesPage = lazy(() => import('../pages/microservices'));
const AssessmentPage = lazy(() => import('../pages/assessment'));
const RefactoringPage = lazy(() => import('../pages/refactoring'));
const RoadmapPage = lazy(() => import('../pages/roadmap'));
const CleanCodePage = lazy(() => import('../pages/clean-code'));
const WorkshopPage = lazy(() => import('../pages/workshop'));
const EvolutionaryPage = lazy(() => import('../pages/evolution'));
const SpaceBasedPage = lazy(() => import('../pages/space-based'));
const P2PPage = lazy(() => import('../pages/p2p'));
const SOAPage = lazy(() => import('../pages/soa'));
const CatalogPage = lazy(() => import('../pages/catalog'));
const ObjectOrientedPage = lazy(() => import('../pages/object-oriented'));
const PipeFilterPage = lazy(() => import('../pages/pipe-filter'));
const InterpreterPage = lazy(() => import('../pages/interpreter'));
const BrokerPage = lazy(() => import('../pages/broker'));
const OrchestrationPage = lazy(() => import('../pages/orchestration'));
const ChoreographyPage = lazy(() => import('../pages/choreography'));
const LambdaKappaPage = lazy(() => import('../pages/lambda-kappa'));
const EventSourcingPage = lazy(() => import('../pages/event-sourcing'));
const MVCPage = lazy(() => import('../pages/mvc'));
const MVVMPage = lazy(() => import('../pages/mvvm'));
const PlugInPage = lazy(() => import('../pages/plugin'));
const MVPPage = lazy(() => import('../pages/mvp'));
const PubSubPage = lazy(() => import('../pages/pub-sub'));
const PrimarySecondaryPage = lazy(() => import('../pages/primary-secondary'));
const ECSPage = lazy(() => import('../pages/ecs'));
const SecurityPage = lazy(() => import('../pages/security'));
const RobustnessPage = lazy(() => import('../pages/robustness'));
const DocumentationPage = lazy(() => import('../pages/docs-annotations'));
const TestingPage = lazy(() => import('../pages/testing'));
const AbstractionPage = lazy(() => import('../pages/abstraction'));
const DependencyManagementPage = lazy(() => import('../pages/dependency-management'));
const ModerateAbstractionPage = lazy(() => import('../pages/moderate-abstraction'));
const DisciplineCatalogPage = lazy(() => import('../pages/discipline-catalog'));
const LeanArchitecturePage = lazy(() => import('../pages/lean-architecture'));
const DesignTokensPage = lazy(() => import('../pages/design-tokens'));
const AtomicDesignPage = lazy(() => import('../pages/atomic-design'));
const ServerDrivenUIPage = lazy(() => import('../pages/server-driven-ui'));
const IslandsArchPage = lazy(() => import('../pages/islands-arch'));
const UIArchitectureCatalogPage = lazy(() => import('../pages/ui-catalog'));
const MicroFrontendsPage = lazy(() => import('../pages/micro-frontends'));
const GitOpsPage = lazy(() => import('../pages/gitops'));
const ContainerizationPage = lazy(() => import('../pages/containerization'));
const ZeroTrustPage = lazy(() => import('../pages/zero-trust'));
const RAGPage = lazy(() => import('../pages/rag-arch'));
const AgenticAIPage = lazy(() => import('../pages/agentic-ai'));
const LLMOpsPage = lazy(() => import('../pages/llm-ops'));
const StateDrivenPage = lazy(() => import('../pages/state-driven'));
const ComponentDrivenPage = lazy(() => import('../pages/component-driven'));
const CompositeUIPage = lazy(() => import('../pages/composite-ui'));
const DataAICatalogPage = lazy(() => import('../pages/data-ai-catalog'));
const CloudCatalogPage = lazy(() => import('../pages/cloud-catalog'));
const DesignPatternsPage = lazy(() => import('../pages/design-patterns'));
const BookshelfPage = lazy(() => import('../pages/library'));
const SynthesisLabPage = lazy(() => import('../pages/synthesis-lab'));
const TDDPage = lazy(() => import('../pages/tdd'));
const OOPFundamentalsPage = lazy(() => import('../pages/oop-fundamentals'));
const CAPTheoremPage = lazy(() => import('../pages/cap-theorem'));
const ACIDPage = lazy(() => import('../pages/acid'));
const VIPERPage = lazy(() => import('../pages/viper'));
const MVVMCPage = lazy(() => import('../pages/mvvm-c'));
const AntiPatternsPage = lazy(() => import('../pages/anti-patterns'));
const NotFoundPage = lazy(() => import('../pages/not-found'));
const VectorDBPage = lazy(() => import('../pages/vector-dbs'));
const BFFPage = lazy(() => import('../pages/bff'));
const MVIPage = lazy(() => import('../pages/mvi'));
const SPAvsMPAPage = lazy(() => import('../pages/spa-vs-mpa'));
const ComponentStatePage = lazy(() => import('../pages/component-state'));
const EliteArchitecturePage = lazy(() => import('../pages/elite-architecture'));

const LoadingFallback = () => (
  <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
    <div className="loader">Yükleniyor...</div>
  </div>
);

const AppRouter: React.FC = () => {
  return (
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
  );
};

export default AppRouter;
