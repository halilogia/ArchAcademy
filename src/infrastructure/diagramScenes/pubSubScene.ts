import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const PUB_SUB_SCENES: DiagramSceneRecord[] = [
  {
    "id": "pub-sub",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "pub-sub",
        "title": "Tek olay, çok abone",
        "subtitle": "Konu yelpaze açar. Yavaş abone, yayıncıyı yavaşlatmamalı.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Yayıncılar",
            "sublabel": "gönder ve unut",
            "count": "3 alan",
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
            "label": "Konu: order.created",
            "sublabel": "fan-out · per-subscriber queue",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "email",
            "label": "E-posta servisi",
            "sublabel": "subscriber",
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
            "id": "analytics",
            "label": "Analitik",
            "sublabel": "subscriber",
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
            "id": "fraud",
            "label": "Dolandırıcılık",
            "sublabel": "subscriber",
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
            "label": "yelpaze",
            "tone": "green"
          },
          {
            "id": "edge-hub-email",
            "from": "hub",
            "to": "email",
            "curve": 0,
            "label": "yelpaze",
            "tone": "blue"
          },
          {
            "id": "edge-hub-analytics",
            "from": "hub",
            "to": "analytics",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-fraud",
            "from": "hub",
            "to": "fraud",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Konu: order.created üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "email",
              "edge-client-hub",
              "edge-hub-email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "email",
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
            "body": "Dengeleyici yelpaze kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "email",
              "analytics",
              "fraud"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "packet",
                "edge": "edge-hub-analytics"
              },
              {
                "type": "packet",
                "edge": "edge-hub-fraud"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "analytics",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "fraud",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "email"
              },
              {
                "type": "nodeBadge",
                "node": "analytics"
              },
              {
                "type": "nodeBadge",
                "node": "fraud"
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
            "body": "Analitik sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "analytics"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "analytics",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "analytics",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "analytics",
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
              "email",
              "fraud"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "packet",
                "edge": "edge-hub-fraud"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "fraud",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "email",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "fraud",
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
            "label": "Aboneler",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Yelpaze süresi",
            "value": "24 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Düşen",
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
            "label": "yelpaze",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "pub-sub",
        "title": "One event, many subscribers",
        "subtitle": "The topic fans out. A slow subscriber must not slow the publisher.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Publishers",
            "sublabel": "fire and forget",
            "count": "3 domains",
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
            "label": "Topic: order.created",
            "sublabel": "fan-out · per-subscriber queue",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "email",
            "label": "Email service",
            "sublabel": "subscriber",
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
            "id": "analytics",
            "label": "Analytics",
            "sublabel": "subscriber",
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
            "id": "fraud",
            "label": "Fraud check",
            "sublabel": "subscriber",
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
            "label": "fan-out",
            "tone": "green"
          },
          {
            "id": "edge-hub-email",
            "from": "hub",
            "to": "email",
            "curve": 0,
            "label": "fan-out",
            "tone": "blue"
          },
          {
            "id": "edge-hub-analytics",
            "from": "hub",
            "to": "analytics",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-fraud",
            "from": "hub",
            "to": "fraud",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Topic: order.created first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "email",
              "edge-client-hub",
              "edge-hub-email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "email",
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
            "body": "The balancer walks its list using fan-out. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "email",
              "analytics",
              "fraud"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "packet",
                "edge": "edge-hub-analytics"
              },
              {
                "type": "packet",
                "edge": "edge-hub-fraud"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "analytics",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "fraud",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "email"
              },
              {
                "type": "nodeBadge",
                "node": "analytics"
              },
              {
                "type": "nodeBadge",
                "node": "fraud"
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
            "body": "Analytics stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "analytics"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "analytics",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "analytics",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "analytics",
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
              "email",
              "fraud"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "packet",
                "edge": "edge-hub-fraud"
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "fraud",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "email",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "fraud",
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
            "label": "Fan-out time",
            "value": "24 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Dropped",
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
            "label": "fan-out",
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

export { PUB_SUB_SCENES };
export default PUB_SUB_SCENES;
