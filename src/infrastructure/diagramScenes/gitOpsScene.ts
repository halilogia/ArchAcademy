import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const GITOPS_SCENES: DiagramSceneRecord[] = [
  {
    "id": "gitops",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "gitops",
        "title": "Git istenen durumdur",
        "subtitle": "Kimse elle kubectl apply yapmaz. Uzlaştırıcı Git ile kümeyi sürekli karşılaştırır.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "commit",
            "label": "Commit",
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
            "id": "ci",
            "label": "CI derleme",
            "kind": "service",
            "icon": "cpu",
            "tone": "blue",
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
            "id": "registry",
            "label": "Registry",
            "kind": "service",
            "icon": "database",
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
            "id": "desired",
            "label": "İstenen durum",
            "kind": "service",
            "icon": "file",
            "tone": "amber",
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
            "id": "reconciler",
            "label": "Uzlaştırıcı",
            "kind": "service",
            "icon": "refresh",
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
          },
          {
            "id": "cluster",
            "label": "Küme",
            "kind": "service",
            "icon": "cloud",
            "tone": "slate",
            "status": "ok",
            "at": {
              "x": 284,
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
            "from": "commit",
            "to": "ci",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "ci",
            "to": "registry",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "registry",
            "to": "desired",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "desired",
            "to": "reconciler",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-5",
            "from": "reconciler",
            "to": "cluster",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "cluster",
            "to": "desired",
            "label": "sapma",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Değişim commit ile başlar",
            "body": "Pull request; değişiklik talebi, inceleme ve denetim kaydıdır.",
            "tag": "Kaynak",
            "focus": [
              "commit"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "commit",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "CI değişmez bir çıktı üretir",
            "body": "Pipeline bir kez test eder ve derler. Çıktı commit ile etiketlenir.",
            "focus": [
              "commit",
              "ci"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "commit"
              },
              {
                "type": "nodeBadge",
                "node": "ci",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "Çıktı yayınlanır",
            "body": "Registry imajı saklar. Kümede hiçbir şey yeniden derlenmez.",
            "focus": [
              "ci",
              "registry"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ci"
              },
              {
                "type": "nodeBadge",
                "node": "registry",
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
            "title": "İstenen durum bildirilir",
            "body": "Git’teki manifestler hangi imaj, kaç replika olduğunu söyler. Sözleşme budur.",
            "focus": [
              "registry",
              "desired"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "registry"
              },
              {
                "type": "nodeBadge",
                "node": "desired",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Uzlaştırıcı yakınsar",
            "body": "İstenen ile canlıyı karşılaştırır, yalnızca farkı uygular. Sonsuza kadar tekrar eder.",
            "tag": "Kontrol döngüsü",
            "focus": [
              "desired",
              "reconciler"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "desired"
              },
              {
                "type": "nodeBadge",
                "node": "reconciler",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-6",
            "title": "Küme Git ile eşleşir",
            "body": "Elle yapılan değişiklik sapmadır. Sonraki uzlaşma, kimse çağrılmadan onu siler.",
            "focus": [
              "reconciler",
              "cluster"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "reconciler"
              },
              {
                "type": "nodeBadge",
                "node": "cluster",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-5",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "sync",
            "label": "Senkron aralığı",
            "value": "3 min",
            "tone": "green"
          },
          {
            "id": "drift",
            "label": "Canlı sapma",
            "value": "0",
            "tone": "green"
          },
          {
            "id": "manual",
            "label": "Elle uygulama",
            "value": "0",
            "tone": "slate"
          }
        ]
      },
      "en": {
        "id": "gitops",
        "title": "Git is the desired state",
        "subtitle": "Nobody kubectl-applies by hand. A reconciler compares Git with the cluster, forever.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "commit",
            "label": "Commit",
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
            "id": "ci",
            "label": "CI build",
            "kind": "service",
            "icon": "cpu",
            "tone": "blue",
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
            "id": "registry",
            "label": "Registry",
            "kind": "service",
            "icon": "database",
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
            "id": "desired",
            "label": "Desired state",
            "kind": "service",
            "icon": "file",
            "tone": "amber",
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
            "id": "reconciler",
            "label": "Reconciler",
            "kind": "service",
            "icon": "refresh",
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
          },
          {
            "id": "cluster",
            "label": "Cluster",
            "kind": "service",
            "icon": "cloud",
            "tone": "slate",
            "status": "ok",
            "at": {
              "x": 284,
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
            "from": "commit",
            "to": "ci",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "ci",
            "to": "registry",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "registry",
            "to": "desired",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "desired",
            "to": "reconciler",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-5",
            "from": "reconciler",
            "to": "cluster",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "cluster",
            "to": "desired",
            "label": "drift",
            "tone": "red",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Change starts as a commit",
            "body": "A pull request is the change request, the review and the audit log.",
            "tag": "Source",
            "focus": [
              "commit"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "commit",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "CI builds an immutable artifact",
            "body": "The pipeline tests and builds once. The artifact is tagged by commit.",
            "focus": [
              "commit",
              "ci"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "commit"
              },
              {
                "type": "nodeBadge",
                "node": "ci",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "pipe-step-3",
            "title": "The artifact is published",
            "body": "A registry stores the image. Nothing is rebuilt on the cluster.",
            "focus": [
              "ci",
              "registry"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "ci"
              },
              {
                "type": "nodeBadge",
                "node": "registry",
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
            "title": "The desired state is declared",
            "body": "Manifests in Git say which image and how many replicas. That is the contract.",
            "focus": [
              "registry",
              "desired"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "registry"
              },
              {
                "type": "nodeBadge",
                "node": "desired",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "The reconciler converges",
            "body": "It diffs desired against live and applies only the delta. Repeated forever.",
            "tag": "Control loop",
            "focus": [
              "desired",
              "reconciler"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "desired"
              },
              {
                "type": "nodeBadge",
                "node": "reconciler",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-4",
                "tone": "green"
              }
            ]
          },
          {
            "id": "pipe-step-6",
            "title": "The cluster matches Git",
            "body": "A manual change is drift. The next reconcile erases it without anyone being paged.",
            "focus": [
              "reconciler",
              "cluster"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "reconciler"
              },
              {
                "type": "nodeBadge",
                "node": "cluster",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-5",
                "tone": "slate"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "sync",
            "label": "Sync interval",
            "value": "3 min",
            "tone": "green"
          },
          {
            "id": "drift",
            "label": "Live drift",
            "value": "0",
            "tone": "green"
          },
          {
            "id": "manual",
            "label": "Manual applies",
            "value": "0",
            "tone": "slate"
          }
        ]
      }
    }
  }
];

export { GITOPS_SCENES };
export default GITOPS_SCENES;
