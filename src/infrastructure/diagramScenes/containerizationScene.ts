import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const CONTAINERIZATION_SCENES: DiagramSceneRecord[] = [
  {
    "id": "containerization",
    "template": "pipeline",
    "specs": {
      "tr": {
        "id": "containerization",
        "title": "Dockerfile’dan çalışan pod’a",
        "subtitle": "Her aşama yalıtım ekler, sihir değil. Taşınan birim imajdır.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "dockerfile",
            "label": "Dockerfile",
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
            "id": "build",
            "label": "Derleme",
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
            "id": "image",
            "label": "Image",
            "kind": "service",
            "icon": "box",
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
            "id": "registry",
            "label": "Registry",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
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
            "id": "container",
            "label": "Container",
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
          },
          {
            "id": "pod",
            "label": "Pod",
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
            "from": "dockerfile",
            "to": "build",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "build",
            "to": "image",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "image",
            "to": "registry",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "registry",
            "to": "container",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-5",
            "from": "container",
            "to": "pod",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "build",
            "to": "dockerfile",
            "label": "cache kaçırdı",
            "tone": "amber",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Katmanları tanımla",
            "body": "Önce taban imaj, sonra bağımlılıklar, en son kaynak. Sıra önbellektir.",
            "tag": "Tarif",
            "focus": [
              "dockerfile"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "dockerfile",
                "badge": "işleniyor"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Bir kez derle",
            "body": "Çok aşamalı derleme, derleyicileri çalışma imajının dışında tutar.",
            "focus": [
              "dockerfile",
              "build"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "dockerfile"
              },
              {
                "type": "nodeBadge",
                "node": "build",
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
            "title": "İmaj değişmezdir",
            "body": "Etiket bir işaretçidir. Dağıttığınız kimlik digest’tir.",
            "tag": "Çıktı",
            "focus": [
              "build",
              "image"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "build"
              },
              {
                "type": "nodeBadge",
                "node": "image",
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
            "title": "Registry’ye it",
            "body": "Her düğüm aynı baytları çeker. Laptop artık özel değildir.",
            "focus": [
              "image",
              "registry"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "image"
              },
              {
                "type": "nodeBadge",
                "node": "registry",
                "badge": "işleniyor"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Konteyner başına tek süreç",
            "body": "Konteyner çekirdeği paylaşır ama dosya sistemini ve limitlerini sahiplenir.",
            "focus": [
              "registry",
              "container"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "registry"
              },
              {
                "type": "nodeBadge",
                "node": "container",
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
            "title": "Zamanlayıcı pod’u yerleştirir",
            "body": "Kubernetes pod’u yeniden başlatır, taşır ve ölçekler; imaj aynı kalır.",
            "focus": [
              "container",
              "pod"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "container"
              },
              {
                "type": "nodeBadge",
                "node": "pod",
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
            "id": "size",
            "label": "İmaj boyutu",
            "value": "84 MB",
            "tone": "green"
          },
          {
            "id": "cold",
            "label": "Soğuk başlangıç",
            "value": "1.2 s",
            "tone": "amber"
          },
          {
            "id": "layers",
            "label": "Katman",
            "value": "11",
            "tone": "slate"
          }
        ]
      },
      "en": {
        "id": "containerization",
        "title": "From Dockerfile to a running pod",
        "subtitle": "Each stage adds isolation, not magic. The image is the unit that ships.",
        "canvas": {
          "w": 960,
          "h": 430
        },
        "nodes": [
          {
            "id": "dockerfile",
            "label": "Dockerfile",
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
            "id": "build",
            "label": "Build",
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
            "id": "image",
            "label": "Image",
            "kind": "service",
            "icon": "box",
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
            "id": "registry",
            "label": "Registry",
            "kind": "service",
            "icon": "database",
            "tone": "violet",
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
            "id": "container",
            "label": "Container",
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
          },
          {
            "id": "pod",
            "label": "Pod",
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
            "from": "dockerfile",
            "to": "build",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-2",
            "from": "build",
            "to": "image",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-3",
            "from": "image",
            "to": "registry",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-4",
            "from": "registry",
            "to": "container",
            "tone": "slate"
          },
          {
            "id": "pipe-edge-5",
            "from": "container",
            "to": "pod",
            "tone": "slate"
          },
          {
            "id": "pipe-branch",
            "from": "build",
            "to": "dockerfile",
            "label": "cache miss",
            "tone": "amber",
            "dashed": true,
            "curve": 90
          }
        ],
        "steps": [
          {
            "id": "pipe-step-1",
            "title": "Declare the layers",
            "body": "Base image first, dependencies next, source last. Order is cache.",
            "tag": "Recipe",
            "focus": [
              "dockerfile"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "dockerfile",
                "badge": "processing"
              }
            ]
          },
          {
            "id": "pipe-step-2",
            "title": "Build once",
            "body": "Multi-stage builds keep compilers out of the runtime image.",
            "focus": [
              "dockerfile",
              "build"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "dockerfile"
              },
              {
                "type": "nodeBadge",
                "node": "build",
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
            "title": "The image is immutable",
            "body": "A tag is a pointer. A digest is the identity you deploy.",
            "tag": "Artifact",
            "focus": [
              "build",
              "image"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "build"
              },
              {
                "type": "nodeBadge",
                "node": "image",
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
            "title": "Push to a registry",
            "body": "Every node pulls the same bytes. The laptop is no longer special.",
            "focus": [
              "image",
              "registry"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "image"
              },
              {
                "type": "nodeBadge",
                "node": "registry",
                "badge": "processing"
              },
              {
                "type": "packet",
                "edge": "pipe-edge-3",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "pipe-step-5",
            "title": "Run one process per container",
            "body": "The container shares the kernel but owns its filesystem and limits.",
            "focus": [
              "registry",
              "container"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "registry"
              },
              {
                "type": "nodeBadge",
                "node": "container",
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
            "title": "The scheduler places the pod",
            "body": "Kubernetes restarts, reschedules and scales the pod; the image stays identical.",
            "focus": [
              "container",
              "pod"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "container"
              },
              {
                "type": "nodeBadge",
                "node": "pod",
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
            "id": "size",
            "label": "Image size",
            "value": "84 MB",
            "tone": "green"
          },
          {
            "id": "cold",
            "label": "Cold start",
            "value": "1.2 s",
            "tone": "amber"
          },
          {
            "id": "layers",
            "label": "Layers",
            "value": "11",
            "tone": "slate"
          }
        ]
      }
    }
  }
];

export { CONTAINERIZATION_SCENES };
export default CONTAINERIZATION_SCENES;
