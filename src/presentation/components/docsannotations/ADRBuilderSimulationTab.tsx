import React, { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { AdrGeneratorPanel } from '../adr/AdrGeneratorPanel';
import { useProgress } from '../../context/ProgressContext';
import { useSandboxStore } from '../../../infrastructure/stores/sandboxStore';
import { analyzeTopology } from '../../../domain/usecases/TopologyAnalyzer';
import { SandboxDesign } from '../../../domain/entities/Sandbox';

export const ADRBuilderSimulationTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');
  const { completeStep, saveDesign } = useProgress();

  const nodes = useSandboxStore((state) => state.nodes);
  const edges = useSandboxStore((state) => state.edges);
  const name = useSandboxStore((state) => state.name);
  const snapshot = useSandboxStore((state) => state.snapshot);

  const design = useMemo<SandboxDesign>(
    () => ({ id: '', name, nodes, edges, updatedAt: '' }),
    [edges, name, nodes]
  );
  const issues = useMemo(() => analyzeTopology({ nodes, edges }), [edges, nodes]);

  useEffect(() => {
    completeStep('/docs-annotations');
  }, [completeStep]);

  return (
    <motion.div
      key="simulation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <AdrGeneratorPanel
        design={design}
        issues={issues}
        isEn={isEn}
        onSave={() => {
          saveDesign(snapshot());
          completeStep('/docs-annotations');
        }}
      />
    </motion.div>
  );
};

export default ADRBuilderSimulationTab;
