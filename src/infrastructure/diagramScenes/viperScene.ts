import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const VIPER_SCENES: DiagramSceneRecord[] = [
  {
    "id": "viper",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "viper",
        "title": "Tek ekran, beş sorumluluk",
        "subtitle": "View çizer, Presenter karar verir, Interactor yapar, Entity tutar, Router taşır.",
        "canvas": {
          "w": 960,
          "h": 680
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
              "w": 124,
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
            "id": "presenter",
            "label": "Presenter",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
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
            "id": "interactor",
            "label": "Interactor",
            "kind": "actor",
            "icon": "zap",
            "tone": "violet",
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
            "id": "entity",
            "label": "Entity",
            "kind": "actor",
            "icon": "box",
            "tone": "violet",
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
            "id": "router",
            "label": "Router",
            "kind": "actor",
            "icon": "router",
            "tone": "slate",
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
            "from": "user",
            "to": "view",
            "label": "dokunma",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "view",
            "to": "presenter",
            "label": "olay",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "presenter",
            "to": "interactor",
            "label": "kullanıcıyı getir",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "interactor",
            "to": "entity",
            "label": "sorgu",
            "tone": "violet",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "entity",
            "to": "interactor",
            "label": "model",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "interactor",
            "to": "presenter",
            "label": "sonuç",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "presenter",
            "to": "view",
            "label": "view model",
            "tone": "green",
            "route": "sequence",
            "lane": 522
          },
          {
            "id": "seq-8",
            "from": "presenter",
            "to": "router",
            "label": "yönlendir",
            "tone": "slate",
            "route": "sequence",
            "lane": 578
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Modül bir ekrandır",
            "body": "VIPER tek ekranı beş test edilebilir parçaya böler.",
            "tag": "VIPER",
            "focus": [
              "user",
              "view",
              "presenter",
              "interactor",
              "entity",
              "router"
            ],
            "events": []
          },
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
            "title": "olay",
            "body": "View ne olduğunu iletir, ne yapılacağını değil.",
            "focus": [
              "view",
              "presenter",
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
            "title": "kullanıcıyı getir",
            "body": "Presenter → Interactor: kullanıcıyı getir",
            "focus": [
              "presenter",
              "interactor",
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
            "title": "sorgu",
            "body": "Interactor → Entity: sorgu",
            "focus": [
              "interactor",
              "entity",
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
            "title": "model",
            "body": "Entity → Interactor: model",
            "focus": [
              "entity",
              "interactor",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "sonuç",
            "body": "Interactor domain model döner, view model değil.",
            "focus": [
              "interactor",
              "presenter",
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
            "title": "view model",
            "body": "Biçimlendirme ve metin presenter’dadır.",
            "focus": [
              "presenter",
              "view",
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
            "title": "yönlendir",
            "body": "Sonraki modülü yalnızca router bilir.",
            "focus": [
              "presenter",
              "router",
              "seq-8"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-8",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "parts",
            "label": "Test edilebilir parça",
            "value": "5",
            "tone": "green"
          },
          {
            "id": "ui",
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
        "id": "viper",
        "title": "One screen, five responsibilities",
        "subtitle": "View draws, Presenter decides, Interactor does, Entity holds, Router moves.",
        "canvas": {
          "w": 960,
          "h": 680
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
              "w": 124,
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
            "id": "presenter",
            "label": "Presenter",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
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
            "id": "interactor",
            "label": "Interactor",
            "kind": "actor",
            "icon": "zap",
            "tone": "violet",
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
            "id": "entity",
            "label": "Entity",
            "kind": "actor",
            "icon": "box",
            "tone": "violet",
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
            "id": "router",
            "label": "Router",
            "kind": "actor",
            "icon": "router",
            "tone": "slate",
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
            "from": "user",
            "to": "view",
            "label": "tap",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "view",
            "to": "presenter",
            "label": "event",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "presenter",
            "to": "interactor",
            "label": "fetch user",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "interactor",
            "to": "entity",
            "label": "query",
            "tone": "violet",
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "entity",
            "to": "interactor",
            "label": "model",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "interactor",
            "to": "presenter",
            "label": "result",
            "tone": "green",
            "route": "sequence",
            "lane": 466
          },
          {
            "id": "seq-7",
            "from": "presenter",
            "to": "view",
            "label": "view model",
            "tone": "green",
            "route": "sequence",
            "lane": 522
          },
          {
            "id": "seq-8",
            "from": "presenter",
            "to": "router",
            "label": "navigate",
            "tone": "slate",
            "route": "sequence",
            "lane": 578
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "A module is a screen",
            "body": "VIPER splits one screen into five testable pieces.",
            "tag": "VIPER",
            "focus": [
              "user",
              "view",
              "presenter",
              "interactor",
              "entity",
              "router"
            ],
            "events": []
          },
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
            "title": "event",
            "body": "The view forwards what happened, not what to do.",
            "focus": [
              "view",
              "presenter",
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
            "title": "fetch user",
            "body": "Presenter → Interactor: fetch user",
            "focus": [
              "presenter",
              "interactor",
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
            "title": "query",
            "body": "Interactor → Entity: query",
            "focus": [
              "interactor",
              "entity",
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
            "title": "model",
            "body": "Entity → Interactor: model",
            "focus": [
              "entity",
              "interactor",
              "seq-5"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-5",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "step-6",
            "title": "result",
            "body": "The interactor returns domain models, never view models.",
            "focus": [
              "interactor",
              "presenter",
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
            "title": "view model",
            "body": "Formatting and copy live in the presenter.",
            "focus": [
              "presenter",
              "view",
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
            "title": "navigate",
            "body": "Only the router knows which module comes next.",
            "focus": [
              "presenter",
              "router",
              "seq-8"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-8",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "parts",
            "label": "Testable parts",
            "value": "5",
            "tone": "green"
          },
          {
            "id": "ui",
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
  }
];

export { VIPER_SCENES };
export default VIPER_SCENES;
