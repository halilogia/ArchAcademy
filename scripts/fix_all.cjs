const fs = require('fs');

// 1. Home.tsx
const p_home = 'src/presentation/pages/home.tsx';
let c_home = fs.readFileSync(p_home, 'utf8');

const vibeSection = `
      {/* --- THE VIBE-CODING SPOTLIGHT SECTION (VSA & FSD) --- */}
      <section style={{ padding: '0 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(15, 23, 42, 0.9) 100%)',
              padding: '4rem',
              borderRadius: '60px',
              border: '2px solid rgba(249, 115, 22, 0.25)',
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1.2fr) 1fr',
              gap: '4rem',
              alignItems: 'center',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 50px rgba(249, 115, 22, 0.05)'
            }}
          >
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(249, 115, 22, 0.15)',
                color: '#f97316',
                padding: '8px 16px',
                borderRadius: '100px',
                gontSize: '0.75rem',
                fontWeight: 900,
                marginBottom: '1.5rem',
                letterSpacing: '1px'
              }}>
                <Sparkles size={14} /> {isEn ? '2026 VIBE-CODING SPOTLIGHT' : 'YENI NESIL VIBE-CODING GOZDESI'}
              </div>
              <h2 style={{ fontSize: '4.5rem', fontWeight: 950, color: 'w(ite', marginBottom: '1.5rem', lineHeight: 1, letterSpacing: '-3px' }}>
                Vertical Slice <br />
                <span style={{ color: '#f97316' }}>&amp; FSD Architecture</span>
              </h2>
              <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '600px' }}>
                {isEn 
                  ? 'Zero context loss for AI agents. Isolate features into autonomous vertical slices and rule out butterfly-effect bugs during vibe-coding sessions.'
                  : 'Yapay Zeka ve Vibe-Coding için sıfır bağlam kaybñ. Özellikleri bağımsız dikey dilimlere hapsedin, kelebek etkisi hatalarını tamamen yok edin.'
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/vertical" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1.25rem 2.5rem',
                      background: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {isEn ? 'Vertical Slice (VSA)' : 'Dikey Dilim (VSA)'} <ArrowUpRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/fsd" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1.25rem 2.5rem',
                      background: 'rgba(255,255,255,0.05)',
                      color: 'white',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '20px',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {isEn ? 'Feature-Sliced (FSD)' : 'Feature-Sliced (FSD)'} <ArrowUpRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </div>
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: '350px',
                height: '350px',
                borderRadius: '50px',
                background: 'rgba(249, 115, 22, 0.03)',
                border: '1px solid rgba(249, 115, 22, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    width: '280px',
                    height: '280px',
                    borderRadius: '40px',
                    border: '2px dashed rgba(249, 115, 22, 0.3)'
                  }}
                />
                <div style={{
                  width: '130px',
                  height: '130px',
                  background: '#090d16',
                  borderRadius: '32px',
                  border: '3px solid #f97316',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 40px rgba(249, 115, 22, 0.3)'
                }}>
                  <Target size={52} color="#f97316" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'white', marginTop: '6px' }}>VSA-FSD</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
`;

if (!c_home.includes('THE VIBE-CODING SPOTLIGHT SECTION')) {
  c_home = c_home.replace('</section>\n\n      {/* --- DIMENSIONAL ARCHITECTURE CATALOGS --- */}', '</section>\n' + vibeSection + '\n\n      {/* --- DIMENSIONAL ARCHITECTURE CATALOGS --- */}');
  fs.writeFileSync(p_home, c_home, 'utf8');
  console.log('Home.tsx updated with Vibe-Coding Section!');
}

// 2. ArchitectRoadmap.tsx
const p_roadmap = 'src/presentation/components/ArchitectRoadmap.tsx';
let c_roadmap = fs.readFileSync(p_roadmap, 'utf8');
c_roadmap = c_roadmap.replace("desc: 'DağıtĲk servis stratejileri ve dayanıklılık.', desc: ", "desc: ");
c_roadmap = c_roadmap.replace('const isCompleted = progress[task.path];', 'const isCompleted = progress.completedSteps.includes(task.path);');
fs.writeFileSync(p_roadmap, c_roadmap, 'utf8');
console.log('ArchitectRoadmap.tsx updated!');

// 3. useDisciplineStreak.ts
const p_streak = 'src/presentation/components/disciplinechain/useDisciplineStreak.ts';
let c_streak = fs.readFileSync(p_streak, 'utf8');
c_streak = c_streak.replace('const { completedSteps } = useProgress();', 'const { progress } = useProgress();\n  const completedSteps = progress.completedSteps;');
fs.writeFileSync(p_streak, c_streak, 'utf8');
console.log('useDisciplineStreak.ts updated!');

// 4. CleanArchClassicLayerTab & ModernFeatureTab
const p_clTab = 'src/presentation/components/cleanarch/CleanArchClassicLayerTab.tsx';
let c_clTab = fs.readFileSync(p_clTab, 'utf8');
c_clTab = c_clTab.replace('defaultTab="layer"', 'forcedMode="layer"');
fs.writeFileSync(p_clTab, c_clTab, 'utf8');

const p_mfTab = 'src/presentation/components/cleanarch/CleanArchModernFeatureTab.tsx';
let c_mfTab = fs.readFileSync(p_mfTab, 'utf8');
c_mfTab = c_mfTab.replace('defaultTab="feature"', 'forcedMode="feature"');
fs.writeFileSync(p_mfTab, c_mfTab, 'utf8');
console.log('CleanArch tabs updated!');

// 5. hexagonal.tsx & onion.tsx
const p_hex = 'src/presentation/pages/hexagonal.tsx';
let c_hex = fs.readFileSync(p_hex, 'utf8');
c_hex = c_hex.replace('  if (isEn) {\n    return <HexagonalEN />;\n  }\n', '');
fs.writeFileSync(p_hex, c_hex, 'utf8');

const p_onion = 'src/presentation/pages/onion.tsx';
let c_onion = fs.readFileSync(p_onion, 'utf8');
c_onion = c_onion.replace('  if (isEn) {\n    return <OnionEN />;\n  }\n', '');
fs.writeFileSync(p_onion, c_onion, 'utf8');
console.log('Hexagonal & Onion pages updated!');

// 6. acid.tsx, cap-theorem.tsx, primary-secondary.tsx, soa.tsx
const p_acid = 'src/presentation/pages/acid.tsx';
let c_acid = fs.readFileSync(p_acid, 'utf8');
c_acid = c_acid.replace('setErrorMode={simulation.setErrorMode}', 'onErrorModeChange={simulation.setErrorMode}')
                 .replace('runTransaction={simulation.runTransaction}', 'onRunTransaction={simulation.runTransaction}');
fs.writeFileSync(p_acid, c_acid, 'utf8');

const p_cap = 'src/presentation/pages/cap-theorem.tsx';
let c_cap = fs.readFileSync(p_cap, 'utf8');
c_cap = c_cap.replace('setActiveMode={simulation.setActiveMode}', 'onSetMode={simulation.setActiveMode}')
               .replace('setIsPartitioned={simulation.setIsPartitioned}', 'onTogglePartition={() => simulation.setIsPartitioned(!simulation.isPartitioned)}')
               .replace('handleWrite={simulation.handleWrite}', 'onWrite={simulation.handleWrite}');
fs.writeFileSync(p_cap, c_cap, 'utf8');

const p_ps = 'src/presentation/pages/primary-secondary.tsx';
let c_ps = fs.readFileSync(p_ps, 'utf8');
c_ps = c_ps.replace('writeData={simulation.writeData}', 'onWriteData={simulation.writeData}');
fs.writeFileSync(p_ps, c_ps, 'utf8');

const p_soa = 'src/presentation/pages/soa.tsx';
let c_soa = fs.readFileSync(p_soa, 'utf8');
c_soa = c_soa.replace('triggerESB={simulation.triggerESB}', 'modernWeb="idle" legacyCRM="idle" sapSystem="idle" onTriggerESB={simulation.triggerESB}');
fs.writeFileSync(p_soa, c_soa, 'utf8');
console.log('Simulation Pages updated!');
