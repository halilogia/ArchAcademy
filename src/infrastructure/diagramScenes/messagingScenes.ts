import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const MESSAGING_SCENES: DiagramSceneRecord[] = [
  {
    "id": "orchestration",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "orchestration",
        "title": "Merkezi bir beyin saga’yı yürütür",
        "subtitle": "Sırayı orkestratör bilir. Servisler yalnızca komutları yanıtlar.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Sipariş istekleri",
            "count": "1 akış",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Orkestratör",
            "sublabel": "saga state · retries · compensation",
            "kind": "hub",
            "icon": "network",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "payment",
            "label": "Ödeme",
            "sublabel": "charge",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "inventory",
            "label": "Stok",
            "sublabel": "reserve",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "shipping",
            "label": "Kargo",
            "sublabel": "dispatch",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "merkezi saga",
            "tone": "green"
          },
          {
            "id": "edge-hub-payment",
            "from": "hub",
            "to": "payment",
            "curve": 0,
            "label": "merkezi saga",
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-shipping",
            "from": "hub",
            "to": "shipping",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Orkestratör üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "payment",
              "edge-client-hub",
              "edge-hub-payment"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "sıcak"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Yükü dağıt",
            "body": "Dengeleyici merkezi saga kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "payment",
              "inventory",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "payment"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
              },
              {
                "type": "nodeBadge",
                "node": "shipping"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "Bir düğüm düşüyor",
            "body": "Stok sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "inventory"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "inventory",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
                "badge": "düşük"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Etrafından dolaş",
            "body": "Trafik kalan sağlıklı düğümlere yeniden dağıtılır. Kapasite düşer, ürün ayakta kalır.",
            "tag": "Devralma",
            "focus": [
              "hub",
              "payment",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "shipping",
                "badge": "devralındı"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Tamamlanan adım",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Saga süresi",
            "value": "410 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Telafi",
            "value": "0",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "merkezi saga",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "orchestration",
        "title": "A central brain runs the saga",
        "subtitle": "The orchestrator knows the order. Services only answer commands.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Order requests",
            "count": "1 flow",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Orchestrator",
            "sublabel": "saga state · retries · compensation",
            "kind": "hub",
            "icon": "network",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "payment",
            "label": "Payment",
            "sublabel": "charge",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "inventory",
            "label": "Inventory",
            "sublabel": "reserve",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "shipping",
            "label": "Shipping",
            "sublabel": "dispatch",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "central saga",
            "tone": "green"
          },
          {
            "id": "edge-hub-payment",
            "from": "hub",
            "to": "payment",
            "curve": 0,
            "label": "central saga",
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-shipping",
            "from": "hub",
            "to": "shipping",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Orchestrator first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "payment",
              "edge-client-hub",
              "edge-hub-payment"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "hot"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Spread the load",
            "body": "The balancer walks its list using central saga. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "payment",
              "inventory",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "payment"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
              },
              {
                "type": "nodeBadge",
                "node": "shipping"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "One node goes dark",
            "body": "Inventory stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "inventory"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "inventory",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
                "badge": "down"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Route around it",
            "body": "Traffic is re-sent to the remaining healthy nodes. Capacity drops, but the product stays up.",
            "tag": "Failover",
            "focus": [
              "hub",
              "payment",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "shipping",
                "badge": "recovered"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Steps done",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Saga time",
            "value": "410 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Compensations",
            "value": "0",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "central saga",
            "tone": "blue"
          },
          {
            "label": "failure",
            "tone": "red"
          }
        ]
      }
    }
  },
  {
    "id": "choreography",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "choreography",
        "title": "Beyin yok, yalnızca tepkiler",
        "subtitle": "Her servis ilgilendiği olguya abone olur ve kendi olgusunu yayınlar.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Sipariş servisi",
            "count": "yayıncı",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Olay veriyolu",
            "sublabel": "topics · no coordinator",
            "kind": "hub",
            "icon": "queue",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "payment",
            "label": "Ödeme",
            "sublabel": "reacts to OrderPlaced",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "inventory",
            "label": "Stok",
            "sublabel": "reacts to PaymentTaken",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "shipping",
            "label": "Kargo",
            "sublabel": "reacts to StockReserved",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "olay yelpazesi",
            "tone": "green"
          },
          {
            "id": "edge-hub-payment",
            "from": "hub",
            "to": "payment",
            "curve": 0,
            "label": "olay yelpazesi",
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-shipping",
            "from": "hub",
            "to": "shipping",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Olay veriyolu üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "payment",
              "edge-client-hub",
              "edge-hub-payment"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "sıcak"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Yükü dağıt",
            "body": "Dengeleyici olay yelpazesi kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "payment",
              "inventory",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "payment"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
              },
              {
                "type": "nodeBadge",
                "node": "shipping"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "Bir düğüm düşüyor",
            "body": "Stok sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "inventory"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "inventory",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
                "badge": "düşük"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Etrafından dolaş",
            "body": "Trafik kalan sağlıklı düğümlere yeniden dağıtılır. Kapasite düşer, ürün ayakta kalır.",
            "tag": "Devralma",
            "focus": [
              "hub",
              "payment",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "shipping",
                "badge": "devralındı"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Abone",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Yayılma",
            "value": "85 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Sahipsiz olay",
            "value": "0",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "olay yelpazesi",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "choreography",
        "title": "No brain, only reactions",
        "subtitle": "Every service subscribes to the facts it cares about and publishes its own.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Order service",
            "count": "publisher",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Event bus",
            "sublabel": "topics · no coordinator",
            "kind": "hub",
            "icon": "queue",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "payment",
            "label": "Payment",
            "sublabel": "reacts to OrderPlaced",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "inventory",
            "label": "Inventory",
            "sublabel": "reacts to PaymentTaken",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "shipping",
            "label": "Shipping",
            "sublabel": "reacts to StockReserved",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "event fan-out",
            "tone": "green"
          },
          {
            "id": "edge-hub-payment",
            "from": "hub",
            "to": "payment",
            "curve": 0,
            "label": "event fan-out",
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-shipping",
            "from": "hub",
            "to": "shipping",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Event bus first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "payment",
              "edge-client-hub",
              "edge-hub-payment"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "hot"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Spread the load",
            "body": "The balancer walks its list using event fan-out. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "payment",
              "inventory",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "payment"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
              },
              {
                "type": "nodeBadge",
                "node": "shipping"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "One node goes dark",
            "body": "Inventory stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "inventory"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "inventory",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
                "badge": "down"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Route around it",
            "body": "Traffic is re-sent to the remaining healthy nodes. Capacity drops, but the product stays up.",
            "tag": "Failover",
            "focus": [
              "hub",
              "payment",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-payment"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "payment",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "payment",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "shipping",
                "badge": "recovered"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Subscribers",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Propagation",
            "value": "85 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Orphans",
            "value": "0",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "event fan-out",
            "tone": "blue"
          },
          {
            "label": "failure",
            "tone": "red"
          }
        ]
      }
    }
  },
  {
    "id": "soa",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "soa",
        "title": "Sözleşme veriyoludur",
        "subtitle": "Kanallar servisi doğrudan çağırmaz. ESB yönlendirir, dönüştürür ve arabuluculuk yapar.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Kanallar",
            "count": "web · şube · partner",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Kurumsal servis veriyolu",
            "sublabel": "routing · transformation · mediation",
            "kind": "hub",
            "icon": "network",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "crm",
            "label": "CRM",
            "sublabel": "SOAP",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "billing",
            "label": "Faturalama",
            "sublabel": "REST",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "erp",
            "label": "Legacy ERP",
            "sublabel": "file drop",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "aracılı yönlendirme",
            "tone": "green"
          },
          {
            "id": "edge-hub-crm",
            "from": "hub",
            "to": "crm",
            "curve": 0,
            "label": "aracılı yönlendirme",
            "tone": "blue"
          },
          {
            "id": "edge-hub-billing",
            "from": "hub",
            "to": "billing",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-erp",
            "from": "hub",
            "to": "erp",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Kurumsal servis veriyolu üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "crm",
              "edge-client-hub",
              "edge-hub-crm"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "crm",
                "badge": "sıcak"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Yükü dağıt",
            "body": "Dengeleyici aracılı yönlendirme kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "crm",
              "billing",
              "erp"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "packet",
                "edge": "edge-hub-billing"
              },
              {
                "type": "packet",
                "edge": "edge-hub-erp"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "erp",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "crm"
              },
              {
                "type": "nodeBadge",
                "node": "billing"
              },
              {
                "type": "nodeBadge",
                "node": "erp"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "Bir düğüm düşüyor",
            "body": "Faturalama sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "billing"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "billing",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "billing",
                "badge": "düşük"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Etrafından dolaş",
            "body": "Trafik kalan sağlıklı düğümlere yeniden dağıtılır. Kapasite düşer, ürün ayakta kalır.",
            "tag": "Devralma",
            "focus": [
              "hub",
              "crm",
              "erp"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "packet",
                "edge": "edge-hub-erp"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "erp",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "crm",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "erp",
                "badge": "devralındı"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Servis",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Veriyolu maliyeti",
            "value": "48 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Dönüşüm hatası",
            "value": "0.1%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "aracılı yönlendirme",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "soa",
        "title": "The bus is the contract",
        "subtitle": "Channels never call a service directly. The ESB routes, transforms and mediates.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Channels",
            "count": "web · branch · partner",
            "kind": "pool",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 165,
              "y": 420
            }
          },
          {
            "id": "hub",
            "label": "Enterprise service bus",
            "sublabel": "routing · transformation · mediation",
            "kind": "hub",
            "icon": "network",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "crm",
            "label": "CRM",
            "sublabel": "SOAP",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 120
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "billing",
            "label": "Billing",
            "sublabel": "REST",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 260
            },
            "load": 0,
            "status": "ok"
          },
          {
            "id": "erp",
            "label": "Legacy ERP",
            "sublabel": "file drop",
            "kind": "service",
            "icon": "server",
            "at": {
              "x": 700,
              "y": 400
            },
            "load": 0,
            "status": "ok"
          }
        ],
        "edges": [
          {
            "id": "edge-client-hub",
            "from": "client-pool",
            "to": "hub",
            "label": "mediated routing",
            "tone": "green"
          },
          {
            "id": "edge-hub-crm",
            "from": "hub",
            "to": "crm",
            "curve": 0,
            "label": "mediated routing",
            "tone": "blue"
          },
          {
            "id": "edge-hub-billing",
            "from": "hub",
            "to": "billing",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-erp",
            "from": "hub",
            "to": "erp",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Enterprise service bus first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "crm",
              "edge-client-hub",
              "edge-hub-crm"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "crm",
                "badge": "hot"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "310 ms"
              }
            ]
          },
          {
            "id": "spread",
            "title": "Spread the load",
            "body": "The balancer walks its list using mediated routing. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "crm",
              "billing",
              "erp"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "packet",
                "edge": "edge-hub-billing"
              },
              {
                "type": "packet",
                "edge": "edge-hub-erp"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "erp",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "crm"
              },
              {
                "type": "nodeBadge",
                "node": "billing"
              },
              {
                "type": "nodeBadge",
                "node": "erp"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "90 ms"
              }
            ]
          },
          {
            "id": "health-fail",
            "title": "One node goes dark",
            "body": "Billing stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "billing"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "billing",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "billing",
                "badge": "down"
              },
              {
                "type": "metric",
                "id": "healthy",
                "value": "2 / 3"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "4%"
              }
            ]
          },
          {
            "id": "failover",
            "title": "Route around it",
            "body": "Traffic is re-sent to the remaining healthy nodes. Capacity drops, but the product stays up.",
            "tag": "Failover",
            "focus": [
              "hub",
              "crm",
              "erp"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-crm"
              },
              {
                "type": "packet",
                "edge": "edge-hub-erp"
              },
              {
                "type": "nodeLoad",
                "node": "crm",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "erp",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "crm",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "erp",
                "badge": "recovered"
              },
              {
                "type": "metric",
                "id": "errors",
                "value": "0%"
              },
              {
                "type": "metric",
                "id": "p95",
                "value": "140 ms"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "healthy",
            "label": "Services",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Bus overhead",
            "value": "48 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Transform errors",
            "value": "0.1%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "mediated routing",
            "tone": "blue"
          },
          {
            "label": "failure",
            "tone": "red"
          }
        ]
      }
    }
  }
];

export { MESSAGING_SCENES };
export default MESSAGING_SCENES;
