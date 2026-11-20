import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const EVENT_SOURCING_SCENES: DiagramSceneRecord[] = [
  {
    "id": "event-sourcing",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "event-sourcing",
        "title": "Olayı ekle, görünümü türet",
        "subtitle": "Hiçbir şey yerinde güncellenmez. Sepet, olaylarının tekrar oynatımıdır.",
        "canvas": {
          "w": 960,
          "h": 624
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "command",
            "label": "Komut",
            "kind": "actor",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 310,
              "y": 86
            },
            "size": {
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "store",
            "label": "Olay deposu",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 480,
              "y": 86
            },
            "size": {
              "w": 158,
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
              "x": 650,
              "y": 86
            },
            "size": {
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "read",
            "label": "Okuma modeli",
            "kind": "actor",
            "icon": "layers",
            "tone": "green",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 158,
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
            "label": "AddItem(sku-42)",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "command",
            "to": "store",
            "label": "append ItemAdded v7",
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
            "from": "store",
            "to": "projector",
            "label": "stream cart-42",
            "tone": "amber",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "projector",
            "to": "read",
            "label": "cart = 3 items",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "client",
            "to": "read",
            "label": "GET /cart",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "read",
            "to": "client",
            "label": "200 · cart v7",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 522
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Satır değil, olgu",
            "body": "Olay ne olduğunu söyler. Mevcut durumun ne olması gerektiğini söylemez.",
            "tag": "Model",
            "focus": [
              "client",
              "command",
              "store",
              "projector",
              "read"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "AddItem(sku-42)",
            "body": "Komut mevcut akışa göre doğrulanır.",
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
            "title": "append ItemAdded v7",
            "body": "Ekleme commit’tir. 7. sürüm artık değişmez.",
            "focus": [
              "command",
              "store",
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
            "body": "Yazma tek bir satır güncellemeden başarılı oldu.",
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
            "title": "stream cart-42",
            "body": "Yansıtıcı akışı sırayla okur ve katlar.",
            "focus": [
              "store",
              "projector",
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
            "title": "cart = 3 items",
            "body": "Görünüm harcanabilir: sil ve sıfırdan tekrar oynat.",
            "focus": [
              "projector",
              "read",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "GET /cart",
            "body": "Üretimde okumalar olay akışını taramaz.",
            "focus": [
              "client",
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
            "title": "200 · cart v7",
            "body": "Yanıt, kendisini üreten sürümü de taşır.",
            "focus": [
              "read",
              "client",
              "seq-7"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-7",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "events",
            "label": "Saklanan olay",
            "value": "2.4 M",
            "tone": "violet"
          },
          {
            "id": "replay",
            "label": "Tam replay",
            "value": "38 s",
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
        "id": "event-sourcing",
        "title": "Append the fact, derive the view",
        "subtitle": "Nothing is updated in place. The cart is a replay of its events.",
        "canvas": {
          "w": 960,
          "h": 624
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "command",
            "label": "Command",
            "kind": "actor",
            "icon": "zap",
            "tone": "blue",
            "at": {
              "x": 310,
              "y": 86
            },
            "size": {
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "store",
            "label": "Event store",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 480,
              "y": 86
            },
            "size": {
              "w": 158,
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
              "x": 650,
              "y": 86
            },
            "size": {
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "read",
            "label": "Read model",
            "kind": "actor",
            "icon": "layers",
            "tone": "green",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 158,
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
            "label": "AddItem(sku-42)",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "command",
            "to": "store",
            "label": "append ItemAdded v7",
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
            "from": "store",
            "to": "projector",
            "label": "stream cart-42",
            "tone": "amber",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "projector",
            "to": "read",
            "label": "cart = 3 items",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "client",
            "to": "read",
            "label": "GET /cart",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "read",
            "to": "client",
            "label": "200 · cart v7",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 522
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Facts, not rows",
            "body": "An event says what happened. It never says what the current state should be.",
            "tag": "Model",
            "focus": [
              "client",
              "command",
              "store",
              "projector",
              "read"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "AddItem(sku-42)",
            "body": "The command is validated against the current stream.",
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
            "title": "append ItemAdded v7",
            "body": "The append is the commit. Version 7 is now immutable.",
            "focus": [
              "command",
              "store",
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
            "body": "The write succeeded without updating a single row.",
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
            "title": "stream cart-42",
            "body": "A projector reads the stream in order and folds it.",
            "focus": [
              "store",
              "projector",
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
            "title": "cart = 3 items",
            "body": "The view is disposable: delete it and replay from zero.",
            "focus": [
              "projector",
              "read",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "GET /cart",
            "body": "Reads never scan the event stream in production.",
            "focus": [
              "client",
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
            "title": "200 · cart v7",
            "body": "The answer includes the version that produced it.",
            "focus": [
              "read",
              "client",
              "seq-7"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-7",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "events",
            "label": "Events stored",
            "value": "2.4 M",
            "tone": "violet"
          },
          {
            "id": "replay",
            "label": "Full replay",
            "value": "38 s",
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

export { EVENT_SOURCING_SCENES };
export default EVENT_SOURCING_SCENES;
