import { useState, useRef, useEffect, useCallback } from 'react';
import { VisualNode, Connection } from './SynthesisCanvas';

export function useSynthesisLab() {
  const [nodes, setNodes] = useState<VisualNode[]>([
    { id: '1', type: 'Entity', name: 'User', code: 'export class User {\n  id: string;\n  email: string;\n}', x: 450, y: 200, health: 98 },
    { id: '2', type: 'Repository', name: 'UserRepository', code: 'interface IUserRepository {\n  save(user: User): void;\n}', x: 750, y: 350, health: 100 }
  ]);
  const [connections, setConnections] = useState<Connection[]>([
    { id: 'c1', fromId: '1', toId: '2' }
  ]);
  
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedCode, setSynthesizedCode] = useState<string | null>(null);
  const [pendingConnection, setPendingConnection] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'explorer' | 'search' | 'git'>('explorer');

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (pendingConnection && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({ 
          x: e.clientX - rect.left, 
          y: e.clientY - rect.top 
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pendingConnection]);

  const onDropFile = useCallback((e: React.DragEvent, type: VisualNode['type'], name: string, code: string) => {
    e.preventDefault();
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - 110;
    const y = e.clientY - rect.top - 60;

    const newNode: VisualNode = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      name,
      code,
      x,
      y,
      health: 100
    };
    setNodes(prev => [...prev, newNode]);
  }, []);

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSynthesizedCode(`// ==========================================
// ARCHACADEMY SYNTHESIZED ARCHITECTURE MODULE
// Discovered Architecture: Clean Architecture / DDD
// Clean Code Score: 98/100 (Optimal Boundaries)
// ==========================================

import { Injectable } from '@archacademy/core';

// [Domain Layer] User Entity with Encapsulated Invariants
export class User {
  constructor(
    public readonly id: string,
    public email: string
  ) {}
}

// [Application Layer] Repository Port Contract
export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
}

// [Domain / UseCase] Synthesized User Creation Orchestrator
@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(id: string, email: string): Promise<User> {
    const user = new User(id, email);
    await this.userRepo.save(user);
    return user;
  }
}
`);
    }, 2000);
  };

  return {
    nodes,
    setNodes,
    connections,
    setConnections,
    isSynthesizing,
    synthesizedCode,
    setSynthesizedCode,
    pendingConnection,
    setPendingConnection,
    mousePos,
    activeTab,
    setActiveTab,
    containerRef,
    onDropFile,
    handleSynthesize
  };
}
