import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const PLATFORM_SCENES: DiagramSceneRecord[] = [
  {
    "id": "space-based",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "space-based",
        "title": "Durumu bellekte tut",
        "subtitle": "İşlem birimleri durumsuz ve değiştirilebilir. Durum, veri grid’indedir.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "İstekler",
            "count": "düşük gecikme",
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
            "label": "Sanallaştırılmış ara katman",
            "sublabel": "routing · replication",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "unit-a",
            "label": "İşlem birimi A",
            "sublabel": "in-memory",
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
            "id": "unit-b",
            "label": "İşlem birimi B",
            "sublabel": "in-memory",
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
            "id": "grid",
            "label": "Veri grid’i",
            "sublabel": "replicated state",
            "kind": "service",
            "icon": "database",
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
            "label": "bellek içi yönlendirme",
            "tone": "green"
          },
          {
            "id": "edge-hub-unit-a",
            "from": "hub",
            "to": "unit-a",
            "curve": 0,
            "label": "bellek içi yönlendirme",
            "tone": "blue"
          },
          {
            "id": "edge-hub-unit-b",
            "from": "hub",
            "to": "unit-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-grid",
            "from": "hub",
            "to": "grid",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Sanallaştırılmış ara katman üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "unit-a",
              "edge-client-hub",
              "edge-hub-unit-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "unit-a",
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
            "body": "Dengeleyici bellek içi yönlendirme kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "unit-a",
              "unit-b",
              "grid"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-unit-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-grid"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "unit-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "grid",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "unit-a"
              },
              {
                "type": "nodeBadge",
                "node": "unit-b"
              },
              {
                "type": "nodeBadge",
                "node": "grid"
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
            "body": "İşlem birimi B sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "unit-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "unit-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "unit-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "unit-b",
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
              "unit-a",
              "grid"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-grid"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "grid",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "unit-a",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "grid",
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
            "label": "Ayakta birim",
            "value": "2 / 2",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "P95 latency",
            "value": "8 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Cache kaçırması",
            "value": "2%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "bellek içi yönlendirme",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "space-based",
        "title": "Keep the state in memory",
        "subtitle": "Processing units are stateless and replaceable. The data grid is the state.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Requests",
            "count": "low latency",
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
            "label": "Virtualized middleware",
            "sublabel": "routing · replication",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "unit-a",
            "label": "Processing unit A",
            "sublabel": "in-memory",
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
            "id": "unit-b",
            "label": "Processing unit B",
            "sublabel": "in-memory",
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
            "id": "grid",
            "label": "Data grid",
            "sublabel": "replicated state",
            "kind": "service",
            "icon": "database",
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
            "label": "in-memory routing",
            "tone": "green"
          },
          {
            "id": "edge-hub-unit-a",
            "from": "hub",
            "to": "unit-a",
            "curve": 0,
            "label": "in-memory routing",
            "tone": "blue"
          },
          {
            "id": "edge-hub-unit-b",
            "from": "hub",
            "to": "unit-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-grid",
            "from": "hub",
            "to": "grid",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Virtualized middleware first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "unit-a",
              "edge-client-hub",
              "edge-hub-unit-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "unit-a",
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
            "body": "The balancer walks its list using in-memory routing. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "unit-a",
              "unit-b",
              "grid"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-unit-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-grid"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "unit-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "grid",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "unit-a"
              },
              {
                "type": "nodeBadge",
                "node": "unit-b"
              },
              {
                "type": "nodeBadge",
                "node": "grid"
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
            "body": "Processing unit B stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "unit-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "unit-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "unit-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "unit-b",
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
              "unit-a",
              "grid"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-unit-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-grid"
              },
              {
                "type": "nodeLoad",
                "node": "unit-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "grid",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "unit-a",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "grid",
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
            "label": "Units up",
            "value": "2 / 2",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "P95 latency",
            "value": "8 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Cache misses",
            "value": "2%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "in-memory routing",
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
    "id": "bff",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "bff",
        "title": "Her istemci şekline bir backend",
        "subtitle": "Mobil BFF üç alan döner. Web BFF bir sayfa döner. Ortak servisler genel kalır.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "İstemciler",
            "count": "web · iOS · Android",
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
            "label": "BFF katmanı",
            "sublabel": "per-client aggregation",
            "kind": "hub",
            "icon": "router",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "orders",
            "label": "Siparişler",
            "sublabel": "domain API",
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
            "id": "catalog",
            "label": "Katalog",
            "sublabel": "domain API",
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
            "id": "profile",
            "label": "Profil",
            "sublabel": "domain API",
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
            "label": "istemciye göre topla",
            "tone": "green"
          },
          {
            "id": "edge-hub-orders",
            "from": "hub",
            "to": "orders",
            "curve": 0,
            "label": "istemciye göre topla",
            "tone": "blue"
          },
          {
            "id": "edge-hub-catalog",
            "from": "hub",
            "to": "catalog",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-profile",
            "from": "hub",
            "to": "profile",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce BFF katmanı üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "orders",
              "edge-client-hub",
              "edge-hub-orders"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "orders",
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
            "body": "Dengeleyici istemciye göre topla kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "orders",
              "catalog",
              "profile"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-catalog"
              },
              {
                "type": "packet",
                "edge": "edge-hub-profile"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "catalog",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "profile",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "orders"
              },
              {
                "type": "nodeBadge",
                "node": "catalog"
              },
              {
                "type": "nodeBadge",
                "node": "profile"
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
            "body": "Katalog sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "catalog"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "catalog",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "catalog",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "catalog",
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
              "orders",
              "profile"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-profile"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "profile",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "orders",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "profile",
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
            "label": "BFF",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Kazanılan tur",
            "value": "4",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Boşa veri",
            "value": "-62%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "istemciye göre topla",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "bff",
        "title": "One backend per client shape",
        "subtitle": "The mobile BFF returns three fields. The web BFF returns a page. Shared services stay generic.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Clients",
            "count": "web · iOS · Android",
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
            "label": "BFF layer",
            "sublabel": "per-client aggregation",
            "kind": "hub",
            "icon": "router",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "orders",
            "label": "Orders",
            "sublabel": "domain API",
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
            "id": "catalog",
            "label": "Catalog",
            "sublabel": "domain API",
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
            "id": "profile",
            "label": "Profile",
            "sublabel": "domain API",
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
            "label": "aggregate per client",
            "tone": "green"
          },
          {
            "id": "edge-hub-orders",
            "from": "hub",
            "to": "orders",
            "curve": 0,
            "label": "aggregate per client",
            "tone": "blue"
          },
          {
            "id": "edge-hub-catalog",
            "from": "hub",
            "to": "catalog",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-profile",
            "from": "hub",
            "to": "profile",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through BFF layer first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "orders",
              "edge-client-hub",
              "edge-hub-orders"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "orders",
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
            "body": "The balancer walks its list using aggregate per client. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "orders",
              "catalog",
              "profile"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-catalog"
              },
              {
                "type": "packet",
                "edge": "edge-hub-profile"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "catalog",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "profile",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "orders"
              },
              {
                "type": "nodeBadge",
                "node": "catalog"
              },
              {
                "type": "nodeBadge",
                "node": "profile"
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
            "body": "Catalog stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "catalog"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "catalog",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "catalog",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "catalog",
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
              "orders",
              "profile"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-profile"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "profile",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "orders",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "profile",
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
            "label": "BFFs",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Round trips saved",
            "value": "4",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Payload waste",
            "value": "-62%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "aggregate per client",
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

export { PLATFORM_SCENES };
export default PLATFORM_SCENES;
