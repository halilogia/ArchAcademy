import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const BROKER_SCENES: DiagramSceneRecord[] = [
  {
    "id": "broker",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "broker",
        "title": "Broker: üreticiyi tüketiciden ayır",
        "subtitle": "Kuyruk ani yükü emer. Tüketiciler aynı mesaj için yarışır.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Üreticiler",
            "sublabel": "yayınla, bekleme",
            "count": "12 servis",
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
            "label": "Mesaj broker’ı",
            "sublabel": "queue · at-least-once",
            "kind": "hub",
            "icon": "queue",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "order",
            "label": "Sipariş işçisi",
            "sublabel": "consumer group A",
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
            "label": "Faturalama işçisi",
            "sublabel": "consumer group A",
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
            "label": "Kargo işçisi",
            "sublabel": "consumer group A",
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
            "label": "noktadan noktaya",
            "tone": "green"
          },
          {
            "id": "edge-hub-order",
            "from": "hub",
            "to": "order",
            "curve": 0,
            "label": "noktadan noktaya",
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
            "body": "Her istek önce Mesaj broker’ı üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "order",
              "edge-client-hub",
              "edge-hub-order"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
            "body": "Dengeleyici noktadan noktaya kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "order",
              "billing",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-billing"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "order"
              },
              {
                "type": "nodeBadge",
                "node": "billing"
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
            "body": "Faturalama işçisi sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
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
              "order",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
            "label": "Ayakta tüketici",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Kuyruk bekleme",
            "value": "18 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Ölü mektup",
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
            "label": "noktadan noktaya",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "broker",
        "title": "Broker: decouple producer from consumer",
        "subtitle": "The queue absorbs bursts. Consumers compete for the same message.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Producers",
            "sublabel": "publish, do not wait",
            "count": "12 services",
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
            "label": "Message broker",
            "sublabel": "queue · at-least-once",
            "kind": "hub",
            "icon": "queue",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "order",
            "label": "Order worker",
            "sublabel": "consumer group A",
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
            "label": "Billing worker",
            "sublabel": "consumer group A",
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
            "label": "Shipping worker",
            "sublabel": "consumer group A",
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
            "label": "point-to-point",
            "tone": "green"
          },
          {
            "id": "edge-hub-order",
            "from": "hub",
            "to": "order",
            "curve": 0,
            "label": "point-to-point",
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
            "body": "Every request enters through Message broker first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "order",
              "edge-client-hub",
              "edge-hub-order"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
            "body": "The balancer walks its list using point-to-point. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "order",
              "billing",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-billing"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "billing",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "order"
              },
              {
                "type": "nodeBadge",
                "node": "billing"
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
            "body": "Billing worker stops answering health checks. The balancer has to notice before it sends more traffic there.",
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
              "order",
              "shipping"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-shipping"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "shipping",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
            "label": "Consumers up",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Queue wait",
            "value": "18 ms",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Dead letters",
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
            "label": "point-to-point",
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

export { BROKER_SCENES };
export default BROKER_SCENES;
