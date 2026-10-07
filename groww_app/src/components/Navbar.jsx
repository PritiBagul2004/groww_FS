import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Flame, Bell, Settings, Award, ChevronDown, RefreshCw } from 'lucide-react';

export function Navbar({ onOpenNotifications }) {
  const {
    currentView,
    navigateTo,
    userProfile,
    xp,
    streak,
    notifications,
    loadProfilePreset,
    resetJourney
  } = useApp();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="navbar-container" style={{
      backgroundColor: '#FFFFFF',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '0 20px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 64
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo(userProfile.userType === 'beginner' && currentView === 'landing' ? 'landing' : 'home')}
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #00D09C 0%, #00B386 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: 18,
            boxShadow: '0 4px 10px rgba(0,208,156,0.3)'
          }}>
            FS
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: -0.5, color: '#141A21' }}>Groww</span>
              <span style={{
                background: 'linear-gradient(90deg, #00B386, #00D09C)',
                color: '#FFFFFF',
                fontSize: 11,
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: 9999,
                letterSpacing: 0.5
              }}>FIRSTSTEP</span>
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', display: 'block', marginTop: -2 }}>
              Beginner Investing Layer
            </span>
          </div>
        </div>

        {/* Right Action Icons & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* XP Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            background: '#FEF3C7',
            border: '1px solid #FDE68A',
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: 12,
            fontWeight: 700,
            color: '#92400E'
          }}>
            <Award size={14} color="#D97706" />
            <span>{xp} XP</span>
          </div>

          {/* Streak Indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            background: '#FFE4E6',
            border: '1px solid #FECDD3',
            padding: '5px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: 12,
            fontWeight: 700,
            color: '#E11D48'
          }}>
            <Flame size={14} color="#E11D48" />
            <span>{streak}d</span>
          </div>

          {/* Notifications */}
          <button
            onClick={onOpenNotifications}
            style={{
              position: 'relative',
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#FFFFFF',
              color: 'var(--text-muted)'
            }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -2,
                right: -2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'var(--accent-rose)',
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Persona Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-color)',
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--text-main)'
              }}
            >
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'var(--primary)',
                color: '#0E2922',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 11,
                fontWeight: 800
              }}>
                {userProfile.name ? userProfile.name.charAt(0) : 'U'}
              </div>
              <span className="user-name-label" style={{ maxWidth: 80, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {userProfile.name.split(' ')[0]}
              </span>
              <ChevronDown size={14} color="var(--text-muted)" />
            </button>

            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 45,
                right: 0,
                width: 240,
                background: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-xl)',
                padding: '8px',
                zIndex: 200
              }}>
                <div style={{ padding: '8px 10px', borderBottom: '1px solid var(--border-subtle)', marginBottom: 6 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-main)' }}>{userProfile.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--primary-dark)', fontWeight: 600 }}>{userProfile.archetype}</div>
                </div>

                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', padding: '4px 10px', textTransform: 'uppercase' }}>
                  Quick Preset Switcher
                </div>

                <button
                  onClick={() => { loadProfilePreset('student'); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)' }}
                  className="dropdown-item"
                >
                  <span>🎓</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Student (Pocket Money)</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>₹0-₹1k capacity, Explore basics</div>
                  </div>
                </button>

                <button
                  onClick={() => { loadProfilePreset('first_paycheck'); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)' }}
                  className="dropdown-item"
                >
                  <span>💰</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>First Paycheck</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Budget planner, Salary auto-SIP</div>
                  </div>
                </button>

                <button
                  onClick={() => { loadProfilePreset('freelance'); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)' }}
                  className="dropdown-item"
                >
                  <span>🔄</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Flexible / Freelance</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Irregular income, Annual goal</div>
                  </div>
                </button>

                <button
                  onClick={() => { loadProfilePreset('experienced'); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)' }}
                  className="dropdown-item"
                >
                  <span>📈</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>Already Invests</div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Portfolio & diversification check</div>
                  </div>
                </button>

                <div style={{ height: 1, background: 'var(--border-subtle)', margin: '6px 0' }} />

                <button
                  onClick={() => { navigateTo('settings'); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-main)' }}
                  className="dropdown-item"
                >
                  <Settings size={14} color="var(--text-muted)" />
                  <span>Settings & Disclaimers</span>
                </button>

                <button
                  onClick={() => { resetJourney(); setIsDropdownOpen(false); }}
                  style={{ width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: 8, fontSize: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-rose)' }}
                  className="dropdown-item"
                >
                  <RefreshCw size={14} color="var(--accent-rose)" />
                  <span>Reset FirstStep Journey</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .dropdown-item:hover {
          background-color: var(--bg-subtle);
        }
      `}</style>
    </header>
  );
}
