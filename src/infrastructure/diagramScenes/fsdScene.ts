import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const FSD_SCENES: DiagramSceneRecord[] = [
  {
    "id": "fsd",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "fsd",
        "title": "Feature-Sliced Design katmanları",
        "subtitle": "Bir dilim yalnızca altındaki katmanlardan import edebilir. Aynı seviyede çapraz import yasaktır.",
        "canvas": {
          "w": 960,
          "h": 706
        },
        "nodes": [
          {
            "id": "app",
            "label": "app",
            "sublabel": "provider’lar, routing, global stil",
            "kind": "layer",
            "icon": "layers",
            "tone": "red",
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
            "id": "pages",
            "label": "pages",
            "sublabel": "tek rota, yalnızca kompozisyon",
            "kind": "layer",
            "icon": "file",
            "tone": "amber",
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
            "id": "widgets",
            "label": "widgets",
            "sublabel": "bağımsız UI blokları",
            "kind": "layer",
            "icon": "box",
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
            "id": "features",
            "label": "features",
            "sublabel": "iş değeri taşıyan kullanıcı eylemleri",
            "kind": "layer",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "entities",
            "label": "entities",
            "sublabel": "iş nesneleri: user, order, product",
            "kind": "layer",
            "icon": "database",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 507
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "shared",
            "label": "shared",
            "sublabel": "UI kit, kütüphane, API istemcisi; iş mantığı yok",
            "kind": "layer",
            "icon": "cpu",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 605
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
            "from": "app",
            "to": "pages",
            "dashed": true,
            "tone": "amber",
            "label": "bağımlı"
          },
          {
            "id": "layer-edge-2",
            "from": "pages",
            "to": "widgets",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "widgets",
            "to": "features",
            "dashed": true,
            "tone": "blue"
          },
          {
            "id": "layer-edge-4",
            "from": "features",
            "to": "entities",
            "dashed": true,
            "tone": "green"
          },
          {
            "id": "layer-edge-5",
            "from": "entities",
            "to": "shared",
            "dashed": true,
            "tone": "slate"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "shared ile başla",
            "body": "Butonlar, tarihler, HTTP istemcileri. shared sipariş veya kullanıcı bilmez.",
            "tag": "Temel",
            "focus": [
              "shared"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "shared",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-5",
                "tone": "slate"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Entity’ler işi adlandırır",
            "body": "Entity kendi modelini ve API’sini sahiplenir. shared’ı import edebilir, üsttekileri edemez.",
            "focus": [
              "entities"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "entities",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Feature’lar fiillerdir",
            "body": "“Sepete ekle” bir feature’dır: bir entity ile kullanıcı eylemini birleştirir.",
            "tag": "Eylem",
            "focus": [
              "features"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "features",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Widget’lar feature’ları birleştirir",
            "body": "Bir header widget’ı, içlerini bilmeden arama ve sepet feature’larını barındırabilir.",
            "focus": [
              "widgets"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "widgets",
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
            "id": "layer-step-5",
            "title": "Sayfalar yalnızca düzenler",
            "body": "Sayfa widget’ları rotaya bağlar. Sayfada iş mantığı varsa yeri feature’dır.",
            "focus": [
              "pages"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "pages",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-6",
            "title": "app kompozisyon köküdür",
            "body": "Provider’lar, router ve global stiller burada. Altındaki her katmanı import edebilir.",
            "tag": "Kök",
            "focus": [
              "app"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "app",
                "badge": "aktif"
              }
            ]
          }
        ]
      },
      "en": {
        "id": "fsd",
        "title": "Feature-Sliced Design layers",
        "subtitle": "A slice may import only from layers below it. Cross-imports at the same level are forbidden.",
        "canvas": {
          "w": 960,
          "h": 706
        },
        "nodes": [
          {
            "id": "app",
            "label": "app",
            "sublabel": "providers, routing, global styles",
            "kind": "layer",
            "icon": "layers",
            "tone": "red",
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
            "id": "pages",
            "label": "pages",
            "sublabel": "one route, composition only",
            "kind": "layer",
            "icon": "file",
            "tone": "amber",
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
            "id": "widgets",
            "label": "widgets",
            "sublabel": "independent UI blocks",
            "kind": "layer",
            "icon": "box",
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
            "id": "features",
            "label": "features",
            "sublabel": "user actions with business value",
            "kind": "layer",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "entities",
            "label": "entities",
            "sublabel": "business nouns: user, order, product",
            "kind": "layer",
            "icon": "database",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 507
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "shared",
            "label": "shared",
            "sublabel": "UI kit, libs, API client, no business logic",
            "kind": "layer",
            "icon": "cpu",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 605
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
            "from": "app",
            "to": "pages",
            "dashed": true,
            "tone": "amber",
            "label": "depends on"
          },
          {
            "id": "layer-edge-2",
            "from": "pages",
            "to": "widgets",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "widgets",
            "to": "features",
            "dashed": true,
            "tone": "blue"
          },
          {
            "id": "layer-edge-4",
            "from": "features",
            "to": "entities",
            "dashed": true,
            "tone": "green"
          },
          {
            "id": "layer-edge-5",
            "from": "entities",
            "to": "shared",
            "dashed": true,
            "tone": "slate"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Start at shared",
            "body": "Buttons, dates, HTTP clients. Shared knows nothing about orders or users.",
            "tag": "Foundation",
            "focus": [
              "shared"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "shared",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-5",
                "tone": "slate"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Entities name the business",
            "body": "An entity owns its model and API. It may import shared, and nothing above it.",
            "focus": [
              "entities"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "entities",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Features are verbs",
            "body": "“Add to cart” is a feature: it composes an entity and a user action.",
            "tag": "Action",
            "focus": [
              "features"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "features",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Widgets compose features",
            "body": "A header widget can host search and cart features without knowing their internals.",
            "focus": [
              "widgets"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "widgets",
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
            "id": "layer-step-5",
            "title": "Pages only arrange",
            "body": "A page wires widgets to a route. If a page contains business logic, it belongs in a feature.",
            "focus": [
              "pages"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "pages",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-6",
            "title": "App is the composition root",
            "body": "Providers, router and global styles live here. It may import every layer below.",
            "tag": "Root",
            "focus": [
              "app"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "app"
              },
              {
                "type": "nodeBadge",
                "node": "pages"
              },
              {
                "type": "nodeBadge",
                "node": "widgets"
              },
              {
                "type": "nodeBadge",
                "node": "features"
              },
              {
                "type": "nodeBadge",
                "node": "entities"
              },
              {
                "type": "nodeBadge",
                "node": "shared"
              },
              {
                "type": "nodeBadge",
                "node": "app",
                "badge": "active"
              }
            ]
          }
        ]
      }
    }
  }
];

export { FSD_SCENES };
export default FSD_SCENES;
