import glob
import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

app_routes = open('src/App.tsx', encoding='utf-8').read()

pages = sorted(glob.glob('src/presentation/pages/*.tsx'))

print("\n" + "="*95)
print(f"{'SAYFA DOSYASI':<30} | {'ROUTE DURUMU':<16} | {'KATEGORİ / ANLAM ANALİZİ'}")
print("="*95)

categories = {
  "Core Architectural Patterns": [
    "clean-arch.tsx", "onion.tsx", "hexagonal.tsx", "ddd.tsx", "microservices.tsx", 
    "eda.tsx", "cqrs.tsx", "event-sourcing.tsx", "serverless.tsx", "pipe-filter.tsx",
    "microkernel.tsx", "space-based.tsx", "broker.tsx", "p2p.tsx", "client-server.tsx",
    "soa.tsx", "primary-secondary.tsx", "plugin.tsx", "interpreter.tsx", "lambda-kappa.tsx",
    "choreography.tsx", "orchestration.tsx"
  ],
  "Frontend / Presentation Patterns": [
    "mvc.tsx", "mvp.tsx", "mvvm.tsx", "mvvm-c.tsx", "mvi.tsx", "viper.tsx",
    "spa-vs-mpa.tsx", "micro-frontends.tsx", "atomic-design.tsx", "islands-arch.tsx",
    "server-driven-ui.tsx", "composite-ui.tsx", "component-driven.tsx", "component-state.tsx",
    "fsd.tsx", "design-tokens.tsx"
  ],
  "Architecture Styles & Slicing": [
    "vertical.tsx", "horizontal.tsx", "lean-architecture.tsx", "elite-architecture.tsx",
    "fna-concept.tsx", "ecs.tsx"
  ],
  "Core Principles & Engineering": [
    "solid.tsx", "clean-code.tsx", "anti-patterns.tsx", "abstraction.tsx",
    "moderate-abstraction.tsx", "object-oriented.tsx", "oop-fundamentals.tsx",
    "acid.tsx", "cap-theorem.tsx", "robustness.tsx"
  ],
  "DevOps / Security / AI Engineering": [
    "gitops.tsx", "containerization.tsx", "zero-trust.tsx", "security.tsx",
    "llm-ops.tsx", "rag-arch.tsx", "agentic-ai.tsx", "vector-dbs.tsx",
    "testing.tsx", "tdd.tsx", "docs-annotations.tsx", "dependency-management.tsx"
  ],
  "Hubs, Catalogs & Portals": [
    "home.tsx", "catalog.tsx", "cloud-catalog.tsx", "ui-catalog.tsx", "data-ai-catalog.tsx",
    "discipline-catalog.tsx", "roadmap.tsx", "refactoring.tsx", "synthesis-lab.tsx",
    "workshop.tsx", "compare.tsx", "glossary.tsx", "acronyms.tsx", "project-arch.tsx",
    "assessment.tsx", "evolution.tsx", "library.tsx", "not-found.tsx"
  ]
}

redundancy_candidates = [
  ("object-oriented.tsx", "oop-fundamentals.tsx", "Birebir aynı konu (OOP). Biri varken diğeri gereksiz çakışma yaratıyor."),
  ("abstraction.tsx", "moderate-abstraction.tsx", "İkisi de 'Soyutlama' anlatıyor. Biri genel, diğeri seviyeleri. Tek sayfada birleştirilebilir."),
  ("security.tsx", "zero-trust.tsx", "İkisi de güvenlik. 'zero-trust' zaten 'security' altında bir sekme veya alt başlık olabilir."),
  ("testing.tsx", "tdd.tsx", "İkisi de test mühendisliği. 'tdd' zaten 'testing' sayfası altında sekme olabilir."),
  ("onion.tsx", "clean-arch.tsx / hexagonal.tsx", "Onion ve Hexagonal zaten Clean Architecture ailesi."),
  ("horizontal.tsx", "vertical.tsx / clean-arch.tsx", "Horizontal zaten klasik katmanlı mimari; dikey dilim sayfasında karşılaştırma olarak var.")
]

for cat, page_list in categories.items():
  print(f"\n📁 {cat.upper()}:")
  print("-" * 95)
  for p in page_list:
    full = f"src/presentation/pages/{p}"
    if os.path.exists(full):
      route_status = "✅ Route Var" if (f"/{p.replace('.tsx', '')}" in app_routes or f"path=\"{p.replace('.tsx', '')}\"" in app_routes) else "⚠️ Route Yok"
      
      # Check if in redundancy list
      note = ""
      for r1, r2, reason in redundancy_candidates:
        if p == r1 or p == r2:
          note = f"🔍 [ÇAKIŞMA/TEKRAR]: {reason}"
          break
      print(f"  {p:<28} | {route_status:<14} | {note}")

print("\n" + "="*95 + "\n")
