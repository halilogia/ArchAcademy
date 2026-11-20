import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const UI_PATTERN_SCENES: DiagramSceneRecord[] = [
  {
    "id": "mvvm",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "mvvm",
        "title": "Callback değil, binding",
        "subtitle": "View durumu gözler. Hesaplamaz.",
        "canvas": {
          "w": 960,
          "h": 568
        },
        "nodes": [
          {
            "id": "user",
            "label": "Kullanıcı",
            "kind": "actor",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "view",
            "label": "View",
            "kind": "actor",
            "icon": "globe",
            "tone": "blue",
            "at": {
              "x": 366.66666666666663,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "vm",
            "label": "ViewModel",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 593.3333333333333,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "model",
            "label": "Model",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "user",
            "to": "view",
            "label": "dokunma",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "view",
            "to": "vm",
            "label": "komut",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "vm",
            "to": "model",
            "label": "oku / güncelle",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "model",
            "to": "vm",
            "label": "durum",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "vm",
            "to": "view",
            "label": "bildir",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "view",
            "to": "user",
            "label": "yeniden çiz",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "step-1",
            "title": "dokunma",
            "body": "Kullanıcı → View: dokunma",
            "focus": [
              "user",
              "view",
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
            "title": "komut",
            "body": "View niyeti iletir, veri sorgusu değil.",
            "focus": [
              "view",
              "vm",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "oku / güncelle",
            "body": "ViewModel → Model: oku / güncelle",
            "focus": [
              "vm",
              "model",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "durum",
            "body": "Model → ViewModel: durum",
            "focus": [
              "model",
              "vm",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "bildir",
            "body": "Yalnızca gözlenen durum değişimi render tetikler.",
            "focus": [
              "vm",
              "view",
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
            "title": "yeniden çiz",
            "body": "View → Kullanıcı: yeniden çiz",
            "focus": [
              "view",
              "user",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "bindings",
            "label": "Binding",
            "value": "12",
            "tone": "blue"
          },
          {
            "id": "logic",
            "label": "View’de mantık",
            "value": "0",
            "tone": "green"
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
        "id": "mvvm",
        "title": "Bindings, not callbacks",
        "subtitle": "The view observes state. It does not compute it.",
        "canvas": {
          "w": 960,
          "h": 568
        },
        "nodes": [
          {
            "id": "user",
            "label": "User",
            "kind": "actor",
            "icon": "user",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "view",
            "label": "View",
            "kind": "actor",
            "icon": "globe",
            "tone": "blue",
            "at": {
              "x": 366.66666666666663,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "vm",
            "label": "ViewModel",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 593.3333333333333,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "model",
            "label": "Model",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "user",
            "to": "view",
            "label": "tap",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "view",
            "to": "vm",
            "label": "command",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "vm",
            "to": "model",
            "label": "read / update",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "model",
            "to": "vm",
            "label": "state",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "vm",
            "to": "view",
            "label": "notify",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "view",
            "to": "user",
            "label": "repaint",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "step-1",
            "title": "tap",
            "body": "User → View: tap",
            "focus": [
              "user",
              "view",
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
            "title": "command",
            "body": "The view forwards intent, not a data query.",
            "focus": [
              "view",
              "vm",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "read / update",
            "body": "ViewModel → Model: read / update",
            "focus": [
              "vm",
              "model",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "state",
            "body": "Model → ViewModel: state",
            "focus": [
              "model",
              "vm",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "notify",
            "body": "Only observable state changes trigger a render.",
            "focus": [
              "vm",
              "view",
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
            "title": "repaint",
            "body": "View → User: repaint",
            "focus": [
              "view",
              "user",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "bindings",
            "label": "Bindings",
            "value": "12",
            "tone": "blue"
          },
          {
            "id": "logic",
            "label": "Logic in view",
            "value": "0",
            "tone": "green"
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
  },
  {
    "id": "spa-vs-mpa",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "spa-vs-mpa",
        "title": "Tek kabuk, çok rota",
        "subtitle": "SPA başlangıçta öder. MPA her gezinmede öder.",
        "canvas": {
          "w": 960,
          "h": 568
        },
        "nodes": [
          {
            "id": "browser",
            "label": "Tarayıcı",
            "kind": "actor",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "cdn",
            "label": "CDN",
            "kind": "actor",
            "icon": "cloud",
            "tone": "violet",
            "at": {
              "x": 366.66666666666663,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "api",
            "label": "API",
            "kind": "actor",
            "icon": "server",
            "tone": "blue",
            "at": {
              "x": 593.3333333333333,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "server",
            "label": "HTML sunucusu",
            "kind": "actor",
            "icon": "file",
            "tone": "amber",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "browser",
            "to": "cdn",
            "label": "GET /app",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "cdn",
            "to": "browser",
            "label": "HTML + JS",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "browser",
            "to": "api",
            "label": "hydrate → GET /me",
            "tone": "blue",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "browser",
            "to": "api",
            "label": "rota değişimi · fetch",
            "tone": "green",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "api",
            "to": "browser",
            "label": "JSON",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "browser",
            "to": "server",
            "label": "MPA: tam yenileme",
            "tone": "red",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Aynı URL, farklı maliyet",
            "body": "Tur sayısını say. Gerçek mimari fark budur.",
            "tag": "SPA / MPA",
            "focus": [
              "browser",
              "cdn",
              "api",
              "server"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "GET /app",
            "body": "Kabuk bir kez çekilir ve önbelleklenir.",
            "focus": [
              "browser",
              "cdn",
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
            "title": "HTML + JS",
            "body": "CDN → Tarayıcı: HTML + JS",
            "focus": [
              "cdn",
              "browser",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "hydrate → GET /me",
            "body": "Veri kabuktan sonra gelir. Layout boş duruma dayanmalı.",
            "focus": [
              "browser",
              "api",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "rota değişimi · fetch",
            "body": "SPA: doküman yeniden yüklenmez, yalnızca veri.",
            "focus": [
              "browser",
              "api",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "JSON",
            "body": "API → Tarayıcı: JSON",
            "focus": [
              "api",
              "browser",
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
            "title": "MPA: tam yenileme",
            "body": "MPA: her gezinme tüm doküman maliyetini tekrarlar.",
            "focus": [
              "browser",
              "server",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "red"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "first",
            "label": "İlk boyama",
            "value": "0.9 s",
            "tone": "amber"
          },
          {
            "id": "route",
            "label": "Rota değişimi",
            "value": "40 ms",
            "tone": "green"
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
        "id": "spa-vs-mpa",
        "title": "One shell, many routes",
        "subtitle": "SPA pays at the start. MPA pays on every navigation.",
        "canvas": {
          "w": 960,
          "h": 568
        },
        "nodes": [
          {
            "id": "browser",
            "label": "Browser",
            "kind": "actor",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 140,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "cdn",
            "label": "CDN",
            "kind": "actor",
            "icon": "cloud",
            "tone": "violet",
            "at": {
              "x": 366.66666666666663,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "api",
            "label": "API",
            "kind": "actor",
            "icon": "server",
            "tone": "blue",
            "at": {
              "x": 593.3333333333333,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "server",
            "label": "HTML server",
            "kind": "actor",
            "icon": "file",
            "tone": "amber",
            "at": {
              "x": 820,
              "y": 86
            },
            "size": {
              "w": 190,
              "h": 62
            },
            "lifeline": true
          }
        ],
        "edges": [
          {
            "id": "seq-1",
            "from": "browser",
            "to": "cdn",
            "label": "GET /app",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "cdn",
            "to": "browser",
            "label": "HTML + JS",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "browser",
            "to": "api",
            "label": "hydrate → GET /me",
            "tone": "blue",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "browser",
            "to": "api",
            "label": "route change · fetch",
            "tone": "green",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "api",
            "to": "browser",
            "label": "JSON",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "browser",
            "to": "server",
            "label": "MPA: full reload",
            "tone": "red",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Same URL, different cost",
            "body": "Count the round trips. That is the real architectural difference.",
            "tag": "SPA / MPA",
            "focus": [
              "browser",
              "cdn",
              "api",
              "server"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "GET /app",
            "body": "The shell is fetched once and cached.",
            "focus": [
              "browser",
              "cdn",
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
            "title": "HTML + JS",
            "body": "CDN → Browser: HTML + JS",
            "focus": [
              "cdn",
              "browser",
              "seq-2"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-3",
            "title": "hydrate → GET /me",
            "body": "Data arrives after the shell. Layout must survive empty state.",
            "focus": [
              "browser",
              "api",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "route change · fetch",
            "body": "SPA: no document reload, only data.",
            "focus": [
              "browser",
              "api",
              "seq-4"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "step-5",
            "title": "JSON",
            "body": "API → Browser: JSON",
            "focus": [
              "api",
              "browser",
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
            "title": "MPA: full reload",
            "body": "MPA: every navigation repeats the whole document cost.",
            "focus": [
              "browser",
              "server",
              "seq-6"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-6",
                "tone": "red"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "first",
            "label": "First paint",
            "value": "0.9 s",
            "tone": "amber"
          },
          {
            "id": "route",
            "label": "Route change",
            "value": "40 ms",
            "tone": "green"
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
  },
  {
    "id": "mvi",
    "template": "state-machine",
    "specs": {
      "tr": {
        "id": "mvi",
        "title": "Niyet girer, durum çıkar",
        "subtitle": "View niyet yayar. Durumu yalnızca reducer yazar.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "idle",
            "label": "Idle",
            "sublabel": "niyet bekler",
            "kind": "state",
            "icon": "zap",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "reducing",
            "label": "Reduce",
            "sublabel": "saf fonksiyon",
            "kind": "state",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "rendering",
            "label": "Render",
            "sublabel": "değişmez durum",
            "kind": "state",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "error",
            "label": "Error",
            "sublabel": "niyet reddedildi",
            "kind": "state",
            "icon": "shield",
            "tone": "red",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "idle",
            "to": "reducing",
            "label": "intent",
            "tone": "amber",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "reducing",
            "to": "rendering",
            "label": "yeni durum",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "rendering",
            "to": "idle",
            "label": "frame",
            "tone": "slate",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "reducing",
            "to": "error",
            "label": "geçersiz",
            "tone": "red",
            "dashed": true,
            "curve": 40
          },
          {
            "id": "transition-5",
            "from": "error",
            "to": "reducing",
            "label": "tekrar",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Bekleme",
            "body": "Niyet olmadan durum değişmez.",
            "tag": "MVI",
            "focus": [
              "idle"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "aktif"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "İndirge",
            "body": "Saf reducer eski durum ve niyeti yeni duruma eşler.",
            "focus": [
              "idle",
              "reducing"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-3",
            "title": "Çiz",
            "body": "View durumun fonksiyonudur, ikinci gerçek kaynağı değil.",
            "focus": [
              "reducing",
              "rendering"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "reducing",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-4",
            "title": "Reddet",
            "body": "Geçersiz niyet sessizce yutulmaz, açık hata durumuna geçer.",
            "tag": "Arıza",
            "focus": [
              "reducing",
              "error"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "reducing",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "state",
            "label": "Durum yazan",
            "value": "1",
            "tone": "green"
          },
          {
            "id": "side",
            "label": "Reducer’da yan etki",
            "value": "0",
            "tone": "green"
          }
        ],
        "legend": [
          {
            "label": "durum",
            "tone": "blue"
          },
          {
            "label": "geçiş",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "mvi",
        "title": "Intent in, state out",
        "subtitle": "The view emits intents. Only the reducer writes state.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "idle",
            "label": "Idle",
            "sublabel": "waiting intent",
            "kind": "state",
            "icon": "zap",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "reducing",
            "label": "Reduce",
            "sublabel": "pure function",
            "kind": "state",
            "icon": "cpu",
            "tone": "amber",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "rendering",
            "label": "Render",
            "sublabel": "immutable state",
            "kind": "state",
            "icon": "globe",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "error",
            "label": "Error",
            "sublabel": "intent rejected",
            "kind": "state",
            "icon": "shield",
            "tone": "red",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "idle",
            "to": "reducing",
            "label": "intent",
            "tone": "amber",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "reducing",
            "to": "rendering",
            "label": "new state",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "rendering",
            "to": "idle",
            "label": "frame",
            "tone": "slate",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "reducing",
            "to": "error",
            "label": "invalid",
            "tone": "red",
            "dashed": true,
            "curve": 40
          },
          {
            "id": "transition-5",
            "from": "error",
            "to": "reducing",
            "label": "retry",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Idle",
            "body": "No state changes without an intent.",
            "tag": "MVI",
            "focus": [
              "idle"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "active"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "Reduce",
            "body": "A pure reducer maps old state plus intent to new state.",
            "focus": [
              "idle",
              "reducing"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-3",
            "title": "Render",
            "body": "The view is a function of state, never a second source of truth.",
            "focus": [
              "reducing",
              "rendering"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "reducing",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-4",
            "title": "Reject",
            "body": "Invalid intents move to an explicit error state, not a silent no-op.",
            "tag": "Failure",
            "focus": [
              "reducing",
              "error"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "reducing"
              },
              {
                "type": "nodeBadge",
                "node": "rendering"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "reducing",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "state",
            "label": "State writers",
            "value": "1",
            "tone": "green"
          },
          {
            "id": "side",
            "label": "Side effects in reducer",
            "value": "0",
            "tone": "green"
          }
        ],
        "legend": [
          {
            "label": "state",
            "tone": "blue"
          },
          {
            "label": "transition",
            "tone": "green"
          }
        ]
      }
    }
  },
  {
    "id": "component-state",
    "template": "state-machine",
    "specs": {
      "tr": {
        "id": "component-state",
        "title": "Her asenkron bileşenin dört durumu var",
        "subtitle": "Bekleme, yükleniyor, başarı, hata. Dördünü de tasarla, yoksa ekran bozuk çıkar.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "idle",
            "label": "Idle",
            "kind": "state",
            "icon": "zap",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "loading",
            "label": "Yükleniyor",
            "kind": "state",
            "icon": "refresh",
            "tone": "blue",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "success",
            "label": "Başarılı",
            "kind": "state",
            "icon": "shield",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "error",
            "label": "Hata",
            "kind": "state",
            "icon": "lock",
            "tone": "red",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "idle",
            "to": "loading",
            "label": "fetch",
            "tone": "blue",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "loading",
            "to": "success",
            "label": "çözüldü",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "loading",
            "to": "error",
            "label": "reddedildi",
            "tone": "red",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "error",
            "to": "loading",
            "label": "tekrar dene",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Bekleme",
            "body": "Bileşen verisi yokken de vardır.",
            "tag": "UI",
            "focus": [
              "idle"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "aktif"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "Yükleniyor",
            "body": "Boş layout üstünde spinner değil, iskelet. Yeri ayır.",
            "focus": [
              "idle",
              "loading"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-3",
            "title": "Başarılı",
            "body": "Veri kaymayan sabit layout ile çizilir.",
            "focus": [
              "loading",
              "success"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "loading",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-4",
            "title": "Hata",
            "body": "Boş kart değil, eyleme dönük mesaj ve tekrar dene.",
            "tag": "Arıza",
            "focus": [
              "loading",
              "error"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "loading",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-3",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "states",
            "label": "Tasarlanan durum",
            "value": "4 / 4",
            "tone": "green"
          },
          {
            "id": "shift",
            "label": "CLS",
            "value": "0.01",
            "tone": "green"
          }
        ],
        "legend": [
          {
            "label": "durum",
            "tone": "blue"
          },
          {
            "label": "geçiş",
            "tone": "green"
          }
        ]
      },
      "en": {
        "id": "component-state",
        "title": "Every async component has four states",
        "subtitle": "Idle, loading, success, error. Design all four or ship a broken screen.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "idle",
            "label": "Idle",
            "kind": "state",
            "icon": "zap",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "loading",
            "label": "Loading",
            "kind": "state",
            "icon": "refresh",
            "tone": "blue",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "success",
            "label": "Success",
            "kind": "state",
            "icon": "shield",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "error",
            "label": "Error",
            "kind": "state",
            "icon": "lock",
            "tone": "red",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "idle",
            "to": "loading",
            "label": "fetch",
            "tone": "blue",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "loading",
            "to": "success",
            "label": "resolve",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "loading",
            "to": "error",
            "label": "reject",
            "tone": "red",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "error",
            "to": "loading",
            "label": "retry",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Idle",
            "body": "The component exists before it has data.",
            "tag": "UI",
            "focus": [
              "idle"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "active"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "Loading",
            "body": "Skeleton, not a spinner over empty layout. Reserve the space.",
            "focus": [
              "idle",
              "loading"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "idle",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-1",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-3",
            "title": "Success",
            "body": "Data rendered with a stable layout and no shift.",
            "focus": [
              "loading",
              "success"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "loading",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-2",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-4",
            "title": "Error",
            "body": "An actionable message and a retry, not a blank card.",
            "tag": "Failure",
            "focus": [
              "loading",
              "error"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "idle"
              },
              {
                "type": "nodeBadge",
                "node": "loading"
              },
              {
                "type": "nodeBadge",
                "node": "success"
              },
              {
                "type": "nodeBadge",
                "node": "error"
              },
              {
                "type": "nodeBadge",
                "node": "loading",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-3",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "states",
            "label": "States designed",
            "value": "4 / 4",
            "tone": "green"
          },
          {
            "id": "shift",
            "label": "CLS",
            "value": "0.01",
            "tone": "green"
          }
        ],
        "legend": [
          {
            "label": "state",
            "tone": "blue"
          },
          {
            "label": "transition",
            "tone": "green"
          }
        ]
      }
    }
  }
];

export { UI_PATTERN_SCENES };
export default UI_PATTERN_SCENES;
