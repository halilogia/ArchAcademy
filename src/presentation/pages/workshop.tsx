import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../components/SEO';
import { WorkInProgressView } from '../components/WorkInProgressView';

const WorkshopPage: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <>
      <SEO
        title={isEn ? "Architecture Workshop (Under Construction) | ArchAcademy" : "Mimari Atölye (Geliştirme Aşamasında) | ArchAcademy"}
        description={isEn 
          ? "Interactive Architecture Workshop is currently being upgraded for the next release." 
          : "İnteraktif Mimari Atölye oyun ve pratik laboratuvarı yeni sürüm için geliştirilmektedir."
        }
        keywords="architecture workshop, clean architecture game, architecture laboratory"
        canonicalUrl="/workshop"
      />
      <WorkInProgressView
        title={{
          tr: "Mimari Atölye & Pratik Oyun Laboratuvarı",
          en: "Architecture Workshop & Game Lab"
        }}
        subtitle={{
          tr: "Bu atölye alanı, daha gelişmiş Clean Architecture ve DDD senaryolarıyla sıfırdan yeniden tasarlanıyor. Çok yakında yayında!",
          en: "This workshop is being redesigned with advanced Clean Architecture and DDD simulations. Coming very soon!"
        }}
        color="#f59e0b"
        badge={isEn ? "LABORATORY UPGRADE" : "YAPIM AŞAMASINDA"}
        estimatedRelease="ArchAcademy v2.5"
      />
    </>
  );
};

export default WorkshopPage;
