import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  Target, 
  BookOpen, 
  Lock, 
  Activity, 
  Beaker, 
  Layers, 
  Code2, 
  Scissors, 
  Network,
  Palette,
  Triangle,
  Database,
  Box,
  CheckCircle2,
  Medal,
  Brain,
  ShieldAlert,
  FileText,
  CloudLightning,
  Anchor
} from 'lucide-react';

interface DisciplineItem {
  name: string;
  path: string;
  color: string;
  desc: string;
  icon: React.ReactNode;
}

interface DisciplineCategory {
  id: string;
  name: string;
  color: string;
  items: DisciplineItem[];
}

const DisciplineCatalogPage = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<DisciplineItem | null>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.03) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const categories: DisciplineCategory[] = [
    {
      id: 'engineering-dna',
      name: 'Engineering DNA',
      color: '#f43f5e',
      items: [
        { name: 'Acronyms (Cheat Sheet)', path: '/acronyms', color: '#818cf8', icon: <BookOpen size={24} />, desc: 'KISS, DRY, WET, AHA, GRASP, SOLID, and core coding acronyms.' },
        { name: 'OOP Fundamentals', path: '/oop-fundamentals', color: '#f43f5e', icon: <Box size={24} />, desc: 'Abstraction, Encapsulation, Inheritance, and Polymorphism.' },
        { name: 'SOLID Principles', path: '/solid', color: '#fb7185', icon: <ShieldCheck size={24} />, desc: '5 core rules for flexible code that does not resist change.' },
        { name: 'Separation of Concerns', path: '/abstraction', color: '#fda4af', icon: <Scissors size={24} />, desc: 'Logical and physical separation of responsibilities.' }
      ]
    },
    {
      id: 'craftsmanship',
      name: 'Craftsmanship',
      color: '#10b981