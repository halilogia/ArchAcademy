import React from 'react';
import { motion } from 'framer-motion';
import { Grid,  Monitor, LayoutDashboard, AppWindow } from 'lucide-react';
import ArchHero from '../components/ArchHero';

const CompositeUIPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ background: 'var(--bg-dark)', minHeight: '100vh' }}>
      <ArchHero 
        title="Composite"
        subtitle="UI"
        description="Farklı kaynaklardan gelen arayüz parçalarının, çalışma zamanında (runtime) birleşerek tek bir bütün oluşturması."
        badge="Enterprise Pattern"
        color="#8b5cf6"
        illustration={<LayoutDashboard size={100} color="#8b5cf6" />}
        features={[
          { icon: <Grid />, title: 'Shell Application', desc: 'Ana uygulama (Shell) sadece yer tutucuları ve düzeni yönetir.' },
          { icon: <AppWindow />, title: 'Dynamic Loading', desc: 'Modüller kullanıcı yetkisine göre anlık yüklenir.' },
          { icon: <Monitor />, title: 'Desktop & Web', desc: 'WPF (Prism) kökenli bu yapı web dünyasına da uyarlanmıştır.' }
        ]}
      />
    </motion.div>
  );
};
export default CompositeUIPage;
