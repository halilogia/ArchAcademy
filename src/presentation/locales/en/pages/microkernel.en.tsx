import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Shield, 
  Zap, 
  Settings, 
  Box, 
  Cpu, 
  Puzzle, 
  Download, 
  CheckCircle2, 
  XCircle,
  Play,
  Terminal
} from 'lucide-react';

interface Plugin {
    id: string;
    name: string;
    description: string;
    icon: any;
    status: 'available' | 'installing' | 'installed' | 'running';
    effect: string;
}

const MicrokernelPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'concept'>('concept');
    const [systemLogs, setSystemLogs] = useState<string[]>(['System initialized...', 'Core system stable.']);
    
    // Core state
    const [coreColor, setCoreColor] = useState('#10b981'); 

    const [plugins, setPlugins] = useState<Plugin[]>([
        { id: 'dark-theme', name: 'Dark Theme', description: 'Changes UI appearance', icon: <Settings size={18} />, status: 'available', effect: 'UI Color changed' },
        { id: 'payment', name: 'Stripe Payment', description: 'Adds payment processing', icon: <Zap size={18} />, status: 'available', effect: 'Payment Gateway Loaded' },
        { id: 'security', name: 'Auth Module', description: 'Advanced security check', icon: <Shield size={18} />, status: 'available', effect: 'Security Level: High' }
    ]);

    const installPlugin = (id: string) => {
        const plugin = plugins.find(p => p.id === id);
        if (!plugin || plugin.status !== 'available') return;

        // Start install
        updatePluginStatus(id, 'installing');
        log(`Installing ${plugin.name}...`);

        setTimeout(() => {
            updatePluginStatus(id, 'installed');
            log(`${plugin.name} installed successfully.`);
            
            // Auto run
            startPlugin(id);
        }, 1500);
    };

    const startPlugin = (id: string) => {
        const plugin = plugins.find(p => p.id === id);
        if (!plugin) return; // Security check

        updatePluginStatus(id, 'running');
        log(`Starting ${plugin.name}...`);
        
        // Visual effect on core
        setCoreColor('#34d399');
        setTimeout(() => setCoreColor('#10b981'), 500