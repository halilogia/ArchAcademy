import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const TESTING_SCENES: DiagramSceneRecord[] = [
  {
    "id": "testing",
    "template": "state-machine",
    "specs": {
      "tr": {
        "id": "testing",
        "title": "Kırmızı, yeşil, refactor",
        "subtitle": "Hiç kırmızı olmamış test hiçbir şey kanıtlamaz.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "red",
            "label": "Red",
            "sublabel": "kırmızı test",
            "kind": "state",
            "icon": "zap",
            "tone": "red",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "green",
            "label": "Green",
            "sublabel": "geçir",
            "kind": "state",
            "icon": "shield",
            "tone": "green",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "refactor",
            "label": "Refactor",
            "sublabel": "temizle, yeşil kal",
            "kind": "state",
            "icon": "layers",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "broken",
            "label": "Kırık",
            "sublabel": "test yok",
            "kind": "state",
            "icon": "lock",
            "tone": "amber",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "red",
            "to": "green",
            "label": "uygula",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "green",
            "to": "refactor",
            "label": "temizle",
            "tone": "blue",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "refactor",
            "to": "red",
            "label": "sonraki test",
            "tone": "red",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "broken",
            "to": "red",
            "label": "test yaz",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Kırmızı testle başla",
            "body": "Test, kod yokken davranışı adlandırır.",
            "tag": "TDD",
            "focus": [
              "broken",
              "red"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "broken",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "transition-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "Yalnızca geçir",
            "body": "En küçük uygulamanın çirkin olması serbesttir.",
            "focus": [
              "red",
              "green"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "red",
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
            "title": "Yeşilde refactor et",
            "body": "Geçen test varken yapı güvenle değişir.",
            "focus": [
              "green",
              "refactor"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "green",
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
            "title": "Tekrarla",
            "body": "Her döngü bir davranış ve bir koruma ekler.",
            "tag": "Döngü",
            "focus": [
              "refactor",
              "red"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "refactor",
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
            "id": "cycle",
            "label": "Döngü süresi",
            "value": "4 min",
            "tone": "blue"
          },
          {
            "id": "coverage",
            "label": "Coverage",
            "value": "82%",
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
        "id": "testing",
        "title": "Red, green, refactor",
        "subtitle": "A test you never saw fail proves nothing.",
        "canvas": {
          "w": 960,
          "h": 560
        },
        "nodes": [
          {
            "id": "red",
            "label": "Red",
            "sublabel": "failing test",
            "kind": "state",
            "icon": "zap",
            "tone": "red",
            "at": {
              "x": 480,
              "y": 100
            }
          },
          {
            "id": "green",
            "label": "Green",
            "sublabel": "make it pass",
            "kind": "state",
            "icon": "shield",
            "tone": "green",
            "at": {
              "x": 810,
              "y": 290
            }
          },
          {
            "id": "refactor",
            "label": "Refactor",
            "sublabel": "clean, still green",
            "kind": "state",
            "icon": "layers",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 480
            }
          },
          {
            "id": "broken",
            "label": "Broken",
            "sublabel": "no test",
            "kind": "state",
            "icon": "lock",
            "tone": "amber",
            "at": {
              "x": 150,
              "y": 290
            }
          }
        ],
        "edges": [
          {
            "id": "transition-1",
            "from": "red",
            "to": "green",
            "label": "implement",
            "tone": "green",
            "curve": 40
          },
          {
            "id": "transition-2",
            "from": "green",
            "to": "refactor",
            "label": "clean up",
            "tone": "blue",
            "curve": 40
          },
          {
            "id": "transition-3",
            "from": "refactor",
            "to": "red",
            "label": "next test",
            "tone": "red",
            "curve": 40
          },
          {
            "id": "transition-4",
            "from": "broken",
            "to": "red",
            "label": "write test",
            "tone": "amber",
            "curve": 40
          }
        ],
        "steps": [
          {
            "id": "state-step-1",
            "title": "Start with a failing test",
            "body": "The test names the behaviour before the code exists.",
            "tag": "TDD",
            "focus": [
              "broken",
              "red"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "broken",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "transition-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "state-step-2",
            "title": "Make it pass, nothing more",
            "body": "The smallest implementation is allowed to be ugly.",
            "focus": [
              "red",
              "green"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "red",
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
            "title": "Refactor under green",
            "body": "With a passing test, structure can change safely.",
            "focus": [
              "green",
              "refactor"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "green",
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
            "title": "Repeat",
            "body": "Each cycle adds one behaviour and one guard.",
            "tag": "Loop",
            "focus": [
              "refactor",
              "red"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "red"
              },
              {
                "type": "nodeBadge",
                "node": "green"
              },
              {
                "type": "nodeBadge",
                "node": "refactor"
              },
              {
                "type": "nodeBadge",
                "node": "broken"
              },
              {
                "type": "nodeBadge",
                "node": "refactor",
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
            "id": "cycle",
            "label": "Cycle time",
            "value": "4 min",
            "tone": "blue"
          },
          {
            "id": "coverage",
            "label": "Coverage",
            "value": "82%",
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

export { TESTING_SCENES };
export default TESTING_SCENES;
