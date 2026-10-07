import React from 'react';
import { useApp } from '../context/AppContext';
import { Settings, RefreshCw, ShieldCheck } from 'lucide-react';

export function SettingsView() {
  const { userProfile, loadProfilePreset, resetJourney } = useApp();

  return (
    <div className="fade-in" style={{ maxWidth: 780, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header */}
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>FirstStep Settings & Profile</h1>
        <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>Manage preferences, demo states, and regulatory disclosures</p>
      </div>

      {/* Profile Card */}
      <div className="groww-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--primary)',
            color: '#0E2922',
            fontWeight: 800,
            fontSize: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {userProfile.name ? userProfile.name.charAt(0) : 'U'}
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>{userProfile.name}</h2>
            <div style={{ fontSize: 13, color: 'var(--primary-dark)', fontWeight: 700 }}>
              {userProfile.archetype}
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ gap: 12 }}>
          <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>LIFE STAGE</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2, textTransform: 'capitalize' }}>
              {userProfile.lifeStage.replace('_', ' ')}
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>INVESTMENT CAPACITY</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>
              {userProfile.investmentCapacity === '0_1000' ? '₹0 – ₹1,000 / mo' :
               userProfile.investmentCapacity === '1000_5000' ? '₹1,000 – ₹5,000 / mo' :
               userProfile.investmentCapacity === '5000_10000' ? '₹5,000 – ₹10,000 / mo' : '₹10,000+ / mo'}
            </div>
          </div>
        </div>
      </div>

      {/* Preset Switcher for Evaluator */}
      <div className="groww-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
          Demo Profile Presets
        </h3>
        <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
          Switch between user personas to test how the Home dashboard and learning plan dynamically adapt:
        </p>

        <div className="grid-2" style={{ gap: 10 }}>
          <button
            onClick={() => loadProfilePreset('student')}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              background: userProfile.lifeStage === 'student' ? 'var(--primary-light)' : '#FFFFFF',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>🎓 1. College Student (Pocket Money)</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>₹0-₹1k capacity, starts from basics</div>
          </button>

          <button
            onClick={() => loadProfilePreset('first_paycheck')}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              background: userProfile.lifeStage === 'first_paycheck' ? 'var(--primary-light)' : '#FFFFFF',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>💰 2. First Paycheck Earner</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>50/30/20 budget planner, salary auto-SIP</div>
          </button>

          <button
            onClick={() => loadProfilePreset('freelance')}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              background: userProfile.incomeSource === 'freelance' ? 'var(--primary-light)' : '#FFFFFF',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>🔄 3. Flexible / Freelance Earner</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Irregular income, annual targets</div>
          </button>

          <button
            onClick={() => loadProfilePreset('experienced')}
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-color)',
              background: userProfile.isExperienced ? 'var(--primary-light)' : '#FFFFFF',
              textAlign: 'left'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14 }}>📈 4. Experienced Investor</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Portfolio overlap check & diagnostic</div>
          </button>
        </div>
      </div>

      {/* Reset State */}
      <div className="groww-card" style={{ padding: '24px', border: '1.5px solid #FECDD3', background: '#FFF1F2' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: '#9F1239' }}>Reset FirstStep Journey</h3>
            <p style={{ fontSize: 12, color: '#BE123C', marginTop: 2 }}>
              Clears all local storage, completed quizzes, simulation history, and returns to landing onboarding.
            </p>
          </div>
          <button
            onClick={resetJourney}
            className="btn-primary"
            style={{ background: '#E11D48', color: '#FFFFFF' }}
          >
            <RefreshCw size={15} />
            <span>Reset Demo</span>
          </button>
        </div>
      </div>

      {/* Disclaimers & SEBI Education Guidelines */}
      <div style={{
        padding: '20px',
        background: '#F8FAFC',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid #E2E8F0',
        fontSize: 12,
        color: '#64748B',
        lineHeight: 1.6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
          <ShieldCheck size={16} color="#00B386" />
          <span>Responsible Investing & Legal Disclaimers</span>
        </div>
        <p>
          • <strong>Educational Prototype:</strong> Groww FirstStep is a concept and educational prototype. All portfolio, returns, and index data are simulated for demonstration.
          <br />
          • <strong>No Financial Advice:</strong> FirstStep does not provide personalized investment advice, stock tips, or price targets.
          <br />
          • <strong>Market Risks:</strong> Mutual fund and securities investments are subject to market risks. Read all scheme related documents carefully. Past performance does not guarantee future results.
        </p>
      </div>

    </div>
  );
}
