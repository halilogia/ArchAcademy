import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArchHero from '../../../components/ArchHero';
import { 
  Smartphone, 
  Monitor, 
  Server, 
  ArrowRight, 
  ArrowDown,
  Layers,
  Split,
  Database,
  Globe,
  Shuffle
} from 'lucide-react';

const BFFPage = () => {
    const [activeTab, setActiveTab] = useState<'simulation' | 'comparison'>('comparison');
    
    // Simulation State
    const [requestType, setRequestType] = useState<'mobile' | 'web' | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const fetchData = (type: 'mobile' | 'web') => {
        if (loading) return;
        setRequestType(type);
        setLoading(true);
        setResponse(null);

        // Simulate Network Delay & Processing
        setTimeout(() => {
            if (type === 'mobile') {
                setResponse({
                    screen: "Home",
                    data: { title: "Welcome", unread: 5 }, // Minified Data
                    size: "2KB"
                });
            } else {
                setResponse({
                    page: "Dashboard",
                    user: { name: "John Doe", role: "Admin", lastLogin: "Today" },
                    analytics: { visits: 1200, bounce: "20%" },
                    news: ["Update 1", "Update 2"],
                    size: "45KB" // Heavy Data
                });
            }
            setLoading(false);
        }, 1500);
    };

    const illu = (
        <div style={{ position: 'relative', width: '400px', height: '300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {/* Clients Layer */}
            <div style={{ display: 'flex', gap: '80px', marginBottom: '20px' }}>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#3b82f6', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }}>
                        <Smartphone color="white" size={24} />
                    </div>
                </motion.div>
                <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} style={{ textAlign: 'center' }}>
                    <div style={{ width: '50px', height: '50px', background: '#eab308', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(234, 179, 8, 0.4)' }}>
                        <Monitor color="white" size={24} />
                    </div>
                </motion.div>
            </div>

            {/* BFF Layer */}
            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
                <div style={{ width: '2px', height: '40px', background: 'rgba(255,255,255,0.2)' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '40px', marginBottom: '20px' }}>
                <div style={{ padding: '8px 12px', border: '1px solid #3b82f6', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', fontSize: '0.7rem', fontWeight: 800 }}>
                    Mobile BFF
                </div>
                <div style={{ padding: '8px 12px', border: '1px solid #eab308', borderRadius: '8px', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', fontSize: '0.7rem', fontWeight: 800 }}>
                    Web BFF
                </div>
            </div>

            {/* General API / Microservices */}
            <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '20px' }}></div>

            <div style={{ display: 'flex', gap: '10px' }}>
                {[1,2,3].map(i => (
                    <div key={i} style={{ width: '60px', height: '40px', background: '#334155', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Server size={16} color="#94a3b8" />
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '10px', fontSize: '0.7rem', color: '#64748b' }}>Downstream Services</div>

            {/* Animated Data Packets */}
            <motion.div
                animate={{ top: [60, 180], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                style={{ position: 'absolute', top: 60, left: 110, width: '6px', height: '6px', borderRadius: '50%', background: '#3b82f6' }}
            />
             <motion.div
                animate={{ top: [60, 180], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                style={{ position: 'absolute', top: 60, left: 240, width: '6px', height: '6px', borderRadius: '50%', background: '#eab308