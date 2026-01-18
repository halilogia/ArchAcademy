import { ArchitectureLayer } from '../domain/entities/Layer';

const rawData = [
  {
    id: 'entities',
    title: 'Entities',
    color: '#ef4444',
    description: 'En iç katman. Temel iş kuralları.',
    fileName: 'domain/entities/User.js',
    codeExample: 'class User { ... }',
    dependencyHint: 'Hiçbir şeye bağımlı değil.'
  },
  // ... diğer katmanlar buraya gelecek, şimdilik mockup
];

export class LayerRepository {
  getLayers() {
    return rawData.map(data => new ArchitectureLayer(data));
  }
}
