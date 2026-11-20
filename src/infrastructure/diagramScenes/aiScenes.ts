import type { DiagramSceneRecord } from '../../domain/entities/DiagramScene';

const AI_SCENES: DiagramSceneRecord[] = [
  {
    "id": "rag-arch",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "rag-arch",
        "title": "Üretmeden önce getir",
        "subtitle": "Model korpusu görmez. Yalnızca erişimin seçtiği birkaç parçayı görür.",
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "api",
            "label": "RAG API",
            "kind": "actor",
            "icon": "server",
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
            "id": "embed",
            "label": "Gömücü",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
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
            "id": "vector",
            "label": "Vektör DB",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
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
            "id": "llm",
            "label": "LLM",
            "kind": "actor",
            "icon": "cloud",
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
            "from": "user",
            "to": "api",
            "label": "soru",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "api",
            "to": "embed",
            "label": "sorguyu göm",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "embed",
            "to": "vector",
            "label": "top-k = 20",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "vector",
            "to": "api",
            "label": "parçalar + skorlar",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "api",
            "to": "llm",
            "label": "prompt + bağlam",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "llm",
            "to": "user",
            "label": "yanıt + kaynaklar",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Dayanaklı yanıt",
            "body": "Her yanıt getirilen bir pasaja dayanmalıdır; yoksa tahmindir.",
            "tag": "RAG",
            "focus": [
              "user",
              "api",
              "embed",
              "vector",
              "llm"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "soru",
            "body": "Soru henüz modele gönderilmez.",
            "focus": [
              "user",
              "api",
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
            "title": "sorguyu göm",
            "body": "Sorgu ve dokümanlar aynı gömme uzayını paylaşmalı.",
            "focus": [
              "api",
              "embed",
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
            "title": "top-k = 20",
            "body": "Recall burada belirlenir. Kaçan parça sonradan düzeltilemez.",
            "focus": [
              "embed",
              "vector",
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
            "title": "parçalar + skorlar",
            "body": "Skorlar metadatadır, gerçek değil. Eşik kanıt ister.",
            "focus": [
              "vector",
              "api",
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
            "title": "prompt + bağlam",
            "body": "Bu çağrı için tüm dünya bağlam penceresidir.",
            "focus": [
              "api",
              "llm",
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
            "title": "yanıt + kaynaklar",
            "body": "Kaynak yoksa cümle doğrulanmamıştır.",
            "focus": [
              "llm",
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
            "id": "recall",
            "label": "Recall@20",
            "value": "0.92",
            "tone": "green"
          },
          {
            "id": "latency",
            "label": "Yanıt süresi",
            "value": "1.4 s",
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
        "id": "rag-arch",
        "title": "Retrieve before you generate",
        "subtitle": "The model never sees the corpus. It sees the few chunks retrieval chose.",
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "api",
            "label": "RAG API",
            "kind": "actor",
            "icon": "server",
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
            "id": "embed",
            "label": "Embedder",
            "kind": "actor",
            "icon": "cpu",
            "tone": "amber",
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
            "id": "vector",
            "label": "Vector DB",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
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
            "id": "llm",
            "label": "LLM",
            "kind": "actor",
            "icon": "cloud",
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
            "from": "user",
            "to": "api",
            "label": "question",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "api",
            "to": "embed",
            "label": "embed query",
            "tone": "amber",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "embed",
            "to": "vector",
            "label": "top-k = 20",
            "tone": "violet",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "vector",
            "to": "api",
            "label": "chunks + scores",
            "tone": "violet",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "api",
            "to": "llm",
            "label": "prompt + context",
            "tone": "green",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "llm",
            "to": "user",
            "label": "answer + citations",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Grounded answer",
            "body": "Every answer must be traceable to a retrieved passage, or it is a guess.",
            "tag": "RAG",
            "focus": [
              "user",
              "api",
              "embed",
              "vector",
              "llm"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "question",
            "body": "The question is not sent to the model yet.",
            "focus": [
              "user",
              "api",
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
            "title": "embed query",
            "body": "Query and documents must share one embedding space.",
            "focus": [
              "api",
              "embed",
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
            "title": "top-k = 20",
            "body": "Recall is chosen here. A missing chunk cannot be fixed later.",
            "focus": [
              "embed",
              "vector",
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
            "title": "chunks + scores",
            "body": "Scores are metadata, not truth. Thresholds need evidence.",
            "focus": [
              "vector",
              "api",
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
            "title": "prompt + context",
            "body": "The context window is the whole world for this call.",
            "focus": [
              "api",
              "llm",
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
            "title": "answer + citations",
            "body": "No citation means the sentence is unverified.",
            "focus": [
              "llm",
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
            "id": "recall",
            "label": "Recall@20",
            "value": "0.92",
            "tone": "green"
          },
          {
            "id": "latency",
            "label": "Answer time",
            "value": "1.4 s",
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
  },
  {
    "id": "agentic-ai",
    "template": "sequence",
    "specs": {
      "tr": {
        "id": "agentic-ai",
        "title": "Planla, uygula, gözle",
        "subtitle": "Ajan model değildir. Döngü, araçlar ve iz kaydı ajandır.",
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "planner",
            "label": "Planlayıcı",
            "kind": "actor",
            "icon": "network",
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
            "id": "model",
            "label": "LLM",
            "kind": "actor",
            "icon": "cloud",
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
            "id": "tool",
            "label": "Araç",
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
            "id": "memory",
            "label": "Bellek",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
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
            "from": "user",
            "to": "planner",
            "label": "hedef",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "planner",
            "to": "model",
            "label": "sonraki adım?",
            "tone": "violet",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "planner",
            "to": "tool",
            "label": "search(query)",
            "tone": "amber",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "tool",
            "to": "planner",
            "label": "gözlem",
            "tone": "amber",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "planner",
            "to": "memory",
            "label": "adımı kaydet",
            "tone": "violet",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "planner",
            "to": "user",
            "label": "sonuç + iz",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Hedef girer, iz çıkar",
            "body": "Her adım kaydedilir. İzi olmayan ajan ne ayıklanabilir ne güvenilir.",
            "tag": "Ajan",
            "focus": [
              "user",
              "planner",
              "model",
              "tool",
              "memory"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "hedef",
            "body": "Hedef bir prompt değildir. Başarı koşuludur.",
            "focus": [
              "user",
              "planner",
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
            "title": "sonraki adım?",
            "body": "Model önerir; eyleme geçilip geçilmeyeceğine planlayıcı karar verir.",
            "focus": [
              "planner",
              "model",
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
            "title": "search(query)",
            "body": "Araçlar tipli ve kapsamlıdır. Varsayılan olarak serbest shell yok.",
            "focus": [
              "planner",
              "tool",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "gözlem",
            "body": "Gözlem güvenilmez girdidir ve alıntılanmalıdır.",
            "focus": [
              "tool",
              "planner",
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
            "title": "adımı kaydet",
            "body": "Bellek döngüyü sürdürülebilir yapar; tek başına akıllandırmaz.",
            "focus": [
              "planner",
              "memory",
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
            "title": "sonuç + iz",
            "body": "Ürün iz kaydıdır. Yanıt, çıktılarından biridir.",
            "focus": [
              "planner",
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
            "id": "steps",
            "label": "Kullanılan adım",
            "value": "6 / 10",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Araç hatası",
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
        "id": "agentic-ai",
        "title": "Plan, act, observe",
        "subtitle": "The model is not the agent. The loop, the tools and the trace are.",
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
              "w": 158,
              "h": 62
            },
            "lifeline": true
          },
          {
            "id": "planner",
            "label": "Planner",
            "kind": "actor",
            "icon": "network",
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
            "id": "model",
            "label": "LLM",
            "kind": "actor",
            "icon": "cloud",
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
            "id": "tool",
            "label": "Tool",
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
            "id": "memory",
            "label": "Memory",
            "kind": "actor",
            "icon": "database",
            "tone": "violet",
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
            "from": "user",
            "to": "planner",
            "label": "goal",
            "route": "sequence",
            "lane": 186
          },
          {
            "id": "seq-2",
            "from": "planner",
            "to": "model",
            "label": "next step?",
            "tone": "violet",
            "route": "sequence",
            "lane": 242
          },
          {
            "id": "seq-3",
            "from": "planner",
            "to": "tool",
            "label": "search(query)",
            "tone": "amber",
            "route": "sequence",
            "lane": 298
          },
          {
            "id": "seq-4",
            "from": "tool",
            "to": "planner",
            "label": "observation",
            "tone": "amber",
            "dashed": true,
            "route": "sequence",
            "lane": 354
          },
          {
            "id": "seq-5",
            "from": "planner",
            "to": "memory",
            "label": "record step",
            "tone": "violet",
            "route": "sequence",
            "lane": 410
          },
          {
            "id": "seq-6",
            "from": "planner",
            "to": "user",
            "label": "result + trace",
            "tone": "green",
            "dashed": true,
            "route": "sequence",
            "lane": 466
          }
        ],
        "steps": [
          {
            "id": "intro",
            "title": "Goal in, trace out",
            "body": "Every step is recorded. An agent without a trace cannot be debugged or trusted.",
            "tag": "Agent",
            "focus": [
              "user",
              "planner",
              "model",
              "tool",
              "memory"
            ],
            "events": []
          },
          {
            "id": "step-1",
            "title": "goal",
            "body": "A goal is not a prompt. It is a success condition.",
            "focus": [
              "user",
              "planner",
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
            "title": "next step?",
            "body": "The model proposes; the planner decides whether to act.",
            "focus": [
              "planner",
              "model",
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
            "title": "search(query)",
            "body": "Tools are typed and scoped. No free-form shell by default.",
            "focus": [
              "planner",
              "tool",
              "seq-3"
            ],
            "events": [
              {
                "type": "packet",
                "edge": "seq-3",
                "tone": "amber"
              }
            ]
          },
          {
            "id": "step-4",
            "title": "observation",
            "body": "The observation is untrusted input and must be quoted.",
            "focus": [
              "tool",
              "planner",
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
            "title": "record step",
            "body": "Memory makes the loop resumable, not smarter by itself.",
            "focus": [
              "planner",
              "memory",
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
            "title": "result + trace",
            "body": "The trace is the product. The answer is one of its outputs.",
            "focus": [
              "planner",
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
            "id": "steps",
            "label": "Steps used",
            "value": "6 / 10",
            "tone": "blue"
          },
          {
            "id": "errors",
            "label": "Tool errors",
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

export { AI_SCENES };
export default AI_SCENES;
