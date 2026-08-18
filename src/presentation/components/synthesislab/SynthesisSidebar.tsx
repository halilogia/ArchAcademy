import React from 'react';
import { FolderTree, Settings, Activity, Brain, Plus, FileCode } from 'lucide-react';

export interface MockFile {
  name: string;
  type: 'Entity' | 'Repository' | 'Service' | 'Controller';
  content: string;
}

export const MOCK_FILES: MockFile[] = [
  { name: 'User.cs', type: 'Entity', content: 'public class User { public int Id { get; set; } }' },
  { name: 'Product.cs', type: 'Entity', content: 'public class Product { public string SKU { get; set; } }' },
  { name: 'UserRepository.cs', type: 'Repository', content: 'public interface IUserRepository { ... }' },
  { name: 'OrderService.cs', type: 'Service', content: 'public class OrderService { ... }' },
  { name: 'AuthController.cs', type: 'Controller', content: 'public class AuthController : ControllerBase { ... }' },
];

export interface SynthesisSidebarProps {
  activeTab: 'explorer' | 'search' | 'git';
  onTabChange: (tab: 'explorer' | 'search' | 'git') => void;
}

export const SynthesisSidebar: React.FC<SynthesisSidebarProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <>
      {/* VS Code Activity Bar (Far Left) */}
      <div style={{ width: '60px', background: '#050507', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '1.5rem', paddingBottom: '1.5rem', gap: '1.5rem', borderRight: '1px solid rgba(255,255,255,0.05)', boxSizing: 'border-box' }}>
        <div style={{ color: activeTab === 'explorer' ? '#3b82f6' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => onTabChange('explorer')}><FolderTree size={28} /></div>
        <div style={{ color: activeTab === 'search' ? '#3b82f6' : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onClick={() => onTabChange('search')}><Settings size={28} /></div>
        <div style={{ color: 'rgba(255,255,255,0.1)', cursor: 'not-allowed' }}><Activity size={28} /></div>
        <div style={{ marginTop: 'auto', marginBottom: '1.5rem', color: 'rgba(255,255,255,0.3)' }}><Brain size={28} /></div>
      </div>

      {/* VS Code Sidebar (File Explorer) */}
      <div style={{ width: '260px', background: '#0a0a0f', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
        <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 900, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>Explorer</span>
          <Plus size={16} />
        </div>
        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
          <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 900, marginBottom: '1rem' }}>SOURCE FILES</div>
          {MOCK_FILES.map(file => (
            <div 
              key={file.name}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData('type', file.type);
                e.dataTransfer.setData('name', file.name);
                e.dataTransfer.setData('code', file.content);
              }}
              style={{ padding: '0.7rem', borderRadius: '8px', cursor: 'grab', display: 'flex', alignItems: 'center', gap: '10px', transition: 'all 0.2s', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}
            >
              <FileCode size={16} color={file.type === 'Entity' ? '#ef4444' : '#3b82f6'} />
              {file.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SynthesisSidebar;
