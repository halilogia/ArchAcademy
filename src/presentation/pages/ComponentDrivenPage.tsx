import React from 'react';
import { motion } from 'framer-motion';
import { Box, Package, Layers, Library } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const ComponentDrivenPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Component-Driven"
        subtitle="Development"
        description="Uygulamaları sayfalardan değil, en küçük bileşenlerden başlayarak yukarıya doğru inşa etme metodolojisi. (Bottom-Up)."
        badge="Dev Methodology"
        color="#f43f5e"
        illustration={<Box size={100} color="#f43f5e" />}
        features={[
          { icon: <Package />, title: 'Isolation', desc: 'Bileşenler ana uygulamadan bağımsız geliştirilir ve test edilir.' },
          { icon: <Library />, title: 'Storybook', desc: 'Her bileşenin tüm durumları (states) bir katalogda belgelenir.' },
          { icon: <Layers />, title: 'Reusability', desc: 'Aynı buton 50 farklı sayfada güvenle kullanılır.' }
        ]}
      />
    </motion.div>
  );
};
export default ComponentDrivenPage;
