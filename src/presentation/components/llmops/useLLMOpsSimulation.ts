import { useState } from 'react';

export interface LLMRequestTrace {
  id: string;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalCostUSD: number;
  latencyMs: number;
  cached: boolean;
  status: 'SUCCESS' | 'FALLBACK_TRIGGERED' | 'RATE_LIMITED';
  responseSnippet: string;
}

export function useLLMOpsSimulation() {
  const [selectedModel, setSelectedModel] = useState<'deepseek-v3' | 'gpt-4o' | 'claude-3-5'>('deepseek-v3');
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [guardrailEnabled, setGuardrailEnabled] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [traces, setTraces] = useState<LLMRequestTrace[]>([]);
  const [totalCost, setTotalCost] = useState(0);

  const executePrompt = (userPrompt: string) => {
    setIsExecuting(true);
    
    setTimeout(() => {
      const isCached = cacheEnabled && traces.some(t => t.model === selectedModel && t.cached);
      const latency = isCached ? Math.floor(Math.random() * 40) + 15 : Math.floor(Math.random() * 600) + 350;
      const promptLen = userPrompt.length;
      const promptTokens = Math.max(10, Math.floor(promptLen / 4));
      const completionTokens = Math.floor(Math.random() * 80) + 40;
      
      const ratePer1k = selectedModel === 'deepseek-v3' ? 0.0002 : (selectedModel === 'gpt-4o' ? 0.005 : 0.003);
      const cost = isCached ? 0 : ((promptTokens + completionTokens) / 1000) * ratePer1k;

      const newTrace: LLMRequestTrace = {
        id: Math.random().toString(36).substring(2, 8).toUpperCase(),
        model: selectedModel,
        promptTokens,
        completionTokens,
        totalCostUSD: Number(cost.toFixed(6)),
        latencyMs: latency,
        cached: isCached,
        status: 'SUCCESS',
        responseSnippet: `[${selectedModel.toUpperCase()} Response] Synthesized architectural evaluation in ${latency}ms.`
      };

      setTraces(prev => [newTrace, ...prev].slice(0, 5));
      setTotalCost(prev => prev + cost);
      setIsExecuting(false);
    }, 600);
  };

  return {
    selectedModel,
    setSelectedModel,
    cacheEnabled,
    setCacheEnabled,
    guardrailEnabled,
    setGuardrailEnabled,
    isExecuting,
    traces,
    totalCost,
    executePrompt
  };
}
