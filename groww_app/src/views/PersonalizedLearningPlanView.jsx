import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, Circle, Sparkles, BookOpen, Clock, BarChart2, Zap, Award } from 'lucide-react';

export function PersonalizedLearningPlanView() {
  const { userProfile, completedLessons, navigateTo, openLesson } = useApp();

  // Determine default experience track
  const initialTrack = userProfile.userType === 'experienced' || userProfile.experienceLevel === 'experienced'
    ? 'experienced'
    : userProfile.experienceLevel === 'some_experience'
    ? 'some_experience'
    : 'beginner';

  const [selectedTrack, setSelectedTrack] = useState(initialTrack);

  const trackConfigs = {
    beginner: {
      name: "Beginner Track",
      badge: "🌱 Zero to Confident",
      description: "Gentle step-by-step foundation covering investing basics, visual chart reading, risk concepts, and your first ₹1,000 step.",
      modules: [
        {
          phase: "Phase 1 • Core Foundations",
          items: [
            { id: "what-is-investing", title: "1. What is investing & why it beats plain cash savings", duration: "3 min" },
            { id: "stocks-vs-mutual-funds", title: "2. Stocks vs Mutual Funds: How money actually grows", duration: "4 min" }
          ]
        },
        {
          phase: "Phase 2 • 📈 Visual Chart Literacy",
          items: [
            { id: "understanding-price-charts", title: "3. Understanding Price Charts (X-axis, Y-axis & Timeframes)", duration: "3 min", isChart: true },
            { id: "candlestick-charts-101", title: "4. Candlestick Charts: Open, High, Low, Close (OHLC)", duration: "4 min", isChart: true },
            { id: "calculating-returns", title: "5. Calculating Returns: Absolute Gain vs % Return", duration: "4 min", isChart: true },
            { id: "understanding-volatility-charts", title: "6. Risk & Volatility: Smooth vs Bumpy Paths", duration: "4 min", isChart: true }
          ]
        },
        {
          phase: "Phase 3 • Practice & First Steps",
          items: [
            { id: "first-1000-roadmap", title: "7. Your First ₹1,000 Journey (Guided Step-by-Step)", duration: "5 min", isFirst1k: true },
            { id: "power-of-compounding", title: "8. Portfolio Basics & The Power of Compounding", duration: "4 min" }
          ]
        }
      ]
    },
    some_experience: {
      name: "Some Experience Track",
      badge: "⚡ Practical Upskilling",
      description: "Deepen your chart analysis skills, understand volume confirmation, analyze drawdowns, and compare against benchmarks.",
      modules: [
        {
          phase: "Phase 1 • Advanced Visual Literacy",
          items: [
            { id: "understanding-price-charts", title: "1. Reading Price Charts across 1D to 5Y cycles", duration: "3 min", isChart: true },
            { id: "reading-trading-volume", title: "2. Trading Volume: Confirming real market momentum", duration: "3 min", isChart: true },
            { id: "calculating-returns", title: "3. Returns & CAGR: Daily vs Cumulative Growth", duration: "4 min", isChart: true },
            { id: "drawdowns-and-market-falls", title: "4. Drawdowns & Recoveries: Why red dips are paper drops", duration: "4 min", isChart: true }
          ]
        },
        {
          phase: "Phase 2 • Portfolio & Benchmarks",
          items: [
            { id: "portfolio-explainer-hub", title: "5. Portfolio Performance & 'Understand this graph' Milestone Analysis", duration: "5 min", isExplainer: true },
            { id: "what-is-diversification", title: "6. True Diversification & Overlap Detector", duration: "4 min" },
            { id: "comparing-investments-benchmarks", title: "7. Comparing Investments vs Nifty 50 Benchmark", duration: "4 min", isChart: true }
          ]
        },
        {
          phase: "Phase 3 • Interactive Challenges",
          items: [
            { id: "practice-charts-lab", title: "8. 🧪 Practice with Charts Lab (6 Visual Challenges)", duration: "6 min", isPractice: true }
          ]
        }
      ]
    },
    experienced: {
      name: "Experienced Track",
      badge: "🚀 Strategy & Simulation",
      description: "Skip beginner basics. Dive straight into portfolio overlap analysis, Risk vs Return mapping, and hands-on paper trading simulation.",
      modules: [
        {
          phase: "Phase 1 • Portfolio Intelligence & Risk",
          items: [
            { id: "portfolio-explainer-hub", title: "1. Explain My Portfolio & Overlap Detector Analysis", duration: "5 min", isExplainer: true },
            { id: "comparing-investments-benchmarks", title: "2. Benchmark Performance Comparison (Alpha Tracking)", duration: "4 min", isChart: true },
            { id: "risk-return-map", title: "3. Risk vs Return Efficiency Frontier Map", duration: "4 min", isExplainer: true }
          ]
        },
        {
          phase: "Phase 2 • Advanced Chart Interpretation",
          items: [
            { id: "candlestick-charts-101", title: "4. Advanced Candlestick Interpretation & Range Analysis", duration: "4 min", isChart: true },
            { id: "reading-trading-volume", title: "5. Volume Spikes & Institutional Conviction", duration: "3 min", isChart: true }
          ]
        },
        {
          phase: "Phase 3 • Virtual Simulation Lab",
          items: [
            { id: "paper-trading-sim", title: "6. Buy / Sell Paper Trading (₹10,000 Virtual Capital)", duration: "6 min", isSim: true },
            { id: "what-if-tester", title: "7. 'What If...' Scenario Stress Tester (Bull vs Crash)", duration: "5 min", isSim: true }
          ]
        }
      ]
    }
  };

  const currentConfig = trackConfigs[selectedTrack] || trackConfigs.beginner;

  return (
    <div className="fade-in" style={{ maxWidth: 860, margin: '20px auto 60px auto', padding: '0 20px' }}>
      
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--primary-light)',
          color: 'var(--primary-dark)',
          border: '1px solid var(--primary-border)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: 12,
          fontWeight: 800,
          marginBottom: 10
        }}>
          <Sparkles size={14} />
          <span>TAILORED ROADMAP • {userProfile.archetype.toUpperCase()}</span>
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Personalized Learning Plan</h1>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 560, margin: '4px auto 0 auto' }}>
          Visual, chart-integrated curricula structured for your exact experience level.
        </p>
      </div>

      {/* Track Selector Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 10,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: 24
      }}>
        {[
          { id: 'beginner', label: '1. Beginner', sub: 'Zero experience' },
          { id: 'some_experience', label: '2. Some Experience', sub: 'Knows basics' },
          { id: 'experienced', label: '3. Experienced', sub: 'Fast-track simulation' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTrack(t.id)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              background: selectedTrack === t.id ? 'var(--primary-dark)' : 'transparent',
              color: selectedTrack === t.id ? '#FFFFFF' : 'var(--text-muted)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 800 }}>{t.label}</div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 2 }}>{t.sub}</div>
          </button>
        ))}
      </div>

      {/* Track Description Banner */}
      <div className="groww-card" style={{
        padding: '18px 22px',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
        border: '1.5px solid #E2E8F0',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span className="badge badge-green">{currentConfig.badge}</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-main)' }}>{currentConfig.name}</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>
            {currentConfig.description}
          </p>
        </div>
      </div>

      {/* Curriculum Phases & Lesson List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32 }}>
        {currentConfig.modules.map((mod, modIdx) => (
          <div key={modIdx} className="groww-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--primary-dark)' }}>
                {mod.phase}
              </h3>
              <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 600 }}>
                {mod.items.length} Interactive Lessons
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {mod.items.map((item) => {
                const isCompleted = completedLessons.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      if (item.isSim) navigateTo('simulator');
                      else if (item.isPractice) navigateTo('practice_charts');
                      else if (item.isExplainer) navigateTo('portfolio_explainer');
                      else if (item.isFirst1k) navigateTo('first1000');
                      else openLesson(item.id);
                    }}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      background: isCompleted ? 'var(--primary-light)' : 'var(--bg-subtle)',
                      border: `1px solid ${isCompleted ? 'var(--primary-border)' : 'var(--border-subtle)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {isCompleted ? (
                        <CheckCircle2 size={18} color="var(--primary-dark)" />
                      ) : (
                        <Circle size={18} color="#94A3B8" />
                      )}
                      <div>
                        <span style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: isCompleted ? 'var(--primary-dark)' : 'var(--text-main)',
                          textDecoration: isCompleted ? 'line-through' : 'none'
                        }}>
                          {item.title}
                        </span>
                        {item.isChart && (
                          <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, color: '#0284C7', background: '#E0F2FE', padding: '1px 6px', borderRadius: 4 }}>
                            📈 Interactive Chart
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text-light)' }}>
                      <Clock size={13} />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Launch Button */}
      <div style={{ textAlign: 'center', display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button
          className="btn-primary"
          onClick={() => navigateTo('home')}
          style={{ padding: '14px 32px', fontSize: 15 }}
        >
          <span>Enter FirstStep Home Dashboard</span>
          <ArrowRight size={18} />
        </button>

        <button
          className="btn-outline"
          onClick={() => navigateTo('practice_charts')}
          style={{ padding: '14px 24px', fontSize: 15 }}
        >
          <span>🧪 Practice with Charts Lab</span>
        </button>
      </div>
    </div>
  );
}
