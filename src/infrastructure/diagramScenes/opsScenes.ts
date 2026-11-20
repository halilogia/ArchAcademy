import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const OPS_SCENES: DiagramSceneRecord[] = [
  {
    "id": "llm-ops",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "llm-ops",
        "title": "Prompt dağıtılan bir çıktıdır",
        "subtitle": "Sürümle, değerlendir, gözle; yoksa üretimde tahmin ediyorsun.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "prompt",
            "label": "Prompt",
            "kind": "service",
            "icon": "file",
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
            "id": "eval",
            "label": "Değerlendirme",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
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
            "id": "deploy",
            "label": "Dağıtım",
            "kind": "service",
            "icon": "cloud",
            "tone": "violet",
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
            "id": "observe",
            "label": "Gözlem",
            "kind": "service",
            "icon": "cpu",
            "tone": "green",
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
            "id": "feedback",
            "label": "Geri bildirim",
            "kind": "service",
            "icon": "refresh",
            "tone": "slate",
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
            "from": "prompt",
            "to": "eval",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "eval",
            "to": "deploy",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "deploy",
            "to": "observe",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "observe",
            "to": "feedback",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "observe",
            "to": "prompt",
            "label": "kayma",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Prompt’u sabitle",
            "body": "Model, sıcaklık ve prompt tek sürüm olarak birlikte hareket eder.",
            "tag": "LLMOps",
            "focus": [
              "prompt"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "prompt",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Dağıtmadan değerlendir",
            "body": "Sabit değerlendirme seti, demoyu asla yakalamayacağı gerilemeleri yakalar.",
            "focus": [
              "prompt",
              "eval"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "prompt"
              },
              {
                "type": "nodeBadge",
                "node": "eval",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Big bang değil canary",
            "body": "Trafiğin bir kısmını ayır; maliyet, gecikme ve kaliteyi karşılaştır.",
            "focus": [
              "eval",
              "deploy"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "eval"
              },
              {
                "type": "nodeBadge",
                "node": "deploy",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Gerçek konuşmaları gözle",
            "body": "Token, ret ve araç hatası üretim metrikleridir.",
            "focus": [
              "deploy",
              "observe"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "deploy"
              },
              {
                "type": "nodeBadge",
                "node": "observe",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Hataları geri besle",
            "body": "Her kötü yanıt bir değerlendirme vakası olur. Döngü budur.",
            "tag": "Döngü",
            "focus": [
              "observe",
              "feedback"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "observe"
              },
              {
                "type": "nodeBadge",
                "node": "feedback",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "eval",
            "label": "Değerlendirme",
            "value": "94%",
            "tone": "green"
          },
          {
            "id": "cost",
            "label": "Maliyet / 1k",
            "value": "$1.20",
            "tone": "amber"
          }
        ]
      },
      "en": {
        "id": "llm-ops",
        "title": "A prompt is a deployed artifact",
        "subtitle": "Version it, evaluate it, observe it, or you are guessing in production.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "prompt",
            "label": "Prompt",
            "kind": "service",
            "icon": "file",
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
            "id": "eval",
            "label": "Eval set",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
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
            "id": "deploy",
            "label": "Deploy",
            "kind": "service",
            "icon": "cloud",
            "tone": "violet",
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
            "id": "observe",
            "label": "Observe",
            "kind": "service",
            "icon": "cpu",
            "tone": "green",
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
            "id": "feedback",
            "label": "Feedback",
            "kind": "service",
            "icon": "refresh",
            "tone": "slate",
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
            "from": "prompt",
            "to": "eval",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "eval",
            "to": "deploy",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "deploy",
            "to": "observe",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "observe",
            "to": "feedback",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "observe",
            "to": "prompt",
            "label": "drift",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Pin the prompt",
            "body": "Model, temperature and prompt travel together as one version.",
            "tag": "LLMOps",
            "focus": [
              "prompt"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "prompt",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Evaluate before shipping",
            "body": "A fixed eval set catches regressions a demo never will.",
            "focus": [
              "prompt",
              "eval"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "prompt"
              },
              {
                "type": "nodeBadge",
                "node": "eval",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Canary, not big bang",
            "body": "Route a slice of traffic and compare cost, latency and quality.",
            "focus": [
              "eval",
              "deploy"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "eval"
              },
              {
                "type": "nodeBadge",
                "node": "deploy",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Observe real conversations",
            "body": "Tokens, refusals and tool errors are production metrics.",
            "focus": [
              "deploy",
              "observe"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "deploy"
              },
              {
                "type": "nodeBadge",
                "node": "observe",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Feed failures back",
            "body": "Every bad answer becomes an eval case. That is the loop.",
            "tag": "Loop",
            "focus": [
              "observe",
              "feedback"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "observe"
              },
              {
                "type": "nodeBadge",
                "node": "feedback",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "eval",
            "label": "Eval pass",
            "value": "94%",
            "tone": "green"
          },
          {
            "id": "cost",
            "label": "Cost / 1k",
            "value": "$1.20",
            "tone": "amber"
          }
        ]
      }
    }
  },
  {
    "id": "docs-annotations",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "docs-annotations",
        "title": "Karar bir kayda dönüşür",
        "subtitle": "ADR neden’i, C4 nerede’yi, diyagram nasıl’ı söyler.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "change",
            "label": "Değişiklik",
            "kind": "service",
            "icon": "network",
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
            "id": "adr",
            "label": "ADR",
            "kind": "service",
            "icon": "file",
            "tone": "amber",
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
            "id": "c4",
            "label": "C4",
            "kind": "service",
            "icon": "layers",
            "tone": "violet",
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
            "id": "diagram",
            "label": "Diyagram",
            "kind": "service",
            "icon": "network",
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
            "id": "review",
            "label": "İnceleme",
            "kind": "service",
            "icon": "shield",
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
            "from": "change",
            "to": "adr",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "adr",
            "to": "c4",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "c4",
            "to": "diagram",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "diagram",
            "to": "review",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "review",
            "to": "change",
            "label": "reddet",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Değişikliğin bir sebebi olmalı",
            "body": "Ödünleşimi kimse söyleyemiyorsa değişiklik hazır değildir.",
            "tag": "Docs",
            "focus": [
              "change"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "change",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Kararı kaydet",
            "body": "Bağlam, seçenekler, karar, sonuçlar. Tek sayfa, değişmez.",
            "focus": [
              "change",
              "adr"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "change"
              },
              {
                "type": "nodeBadge",
                "node": "adr",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Modelde yerleştir",
            "body": "C4 seviye 1 ve 2, kararın hangi konteynere dokunduğunu gösterir.",
            "focus": [
              "adr",
              "c4"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "adr"
              },
              {
                "type": "nodeBadge",
                "node": "c4",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Yalnızca değişeni çiz",
            "body": "Her detayı yansıtan diyagram cumaya kalmaz bayatlar.",
            "focus": [
              "c4",
              "diagram"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "c4"
              },
              {
                "type": "nodeBadge",
                "node": "diagram",
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
            "title": "İnceleme üçünü bağlar",
            "body": "İnceleyici kod, ADR ve diyagramın uyuştuğunu kontrol eder. Sapma hatadır.",
            "focus": [
              "diagram",
              "review"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "diagram"
              },
              {
                "type": "nodeBadge",
                "node": "review",
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
            "id": "adrs",
            "label": "ADR",
            "value": "12",
            "tone": "blue"
          },
          {
            "id": "stale",
            "label": "Bayat diyagram",
            "value": "0",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "docs-annotations",
        "title": "A decision becomes a record",
        "subtitle": "The ADR says why. The C4 model says where. The diagram says how.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "change",
            "label": "Change",
            "kind": "service",
            "icon": "network",
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
            "id": "adr",
            "label": "ADR",
            "kind": "service",
            "icon": "file",
            "tone": "amber",
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
            "id": "c4",
            "label": "C4",
            "kind": "service",
            "icon": "layers",
            "tone": "violet",
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
            "id": "diagram",
            "label": "Diagram",
            "kind": "service",
            "icon": "network",
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
            "id": "review",
            "label": "Review",
            "kind": "service",
            "icon": "shield",
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
            "from": "change",
            "to": "adr",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "adr",
            "to": "c4",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "c4",
            "to": "diagram",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "diagram",
            "to": "review",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "review",
            "to": "change",
            "label": "reject",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "A change needs a reason",
            "body": "If nobody can state the trade-off, the change is not ready.",
            "tag": "Docs",
            "focus": [
              "change"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "change",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Capture the decision",
            "body": "Context, options, decision, consequences. One page, immutable.",
            "focus": [
              "change",
              "adr"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "change"
              },
              {
                "type": "nodeBadge",
                "node": "adr",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Place it in the model",
            "body": "C4 level 1 and 2 show which container the decision touches.",
            "focus": [
              "adr",
              "c4"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "adr"
              },
              {
                "type": "nodeBadge",
                "node": "c4",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Draw only what changed",
            "body": "A diagram that mirrors every detail is stale by Friday.",
            "focus": [
              "c4",
              "diagram"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "c4"
              },
              {
                "type": "nodeBadge",
                "node": "diagram",
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
            "title": "Review links the three",
            "body": "A reviewer checks code, ADR and diagram agree. Drift is a bug.",
            "focus": [
              "diagram",
              "review"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "diagram"
              },
              {
                "type": "nodeBadge",
                "node": "review",
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
            "id": "adrs",
            "label": "ADR",
            "value": "12",
            "tone": "blue"
          },
          {
            "id": "stale",
            "label": "Stale diagrams",
            "value": "0",
            "tone": "green"
          }
        ]
      }
    }
  },
  {
    "id": "refactoring",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "refactoring",
        "title": "Güvenlik ağıyla ameliyat",
        "subtitle": "Refactor yapıyı değiştirir, davranışı asla. Testler bunu kanıtlar.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "detect",
            "label": "Tespit",
            "kind": "service",
            "icon": "zap",
            "tone": "red",
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
            "id": "cover",
            "label": "Kapsa",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
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
            "id": "refactor",
            "label": "Refactor",
            "kind": "service",
            "icon": "layers",
            "tone": "blue",
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
            "id": "verify",
            "label": "Doğrula",
            "kind": "service",
            "icon": "cpu",
            "tone": "green",
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
            "id": "ship",
            "label": "Yayınla",
            "kind": "service",
            "icon": "cloud",
            "tone": "slate",
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
            "from": "detect",
            "to": "cover",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "cover",
            "to": "refactor",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "refactor",
            "to": "verify",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "verify",
            "to": "ship",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "verify",
            "to": "refactor",
            "label": "kırmızı",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Kokuyu adlandır",
            "body": "“Dağınık hissettiriyor” bulgu değildir. “Fiyat kuralı üç dosyada kopyalanmış” bulgudur.",
            "tag": "Bulgu",
            "focus": [
              "detect"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "detect",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Önce güvenlik ağını yaz",
            "body": "Karakterizasyon testleri mevcut davranışı, çirkin kısımlar dahil sabitler.",
            "focus": [
              "detect",
              "cover"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "detect"
              },
              {
                "type": "nodeBadge",
                "node": "cover",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Küçük, geri alınabilir adımlar",
            "body": "Yeniden adlandır, çıkar, birleştir. Her adım derlenir ve testler yeşil kalır.",
            "focus": [
              "cover",
              "refactor"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "cover"
              },
              {
                "type": "nodeBadge",
                "node": "refactor",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Davranışı doğrula",
            "body": "Test kırmızıya dönerse adımı geri al. Testi “düzeltme”.",
            "focus": [
              "refactor",
              "verify"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "verify",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Dilimler hâlinde yayınla",
            "body": "40 dosyalık refactor sürüm riskidir. On tane 4 dosyalık refactor değildir.",
            "focus": [
              "verify",
              "ship"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "verify"
              },
              {
                "type": "nodeBadge",
                "node": "ship",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "tests",
            "label": "Eklenen test",
            "value": "9",
            "tone": "green"
          },
          {
            "id": "behaviour",
            "label": "Davranış değişimi",
            "value": "0",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "refactoring",
        "title": "Surgery with a safety net",
        "subtitle": "Refactoring changes structure, never behaviour. The tests prove it.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "detect",
            "label": "Detect",
            "kind": "service",
            "icon": "zap",
            "tone": "red",
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
            "id": "cover",
            "label": "Cover",
            "kind": "service",
            "icon": "shield",
            "tone": "amber",
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
            "id": "refactor",
            "label": "Refactor",
            "kind": "service",
            "icon": "layers",
            "tone": "blue",
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
            "id": "verify",
            "label": "Verify",
            "kind": "service",
            "icon": "cpu",
            "tone": "green",
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
            "id": "ship",
            "label": "Ship",
            "kind": "service",
            "icon": "cloud",
            "tone": "slate",
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
            "from": "detect",
            "to": "cover",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "cover",
            "to": "refactor",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "refactor",
            "to": "verify",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "verify",
            "to": "ship",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "verify",
            "to": "refactor",
            "label": "red",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Name the smell",
            "body": "“It feels messy” is not a finding. “Duplicated pricing rule in three files” is.",
            "tag": "Finding",
            "focus": [
              "detect"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "detect",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Write the safety net first",
            "body": "Characterisation tests pin current behaviour, including the ugly parts.",
            "focus": [
              "detect",
              "cover"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "detect"
              },
              {
                "type": "nodeBadge",
                "node": "cover",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Small, reversible steps",
            "body": "Rename, extract, inline. Each step compiles and keeps tests green.",
            "focus": [
              "cover",
              "refactor"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "cover"
              },
              {
                "type": "nodeBadge",
                "node": "refactor",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-2",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-4",
            "title": "Verify behaviour",
            "body": "If a test goes red, revert the step. Do not “fix” the test.",
            "focus": [
              "refactor",
              "verify"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "verify",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Ship in slices",
            "body": "A 40-file refactor is a release risk. Ten 4-file refactors are not.",
            "focus": [
              "verify",
              "ship"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "verify"
              },
              {
                "type": "nodeBadge",
                "node": "ship",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "tests",
            "label": "Tests added",
            "value": "9",
            "tone": "green"
          },
          {
            "id": "behaviour",
            "label": "Behaviour change",
            "value": "0",
            "tone": "green"
          }
        ]
      }
    }
  }
];

export { OPS_SCENES };
export default OPS_SCENES;
