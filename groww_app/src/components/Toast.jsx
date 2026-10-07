import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';

export function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 2000,
      background: '#141A21',
      color: '#FFFFFF',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      border: '1px solid #2D3748',
      animation: 'slideUp 0.3s ease-out',
      maxWidth: 380
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #00D09C 0%, #00B386 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0E2922',
        flexShrink: 0
      }}>
        {toast.earnedXp > 0 ? <Award size={20} /> : <CheckCircle2 size={20} />}
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>{toast.title}</span>
          {toast.earnedXp > 0 && (
            <span style={{
              background: '#FEF3C7',
              color: '#92400E',
              fontSize: 11,
              fontWeight: 800,
              padding: '2px 6px',
              borderRadius: 9999
            }}>
              +{toast.earnedXp} XP
            </span>
          )}
        </div>
        {toast.subtitle && (
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>
            {toast.subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
