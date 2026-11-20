import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const CQRS_SCENES: DiagramSceneRecord[] = [
  {
    "id": "cqrs",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "cqrs",
        "title": "Aynı istek, farklı modeller",
        "subtitle": "Komutlar durumu değiştirir. Sorgular projeksiyonu okur. Biri diğerini beklemez.",
        "canvas": {
          "w": 960,
          "h": 680
        },
        "nodes": [
          {
            "id": "client",
            "label": "İstemci",
            "kind": "actor",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "command",
            "label": "Command API",
            "kind": "actor",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 276,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "write",
            "label": "Yazma DB",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 412,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "bus",
            "label": "Olay veriyolu",
            "kind": "actor",
            "icon": "queue",
            "tone": "amber",
            "at": {
              "x": 548,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "projector",
            "label": "Projector",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 684,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "read",
            "label": "Okuma DB",
            "kind": "actor",
            "icon": "layers",
            "tone": "green",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "client",
            "to": "command",
            "label": "PlaceOrder",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "command",
            "to": "write",
            "label": "BEGIN · validate",
            "tone": "violet",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "command",
            "to": "client",
            "label": "202 Accepted",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "write",
            "to": "bus",
            "label": "OrderPlaced",
            "tone": "amber",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "bus",
            "to": "projector",
            "label": "OrderPlaced",
            "tone": "amber",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "projector",
            "to": "read",
            "label": "upsert order_view",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "client",
            "to": "read",
            "label": "GET /orders",
            "tone": "green",
            "route": "sequence",
            "lane": 522
          },
          {
            "id": "seq-8",
            "from": "read",
            "to": "client",
            "label": "200 · DTO",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 578
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "İki yol, tek gerçek",
            "body": "Yazma modeli değişmezleri korur. Okuma modeli soruları hızlı yanıtlar.",
            "tag": "CQRS",
            "focus": [
              "client",
              "command",
              "write",
              "bus",
              "projector",
              "read"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "PlaceOrder",
            "body": "Komut bir niyet adlandırır, veritabanı satırı değil.",
            "focus": [
              "client",
              "command",
              "seq-1"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-1"
              }
            ]
          },
          {
            "id": "step-2",
            "title": "BEGIN · validate",
            "body": "Aggregate kabul etmeden önce stok ve ödemeyi doğrular.",
            "focus": [
              "command",
              "write",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "202 Accepted",
            "body": "Yazma yolu bitti. Projeksiyonları beklemez.",
            "focus": [
              "command",
              "client",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "OrderPlaced",
            "body": "Durum değişikliği ortak tablo değil, olay olarak yayınlanır.",
            "focus": [
              "write",
              "bus",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "OrderPlaced",
            "body": "Projeksiyon asenkrondur. Gecikme beklenir, hata değildir.",
            "focus": [
              "bus",
              "projector",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "upsert order_view",
            "body": "Okuma modeli yazma için değil, ekran için şekillenir.",
            "focus": [
              "projector",
              "read",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-7",
            "title": "GET /orders",
            "body": "Sorgular yazma veritabanına hiç dokunmaz.",
            "focus": [
              "client",
              "read",
              "seq-7"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-7",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-8",
            "title": "200 · DTO",
            "body": "Tek indeksli okuma, sınırlı bağlamlar arası join yok.",
            "focus": [
              "read",
              "client",
              "seq-8"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-8",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "ratio",
            "label": "Okuma : yazma",
            "value": "100 : 1",
            "tone": "blue"
          },
          {
            "id": "lag",
            "label": "Projeksiyon gecikmesi",
            "value": "120 ms",
            "tone": "amber"
          }
        ],
        "legend": [
          {
            "label": "istek",
            "tone": "blue"
          },
          {
            "label": "yanıt",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "cqrs",
        "title": "Same request, different models",
        "subtitle": "Commands change state. Queries read a projection. Neither waits for the other.",
        "canvas": {
          "w": 960,
          "h": 680
        },
        "nodes": [
          {
            "id": "client",
            "label": "Client",
            "kind": "actor",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "command",
            "label": "Command API",
            "kind": "actor",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 276,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "write",
            "label": "Write DB",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 412,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "bus",
            "label": "Event bus",
            "kind": "actor",
            "icon": "queue",
            "tone": "amber",
            "at": {
              "x": 548,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "projector",
            "label": "Projector",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 684,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "read",
            "label": "Read DB",
            "kind": "actor",
            "icon": "layers",
            "tone": "green",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 124,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "client",
            "to": "command",
            "label": "PlaceOrder",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "command",
            "to": "write",
            "label": "BEGIN · validate",
            "tone": "violet",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "command",
            "to": "client",
            "label": "202 Accepted",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "write",
            "to": "bus",
            "label": "OrderPlaced",
            "tone": "amber",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "bus",
            "to": "projector",
            "label": "OrderPlaced",
            "tone": "amber",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "projector",
            "to": "read",
            "label": "upsert order_view",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "client",
            "to": "read",
            "label": "GET /orders",
            "tone": "green",
            "route": "sequence",
            "lane": 522
          },
          {
            "id": "seq-8",
            "from": "read",
            "to": "client",
            "label": "200 · DTO",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 578
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Two paths, one truth",
            "body": "The write model protects invariants. The read model answers questions fast.",
            "tag": "CQRS",
            "focus": [
              "client",
              "command",
              "write",
              "bus",
              "projector",
              "read"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "PlaceOrder",
            "body": "A command names an intention, never a database row.",
            "focus": [
              "client",
              "command",
              "seq-1"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-1"
              }
            ]
          },
          {
            "id": "step-2",
            "title": "BEGIN · validate",
            "body": "The aggregate checks stock and payment before accepting.",
            "focus": [
              "command",
              "write",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "202 Accepted",
            "body": "The write path is done. It does not wait for projections.",
            "focus": [
              "command",
              "client",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "OrderPlaced",
            "body": "The state change is published as an event, not a shared table.",
            "focus": [
              "write",
              "bus",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "OrderPlaced",
            "body": "Projection is asynchronous. Lag is expected, not a bug.",
            "focus": [
              "bus",
              "projector",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "upsert order_view",
            "body": "The read model is shaped for the screen, not for writes.",
            "focus": [
              "projector",
              "read",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-7",
            "title": "GET /orders",
            "body": "Queries never touch the write database.",
            "focus": [
              "client",
              "read",
              "seq-7"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-7",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-8",
            "title": "200 · DTO",
            "body": "One indexed read, no join across bounded contexts.",
            "focus": [
              "read",
              "client",
              "seq-8"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-8",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "ratio",
            "label": "Read : write",
            "value": "100 : 1",
            "tone": "blue"
          },
          {
            "id": "lag",
            "label": "Projection lag",
            "value": "120 ms",
            "tone": "amber"
          }
        ],
        "legend": [
          {
            "label": "request",
            "tone": "blue"
          },
          {
            "label": "response",
            "tone": "green"
          }
        ]
      }
    }
  }
];

export { CQRS_SCENES };
export default CQRS_SCENES;
