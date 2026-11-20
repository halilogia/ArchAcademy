import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const PRINCIPLES_SCENES: DiagramSceneRecord[] = [
  {
    "id": "solid",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "solid",
        "title": "Bir değişiklik beş kapıdan geçer",
        "subtitle": "Her prensip sınıfı yeniden yazma sebebini bir azaltır.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "srp",
            "label": "SRP",
            "sublabel": "tek sebep",
            "kind": "service",
            "icon": "box",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 284,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "ocp",
            "label": "OCP",
            "sublabel": "genişlet, düzenleme",
            "kind": "service",
            "icon": "zap",
            "tone": "green",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "lsp",
            "label": "LSP",
            "sublabel": "yerine geçebilir",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "isp",
            "label": "ISP",
            "sublabel": "küçük arayüz",
            "kind": "service",
            "icon": "lock",
            "tone": "violet",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "dip",
            "label": "DIP",
            "sublabel": "soyutlamaya bağımlı",
            "kind": "service",
            "icon": "layers",
            "tone": "slate",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          }
        ],
        "edges": [
          {
            "id": "pipe-edge-1",
            "from": "srp",
            "to": "ocp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "ocp",
            "to": "lsp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "lsp",
            "to": "isp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "isp",
            "to": "dip",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "lsp",
            "to": "srp",
            "label": "ihlal",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Tek sorumluluk",
            "body": "İki aktör değişiklik isteyebiliyorsa sınıfı böl.",
            "tag": "SOLID",
            "focus": [
              "srp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "srp",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Açık / kapalı",
            "body": "Yeni durumu switch düzenleyerek değil, kod ekleyerek karşıla.",
            "focus": [
              "srp",
              "ocp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "srp"
              },
              {
                "type": "nodeBadge",
                "node": "ocp",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Liskov yerine geçme",
            "body": "Tabanın söz verdiği yerde fırlatan alt tip, alt tip değildir.",
            "focus": [
              "ocp",
              "lsp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ocp"
              },
              {
                "type": "nodeBadge",
                "node": "lsp",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Arayüz ayrımı",
            "body": "Hiçbir istemci çağırmadığı metodu uygulamak zorunda kalmamalı.",
            "focus": [
              "lsp",
              "isp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "lsp"
              },
              {
                "type": "nodeBadge",
                "node": "isp",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Bağımlılığın tersine çevrilmesi",
            "body": "Arayüzü politika sahiplenir; veritabanı onu uygular.",
            "focus": [
              "isp",
              "dip"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "isp"
              },
              {
                "type": "nodeBadge",
                "node": "dip",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "gates",
            "label": "Geçilen kapı",
            "value": "5 / 5",
            "tone": "green"
          },
          {
            "id": "reasons",
            "label": "Değişim sebebi",
            "value": "1",
            "tone": "blue"
          }
        ]
      },
      "en": {
        "id": "solid",
        "title": "A change passes five gates",
        "subtitle": "Each principle removes one reason to rewrite the class.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "srp",
            "label": "SRP",
            "sublabel": "one reason",
            "kind": "service",
            "icon": "box",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 284,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "ocp",
            "label": "OCP",
            "sublabel": "extend, not edit",
            "kind": "service",
            "icon": "zap",
            "tone": "green",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "lsp",
            "label": "LSP",
            "sublabel": "substitutable",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "isp",
            "label": "ISP",
            "sublabel": "small interfaces",
            "kind": "service",
            "icon": "lock",
            "tone": "violet",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "dip",
            "label": "DIP",
            "sublabel": "depend on abstractions",
            "kind": "service",
            "icon": "layers",
            "tone": "slate",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          }
        ],
        "edges": [
          {
            "id": "pipe-edge-1",
            "from": "srp",
            "to": "ocp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "ocp",
            "to": "lsp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "lsp",
            "to": "isp",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "isp",
            "to": "dip",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "lsp",
            "to": "srp",
            "label": "violation",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Single responsibility",
            "body": "If two actors can request a change, split the class.",
            "tag": "SOLID",
            "focus": [
              "srp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "srp",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Open / closed",
            "body": "Add a new case by adding code, not by editing a switch.",
            "focus": [
              "srp",
              "ocp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "srp"
              },
              {
                "type": "nodeBadge",
                "node": "ocp",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Liskov substitution",
            "body": "A subtype that throws where the base promises is not a subtype.",
            "focus": [
              "ocp",
              "lsp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ocp"
              },
              {
                "type": "nodeBadge",
                "node": "lsp",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Interface segregation",
            "body": "No client should implement a method it never calls.",
            "focus": [
              "lsp",
              "isp"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "lsp"
              },
              {
                "type": "nodeBadge",
                "node": "isp",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Dependency inversion",
            "body": "The policy owns the interface; the database implements it.",
            "focus": [
              "isp",
              "dip"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "isp"
              },
              {
                "type": "nodeBadge",
                "node": "dip",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "gates",
            "label": "Gates passed",
            "value": "5 / 5",
            "tone": "green"
          },
          {
            "id": "reasons",
            "label": "Change reasons",
            "value": "1",
            "tone": "blue"
          }
        ]
      }
    }
  },
  {
    "id": "lean-architecture",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "lean-architecture",
        "title": "Yalnızca değer taşıyanı tut",
        "subtitle": "Var olan her katman dolaylılığını hak etmelidir.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "framework",
            "label": "Framework’ler",
            "sublabel": "opsiyonel, değiştirilebilir",
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
            "label": "İnce adaptörler",
            "sublabel": "iş kuralı yok",
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
            "label": "Temel kullanım senaryoları",
            "sublabel": "tek ekran, tek iş",
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
            "id": "value",
            "label": "Değer / sonuç",
            "sublabel": "kullanıcının ödediği şey",
            "kind": "layer",
            "icon": "shield",
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
            "from": "framework",
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
            "to": "value",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Sonuçtan başla",
            "body": "Bir katman sonucu değiştirmiyorsa mimari değil, stoktur.",
            "tag": "Değer",
            "focus": [
              "value"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
              },
              {
                "type": "nodeBadge",
                "node": "value",
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
            "title": "Spekülatif katmanları sil",
            "body": "“Sonra lazım olur” diye eklenen soyutlama, sonrası gelene kadar israftır.",
            "focus": [
              "usecases"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
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
            "title": "Adaptörleri ince tut",
            "body": "Eşleme serbesttir. İş kararı değildir.",
            "focus": [
              "adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
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
            "title": "Framework bir detaydır",
            "body": "Framework yarın kaybolsa sonuç ayakta kalmalı.",
            "tag": "Sınır",
            "focus": [
              "framework"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
              },
              {
                "type": "nodeBadge",
                "node": "framework",
                "badge": "aktif"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "waste",
            "label": "Kaldırılan israf",
            "value": "-38%",
            "tone": "green"
          },
          {
            "id": "lead",
            "label": "Teslim süresi",
            "value": "2.1 d",
            "tone": "blue"
          }
        ]
      },
      "en": {
        "id": "lean-architecture",
        "title": "Keep only what carries value",
        "subtitle": "Every layer that exists must earn its indirection.",
        "canvas": {
          "w": 960,
          "h": 510
        },
        "nodes": [
          {
            "id": "framework",
            "label": "Frameworks",
            "sublabel": "optional, replaceable",
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
            "label": "Thin adapters",
            "sublabel": "no business rules",
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
            "label": "Essential use cases",
            "sublabel": "one screen, one job",
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
            "id": "value",
            "label": "Value / outcome",
            "sublabel": "what the user pays for",
            "kind": "layer",
            "icon": "shield",
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
            "from": "framework",
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
            "to": "value",
            "dashed": true,
            "tone": "amber"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Start from the outcome",
            "body": "If a layer does not change the outcome, it is inventory, not architecture.",
            "tag": "Value",
            "focus": [
              "value"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
              },
              {
                "type": "nodeBadge",
                "node": "value",
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
            "title": "Delete speculative layers",
            "body": "An abstraction added “for later” is waste until later arrives.",
            "focus": [
              "usecases"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
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
            "title": "Keep adapters thin",
            "body": "Mapping is allowed. Business decisions are not.",
            "focus": [
              "adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
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
            "title": "Framework is a detail",
            "body": "If the framework disappears tomorrow, the outcome should survive.",
            "tag": "Boundary",
            "focus": [
              "framework"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "framework"
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
                "node": "value"
              },
              {
                "type": "nodeBadge",
                "node": "framework",
                "badge": "active"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "waste",
            "label": "Waste removed",
            "value": "-38%",
            "tone": "green"
          },
          {
            "id": "lead",
            "label": "Lead time",
            "value": "2.1 d",
            "tone": "blue"
          }
        ]
      }
    }
  },
  {
    "id": "vertical",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "vertical",
        "title": "Tek özellik, tüm katmanlar",
        "subtitle": "Bir dilim kendi endpoint, handler, domain ve depolamasını sahiplenir.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "request",
            "label": "İstek",
            "kind": "service",
            "icon": "globe",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 284,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "endpoint",
            "label": "Endpoint",
            "kind": "service",
            "icon": "router",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "handler",
            "label": "Handler",
            "kind": "service",
            "icon": "zap",
            "tone": "green",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "domain",
            "label": "Domain",
            "kind": "service",
            "icon": "box",
            "tone": "amber",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "store",
            "label": "Kendi deposu",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          }
        ],
        "edges": [
          {
            "id": "pipe-edge-1",
            "from": "request",
            "to": "endpoint",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "endpoint",
            "to": "handler",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "handler",
            "to": "domain",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "domain",
            "to": "store",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "store",
            "to": "domain",
            "label": "sızıntı",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Tek rota girişi",
            "body": "Dilim yalnızca özelliğin ihtiyaç duyduğu API’yi açar.",
            "tag": "Dilim",
            "focus": [
              "request"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "request",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "İstek niyete dönüşür",
            "body": "Doğrulama paylaşılan util’de değil, dilimin kenarındadır.",
            "focus": [
              "request",
              "endpoint"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "request"
              },
              {
                "type": "nodeBadge",
                "node": "endpoint",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Handler orkestre eder",
            "body": "Yükler, tek niyet uygular, kaydeder. Özellikler arası çağrı yok.",
            "focus": [
              "endpoint",
              "handler"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "endpoint"
              },
              {
                "type": "nodeBadge",
                "node": "handler",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Kuralı domain sahiplenir",
            "body": "Değişmez, HTTP veya veritabanı olmadan test edilebilir.",
            "focus": [
              "handler",
              "domain"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "handler"
              },
              {
                "type": "nodeBadge",
                "node": "domain",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Depolama özeldir",
            "body": "Başka dilim bu tabloyu değil, API’yi okur.",
            "tag": "Sınır",
            "focus": [
              "domain",
              "store"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "store",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "violet"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "files",
            "label": "Dokunulan dosya",
            "value": "6",
            "tone": "blue"
          },
          {
            "id": "imports",
            "label": "Özellikler arası import",
            "value": "0",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "vertical",
        "title": "One feature, every layer",
        "subtitle": "A slice owns its endpoint, handler, domain and storage.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "request",
            "label": "Request",
            "kind": "service",
            "icon": "globe",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 284,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "endpoint",
            "label": "Endpoint",
            "kind": "service",
            "icon": "router",
            "tone": "blue",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "handler",
            "label": "Handler",
            "kind": "service",
            "icon": "zap",
            "tone": "green",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 140
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "domain",
            "label": "Domain",
            "kind": "service",
            "icon": "box",
            "tone": "amber",
            "status": "ok",
            "at": {
              "x": 676,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          },
          {
            "id": "store",
            "label": "Own store",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
            "status": "ok",
            "at": {
              "x": 480,
              "y": 310
            },
            "size": {
              "w": 152,
              "h": 96
            }
          }
        ],
        "edges": [
          {
            "id": "pipe-edge-1",
            "from": "request",
            "to": "endpoint",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "endpoint",
            "to": "handler",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "handler",
            "to": "domain",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "domain",
            "to": "store",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "store",
            "to": "domain",
            "label": "leak",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "One route in",
            "body": "The slice exposes exactly the API the feature needs.",
            "tag": "Slice",
            "focus": [
              "request"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "request",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Request becomes intent",
            "body": "Validation belongs at the edge of the slice, not in a shared util.",
            "focus": [
              "request",
              "endpoint"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "request"
              },
              {
                "type": "nodeBadge",
                "node": "endpoint",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Handler orchestrates",
            "body": "It loads, applies one intention, saves. No cross-feature calls.",
            "focus": [
              "endpoint",
              "handler"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "endpoint"
              },
              {
                "type": "nodeBadge",
                "node": "handler",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Domain owns the rule",
            "body": "The invariant is testable without HTTP or a database.",
            "focus": [
              "handler",
              "domain"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "handler"
              },
              {
                "type": "nodeBadge",
                "node": "domain",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Storage is private",
            "body": "Another slice reads through an API, never through this table.",
            "tag": "Boundary",
            "focus": [
              "domain",
              "store"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "store",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "violet"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "files",
            "label": "Files touched",
            "value": "6",
            "tone": "blue"
          },
          {
            "id": "imports",
            "label": "Cross-feature imports",
            "value": "0",
            "tone": "green"
          }
        ]
      }
    }
  }
];

export { PRINCIPLES_SCENES };
export default PRINCIPLES_SCENES;
