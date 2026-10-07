import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';

export function ExperiencedOnboarding() {
  const { navigateTo, setUserProfile, showToast } = useApp();
  const [step, setStep] = useState(1); // 1: Questions, 2: Investor Check-in

  const [formData, setFormData] = useState({
    products: ['mutual_funds', 'stocks'],
    duration: '6_24_months',
    helpNeeded: ['portfolio_overlap', 'risk_understanding']
  });

  const toggleProduct = (prod) => {
    setFormData(prev => {
      const exists = prev.products.includes(prod);
      return {
        ...prev,
        products: exists ? prev.products.filter(p => p !== prod) : [...prev.products, prod]
      };
    });
  };

  const toggleHelp = (h) => {
    setFormData(prev => {
      const exists = prev.helpNeeded.includes(h);
      return {
        ...prev,
        helpNeeded: exists ? prev.helpNeeded.filter(p => p !== h) : [...prev.helpNeeded, h]
      };
    });
  };

  const handleFinishQuestions = () => {
    setUserProfile(prev => ({
      ...prev,
      userType: 'experienced',
      isExperienced: true,
      experienceLevel: 'tried_little',
      archetype: 'The Confident Beginner'
    }));
    setStep(2);
    showToast("Check-in Generated!", "Analyzing your portfolio & learning priorities", 80);
  };

  const handleGoToHome = () => {
    navigateTo('home');
  };

  return (
    <div className="fade-in" style={{ maxWidth: 720, margin: '20px auto 60px auto', padding: '0 20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={() => step === 1 ? navigateTo('landing') : setStep(1)}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}
        >
          <ArrowLeft size={18} />
          <span>{step === 1 ? 'Exit to Landing' : 'Back to Questions'}</span>
        </button>
        <span className="badge badge-slate">
          {step === 1 ? 'EXPERIENCED INVESTOR CHECK-IN' : 'YOUR INVESTOR DIAGNOSTIC'}
        </span>
      </div>

      {step === 1 ? (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
            Tell us about your investing journey so far
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            We'll skip beginner 101s and focus on portfolio optimization, overlap detection, and risk management.
          </p>

          {/* Q1: Products */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 15, fontWeight: 700, display: 'block', marginBottom: 10 }}>
              1. What do you currently invest in?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { id: 'mutual_funds', label: 'Mutual Funds (SIP / Lumpsum)' },
                { id: 'stocks', label: 'Direct Stocks' },
                { id: 'etfs', label: 'ETFs & Index Funds' },
                { id: 'gold_debt', label: 'Gold & Fixed Income' }
              ].map(opt => {
                const isSelected = formData.products.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleProduct(opt.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      color: isSelected ? 'var(--primary-dark)' : 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <CheckCircle2 size={16} color="var(--primary-dark)" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Q2: Duration */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 15, fontWeight: 700, display: 'block', marginBottom: 10 }}>
              2. How long have you been investing?
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {[
                { id: 'less_6_months', label: 'Less than 6 months' },
                { id: '6_24_months', label: '6 – 24 months' },
                { id: '2plus_years', label: '2+ years' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setFormData(prev => ({ ...prev, duration: opt.id }))}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${formData.duration === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.duration === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    textAlign: 'center',
                    fontSize: 13,
                    fontWeight: 600
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
          </div>

          {/* Q3: Needs */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ fontSize: 15, fontWeight: 700, display: 'block', marginBottom: 10 }}>
              3. What would you like help with?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { id: 'portfolio_overlap', label: 'Understand portfolio overlap & true diversification' },
                { id: 'risk_understanding', label: 'Assess risk snapshot & asset allocation' },
                { id: 'goal_tracking', label: 'Connect existing investments to specific life goals' },
                { id: 'advanced_learning', label: 'Learn company balance sheets & financial metrics' }
              ].map(opt => {
                const isSelected = formData.helpNeeded.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleHelp(opt.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <CheckCircle2 size={16} color="var(--primary-dark)" />}
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={handleFinishQuestions}
            style={{ width: '100%', padding: '14px', fontSize: 16 }}
          >
            <span>Run Investor Diagnostic & Check-in</span>
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        /* STEP 2: INVESTOR CHECK-IN REPORT */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="groww-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span className="badge badge-green">CHECK-IN COMPLETE</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Personalized diagnostic</span>
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 800 }}>
              Welcome back! Here is your FirstStep Check-in
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
              You already have investing experience. We've customized your FirstStep dashboard to focus on portfolio intelligence and goal alignment.
            </p>

            {/* Diagnostic Snapshot Cards */}
            <div className="grid-2" style={{ marginTop: 24, gap: 14 }}>
              <div style={{ padding: '18px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-dark)', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  <PieChart size={16} />
                  <span>Portfolio Understanding</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
                  Overlap Warning Detected
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                  42% of your mutual fund equity is in the same top 5 stocks. We'll show you how to detect hidden fund overlap.
                </p>
              </div>

              <div style={{ padding: '18px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-blue)', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>
                  <TrendingUp size={16} />
                  <span>Risk & Time Horizon</span>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)' }}>
                  82% Equity Allocation
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
                  High-growth orientation suitable for 5+ years. Ensure you keep 3-6 months in safe liquid debt.
                </p>
              </div>
            </div>

            {/* Key Recommendation Box */}
            <div style={{
              background: '#EFF6FF',
              border: '1.5px solid #BFDBFE',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px',
              marginTop: 20
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF', marginBottom: 4 }}>
                Recommended Educational Next Step:
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1E3A8A' }}>
                "Explore Portfolio Explainer & Overlap Analysis"
              </div>
              <p style={{ fontSize: 12, color: '#3B82F6', marginTop: 4 }}>
                Learn how to evaluate whether multiple funds actually diversify your risk or simply duplicate fees.
              </p>
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button
                className="btn-primary"
                onClick={handleGoToHome}
                style={{ width: '100%', padding: '14px', fontSize: 16 }}
              >
                <span>Go to Personalized Home Dashboard</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
