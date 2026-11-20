import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const CLEAN_ARCH_SCENES: DiagramSceneRecord[] = [
  {
    "id": "clean-arch",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "clean-arch",
        "title": "Bağımlılık kuralı",
        "subtitle": "Kaynak kodu bağımlılıkları içe bakar. Veri sınırı geçebilir; kaynak kodu geçemez.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "drivers",
            "label": "Framework ve sürücüler",
            "sublabel": "web, DB, devices",
            "kind": "layer",
            "icon": "cloud",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 115
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "adapters",
            "label": "Arayüz adaptörleri",
            "sublabel": "controllers, presenters, gateways",
            "kind": "layer",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 213
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "usecases",
            "label": "Uygulama kullanım senaryoları",
            "sublabel": "orchestration, transactions",
            "kind": "layer",
            "icon": "zap",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 311
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "entities",
            "label": "Kurumsal varlıklar",
            "sublabel": "invariants, no framework",
            "kind": "layer",
            "icon": "box",
            "tone": "amber",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "drivers",
            "to": "adapters",
            "dashed": true,
            "tone": "blue",
            "label": "bağımlı"
          },
          {
            "id": "layer-edge-2",
            "from": "adapters",
            "to": "usecases",
            "dashed": true,
            "tone": "green"
          },
          {
            "id": "layer-edge-3",
            "from": "usecases",
            "to": "entities",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Merkezde varlıklar var",
            "body": "Sistemin en kararlı kodu: UI ve veritabanı baştan yazılsa da değişmeyecek iş değişmezleri.",
            "tag": "Çekirdek",
            "focus": [
              "entities"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "entities",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Use case’ler orkestre eder",
            "body": "Bir use case varlıkları yükler, tek bir niyeti uygular ve kaydeder. HTTP’yi bilmez.",
            "tag": "Uygulama",
            "focus": [
              "usecases"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "usecases",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Adaptörler çevirir",
            "body": "Controller isteği use-case çağrısına çevirir. Gateway repository portunu SQL’e çevirir.",
            "tag": "Sınır",
            "focus": [
              "adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "adapters",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Ok asla ters dönmez",
            "body": "Varlıklar framework’ü import ediyorsa mimari çoktan bozulmuştur. Derleyici tek bekçidir.",
            "tag": "Kural",
            "focus": [
              "drivers"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "drivers",
                "badge": "aktif"
              }
            ]
          }
        ]
      },
      "en": {
        "id": "clean-arch",
        "title": "The dependency rule",
        "subtitle": "Source-code dependencies point inwards. Data may cross the boundary; source code may not.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "drivers",
            "label": "Frameworks & drivers",
            "sublabel": "web, DB, devices",
            "kind": "layer",
            "icon": "cloud",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 115
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "adapters",
            "label": "Interface adapters",
            "sublabel": "controllers, presenters, gateways",
            "kind": "layer",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 213
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "usecases",
            "label": "Application use cases",
            "sublabel": "orchestration, transactions",
            "kind": "layer",
            "icon": "zap",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 311
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "entities",
            "label": "Enterprise entities",
            "sublabel": "invariants, no framework",
            "kind": "layer",
            "icon": "box",
            "tone": "amber",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "drivers",
            "to": "adapters",
            "dashed": true,
            "tone": "blue",
            "label": "depends on"
          },
          {
            "id": "layer-edge-2",
            "from": "adapters",
            "to": "usecases",
            "dashed": true,
            "tone": "green"
          },
          {
            "id": "layer-edge-3",
            "from": "usecases",
            "to": "entities",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Entities sit at the centre",
            "body": "The most stable code in the system: business invariants that would survive a rewrite of the UI and the database.",
            "tag": "Core",
            "focus": [
              "entities"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "entities",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Use cases orchestrate",
            "body": "A use case loads entities, applies one intention, and saves. It knows nothing about HTTP.",
            "tag": "Application",
            "focus": [
              "usecases"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "usecases",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Adapters translate",
            "body": "A controller turns a request into a use-case call. A gateway turns a repository port into SQL.",
            "tag": "Boundary",
            "focus": [
              "adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "adapters",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "The arrow never reverses",
            "body": "If entities import the framework, the architecture is already broken. The compiler is the guardrail.",
            "tag": "Rule",
            "focus": [
              "drivers"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "drivers"
              },
              {
                "type": "nodeBadge",
                "node": "adapters"
              },
              {
                "type": "nodeBadge",
                "node": "usecases"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "drivers",
                "badge": "active"
              }
            ]
          }
        ]
      }
    }
  }
];

export { CLEAN_ARCH_SCENES };
export default CLEAN_ARCH_SCENES;
