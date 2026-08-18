import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { WorkInProgressView } from '../components/WorkInProgressView';

const SynthesisLabPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <>
      <SEO
        title={isEn ? "Architecture Synthesis Lab (Under Construction) | ArchAcademy" : "Mimari Sentez Laboratuvarı (Geliştirme Aşamasında) | ArchAcademy"}
        description={isEn 
          ? "The Architecture Synthesis Canvas is being upgraded with AI Code Generation and AST inspection." 
          : "Görsel Mimari Sentez Tuvali, yapay zeka kod üretimi ve AST doğrulaması ile geliştirilmektedir."
        }
        keywords="architecture synthesis, visual architecture canvas, code generator, work in progress"
        canonicalUrl="/synthesis-lab"
      />
      <WorkInProgressView
        title={{
          tr: "Mimari Sentez & Kod Üretim Tuvali",
          en: "Architecture Synthesis & Code Canvas"
        }}
        subtitle={{
          tr: "Sürükle-bırak mimari tuvalimiz, yeni nesil AI Kod Sentezi ve otomatik AST doğrulama motoruyla birleştirilmek üzere bakıma alınmıştır.",
          en: "Our visual architecture canvas is undergoing maintenance to integrate Next-Gen AI Code Synthesis and AST validation."
        }}
        color="#a855f7"
        badge={isEn ? "CANVAS RE-ENGINEERING" : "YAPIM AŞAMASINDA"}
        estimatedRelease="ArchAcademy v2.5"
      />
    </>
  );
};

export default SynthesisLabPage;
