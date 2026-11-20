import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const MICROSERVICES_SCENES: DiagramSceneRecord[] = [
  {
    "id": "microservices",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "microservices",
        "title": "Bağımsız servisler, tek giriş",
        "subtitle": "Her servis kendi verisini sahiplenir. Gateway istemci sözleşmesini sahiplenir.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "İstemciler",
            "sublabel": "tek açık sözleşme",
            "count": "web + mobil",
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
            "label": "API Gateway",
            "sublabel": "routing · auth · rate limit",
            "kind": "hub",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "orders",
            "label": "Siparişler",
            "sublabel": "own DB",
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
            "id": "payments",
            "label": "Ödemeler",
            "sublabel": "own DB",
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
            "id": "inventory",
            "label": "Stok",
            "sublabel": "own DB",
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
            "label": "yol yönlendirme",
            "tone": "green"
          },
          {
            "id": "edge-hub-orders",
            "from": "hub",
            "to": "orders",
            "curve": 0,
            "label": "yol yönlendirme",
            "tone": "blue"
          },
          {
            "id": "edge-hub-payments",
            "from": "hub",
            "to": "payments",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce API Gateway üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
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
            "body": "Dengeleyici yol yönlendirme kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "orders",
              "payments",
              "inventory"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payments"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "payments",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "orders"
              },
              {
                "type": "nodeBadge",
                "node": "payments"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
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
            "body": "Ödemeler sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "payments"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "payments",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "payments",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "payments",
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
              "inventory"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "orders",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
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
            "label": "Ayakta servis",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "P95 latency",
            "value": "120 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Hata oranı",
            "value": "0.2%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "green"
          },
          {
            "label": "yol yönlendirme",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "microservices",
        "title": "Independent services, one entry",
        "subtitle": "Each service owns its data. The gateway owns the client contract.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Clients",
            "sublabel": "one public contract",
            "count": "web + mobile",
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
            "label": "API Gateway",
            "sublabel": "routing · auth · rate limit",
            "kind": "hub",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "orders",
            "label": "Orders",
            "sublabel": "own DB",
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
            "id": "payments",
            "label": "Payments",
            "sublabel": "own DB",
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
            "id": "inventory",
            "label": "Inventory",
            "sublabel": "own DB",
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
            "label": "path routing",
            "tone": "green"
          },
          {
            "id": "edge-hub-orders",
            "from": "hub",
            "to": "orders",
            "curve": 0,
            "label": "path routing",
            "tone": "blue"
          },
          {
            "id": "edge-hub-payments",
            "from": "hub",
            "to": "payments",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-inventory",
            "from": "hub",
            "to": "inventory",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through API Gateway first. Without it, each client would need to know every server and failures would be invisible.",
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
            "body": "The balancer walks its list using path routing. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "orders",
              "payments",
              "inventory"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-payments"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "payments",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "orders"
              },
              {
                "type": "nodeBadge",
                "node": "payments"
              },
              {
                "type": "nodeBadge",
                "node": "inventory"
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
            "body": "Payments stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "payments"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "payments",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "payments",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "payments",
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
              "inventory"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-orders"
              },
              {
                "type": "packet",
                "edge": "edge-hub-inventory"
              },
              {
                "type": "nodeLoad",
                "node": "orders",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "inventory",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "orders",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "inventory",
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
            "label": "Services up",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "P95 latency",
            "value": "120 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Error rate",
            "value": "0.2%",
            "tone": "slate"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "green"
          },
          {
            "label": "path routing",
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

export { MICROSERVICES_SCENES };
export default MICROSERVICES_SCENES;
