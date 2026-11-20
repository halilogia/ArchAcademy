import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const TOPOLOGY_SCENES: DiagramSceneRecord[] = [
  {
    "id": "p2p",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "p2p",
        "title": "Merkez yok, örtü ağı var",
        "subtitle": "Eşler hem istemci hem sunucudur. Anahtarın nerede olduğunu DHT söyler.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Katılan eşler",
            "count": "açık ağ",
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
            "label": "DHT örtü ağı",
            "sublabel": "key → peer routing",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "peer-a",
            "label": "Peer A",
            "sublabel": "holds shard 1",
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
            "id": "peer-b",
            "label": "Peer B",
            "sublabel": "holds shard 2",
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
            "id": "peer-c",
            "label": "Peer C",
            "sublabel": "holds shard 3",
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
            "label": "tutarlı hash",
            "tone": "green"
          },
          {
            "id": "edge-hub-peer-a",
            "from": "hub",
            "to": "peer-a",
            "curve": 0,
            "label": "tutarlı hash",
            "tone": "blue"
          },
          {
            "id": "edge-hub-peer-b",
            "from": "hub",
            "to": "peer-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-peer-c",
            "from": "hub",
            "to": "peer-c",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce DHT örtü ağı üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "peer-a",
              "edge-client-hub",
              "edge-hub-peer-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "peer-a",
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
            "body": "Dengeleyici tutarlı hash kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "peer-a",
              "peer-b",
              "peer-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-c"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "peer-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "peer-c",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "peer-a"
              },
              {
                "type": "nodeBadge",
                "node": "peer-b"
              },
              {
                "type": "nodeBadge",
                "node": "peer-c"
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
            "body": "Peer B sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "peer-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "peer-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "peer-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "peer-b",
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
              "peer-a",
              "peer-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-c"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "peer-c",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "peer-a",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "peer-c",
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
            "label": "Çevrimiçi eş",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Arama sıçraması",
            "value": "3",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Kayıp parça",
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
            "label": "tutarlı hash",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "p2p",
        "title": "No centre, an overlay",
        "subtitle": "Peers are both clients and servers. The DHT says where a key lives.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Joining peers",
            "count": "open network",
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
            "label": "DHT overlay",
            "sublabel": "key → peer routing",
            "kind": "hub",
            "icon": "network",
            "tone": "violet",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "peer-a",
            "label": "Peer A",
            "sublabel": "holds shard 1",
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
            "id": "peer-b",
            "label": "Peer B",
            "sublabel": "holds shard 2",
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
            "id": "peer-c",
            "label": "Peer C",
            "sublabel": "holds shard 3",
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
            "label": "consistent hashing",
            "tone": "green"
          },
          {
            "id": "edge-hub-peer-a",
            "from": "hub",
            "to": "peer-a",
            "curve": 0,
            "label": "consistent hashing",
            "tone": "blue"
          },
          {
            "id": "edge-hub-peer-b",
            "from": "hub",
            "to": "peer-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-peer-c",
            "from": "hub",
            "to": "peer-c",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through DHT overlay first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "peer-a",
              "edge-client-hub",
              "edge-hub-peer-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "peer-a",
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
            "body": "The balancer walks its list using consistent hashing. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "peer-a",
              "peer-b",
              "peer-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-c"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "peer-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "peer-c",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "peer-a"
              },
              {
                "type": "nodeBadge",
                "node": "peer-b"
              },
              {
                "type": "nodeBadge",
                "node": "peer-c"
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
            "body": "Peer B stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "peer-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "peer-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "peer-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "peer-b",
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
              "peer-a",
              "peer-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-peer-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-peer-c"
              },
              {
                "type": "nodeLoad",
                "node": "peer-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "peer-c",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "peer-a",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "peer-c",
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
            "label": "Peers online",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Lookup hops",
            "value": "3",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Lost shards",
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
            "label": "consistent hashing",
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
    "id": "primary-secondary",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "primary-secondary",
        "title": "Tek yazıcı, çok okuyucu",
        "subtitle": "Yazmalar primary’ye gider. Replikalar okur ve gecikmeyi kabul eder.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Uygulama sunucuları",
            "count": "okuma ağırlıklı",
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
            "label": "Primary",
            "sublabel": "writes · WAL",
            "kind": "hub",
            "icon": "database",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "replica-a",
            "label": "Replica A",
            "sublabel": "reads",
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
            "id": "replica-b",
            "label": "Replica B",
            "sublabel": "reads",
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
            "id": "replica-c",
            "label": "Replica C",
            "sublabel": "reads",
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
            "label": "asenkron replikasyon",
            "tone": "green"
          },
          {
            "id": "edge-hub-replica-a",
            "from": "hub",
            "to": "replica-a",
            "curve": 0,
            "label": "asenkron replikasyon",
            "tone": "blue"
          },
          {
            "id": "edge-hub-replica-b",
            "from": "hub",
            "to": "replica-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-replica-c",
            "from": "hub",
            "to": "replica-c",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "Tek giriş kapısı",
            "body": "Her istek önce Primary üzerinden geçer. Bu katman olmadan istemcilerin tüm sunucuları tek tek tanıması gerekirdi.",
            "tag": "Topoloji",
            "focus": [
              "client-pool",
              "hub",
              "replica-a",
              "edge-client-hub",
              "edge-hub-replica-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "replica-a",
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
            "body": "Dengeleyici asenkron replikasyon kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "replica-a",
              "replica-b",
              "replica-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-c"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "replica-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "replica-c",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "replica-a"
              },
              {
                "type": "nodeBadge",
                "node": "replica-b"
              },
              {
                "type": "nodeBadge",
                "node": "replica-c"
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
            "body": "Replica B sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "replica-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "replica-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "replica-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "replica-b",
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
              "replica-a",
              "replica-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-c"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "replica-c",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "replica-a",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "replica-c",
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
            "label": "Replika",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Replika gecikmesi",
            "value": "40 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Okuma hatası",
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
            "label": "asenkron replikasyon",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "primary-secondary",
        "title": "One writer, many readers",
        "subtitle": "Writes land on the primary. Replicas serve reads and accept lag.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "App servers",
            "count": "read heavy",
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
            "label": "Primary",
            "sublabel": "writes · WAL",
            "kind": "hub",
            "icon": "database",
            "tone": "amber",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "replica-a",
            "label": "Replica A",
            "sublabel": "reads",
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
            "id": "replica-b",
            "label": "Replica B",
            "sublabel": "reads",
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
            "id": "replica-c",
            "label": "Replica C",
            "sublabel": "reads",
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
            "label": "async replication",
            "tone": "green"
          },
          {
            "id": "edge-hub-replica-a",
            "from": "hub",
            "to": "replica-a",
            "curve": 0,
            "label": "async replication",
            "tone": "blue"
          },
          {
            "id": "edge-hub-replica-b",
            "from": "hub",
            "to": "replica-b",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-replica-c",
            "from": "hub",
            "to": "replica-c",
            "curve": 0,
            "tone": "blue"
          }
        ],
        "steps": [
          {
            "id": "front-door",
            "title": "One front door",
            "body": "Every request enters through Primary first. Without it, each client would need to know every server and failures would be invisible.",
            "tag": "Topology",
            "focus": [
              "client-pool",
              "hub",
              "replica-a",
              "edge-client-hub",
              "edge-hub-replica-a"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "replica-a",
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
            "body": "The balancer walks its list using async replication. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "replica-a",
              "replica-b",
              "replica-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-b"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-c"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "replica-b",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "replica-c",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "replica-a"
              },
              {
                "type": "nodeBadge",
                "node": "replica-b"
              },
              {
                "type": "nodeBadge",
                "node": "replica-c"
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
            "body": "Replica B stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "replica-b"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "replica-b",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "replica-b",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "replica-b",
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
              "replica-a",
              "replica-c"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-replica-a"
              },
              {
                "type": "packet",
                "edge": "edge-hub-replica-c"
              },
              {
                "type": "nodeLoad",
                "node": "replica-a",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "replica-c",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "replica-a",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "replica-c",
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
            "label": "Replicas",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Replica lag",
            "value": "40 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Read errors",
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
            "label": "async replication",
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
    "id": "serverless",
    "template": "fanout",
    "specs": {
      "tr": {
        "id": "serverless",
        "title": "Sunucu değil, fonksiyon",
        "subtitle": "Gateway istek başına fonksiyon çağırır. Soğuk başlangıç yeni p99’dur.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Olaylar",
            "count": "ani trafik",
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
            "sublabel": "invoke · auth · throttle",
            "kind": "hub",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "auth",
            "label": "fn: auth",
            "sublabel": "JWT verify",
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
            "id": "order",
            "label": "fn: order",
            "sublabel": "write path",
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
            "id": "email",
            "label": "fn: email",
            "sublabel": "async",
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
            "label": "sıfıra ölçekle",
            "tone": "green"
          },
          {
            "id": "edge-hub-auth",
            "from": "hub",
            "to": "auth",
            "curve": 0,
            "label": "sıfıra ölçekle",
            "tone": "blue"
          },
          {
            "id": "edge-hub-order",
            "from": "hub",
            "to": "order",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-email",
            "from": "hub",
            "to": "email",
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
              "auth",
              "edge-client-hub",
              "edge-hub-auth"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "auth",
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
            "body": "Dengeleyici sıfıra ölçekle kuralını uygular. Sağlıklı her düğüm payını alır; tek bir kuyruk sınırsız büyümez.",
            "tag": "Yönlendirme",
            "focus": [
              "hub",
              "auth",
              "order",
              "email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "auth"
              },
              {
                "type": "nodeBadge",
                "node": "order"
              },
              {
                "type": "nodeBadge",
                "node": "email"
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
            "body": "fn: order sağlık kontrolüne yanıt vermiyor. Dengeleyici yeni trafik göndermeden önce bunu fark etmeli.",
            "tag": "Arıza",
            "focus": [
              "hub",
              "order"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "order",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
              "auth",
              "email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "auth",
                "badge": "devralındı"
              },
              {
                "type": "nodeBadge",
                "node": "email",
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
            "label": "Hazır fonksiyon",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Soğuk başlangıç",
            "value": "820 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Kısılan",
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
            "label": "sıfıra ölçekle",
            "tone": "blue"
          },
          {
            "label": "arıza",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "serverless",
        "title": "Functions, not servers",
        "subtitle": "The gateway invokes a function per request. Cold start is the new p99.",
        "canvas": {
          "w": 960,
          "h": 520
        },
        "nodes": [
          {
            "id": "client-pool",
            "label": "Events",
            "count": "bursty traffic",
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
            "sublabel": "invoke · auth · throttle",
            "kind": "hub",
            "icon": "router",
            "tone": "blue",
            "at": {
              "x": 390,
              "y": 260
            }
          },
          {
            "id": "auth",
            "label": "fn: auth",
            "sublabel": "JWT verify",
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
            "id": "order",
            "label": "fn: order",
            "sublabel": "write path",
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
            "id": "email",
            "label": "fn: email",
            "sublabel": "async",
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
            "label": "scale to zero",
            "tone": "green"
          },
          {
            "id": "edge-hub-auth",
            "from": "hub",
            "to": "auth",
            "curve": 0,
            "label": "scale to zero",
            "tone": "blue"
          },
          {
            "id": "edge-hub-order",
            "from": "hub",
            "to": "order",
            "curve": 0,
            "tone": "blue"
          },
          {
            "id": "edge-hub-email",
            "from": "hub",
            "to": "email",
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
              "auth",
              "edge-client-hub",
              "edge-hub-auth"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-client-hub"
              },
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 94
              },
              {
                "type": "nodeBadge",
                "node": "auth",
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
            "body": "The balancer walks its list using scale to zero. Every healthy node gets a turn, so no single queue grows without bound.",
            "tag": "Routing",
            "focus": [
              "hub",
              "auth",
              "order",
              "email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "packet",
                "edge": "edge-hub-order"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 38
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 34
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 30
              },
              {
                "type": "nodeBadge",
                "node": "auth"
              },
              {
                "type": "nodeBadge",
                "node": "order"
              },
              {
                "type": "nodeBadge",
                "node": "email"
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
            "body": "fn: order stops answering health checks. The balancer has to notice before it sends more traffic there.",
            "tag": "Failure",
            "focus": [
              "hub",
              "order"
            ],
            "events": [
              {
                "type": "nodeStatus",
                "node": "order",
                "status": "down"
              },
              {
                "type": "nodeLoad",
                "node": "order",
                "load": 0
              },
              {
                "type": "nodeBadge",
                "node": "order",
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
              "auth",
              "email"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "edge-hub-auth"
              },
              {
                "type": "packet",
                "edge": "edge-hub-email"
              },
              {
                "type": "nodeLoad",
                "node": "auth",
                "load": 52
              },
              {
                "type": "nodeLoad",
                "node": "email",
                "load": 46
              },
              {
                "type": "nodeBadge",
                "node": "auth",
                "badge": "recovered"
              },
              {
                "type": "nodeBadge",
                "node": "email",
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
            "label": "Functions ready",
            "value": "3 / 3",
            "tone": "green"
          },
          {
            "id": "p95",
            "label": "Cold start",
            "value": "820 ms",
            "tone": "amber"
          },
          {
            "id": "errors",
            "label": "Throttled",
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
            "label": "scale to zero",
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

export { TOPOLOGY_SCENES };
export default TOPOLOGY_SCENES;
