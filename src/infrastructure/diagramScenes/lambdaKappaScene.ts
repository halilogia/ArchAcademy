import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const LAMBDA_KAPPA_SCENES: DiagramSceneRecord[] = [
  {
    "id": "lambda-kappa",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "lambda-kappa",
        "title": "Lambda ve Kappa tek logu paylaşır",
        "subtitle": "Değişmez log omurgadır. Hız, toplu işlem ve replay birer okuyucudur.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "ingest",
            "label": "Alım",
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
            "id": "log",
            "label": "Değişmez log",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
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
            "id": "speed",
            "label": "Hız katmanı",
            "kind": "service",
            "icon": "zap",
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
            "id": "batch",
            "label": "Toplu katman",
            "kind": "service",
            "icon": "cpu",
            "tone": "blue",
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
            "id": "serving",
            "label": "Sunum görünümü",
            "kind": "service",
            "icon": "layers",
            "tone": "green",
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
            "from": "ingest",
            "to": "log",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "log",
            "to": "speed",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "speed",
            "to": "batch",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "batch",
            "to": "serving",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "speed",
            "to": "serving",
            "label": "birleştir",
            "tone": "green",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Her şey bir eklemedir",
            "body": "Olaylar bir kez girer ve asla değişmez. Log sırayı korur.",
            "tag": "Alım",
            "focus": [
              "ingest"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ingest",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Log omurgadır",
            "body": "İki katman aynı baytları okur; tarih konusunda çelişemezler.",
            "focus": [
              "ingest",
              "log"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ingest"
              },
              {
                "type": "nodeBadge",
                "node": "log",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Hız şimdi yanıtlar",
            "body": "Akış agregasyonu düşük gecikme için kesinlikten ödün verir.",
            "tag": "Lambda",
            "focus": [
              "log",
              "speed"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "log"
              },
              {
                "type": "nodeBadge",
                "node": "speed",
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
            "title": "Toplu iş geçmişi onarır",
            "body": "Gece işi tüm log üzerinde gerçeği yeniden hesaplar.",
            "focus": [
              "speed",
              "batch"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "speed"
              },
              {
                "type": "nodeBadge",
                "node": "batch",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Sunum ikisini birleştirir",
            "body": "Sorgular toplu gerçeği ve son hız farklarını okur.",
            "focus": [
              "batch",
              "serving"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "batch"
              },
              {
                "type": "nodeBadge",
                "node": "serving",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "lag",
            "label": "Hız gecikmesi",
            "value": "400 ms",
            "tone": "amber"
          },
          {
            "id": "batch",
            "label": "Toplu pencere",
            "value": "24 h",
            "tone": "blue"
          },
          {
            "id": "loss",
            "label": "Replay kaybı",
            "value": "0",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "lambda-kappa",
        "title": "Lambda and Kappa share one log",
        "subtitle": "The immutable log is the spine. Speed, batch and replay are readers.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "ingest",
            "label": "Ingest",
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
            "id": "log",
            "label": "Immutable log",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
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
            "id": "speed",
            "label": "Speed layer",
            "kind": "service",
            "icon": "zap",
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
            "id": "batch",
            "label": "Batch layer",
            "kind": "service",
            "icon": "cpu",
            "tone": "blue",
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
            "id": "serving",
            "label": "Serving view",
            "kind": "service",
            "icon": "layers",
            "tone": "green",
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
            "from": "ingest",
            "to": "log",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "log",
            "to": "speed",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "speed",
            "to": "batch",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "batch",
            "to": "serving",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "speed",
            "to": "serving",
            "label": "merge",
            "tone": "green",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Everything is an append",
            "body": "Events enter once and are never mutated. The log keeps order.",
            "tag": "Ingest",
            "focus": [
              "ingest"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ingest",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "The log is the spine",
            "body": "Both layers read the same bytes, so they cannot disagree about history.",
            "focus": [
              "ingest",
              "log"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ingest"
              },
              {
                "type": "nodeBadge",
                "node": "log",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Speed answers now",
            "body": "Streaming aggregation trades exactness for low latency.",
            "tag": "Lambda",
            "focus": [
              "log",
              "speed"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "log"
              },
              {
                "type": "nodeBadge",
                "node": "speed",
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
            "title": "Batch repairs the past",
            "body": "A nightly job recomputes the truth over the whole log.",
            "focus": [
              "speed",
              "batch"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "speed"
              },
              {
                "type": "nodeBadge",
                "node": "batch",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Serving merges both",
            "body": "Queries read batch truth plus recent speed deltas.",
            "focus": [
              "batch",
              "serving"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "batch"
              },
              {
                "type": "nodeBadge",
                "node": "serving",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "lag",
            "label": "Speed lag",
            "value": "400 ms",
            "tone": "amber"
          },
          {
            "id": "batch",
            "label": "Batch window",
            "value": "24 h",
            "tone": "blue"
          },
          {
            "id": "loss",
            "label": "Replay loss",
            "value": "0",
            "tone": "green"
          }
        ]
      }
    }
  }
];

export { LAMBDA_KAPPA_SCENES };
export default LAMBDA_KAPPA_SCENES;
