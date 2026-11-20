import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const HEXAGONAL_SCENES: DiagramSceneRecord[] = [
  {
    "id": "hexagonal",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "hexagonal",
        "title": "İki tarafta portlar ve adaptörler",
        "subtitle": "Domain kendisini kimin çağırdığını veya neyi çağırdığını bilmez. İkisi de porttur.",
        "canvas": {
          "w": 960,
          "h": 608
        },
        "nodes": [
          {
            "id": "driving-adapters",
            "label": "Yönlendiren adaptörler",
            "sublabel": "REST controller, CLI, UI",
            "kind": "layer",
            "icon": "globe",
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
            "id": "driving-ports",
            "label": "Yönlendiren portlar",
            "sublabel": "inbound use-case interfaces",
            "kind": "layer",
            "icon": "lock",
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
            "id": "domain",
            "label": "Domain + use case’ler",
            "sublabel": "the hexagon itself",
            "kind": "layer",
            "icon": "box",
            "tone": "amber",
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
            "id": "driven-ports",
            "label": "Yönlendirilen portlar",
            "sublabel": "repository, mail, clock",
            "kind": "layer",
            "icon": "lock",
            "tone": "violet",
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
            "id": "driven-adapters",
            "label": "Yönlendirilen adaptörler",
            "sublabel": "Postgres, Kafka, SendGrid",
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
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "driving-adapters",
            "to": "driving-ports",
            "dashed": true,
            "tone": "blue",
            "label": "bağımlı"
          },
          {
            "id": "layer-edge-2",
            "from": "driving-ports",
            "to": "domain",
            "dashed": true,
            "tone": "amber"
          },
          {
            "id": "layer-edge-3",
            "from": "domain",
            "to": "driven-ports",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-4",
            "from": "driven-ports",
            "to": "driven-adapters",
            "dashed": true,
            "tone": "green"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "İstek bir adaptörden girer",
            "body": "Controller HTTP’yi bilir. Domain varlıklarını bilmesine izin verilmez.",
            "tag": "Giriş",
            "focus": [
              "driving-adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-adapters",
                "badge": "aktif"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Port sözleşmedir",
            "body": "Giriş portu domain’in uyguladığı arayüzdür. Adaptör ona bağımlıdır, tersi değil.",
            "focus": [
              "driving-ports"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports",
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
            "id": "layer-step-3",
            "title": "Kararı altıgen verir",
            "body": "Use case’ler varlıkları orkestre eder. Dış dünyaya her bağımlılık arayüz olarak ifade edilir.",
            "tag": "Çekirdek",
            "focus": [
              "domain"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "domain",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Dışa dönük iş porttan geçer",
            "body": "Repository portu domain’in neye ihtiyacı olduğunu söyler, hangi veritabanının sağladığını değil.",
            "focus": [
              "driven-ports"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-5",
            "title": "Adaptör bir detaydır",
            "body": "Postgres, Kafka ve e-posta birbirinin yerine geçebilir; çünkü her biri bir portu uygular.",
            "tag": "Çıkış",
            "focus": [
              "driven-adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          }
        ]
      },
      "en": {
        "id": "hexagonal",
        "title": "Ports and adapters, both sides",
        "subtitle": "The domain does not know who calls it or what it calls. Both are ports.",
        "canvas": {
          "w": 960,
          "h": 608
        },
        "nodes": [
          {
            "id": "driving-adapters",
            "label": "Driving adapters",
            "sublabel": "REST controller, CLI, UI",
            "kind": "layer",
            "icon": "globe",
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
            "id": "driving-ports",
            "label": "Driving ports",
            "sublabel": "inbound use-case interfaces",
            "kind": "layer",
            "icon": "lock",
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
            "id": "domain",
            "label": "Domain + use cases",
            "sublabel": "the hexagon itself",
            "kind": "layer",
            "icon": "box",
            "tone": "amber",
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
            "id": "driven-ports",
            "label": "Driven ports",
            "sublabel": "repository, mail, clock",
            "kind": "layer",
            "icon": "lock",
            "tone": "violet",
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
            "id": "driven-adapters",
            "label": "Driven adapters",
            "sublabel": "Postgres, Kafka, SendGrid",
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
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "driving-adapters",
            "to": "driving-ports",
            "dashed": true,
            "tone": "blue",
            "label": "depends on"
          },
          {
            "id": "layer-edge-2",
            "from": "driving-ports",
            "to": "domain",
            "dashed": true,
            "tone": "amber"
          },
          {
            "id": "layer-edge-3",
            "from": "domain",
            "to": "driven-ports",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-4",
            "from": "driven-ports",
            "to": "driven-adapters",
            "dashed": true,
            "tone": "green"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "A request enters through an adapter",
            "body": "The controller knows HTTP. It is not allowed to know the domain entities.",
            "tag": "Inbound",
            "focus": [
              "driving-adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-adapters",
                "badge": "active"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "The port is the contract",
            "body": "The inbound port is an interface the domain implements. The adapter depends on it, not the reverse.",
            "focus": [
              "driving-ports"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports",
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
            "id": "layer-step-3",
            "title": "The hexagon decides",
            "body": "Use cases orchestrate entities. Every dependency on the outside world is expressed as an interface.",
            "tag": "Core",
            "focus": [
              "domain"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "domain",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Outbound work goes through a port",
            "body": "The repository port says what the domain needs, not which database provides it.",
            "focus": [
              "driven-ports"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-5",
            "title": "The adapter is a detail",
            "body": "Postgres, Kafka and email are interchangeable because each implements a driven port.",
            "tag": "Outbound",
            "focus": [
              "driven-adapters"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "driving-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driving-ports"
              },
              {
                "type": "nodeBadge",
                "node": "domain"
              },
              {
                "type": "nodeBadge",
                "node": "driven-ports"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters"
              },
              {
                "type": "nodeBadge",
                "node": "driven-adapters",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          }
        ]
      }
    }
  }
];

export { HEXAGONAL_SCENES };
export default HEXAGONAL_SCENES;
