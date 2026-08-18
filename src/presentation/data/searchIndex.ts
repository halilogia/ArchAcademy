export interface SearchIndexItem {
  id: string;
  title: string;
  description: string;
  path: string;
  category: string;
  keywords: string[];
  content: string;
}

export const SEARCH_INDEX: SearchIndexItem[] = [
  // --- MAIN CATALOGS & CHEATSHEET ---
  {
    id: 'acronyms',
    title: 'Yazılım ve Mimari Kısaltmalar Rehberi (Cheat Sheet)',
    description: 'KISS, DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, FIRST, STUPID',
    path: '/acronyms',
    category: 'Guide',
    keywords: ['acronyms', 'kısaltmalar', 'kiss', 'dry', 'oaoo', 'wet', 'aha', 'yagni', 'grasp', 'solid', 'acid', 'first', 'stupid', 'cheat sheet', 'temiz kod'],
    content: 'Yazılım ve Mimari Kısaltmalar Rehberi (The Architect\'s Cheat Sheet) - KISS (Keep It Simple, Stupid), DRY, WET, AHA, YAGNI, SOLID, GRASP, ACID, BASE, CAP, FIRST, AAA, Right-BICEP, CORRECT, STUPID anti-patternleri.'
  },
  {
    id: 'catalog',
    title: 'System Architecture Catalog',
    description: 'Core system patterns (Clean, DDD, Microservices)',
    path: '/catalog',
    category: 'Catalog',
    keywords: ['system', 'architecture', 'catalog', 'patterns', 'core'],
    content: 'System Architecture Catalog - Core system patterns including Clean Architecture, Domain-Driven Design, Microservices and more. Explore fundamental architectural patterns for building robust software systems.'
  },
  {
    id: 'ui-catalog',
    title: 'UI Architecture Catalog',
    description: 'Frontend patterns (MVI, MVVM, Micro-Frontends)',
    path: '/ui-catalog',
    category: 'Catalog',
    keywords: ['ui', 'frontend', 'catalog', 'mvi', 'mvvm', 'micro-frontends'],
    content: 'UI Architecture Catalog - Frontend patterns including MVI, MVVM, Micro-Frontends and other UI architectural patterns. Learn how to structure your frontend applications for maintainability and scalability.'
  },
  {
    id: 'data-catalog',
    title: 'Data & AI Catalog',
    description: 'Big Data, RAG, Kappa Architecture',
    path: '/data-ai-catalog',
    category: 'Catalog',
    keywords: ['data', 'ai', 'catalog', 'big data', 'rag', 'kappa', 'machine learning'],
    content: 'Data & AI Catalog - Big Data architectures, Retrieval-Augmented Generation (RAG), Kappa Architecture and AI-related patterns. Explore data-intensive system designs and AI integration patterns.'
  },
  {
    id: 'cloud-catalog',
    title: 'Infrastructure Catalog',
    description: 'Cloud, DevOps, GitOps, Zero Trust',
    path: '/cloud-catalog',
    category: 'Catalog',
    keywords: ['cloud', 'devops', 'gitops', 'zero trust', 'infrastructure'],
    content: 'Infrastructure Catalog - Cloud architectures, DevOps practices, GitOps workflows and Zero Trust security models. Learn about modern infrastructure patterns and best practices.'
  },
  {
    id: 'discipline-catalog',
    title: 'Discipline Catalog',
    description: 'Engineering principles, SOLID, Craftsmanship',
    path: '/discipline-catalog',
    category: 'Catalog',
    keywords: ['discipline', 'engineering', 'solid', 'craftsmanship', 'principles'],
    content: 'Discipline Catalog - Engineering principles, SOLID principles, software craftsmanship and professional development practices. Master the foundational skills every software architect needs.'
  },

  // --- SYSTEM & BACKEND ---
  {
    id: 'clean-arch',
    title: 'Clean Architecture',
    description: 'The GURU pattern by Uncle Bob',
    path: '/clean-arch',
    category: 'System',
    keywords: ['clean', 'architecture', 'uncle bob', 'dependency', 'layers', 'entities', 'use cases'],
    content: 'Clean Architecture by Uncle Bob - The definitive guide to building maintainable software systems. Learn about dependency inversion, entity boundaries, use cases and the dependency rule. Clean Architecture separates concerns into concentric layers: Entities, Use Cases, Interface Adapters and Frameworks & Drivers.'
  },
  {
    id: 'onion',
    title: 'Onion Architecture',
    description: 'Dependency inversion core',
    path: '/onion',
    category: 'System',
    keywords: ['onion', 'architecture', 'dependency', 'inversion', 'core', 'layers'],
    content: 'Onion Architecture - A pattern that addresses the problems of layered architecture by inverting dependencies. The core domain is at the center, with layers depending inward rather than outward. Learn how to build systems with proper separation of concerns.'
  },
  {
    id: 'hexagonal',
    title: 'Hexagonal Architecture (Ports & Adapters)',
    description: 'Testable and isolated architecture',
    path: '/hexagonal',
    category: 'System',
    keywords: ['hexagonal', 'ports', 'adapters', 'testable', 'isolated', 'clean'],
    content: 'Hexagonal Architecture (Ports and Adapters) - An architectural pattern that creates a buffer between your application core and external systems. Ports define interfaces for input and output, while Adapters implement those interfaces for specific technologies. Perfect for testability and technology independence.'
  },
  {
    id: 'ddd',
    title: 'Domain-Driven Design (DDD)',
    description: 'Managing complex domain logic',
    path: '/ddd',
    category: 'System',
    keywords: ['ddd', 'domain', 'driven', 'design', 'bounded context', 'aggregate', 'entity', 'value object'],
    content: 'Domain-Driven Design (DDD) - A software design approach focusing on modeling software to match a domain according to input from domain experts. Key concepts include Bounded Contexts, Aggregates, Entities, Value Objects, Domain Events and Ubiquitous Language.'
  },
  {
    id: 'microservices',
    title: 'Microservices Architecture',
    description: 'Monolith to Microservices journey',
    path: '/microservices',
    category: 'System',
    keywords: ['microservices', 'monolith', 'distributed', 'services', 'api', 'decomposition'],
    content: 'Microservices Architecture - An architectural style that structures an application as a collection of loosely coupled services. Learn about service decomposition, inter-service communication, data management and the journey from monolith to microservices.'
  },
  {
    id: 'soa',
    title: 'Service Oriented Architecture (SOA)',
    description: 'Enterprise service architecture',
    path: '/soa',
    category: 'System',
    keywords: ['soa', 'service', 'oriented', 'enterprise', 'esb', 'message'],
    content: 'Service Oriented Architecture (SOA) - An enterprise architecture pattern where applications are built as a collection of services that communicate over a network. Learn about the Enterprise Service Bus (ESB), service contracts and SOA principles.'
  },
  {
    id: 'serverless',
    title: 'Serverless Architecture',
    description: 'FaaS and cloud-native',
    path: '/serverless',
    category: 'System',
    keywords: ['serverless', 'faas', 'cloud', 'lambda', 'functions', 'event'],
    content: 'Serverless Architecture - A cloud-native development model that allows developers to build and run applications without managing servers. Learn about Function as a Service (FaaS), AWS Lambda, Azure Functions and event-driven serverless patterns.'
  },
  {
    id: 'eda',
    title: 'Event-Driven Architecture (EDA)',
    description: 'Asynchronous messaging',
    path: '/eda',
    category: 'System',
    keywords: ['event', 'driven', 'async', 'messaging', 'pub', 'sub', 'broker'],
    content: 'Event-Driven Architecture (EDA) - A software architecture pattern that promotes the production, detection, consumption of and reaction to events. Learn about event producers, consumers, brokers and the benefits of loose coupling.'
  },
  {
    id: 'vertical',
    title: 'Vertical Slice Architecture',
    description: 'Feature-first architecture',
    path: '/vertical',
    category: 'System',
    keywords: ['vertical', 'slice', 'feature', 'first', 'organization'],
    content: 'Vertical Slice Architecture - An organizational pattern that structures code around features rather than technical concerns. Each slice contains all layers needed for a feature, reducing coupling and improving maintainability.'
  },
  {
    id: 'horizontal',
    title: 'N-Tier (Horizontal) Architecture',
    description: 'Classic layered architecture',
    path: '/horizontal',
    category: 'System',
    keywords: ['n-tier', 'horizontal', 'layered', 'classic', 'presentation', 'business', 'data'],
    content: 'N-Tier (Horizontal) Architecture - The classic layered architecture pattern with presentation, business logic and data access layers. Learn about the traditional approach to organizing enterprise applications.'
  },
  {
    id: 'microkernel',
    title: 'Microkernel Architecture',
    description: 'Plugin-based architecture',
    path: '/microkernel',
    category: 'System',
    keywords: ['microkernel', 'plugin', 'extensible', 'core', 'extension'],
    content: 'Microkernel Architecture - A pattern that allows you to build extensible applications by separating core functionality from additional features. The microkernel contains the minimal system, while plugins add specialized functionality.'
  },
  {
    id: 'plugin',
    title: 'Plug-in Architecture',
    description: 'Extendable core system',
    path: '/plugin',
    category: 'System',
    keywords: ['plugin', 'extendable', 'extensible', 'modular', 'add-on'],
    content: 'Plug-in Architecture - A design pattern that enables adding new functionality to an existing system without modifying the core. Learn about plugin interfaces, discovery mechanisms and versioning strategies.'
  },
  {
    id: 'pipe-filter',
    title: 'Pipe & Filter Architecture',
    description: 'Data transformation pipelines',
    path: '/pipe-filter',
    category: 'System',
    keywords: ['pipe', 'filter', 'pipeline', 'transformation', 'data', 'processing'],
    content: 'Pipe & Filter Architecture - An architectural pattern where data flows through a series of processing stages (filters) connected by channels (pipes). Each filter performs a specific transformation on the data.'
  },
  {
    id: 'ecs',
    title: 'Entity Component System (ECS)',
    description: 'Entity Component System for Game Development',
    path: '/ecs',
    category: 'System',
    keywords: ['ecs', 'entity', 'component', 'system', 'game', 'data-oriented'],
    content: 'Entity Component System (ECS) - A data-oriented architecture pattern widely used in game development. Entities are unique IDs, Components are pure data, and Systems process entities with specific component combinations.'
  },
  {
    id: 'interpreter',
    title: 'Interpreter Pattern',
    description: 'Language and rule engines',
    path: '/interpreter',
    category: 'System',
    keywords: ['interpreter', 'language', 'rule', 'engine', 'parsing', 'dsl'],
    content: 'Interpreter Pattern - A behavioral design pattern that defines a grammatical representation for a language and provides an interpreter to process sentences in that language. Useful for building rule engines and domain-specific languages.'
  },
  {
    id: 'evolution',
    title: 'Evolutionary Architecture',
    description: 'Guided incremental change',
    path: '/evolution',
    category: 'System',
    keywords: ['evolutionary', 'incremental', 'change', 'fitness', 'function'],
    content: 'Evolutionary Architecture - An approach that supports guided incremental change across multiple dimensions of architecture. Learn about fitness functions, incremental change and evolutionary design principles.'
  },
  {
    id: 'oop',
    title: 'OOP Fundamentals',
    description: 'Object-Oriented Programming',
    path: '/object-oriented',
    category: 'System',
    keywords: ['oop', 'object', 'oriented', 'programming', 'encapsulation', 'inheritance', 'polymorphism'],
    content: 'Object-Oriented Programming Fundamentals - Master the core concepts of OOP including encapsulation, inheritance, polymorphism and abstraction. Learn how to design classes and objects for maintainable software.'
  },

  // --- UI & FRONTEND ---
  {
    id: 'mvc',
    title: 'MVC Architecture',
    description: 'Model-View-Controller',
    path: '/mvc',
    category: 'UI',
    keywords: ['mvc', 'model', 'view', 'controller', 'separation', 'concerns'],
    content: 'Model-View-Controller (MVC) - An architectural pattern that separates an application into three main components: Model (data), View (UI) and Controller (logic). Learn about the classic pattern that shaped modern web development.'
  },
  {
    id: 'mvp',
    title: 'MVP Architecture',
    description: 'Model-View-Presenter',
    path: '/mvp',
    category: 'UI',
    keywords: ['mvp', 'model', 'view', 'presenter', 'passive', 'supervising'],
    content: 'Model-View-Presenter (MVP) - A derivative of MVC where the Presenter replaces the Controller. The View is passive and all UI logic is in the Presenter. Learn about Passive View and Supervising Controller variations.'
  },
  {
    id: 'mvvm',
    title: 'MVVM Architecture',
    description: 'Model-View-ViewModel',
    path: '/mvvm',
    category: 'UI',
    keywords: ['mvvm', 'model', 'view', 'viewmodel', 'data', 'binding', 'reactive'],
    content: 'Model-View-ViewModel (MVVM) - An architectural pattern that facilitates data binding between the View and ViewModel. The ViewModel exposes data and commands that the View binds to, enabling reactive UI updates.'
  },
  {
    id: 'viper',
    title: 'VIPER Architecture',
    description: 'iOS Clean Architecture',
    path: '/viper',
    category: 'UI',
    keywords: ['viper', 'ios', 'clean', 'view', 'interactor', 'presenter', 'entity', 'router'],
    content: 'VIPER Architecture - A clean architecture approach for iOS development. VIPER stands for View, Interactor, Presenter, Entity and Router. Each component has a single responsibility, making the codebase highly testable.'
  },
  {
    id: 'mvi',
    title: 'MVI Architecture',
    description: 'Model-View-Intent (Unidirectional)',
    path: '/mvi',
    category: 'UI',
    keywords: ['mvi', 'model', 'view', 'intent', 'unidirectional', 'state', 'reactive'],
    content: 'Model-View-Intent (MVI) - A unidirectional data flow pattern where the View sends Intents, the Model processes them and emits State, and the View renders that State. Perfect for predictable UI updates.'
  },
  {
    id: 'micro-frontends',
    title: 'Micro-Frontends',
    description: 'Splitting UI into independent apps',
    path: '/micro-frontends',
    category: 'UI',
    keywords: ['micro', 'frontend', 'independent', 'composition', 'module federation'],
    content: 'Micro-Frontends - An architectural style where independently deliverable frontend applications are composed into a greater whole. Learn about Module Federation, Web Components and composition patterns.'
  },
  {
    id: 'atomic',
    title: 'Atomic Design',
    description: 'UI component hierarchy',
    path: '/atomic-design',
    category: 'UI',
    keywords: ['atomic', 'design', 'atoms', 'molecules', 'organisms', 'templates', 'pages'],
    content: 'Atomic Design - A methodology for creating design systems by breaking UI into five distinct levels: Atoms, Molecules, Organisms, Templates and Pages. Learn how to build consistent, reusable UI components.'
  },
  {
    id: 'sdui',
    title: 'Server-Driven UI',
    description: 'UI logic from backend',
    path: '/server-driven-ui',
    category: 'UI',
    keywords: ['server', 'driven', 'ui', 'backend', 'dynamic', 'remote'],
    content: 'Server-Driven UI - An architecture where the UI layout and content are determined by the server. The client renders UI components based on server-provided specifications, enabling dynamic UI updates without app releases.'
  },
  {
    id: 'islands',
    title: 'Islands Architecture',
    description: 'Partial hydration (Astro)',
    path: '/islands-arch',
    category: 'UI',
    keywords: ['islands', 'partial', 'hydration', 'astro', 'performance'],
    content: 'Islands Architecture - A pattern where interactive components (islands) are hydrated independently within a static HTML shell. Popularized by Astro, this approach dramatically reduces JavaScript payload and improves performance.'
  },
  {
    id: 'tokens',
    title: 'Design Tokens',
    description: 'Design system constants',
    path: '/design-tokens',
    category: 'UI',
    keywords: ['design', 'tokens', 'system', 'constants', 'colors', 'spacing', 'typography'],
    content: 'Design Tokens - The visual design atoms of a design system: colors, spacing, typography, shadows and more. They are stored as platform-agnostic values and transformed for different platforms.'
  },
  {
    id: 'state-driven',
    title: 'State-Driven UI',
    description: 'UI as a function of state',
    path: '/state-driven',
    category: 'UI',
    keywords: ['state', 'driven', 'ui', 'function', 'finite', 'state machine'],
    content: 'State-Driven UI - An approach where the UI is treated as a pure function of application state. Using state machines and statecharts, you can model complex UI interactions with predictable behavior.'
  },
  {
    id: 'component',
    title: 'Component-Driven Development',
    description: 'Building bottom-up',
    path: '/component-driven',
    category: 'UI',
    keywords: ['component', 'driven', 'development', 'bottom-up', 'storybook'],
    content: 'Component-Driven Development - A methodology that builds UIs from the bottom up, starting with components and working up to pages. Tools like Storybook enable isolated component development and testing.'
  },
  {
    id: 'composite',
    title: 'Composite UI',
    description: 'Aggregating UI parts',
    path: '/composite-ui',
    category: 'UI',
    keywords: ['composite', 'ui', 'aggregation', 'composition', 'widget'],
    content: 'Composite UI - An architectural pattern where user interfaces are composed of multiple independent parts that are aggregated at runtime. Each part can be developed, tested and deployed independently.'
  },
  {
    id: 'spa-mpa',
    title: 'SPA vs MPA',
    description: 'Single vs Multi Page Apps',
    path: '/spa-vs-mpa',
    category: 'UI',
    keywords: ['spa', 'mpa', 'single', 'multi', 'page', 'application'],
    content: 'SPA vs MPA - A comparison of Single Page Applications and Multi Page Applications. Learn the trade-offs between client-side and server-side rendering, navigation patterns and performance considerations.'
  },

  // --- DATA & AI ---
  {
    id: 'rag',
    title: 'RAG Architecture',
    description: 'Retrieval-Augmented Generation',
    path: '/rag-arch',
    category: 'Data & AI',
    keywords: ['rag', 'retrieval', 'augmented', 'generation', 'vector', 'embedding', 'llm'],
    content: 'Retrieval-Augmented Generation (RAG) - An architecture that enhances LLMs by retrieving relevant information from external knowledge bases before generating responses. Learn about vector databases, embeddings and retrieval strategies.'
  },
  {
    id: 'agentic',
    title: 'Agentic AI',
    description: 'Autonomous AI Agents',
    path: '/agentic-ai',
    category: 'Data & AI',
    keywords: ['agentic', 'ai', 'agent', 'autonomous', 'tool', 'use', 'planning'],
    content: 'Agentic AI - Architectures for building autonomous AI agents that can plan, use tools and execute tasks. Learn about agent design patterns, tool integration and multi-agent systems.'
  },
  {
    id: 'cqrs',
    title: 'CQRS',
    description: 'Command Query Responsibility Segregation',
    path: '/cqrs',
    category: 'Data & AI',
    keywords: ['cqrs', 'command', 'query', 'responsibility', 'segregation', 'read', 'write'],
    content: 'Command Query Responsibility Segregation (CQRS) - A pattern that separates read and write operations for a data store. Commands modify data, Queries read data. This separation enables independent scaling and optimization.'
  },
  {
    id: 'event-sourcing',
    title: 'Event Sourcing',
    description: 'Immutable state history',
    path: '/event-sourcing',
    category: 'Data & AI',
    keywords: ['event', 'sourcing', 'immutable', 'state', 'history', 'replay'],
    content: 'Event Sourcing - A pattern where state changes are stored as a sequence of events instead of just the current state. This provides a complete audit trail and enables state reconstruction through event replay.'
  },
  {
    id: 'cap',
    title: 'CAP Theorem',
    description: 'Trade-offs in distributed systems',
    path: '/cap-theorem',
    category: 'Data & AI',
    keywords: ['cap', 'theorem', 'consistency', 'availability', 'partition', 'tolerance'],
    content: 'CAP Theorem - A fundamental principle stating that a distributed system can only guarantee two of three properties: Consistency, Availability and Partition Tolerance. Learn about the trade-offs in distributed database design.'
  },
  {
    id: 'acid',
    title: 'ACID Transactions',
    description: 'Atomicity, Consistency, Isolation, Durability',
    path: '/acid',
    category: 'Data & AI',
    keywords: ['acid', 'atomicity', 'consistency', 'isolation', 'durability', 'transaction'],
    content: 'ACID Transactions - Properties that guarantee database transactions are processed reliably: Atomicity (all or nothing), Consistency (valid state to valid state), Isolation (concurrent transactions dont interfere) and Durability (committed data persists).'
  },
  {
    id: 'big-data',
    title: 'Big Data / Lambda Architecture',
    description: 'Batch and Stream processing',
    path: '/lambda-kappa',
    category: 'Data & AI',
    keywords: ['big', 'data', 'lambda', 'batch', 'stream', 'processing'],
    content: 'Lambda Architecture - A data processing pattern that combines batch and stream processing layers. The batch layer handles historical data with high latency, while the speed layer handles recent data with low latency.'
  },
  {
    id: 'kappa',
    title: 'Kappa Architecture',
    description: 'Everything is a stream',
    path: '/lambda-kappa',
    category: 'Data & AI',
    keywords: ['kappa', 'stream', 'everything', 'simplified'],
    content: 'Kappa Architecture - A simplified version of Lambda Architecture where all data is treated as a stream. There is only a speed layer, and historical processing is handled by replaying the stream.'
  },
  {
    id: 'llmops',
    title: 'LLMOps',
    description: 'DevOps for LLMs',
    path: '/llm-ops',
    category: 'Data & AI',
    keywords: ['llmops', 'devops', 'llm', 'operations', 'mlops', 'deployment'],
    content: 'LLMOps - The practices and tools for deploying and maintaining Large Language Models in production. Learn about model versioning, prompt management, evaluation and monitoring of LLM applications.'
  },

  // --- CLOUD & INFRA ---
  {
    id: 'gitops',
    title: 'GitOps',
    description: 'Git as single source of truth',
    path: '/gitops',
    category: 'Cloud',
    keywords: ['gitops', 'git', 'source', 'truth', 'continuous', 'deployment'],
    content: 'GitOps - An operational framework that takes DevOps best practices used for application development and applies them to infrastructure. Git is the single source of truth for declarative infrastructure.'
  },
  {
    id: 'zero-trust',
    title: 'Zero Trust Architecture',
    description: 'Never trust, always verify',
    path: '/zero-trust',
    category: 'Cloud',
    keywords: ['zero', 'trust', 'verify', 'security', 'identity', 'micro-segmentation'],
    content: 'Zero Trust Architecture - A security model that assumes breach and verifies every request as though it originates from an open network. Never trust, always verify. Learn about identity-based access and micro-segmentation.'
  },
  {
    id: 'container',
    title: 'Containerization',
    description: 'Docker & Kubernetes',
    path: '/containerization',
    category: 'Cloud',
    keywords: ['container', 'docker', 'kubernetes', 'k8s', 'orchestration'],
    content: 'Containerization - Packaging applications with their dependencies into standardized units. Learn about Docker, Kubernetes orchestration, container networking and deployment strategies.'
  },
  {
    id: 'bff',
    title: 'BFF Pattern',
    description: 'Backend for Frontend',
    path: '/bff',
    category: 'Cloud',
    keywords: ['bff', 'backend', 'frontend', 'api', 'gateway'],
    content: 'Backend for Frontend (BFF) - A pattern where you create separate backend services for each frontend client (web, mobile, etc.). Each BFF is optimized for its specific frontend needs.'
  },
  {
    id: 'space-based',
    title: 'Space-Based Architecture',
    description: 'In-memory data grid',
    path: '/space-based',
    category: 'Cloud',
    keywords: ['space', 'based', 'memory', 'grid', 'scalable', 'elastic'],
    content: 'Space-Based Architecture - A pattern that achieves high scalability by eliminating the central database and using in-memory data grids. Application state is distributed across processing units.'
  },

  // --- PRINCIPLES & DISCIPLINES ---
  {
    id: 'clean-code',
    title: 'Clean Code',
    description: 'Naming, functions and formatting',
    path: '/clean-code',
    category: 'Principles',
    keywords: ['clean', 'code', 'naming', 'function', 'formatting', 'readable'],
    content: 'Clean Code - Writing code that is easy to read, understand and maintain. Learn about meaningful naming, function design, code formatting and the boy scout rule.'
  },
  {
    id: 'solid',
    title: 'SOLID Principles',
    description: 'The 5 foundations of clean code',
    path: '/solid',
    category: 'Principles',
    keywords: ['solid', 'single', 'responsibility', 'open', 'closed', 'liskov', 'interface', 'segregation', 'dependency', 'inversion'],
    content: 'SOLID Principles - Five fundamental principles of object-oriented design: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation and Dependency Inversion. The foundation of clean, maintainable code.'
  },
  {
    id: 'tdd',
    title: 'Test Driven Development (TDD)',
    description: 'Red-Green-Refactor cycle',
    path: '/tdd',
    category: 'Principles',
    keywords: ['tdd', 'test', 'driven', 'development', 'red', 'green', 'refactor'],
    content: 'Test Driven Development (TDD) - A development methodology following the Red-Green-Refactor cycle: Write a failing test, make it pass, then refactor. TDD leads to better design and comprehensive test coverage.'
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    description: 'GoF and modern patterns',
    path: '/design-patterns',
    category: 'Principles',
    keywords: ['design', 'patterns', 'gof', 'gang', 'four', 'creational', 'structural', 'behavioral'],
    content: 'Design Patterns - Reusable solutions to common software design problems. Learn about Gang of Four (GoF) patterns: Creational (Factory, Singleton), Structural (Adapter, Decorator) and Behavioral (Observer, Strategy) patterns.'
  },
  {
    id: 'dependency',
    title: 'Dependency Management',
    description: 'Coupling control',
    path: '/dependency-management',
    category: 'Principles',
    keywords: ['dependency', 'management', 'coupling', 'control', 'injection'],
    content: 'Dependency Management - Strategies for controlling coupling between software modules. Learn about dependency injection, inversion of control and managing external package dependencies.'
  },
  {
    id: 'moderate',
    title: 'Moderate Abstraction',
    description: 'Avoiding over-engineering',
    path: '/moderate-abstraction',
    category: 'Principles',
    keywords: ['moderate', 'abstraction', 'over-engineering', 'yagni', 'simple'],
    content: 'Moderate Abstraction - The art of choosing the right level of abstraction without over-engineering. Learn about YAGNI (You Aint Gonna Need It), KISS (Keep It Simple Stupid) and avoiding premature generalization.'
  },
  {
    id: 'robustness',
    title: 'Robustness & Reliability',
    description: 'Circuit Breaker, Chaos Engineering',
    path: '/robustness',
    category: 'Principles',
    keywords: ['robustness', 'reliability', 'circuit', 'breaker', 'chaos', 'engineering', 'resilience'],
    content: 'Robustness & Reliability - Patterns for building resilient systems: Circuit Breaker, Bulkhead, Retry, Timeout and Chaos Engineering. Learn how to design systems that gracefully handle failures.'
  },
  {
    id: 'anti-patterns',
    title: 'Anti-Patterns',
    description: 'Common architectural mistakes',
    path: '/anti-patterns',
    category: 'Principles',
    keywords: ['anti-pattern', 'mistake', 'god', 'object', 'spaghetti', 'big', 'ball', 'mud'],
    content: 'Anti-Patterns - Common responses to recurring problems that are usually ineffective. Learn about God Objects, Spaghetti Code, Big Ball of Mud, Golden Hammer and other architectural pitfalls to avoid.'
  },
  {
    id: 'testing',
    title: 'Easy to Test',
    description: 'Testability architecture',
    path: '/testing',
    category: 'Principles',
    keywords: ['test', 'testability', 'unit', 'integration', 'mock', 'stub'],
    content: 'Testability Architecture - Designing systems that are easy to test. Learn about test doubles (mocks, stubs, fakes), dependency injection for testability and the testing pyramid.'
  },
  {
    id: 'docs',
    title: 'Docs & Annotations',
    description: 'ADR and Documentation',
    path: '/docs-annotations',
    category: 'Principles',
    keywords: ['docs', 'documentation', 'adr', 'architecture', 'decision', 'record'],
    content: 'Documentation & Architecture Decision Records (ADR) - Capturing important architectural decisions, their context and consequences. Learn how to maintain living documentation for your architecture.'
  },
  {
    id: 'lean',
    title: 'Lean Clean Architecture',
    description: 'User Favorite: Pragmatic, fast and waste-free',
    path: '/lean-architecture',
    category: 'Principles',
    keywords: ['lean', 'clean', 'pragmatic', 'fast', 'waste-free', 'masterpiece'],
    content: 'Lean Clean Architecture - The user favorite pattern combining Lean principles with Clean Architecture. Pragmatic, fast and waste-free development structure that eliminates unnecessary layers and focuses on delivering value.'
  },
  {
    id: 'security',
    title: 'Security Assurance',
    description: 'Governance & Safety',
    path: '/security',
    category: 'Principles',
    keywords: ['security', 'governance', 'safety', 'threat', 'modeling'],
    content: 'Security Assurance - Architectural practices for ensuring system safety. Learn about threat modeling, security by design, input validation, authentication and authorization patterns.'
  },
  {
    id: 'abstraction',
    title: 'Separation of Concerns',
    description: 'Core Abstraction',
    path: '/abstraction',
    category: 'Principles',
    keywords: ['separation', 'concerns', 'abstraction', 'modularity', 'cohesion'],
    content: 'Separation of Concerns - The fundamental principle of dividing a system into distinct sections where each section addresses a separate concern. High cohesion and loose coupling are the goals.'
  },

  // --- COMMUNICATION PATTERNS ---
  {
    id: 'pub-sub',
    title: 'Publish-Subscribe Pattern',
    description: 'Event distribution pattern',
    path: '/pub-sub',
    category: 'Communication',
    keywords: ['pub', 'sub', 'publish', 'subscribe', 'event', 'distribution'],
    content: 'Publish-Subscribe Pattern - A messaging pattern where publishers categorize messages into classes without knowing subscribers, and subscribers express interest in classes without knowing publishers.'
  },
  {
    id: 'primary-secondary',
    title: 'Primary-Secondary Pattern',
    description: 'Leader-follower architecture',
    path: '/primary-secondary',
    category: 'Communication',
    keywords: ['primary', 'secondary', 'leader', 'follower', 'replication'],
    content: 'Primary-Secondary Pattern - An architecture where one primary component handles writes and one or more secondary components handle reads or serve as backups. Common in database replication.'
  },
  {
    id: 'broker',
    title: 'Broker Pattern',
    description: 'Message broker architecture',
    path: '/broker',
    category: 'Communication',
    keywords: ['broker', 'message', 'kafka', 'rabbitmq', 'middleware'],
    content: 'Broker Pattern - An architectural pattern where a broker component coordinates communication between distributed services. Message brokers like Kafka and RabbitMQ enable reliable async communication.'
  },
  {
    id: 'orchestration',
    title: 'Orchestration',
    description: 'Centralized workflow control',
    path: '/orchestration',
    category: 'Communication',
    keywords: ['orchestration', 'workflow', 'centralized', 'coordinator'],
    content: 'Orchestration - A centralized approach to managing distributed transactions and workflows. An orchestrator service directs the flow of operations across multiple services.'
  },
  {
    id: 'choreography',
    title: 'Choreography',
    description: 'Decentralized collaboration',
    path: '/choreography',
    category: 'Communication',
    keywords: ['choreography', 'decentralized', 'collaboration', 'event'],
    content: 'Choreography - A decentralized approach where services collaborate by exchanging events without a central coordinator. Each service knows its role and reacts to events independently.'
  },
  {
    id: 'client-server',
    title: 'Client-Server Architecture',
    description: 'Request-response pattern',
    path: '/client-server',
    category: 'Communication',
    keywords: ['client', 'server', 'request', 'response', 'http'],
    content: 'Client-Server Architecture - The foundational distributed system pattern where clients request services and servers provide them. Learn about request-response, connection management and scaling.'
  },
  {
    id: 'p2p',
    title: 'Peer-to-Peer (P2P)',
    description: 'Decentralized network architecture',
    path: '/p2p',
    category: 'Communication',
    keywords: ['p2p', 'peer', 'decentralized', 'network', 'blockchain'],
    content: 'Peer-to-Peer (P2P) Architecture - A decentralized network where each node acts as both client and server. No central authority is needed. Used in file sharing, blockchain and distributed systems.'
  },
  {
    id: 'fna-concept',
    title: 'Intent Architecture',
    description: 'Function-Need-Action pattern',
    path: '/fna-concept',
    category: 'Communication',
    keywords: ['intent', 'function', 'need', 'action', 'fna'],
    content: 'Intent Architecture (Function-Need-Action) - A pattern that structures systems around user intents. The Function defines what the user wants, the Need identifies requirements, and the Action executes the response.'
  },
  {
    id: 'project-arch',
    title: 'Project Architecture',
    description: 'Real project structure analysis',
    path: '/project-arch',
    category: 'Principles',
    keywords: ['project', 'structure', 'analysis', 'real', 'example'],
    content: 'Project Architecture - Analysis of real-world project structures. Learn how architectural decisions manifest in actual codebases and how to navigate complex project organizations.'
  },
  {
    id: 'assessment',
    title: 'Architect Challenge',
    description: 'Knowledge assessment quiz',
    path: '/assessment',
    category: 'Workshop',
    keywords: ['assessment', 'quiz', 'challenge', 'test', 'knowledge'],
    content: 'Architect Challenge - Test your architectural knowledge with interactive quizzes. Challenge yourself with real-world scenarios and assess your readiness for senior roles.'
  },
  {
    id: 'refactoring',
    title: 'Code Surgery',
    description: 'Refactoring workshop',
    path: '/refactoring',
    category: 'Workshop',
    keywords: ['refactoring', 'surgery', 'workshop', 'improvement'],
    content: 'Code Surgery - A hands-on refactoring workshop. Practice improving legacy code, extracting dependencies and applying architectural patterns to existing systems.'
  },
  {
    id: 'roadmap',
    title: 'Architect Roadmap',
    description: 'Career path guidance',
    path: '/roadmap',
    category: 'Workshop',
    keywords: ['roadmap', 'career', 'path', 'guidance', 'growth'],
    content: 'Architect Roadmap - Your career path from junior to principal architect. Learn what skills to develop at each stage and which resources to study for growth.'
  },
  {
    id: 'workshop',
    title: 'Architecture Workshop',
    description: 'Interactive learning',
    path: '/workshop',
    category: 'Workshop',
    keywords: ['workshop', 'interactive', 'learning', 'practice'],
    content: 'Architecture Workshop - Interactive learning environment for practicing architectural patterns. Build systems, make decisions and learn from the consequences in a safe environment.'
  },
  {
    id: 'glossary',
    title: 'Architecture Glossary',
    description: 'Terminology reference',
    path: '/glossary',
    category: 'Reference',
    keywords: ['glossary', 'terminology', 'reference', 'dictionary', 'terms'],
    content: 'Architecture Glossary - A comprehensive reference of software architecture terminology. From Abstract Factory to Vertical Slices, understand the language of architecture.'
  },
  {
    id: 'library',
    title: 'Book Library',
    description: 'Recommended reading list',
    path: '/library',
    category: 'Reference',
    keywords: ['library', 'book', 'reading', 'recommended', 'list'],
    content: 'Book Library - Curated reading list for aspiring architects. From Clean Code to Building Microservices, find the best books for each stage of your architectural journey.'
  },
  {
    id: 'synthesis-lab',
    title: 'Synthesis Lab',
    description: 'Pattern combination experiments',
    path: '/synthesis-lab',
    category: 'Workshop',
    keywords: ['synthesis', 'lab', 'combination', 'experiment', 'pattern'],
    content: 'Synthesis Lab - Experiment with combining architectural patterns. Learn how Clean Architecture works with Microservices, or how DDD integrates with Event Sourcing.'
  },
  {
    id: 'compare',
    title: 'Architecture Comparison Matrix',
    description: 'Side-by-side pattern comparison',
    path: '/compare',
    category: 'Reference',
    keywords: ['compare', 'matrix', 'comparison', 'side-by-side', 'trade-off'],
    content: 'Architecture Comparison Matrix - Compare architectural patterns side-by-side across multiple dimensions: complexity, testability, scalability, team size requirements and more.'
  },
  {
    id: 'home',
    title: 'ArchAcademy Home',
    description: 'Senior Software Architecture Portal',
    path: '/',
    category: 'Main',
    keywords: ['home', 'archacademy', 'portal', 'senior', 'architecture'],
    content: 'ArchAcademy - The Senior Software Architecture Portal. Your comprehensive resource for learning architectural patterns, best practices and career development.'
  }
];