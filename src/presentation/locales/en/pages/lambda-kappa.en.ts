import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../components/ArchHero';
import { 
  Database, 
  Zap, 
  Activity, 
  Server, 
  Layers, 
  GitMerge, 
  RotateCw,
  Network
} from 'lucide-react';

// --- KAPPA SIMULATION TYPES ---
interface LogEvent {
    id: number;
    value: number;
    timestamp: string;
}

interface DataParticle {
    id: number;
    type: 'hot' | 'cold'; 
    x: number;
    y: number;
}


const LambdaKappaPage = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'lambda-sim' | 'kappa-sim'>('overview');
    
    // ... (State definitions remain same) ...
    // --- LAMBDA SIMULATION STATE ---
    const [queryStatus, setQueryStatus] = useState<'idle' | 'querying' | 'complete'>('idle');
    const [batchResult, setBatchResult] = useState<any>(null);
    const [speedResult, setSpeedResult] = useState<any>(null);

    // --- KAPPA SIMULATION STATE ---
    const [isReplaying, setIsReplaying] = useState(false);
    const [processingIndex, setProcessingIndex] = useState(-1);
    const [processingLogic, setProcessingLogic] = useState<'sum' | 'double'>('sum');
    const [kappaResult, setKappaResult] = useState(0);

    // Mock Immutable Log
    const eventLog: LogEvent[] = [
        { id: 1, value: 10, timestamp: '10:00:01' },
        { id: 2, value: 20, timestamp: '10:00:05' },
        { id: 3, value: 5,  timestamp: '10:00:12' },
        { id: 4, value: 50, timestamp: '10:00:45' }
    ];

    const startKappaReplay = (newLogic: 'sum' | 'double') => {
        if (isReplaying) return;
        setIsReplaying(true);
        setProcessingLogic(newLogic);
        setKappaResult(0);
        setProcessingIndex(0);
    };

    // Kappa Effect to step through the log
    useEffect(() => {
        if (isReplaying && processingIndex >= 0 && processingIndex < eventLog.length) {
            const timer = setTimeout(() => {
                const event = eventLog[processingIndex];
                setKappaResult(prev => {
                    if (processingLogic === 'sum') return prev + event.value;
                    if (processingLogic === 'double') return prev + (event.value * 2);
                    return prev;
                });
                setProcessingIndex(prev => prev + 1);
            }, 800); 
            return () => clearTimeout(timer);
        } else if (processingIndex >= eventLog.length) {
            setIsReplaying(false);
            setProcessingIndex(-1);
        }
    }, [isReplaying, processingIndex, processingLogic]);


    // --- OVERVIEW ANIMATION STATE ---
    const [particles, setParticles] = useState<DataParticle[]>([]);

    // Ingest Simulation for Overview
    useEffect(() => {
        if (activeTab === 'overview') {
            const interval = setInterval(() => {
                if (Math.random() > 0.6) {
                    const id = Date.now();
                    const type = Math.random() > 0.5 ? 'hot' : 'cold';
                    // Start from the exact connection point (approx 50px, 150px)
                    setParticles(prev => [...prev, { id, type, x: 0, y: 0 }]); 
                    setTimeout(() => setParticles(prev => prev.filter(p => p.id !== id)), 2500);
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [activeTab]);

    const runLambdaQuery = () => {
        if (queryStatus === 'querying') return;
        setQueryStatus('querying');
        setBatchResult(null);
        setSpeedResult(null);

        // Speed Layer (Fast)
        setTimeout(() => {
            setSpeedResult({ count: 42, time: '12ms', source: 'Real-time View' });
        }, 800);

        // Batch Layer (Slow)
        setTimeout(() => {
            setBatchResult({ count: 18500, time: '1.2s', source: 'Batch View' });
            setQueryStatus('complete');
        }, 2000);
    };

    const overviewIllustration = (
        <div style={{ position: 'relative', width: '350px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {/* Source - Slightly adjusted position to align with paths */}
            <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 20 }}>
                <div style={{ background: '#0f172a', padding: '5px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
                     <Server color="#06b6d4" size={24} />
                </div>
                <span style={{ fontSize: '0.7rem', color: '#06b6d4', fontWeight: 800, marginTop: '4px' }}>SOURCE</span>
            </div>

            {/* Architecture Visual */}
            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                <defs>
                    <linearGradient id="gradientFlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#8b5cf6" stopOpacity="1" />
                    </linearGradient>
                </defs>
                
                {/* 
                   Adjusted Paths: 
                   Start point (M) is now 60,150 which is right where the Source icon sits.
                   Control points (C) are adjusted for smoother separation.
                */}
                
                {/* Batch Path (Top Curve) */}
                <path d="M 50 150 C 100 150, 100 50, 200 50 L 300 120" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />

                 {/* Speed Path (Bottom Curve) */}
                 <path d="M 50 150 C 100 150, 100 250, 200 250 L 300 180" fill="none" stroke="#ec4899" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
            </svg>

            {/* Moving Particles */}
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    initial={{ offsetDistance: '0%' }}
                   