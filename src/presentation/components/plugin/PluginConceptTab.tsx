import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const PluginConceptTab: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <motion.div
      key="concept"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="glass-card" style={{ borderLeft: '4px solid #a78bfa', marginBottom: '2rem' }}>
        <h3 style={{ color: '#a78bfa', marginBottom: '10px' }}>
          {isEn ? "Extension Points & Lifecycle Hooks" : "Extension Points & Hooks"}
        </h3>
        <p style={{ color: '#cbd5e1' }}>
          {isEn 
            ? "When architecting a plugin-based core, you intentionally leave extension injection sockets. For instance: " 
            : "Sisteminizi tasarlarken, gelecekteki geliştiricilerin müdahale edebileceği 'boşluklar' bırakırsınız. Örneğin: "
          }
          <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', margin: '0 5px' }}>onBeforeSave</code> 
          {isEn ? "or " : "veya "} 
          <code style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 5px', borderRadius: '4px', margin: '0 5px' }}>renderSidebarItem</code>.
          {isEn 
            ? " Independent plugins inject their custom routines into these predefined hooks without altering the host core." 
            : " Eklentiler bu noktalara kod enjekte ederek çekirdeğe dokunmadan genişler."
          }
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        <div className="glass-card">
          <h4 style={{ color: 'white' }}>{isEn ? "Browser Extensions" : "Browser Extensions"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "Chrome extensions (AdBlock, Password Managers) mutate the active DOM on page events while keeping the browser core immutable." 
              : "Chrome eklentileri (AdBlock), sayfa yüklendiğinde DOM'a müdahale eder. Core sistem (Chrome) aynı kalır."
            }
          </p>
        </div>
        <div className="glass-card">
          <h4 style={{ color: 'white' }}>{isEn ? "CMS & E-Commerce Plugins" : "Wordpress Plugins"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "WordPress and Shopify plugins tap into filter and action hooks to modify checkout, admin panels, and themes." 
              : "PHP Hooks kullanarak sitenin her yerini (admin paneli, post içeriği) değiştirirler."
            }
          </p>
        </div>
        <div className="glass-card">
          <h4 style={{ color: 'white' }}>{isEn ? "Game Mods & Modding" : "Game Mods"}</h4>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
            {isEn 
              ? "Minecraft and Skyrim mods bind into game engine tick APIs to inject new blocks, physics, and AI algorithms." 
              : "Minecraft/Skyrim modları, oyun motorunun (Core) sunduğu API'leri kullanarak yeni eşyalar ekler."
            }
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PluginConceptTab;
