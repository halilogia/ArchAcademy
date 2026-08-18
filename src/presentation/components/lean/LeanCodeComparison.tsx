import React from 'react';
import { ShieldAlert, Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const LeanCodeComparison: React.FC = () => {
  const { i18n } = useTranslation();
  const isEn = (i18n.resolvedLanguage || i18n.language || 'tr').startsWith('en');

  return (
    <section style={{ padding: '120px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 950, color: 'white' }}>
            {isEn ? "Waste " : "İsraf "}
            <span style={{ color: '#ef4444' }}>vs</span>
            {isEn ? " Value" : " Değer"}
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            {isEn 
              ? "The battle between speculative architectural technical debt and lean code." 
              : "Teknik borç yaratan karmaşa ile yalın kodun savaşı."
            }
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #ef4444' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#ef4444' }}>
              <ShieldAlert size={24} />
              <h3 style={{ margin: 0, fontWeight: 900 }}>
                {isEn ? "Traditional Overkill" : 'Geleneksel "Overkill"'}
              </h3>
            </div>
            <pre style={{ background: '#0a0f1d', padding: '1.5rem', borderRadius: '12px', fontSize: '0.85rem', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.05)', lineHeight: 1.6 }}>{`// 1. Interface Tanımı
interface IGetUserService {
  execute(id: string): Promise<User>;
}

// 2. Sınıf Implementasyonu
class GetUserService implements IGetUserService {
  constructor(private repo: IUserRepository) {}
  async execute(id: string) { ... }
}

// 3. DI Konfigürasyonu (Başka bir dosyada)
container.bind<IGetUserService>(T.U).to(GUS);

// SONUÇ: Tek bir işlem için 3 dosya ve 
// 20 satır boilerplate.`}</pre>
          </div>

          <div className="glass-card" style={{ padding: '2rem', borderTop: '4px solid #84cc16' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem', color: '#84cc16' }}>
              <Rocket size={24} />
              <h3 style={{ margin: 0, fontWeight: 900 }}>
                {isEn ? "Lean Functional" : 'Lean "Functional"'}
              </h3>
            </div>
            <pre style={{ background: '#0a0f1d', padding: '1.5rem', borderRadius: '12px', fontSize: '0.85rem', color: '#e2e8f0', border: '1px solid rgba(132, 204, 22, 0.2)', lineHeight: 1.6 }}>{`// Sadece Saf Fonksiyon (Pure Function)
export const getUserUseCase = (repo: UserRepo) => 
  (id: string) => repo.findById(id);

// Kullanım:
const user = await getUserUseCase(repo)("123");

// SONUÇ: Sıfır Interface karmaşası, 
// sıfır DI boilerplate. Maksimum test 
// edilebilirlik ve hız. 
// Gerçek yalınlık budur.`}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeanCodeComparison;
