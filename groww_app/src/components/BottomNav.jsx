import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutDashboard, BookOpen, Sparkles, Activity, Target, PieChart, MessageSquareCode, GraduationCap } from 'lucide-react';

export function BottomNav() {
  const { currentView, navigateTo } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn', icon: BookOpen },
    { id: 'first1000', label: 'First ₹1k', icon: Sparkles },
    { id: 'simulator', label: 'Simulate', icon: Activity },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'portfolio_explainer', label: 'Portfolio', icon: PieChart },
    { id: 'ask_ai', label: 'Ask AI', icon: MessageSquareCode },
    { id: 'campus', label: 'Campus', icon: GraduationCap }
  ];

  if (currentView === 'landing' || currentView === 'beginner_onboarding' || currentView === 'experienced_onboarding') {
    return null;
  }

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#FFFFFF',
      borderTop: '1px solid var(--border-color)',
      padding: '8px 12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      zIndex: 90,
      boxShadow: '0 -4px 16px rgba(0,0,0,0.04)'
    }}>
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '6px 8px',
              borderRadius: 'var(--radius-md)',
              color: isActive ? 'var(--primary-dark)' : 'var(--text-light)',
              fontWeight: isActive ? 700 : 500,
              fontSize: 11,
              transition: 'var(--transition)'
            }}
          >
            <div style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: isActive ? 'var(--primary-light)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2} color={isActive ? 'var(--primary-dark)' : 'var(--text-light)'} />
            </div>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
