import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const ONION_SCENES: DiagramSceneRecord[] = [
  {
    "id": "onion",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "onion",
        "title": "Soğanı dışarıdan içeriye soy",
        "subtitle": "Her halka içindeki halkaya bağımlı olabilir, dışındakine asla.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "infra",
            "label": "Altyapı ve UI",
            "sublabel": "DB, web, file system, external APIs",
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
            "id": "app",
            "label": "Uygulama servisleri",
            "sublabel": "use-case orchestration, DTOs",
            "kind": "layer",
            "icon": "zap",
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
            "id": "domain-services",
            "label": "Domain servisleri",
            "sublabel": "rules spanning several entities",
            "kind": "layer",
            "icon": "cpu",
            "tone": "violet",
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
            "id": "model",
            "label": "Domain modeli",
            "sublabel": "entities, value objects, invariants",
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
            "from": "infra",
            "to": "app",
            "dashed": true,
            "tone": "blue",
            "label": "bağımlı"
          },
          {
            "id": "layer-edge-2",
            "from": "app",
            "to": "domain-services",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "domain-services",
            "to": "model",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Merkez modeldir",
            "body": "Entity ve value object’ler iş gerçeğini taşır. Veritabanı anotasyonu, framework taban sınıfı yok.",
            "tag": "Çekirdek",
            "focus": [
              "model"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "model",
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
            "title": "Domain servisleri boşluğu doldurur",
            "body": "Bir kural birden fazla aggregate gerektiriyorsa, domain servisi depolamayı bilmeden onu ifade eder.",
            "tag": "Domain",
            "focus": [
              "domain-services"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Uygulama servisleri orkestre eder",
            "body": "Yükler, çağırır, kaydeder ve çevirir. İş kararı bir halka içeride kalır.",
            "tag": "Use case",
            "focus": [
              "app"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "app",
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
            "title": "Altyapı değiştirilebilir",
            "body": "En dış halka içeride tanımlı arayüzleri uygular. Postgres yerine bellek kullanmak hiçbir kuralı değiştirmez.",
            "tag": "Sınır",
            "focus": [
              "infra"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "infra",
                "badge": "aktif"
              }
            ]
          }
        ]
      },
      "en": {
        "id": "onion",
        "title": "Peel the onion from the outside in",
        "subtitle": "Each ring may depend on the ring inside it, never on the ring outside.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "infra",
            "label": "Infrastructure & UI",
            "sublabel": "DB, web, file system, external APIs",
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
            "id": "app",
            "label": "Application services",
            "sublabel": "use-case orchestration, DTOs",
            "kind": "layer",
            "icon": "zap",
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
            "id": "domain-services",
            "label": "Domain services",
            "sublabel": "rules spanning several entities",
            "kind": "layer",
            "icon": "cpu",
            "tone": "violet",
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
            "id": "model",
            "label": "Domain model",
            "sublabel": "entities, value objects, invariants",
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
            "from": "infra",
            "to": "app",
            "dashed": true,
            "tone": "blue",
            "label": "depends on"
          },
          {
            "id": "layer-edge-2",
            "from": "app",
            "to": "domain-services",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "domain-services",
            "to": "model",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "The model is the core",
            "body": "Entities and value objects hold the business truth. No database annotation, no framework base class.",
            "tag": "Core",
            "focus": [
              "model"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "model",
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
            "title": "Domain services fill the gap",
            "body": "When a rule needs more than one aggregate, a domain service states it without knowing about storage.",
            "tag": "Domain",
            "focus": [
              "domain-services"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Application services orchestrate",
            "body": "They load, call, save and translate. The business decision stays one ring inwards.",
            "tag": "Use case",
            "focus": [
              "app"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "app",
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
            "title": "Infrastructure is replaceable",
            "body": "The outermost ring implements interfaces declared inwards. Swapping Postgres for memory changes no rule.",
            "tag": "Boundary",
            "focus": [
              "infra"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "infra"
              },
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "domain-services"
              },
              {
                "type": "nodeBadge",
                "node": "model"
              },
              {
                "type": "nodeBadge",
                "node": "infra",
                "badge": "active"
              }
            ]
          }
        ]
      }
    }
  }
];

export { ONION_SCENES };
export default ONION_SCENES;
