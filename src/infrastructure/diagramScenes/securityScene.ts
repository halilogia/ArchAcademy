import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const SECURITY_SCENES: DiagramSceneRecord[] = [
  {
    "id": "security",
    "template": "layer-stack",
    "specs": {
      "tr": {
        "id": "security",
        "title": "Derinlemesine savunma",
        "subtitle": "Zero trust her adımın doğrulandığı anlamına gelir. Güvenilir ağ bir kimlik değildir.",
        "canvas": {
          "w": 960,
          "h": 608
        },
        "nodes": [
          {
            "id": "edge",
            "label": "Edge / WAF",
            "sublabel": "TLS, rate limit, OWASP rules",
            "kind": "layer",
            "icon": "shield",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 115
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "identity",
            "label": "Kimlik",
            "sublabel": "OIDC, MFA, short-lived tokens",
            "kind": "layer",
            "icon": "lock",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 213
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "authorization",
            "label": "Yetkilendirme",
            "sublabel": "RBAC / ABAC, least privilege",
            "kind": "layer",
            "icon": "user",
            "tone": "violet",
            "at": {
              "x": 480,
              "y": 311
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "service",
            "label": "Servis sınırı",
            "sublabel": "input validation, mTLS, scoped credentials",
            "kind": "layer",
            "icon": "server",
            "tone": "amber",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "data",
            "label": "Veri",
            "sublabel": "encryption at rest, row-level policy, audit",
            "kind": "layer",
            "icon": "database",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 507
            },
            "size": {
              "w": 540,
              "h": 74
            }
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "edge",
            "to": "identity",
            "dashed": true,
            "tone": "blue",
            "label": "bağımlı"
          },
          {
            "id": "layer-edge-2",
            "from": "identity",
            "to": "authorization",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "authorization",
            "to": "service",
            "dashed": true,
            "tone": "amber"
          },
          {
            "id": "layer-edge-4",
            "from": "service",
            "to": "data",
            "dashed": true,
            "tone": "green"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Edge’de sonlandır ve filtrele",
            "body": "TLS sonlanır, bariz saldırılar düşürülür ve istek backend thread’i harcamadan sınırlanır.",
            "tag": "Çevre",
            "focus": [
              "edge"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "edge",
                "badge": "aktif"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Konumu değil kimliği doğrula",
            "body": "Bilinen ağdan gelen geçerli token bile MFA destekli kimlik ister. VPN bir parola değildir.",
            "focus": [
              "identity"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "identity",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Eylemi yetkilendir",
            "body": "Kimlik doğrulama kim olduğunu söyler. Yetkilendirme bu kullanıcının bu siparişi şimdi iade edebileceğini söyler.",
            "tag": "Politika",
            "focus": [
              "authorization"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "authorization",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Mesh içinde yeniden doğrula",
            "body": "mTLS çağıran servisi kanıtlar. Girdi doğrulama yükü kanıtlar. İkisi de opsiyonel değildir.",
            "focus": [
              "service"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "service",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-5",
            "title": "En son veriyi koru",
            "body": "Beklemede şifreleme, satır düzeyi politika ve denetim izi, ele geçen servisin etkisini sınırlar.",
            "tag": "Etki alanı",
            "focus": [
              "data"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "data",
                "badge": "aktif"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "layers",
            "label": "Geçilen katman",
            "value": "5 / 5",
            "tone": "green"
          },
          {
            "id": "blocked",
            "label": "Engellenen tehdit",
            "value": "1,284",
            "tone": "red"
          }
        ]
      },
      "en": {
        "id": "security",
        "title": "Defense in depth",
        "subtitle": "Zero trust means every hop verifies. A trusted network is not a credential.",
        "canvas": {
          "w": 960,
          "h": 608
        },
        "nodes": [
          {
            "id": "edge",
            "label": "Edge / WAF",
            "sublabel": "TLS, rate limit, OWASP rules",
            "kind": "layer",
            "icon": "shield",
            "tone": "slate",
            "at": {
              "x": 480,
              "y": 115
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "identity",
            "label": "Identity",
            "sublabel": "OIDC, MFA, short-lived tokens",
            "kind": "layer",
            "icon": "lock",
            "tone": "blue",
            "at": {
              "x": 480,
              "y": 213
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "authorization",
            "label": "Authorization",
            "sublabel": "RBAC / ABAC, least privilege",
            "kind": "layer",
            "icon": "user",
            "tone": "violet",
            "at": {
              "x": 480,
              "y": 311
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "service",
            "label": "Service boundary",
            "sublabel": "input validation, mTLS, scoped credentials",
            "kind": "layer",
            "icon": "server",
            "tone": "amber",
            "at": {
              "x": 480,
              "y": 409
            },
            "size": {
              "w": 540,
              "h": 74
            }
          },
          {
            "id": "data",
            "label": "Data",
            "sublabel": "encryption at rest, row-level policy, audit",
            "kind": "layer",
            "icon": "database",
            "tone": "green",
            "at": {
              "x": 480,
              "y": 507
            },
            "size": {
              "w": 540,
              "h": 74
            }
          }
        ],
        "edges": [
          {
            "id": "layer-edge-1",
            "from": "edge",
            "to": "identity",
            "dashed": true,
            "tone": "blue",
            "label": "depends on"
          },
          {
            "id": "layer-edge-2",
            "from": "identity",
            "to": "authorization",
            "dashed": true,
            "tone": "violet"
          },
          {
            "id": "layer-edge-3",
            "from": "authorization",
            "to": "service",
            "dashed": true,
            "tone": "amber"
          },
          {
            "id": "layer-edge-4",
            "from": "service",
            "to": "data",
            "dashed": true,
            "tone": "green"
          }
        ],
        "steps": [
          {
            "id": "layer-step-1",
            "title": "Terminate and filter at the edge",
            "body": "TLS terminates, obvious attacks are dropped, and the request is rate-limited before it costs a backend thread.",
            "tag": "Perimeter",
            "focus": [
              "edge"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "edge",
                "badge": "active"
              }
            ]
          },
          {
            "id": "layer-step-2",
            "title": "Verify identity, not location",
            "body": "A valid token from a known network still needs MFA-backed identity. The VPN is not a password.",
            "focus": [
              "identity"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "identity",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-1",
                "tone": "blue"
              }
            ]
          },
          {
            "id": "layer-step-3",
            "title": "Authorize the action",
            "body": "Authentication says who you are. Authorization says this user may refund this order, now.",
            "tag": "Policy",
            "focus": [
              "authorization"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "authorization",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-2",
                "tone": "violet"
              }
            ]
          },
          {
            "id": "layer-step-4",
            "title": "Re-verify inside the mesh",
            "body": "mTLS proves the caller service. Input validation proves the payload. Neither is optional.",
            "focus": [
              "service"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "service",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "layer-step-5",
            "title": "Protect the data last",
            "body": "Encryption at rest, row-level policy and an audit trail limit the blast radius of a compromised service.",
            "tag": "Blast radius",
            "focus": [
              "data"
            ],
            "events": [
              {
                "type": "nodeBadge",
                "node": "edge"
              },
              {
                "type": "nodeBadge",
                "node": "identity"
              },
              {
                "type": "nodeBadge",
                "node": "authorization"
              },
              {
                "type": "nodeBadge",
                "node": "service"
              },
              {
                "type": "nodeBadge",
                "node": "data"
              },
              {
                "type": "nodeBadge",
                "node": "data",
                "badge": "active"
              },
              {
                "type": "packet",
                "edge": "layer-edge-4",
                "tone": "green"
              }
            ]
          }
        ],
        "metrics": [
          {
            "id": "layers",
            "label": "Layers passed",
            "value": "5 / 5",
            "tone": "green"
          },
          {
            "id": "blocked",
            "label": "Threats blocked",
            "value": "1,284",
            "tone": "red"
          }
        ]
      }
    }
  }
];

export { SECURITY_SCENES };
export default SECURITY_SCENES;
