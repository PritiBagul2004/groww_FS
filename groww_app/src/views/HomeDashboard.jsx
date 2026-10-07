import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { MARKET_DATA } from '../data/marketData';
import { MOCK_PORTFOLIO_DATA } from '../data/portfolioData';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  BookOpen,
  PieChart,
  ShieldCheck,
  CheckCircle2,
  Circle,
  Play,
  Award,
  Flame,
  Clock,
  Plus,
  Zap,
  Sliders,
  HelpCircle,
  GraduationCap
} from 'lucide-react';

export function HomeDashboard({ onOpenAddGoal }) {
  const {
    userProfile,
    completedLessons,
    goalsList,
    xp,
    streak,
    first1kStep,
    navigateTo,
    openLesson,
    budgetPlan,
    setBudgetPlan,
    contributeToGoal,
    showToast
  } = useApp();

  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [quickContribGoalId, setQuickContribGoalId] = useState(null);
  const [quickContribAmount, setQuickContribAmount] = useState(500);

  // Compute overall FirstStep Journey progress %
  const totalCoreSteps = 10;
  const completedCount = completedLessons.length + (goalsList.length > 0 ? 1 : 0) + (first1kStep > 1 ? 1 : 0);
  const journeyProgressPct = Math.min(100, Math.round((completedCount / totalCoreSteps) * 100));

  // Determine dynamic "Next Best Step"
  const getNextBestStep = () => {
    if (userProfile.lifeStage === 'first_paycheck' && !completedLessons.includes('what-is-a-sip')) {
      return {
        title: "Build Your First Paycheck Budget Plan",
        duration: "3 min",
        category: "Habit & Planning",
        description: "You're beginning to manage your first regular salary. Learn how the 50/30/20 guideline helps you invest without sacrificing fun.",
        actionLabel: "Plan My Paycheck",
        onClick: () => setIsEditingBudget(true)
      };
    }
    if (userProfile.incomeSource === 'freelance' || userProfile.incomeSource === 'part_time') {
      return {
        title: "Set Your Flexible Annual Goal",
        duration: "3 min",
        category: "Flexible Investing",
        description: "Irregular income? You don't need a rigid monthly SIP. Set an annual target (e.g. ₹12,000) and invest at your own pace.",
        actionLabel: "Manage Goals",
        onClick: () => navigateTo('goals')
      };
    }
    if (!completedLessons.includes('what-is-a-sip')) {
      return {
        title: "Understand SIPs & Rupee Cost Averaging",
        duration: "3 min",
        category: "Core Concept",
        description: "You're interested in investing regularly. Learn how SIPs remove the stress of market timing before deciding if one fits your goals.",
        actionLabel: "Start Lesson (3 min)",
        onClick: () => openLesson('what-is-a-sip')
      };
    }
    if (!completedLessons.includes('what-is-diversification')) {
      return {
        title: "Master Diversification & Avoid Overlap",
        duration: "4 min",
        category: "Portfolio Safety",
        description: "Learn why holding 5 different funds might still concentrate your risk in the exact same 10 companies.",
        actionLabel: "Explore Diversification",
        onClick: () => openLesson('what-is-diversification')
      };
    }
    return {
      title: "Practice with ₹10,000 Virtual Simulator",
      duration: "5 min",
      category: "Hands-on Practice",
      description: "Test how your portfolio handles a simulated 15% market drop before putting real money on the line.",
      actionLabel: "Open Simulator",
      onClick: () => navigateTo('simulator')
    };
  };

  const nextStep = getNextBestStep();

  // Find next lesson to continue
  const nextIncompleteLesson = LESSONS_DATA.find(l => !completedLessons.includes(l.id)) || LESSONS_DATA[0];

  const handleQuickContributionSubmit = (goalId) => {
    contributeToGoal(goalId, quickContribAmount);
    setQuickContribGoalId(null);
  };

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Top Welcome & Progress Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #0E1318 0%, #1E2833 100%)',
        color: '#FFFFFF',
        padding: '24px 28px',
        border: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 160,
          height: 160,
          borderRadius: '50%',
          background: 'rgba(0, 208, 156, 0.15)',
          filter: 'blur(30px)'
        }} />

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: '#00D09C', fontWeight: 700 }}>
                {userProfile.archetype.toUpperCase()}
              </span>
              <span style={{ color: '#64748B' }}>•</span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>
                {userProfile.userType === 'demo' ? 'Exploring in Demo Mode' : 'Personalized Journey'}
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 800, color: '#FFFFFF' }}>
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'}, {userProfile.name.split(' ')[0]} 👋
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              background: 'rgba(255,255,255,0.08)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255,255,255,0.12)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}>
              <Flame size={16} color="#FB7185" />
              <span style={{ fontWeight: 700 }}>{streak} Day Streak</span>
            </div>

            <div style={{
              background: 'rgba(0, 208, 156, 0.15)',
              border: '1px solid rgba(0, 208, 156, 0.4)',
              padding: '8px 14px',
              borderRadius: 'var(--radius-full)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#00D09C'
            }}>
              <Award size={16} />
              <span style={{ fontWeight: 800 }}>{xp} Total XP</span>
            </div>
          </div>
        </div>

        {/* FirstStep Journey Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 8 }}>
            <span style={{ color: '#CBD5E1', fontWeight: 600 }}>Your FirstStep Journey</span>
            <span style={{ color: '#00D09C', fontWeight: 800 }}>{journeyProgressPct}% complete</span>
          </div>
          <div style={{ width: '100%', height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 9999, overflow: 'hidden' }}>
            <div style={{
              width: `${journeyProgressPct}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #00B386, #00D09C)',
              borderRadius: 9999,
              transition: 'width 0.6s ease'
            }} />
          </div>
          <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 8 }}>
            {completedLessons.length >= 8 ? (
              <span>🎉 You've unlocked Confident Investor status! Explore advanced modules and portfolio tools.</span>
            ) : (
              <span>{Math.max(1, 3 - (completedLessons.length % 3))} lessons away from your next milestone badge.</span>
            )}
          </div>
        </div>
      </div>

      {/* PRIMARY CARD: YOUR NEXT BEST STEP */}
      <div className="groww-card" style={{
        padding: '24px',
        border: '2px solid var(--primary-border)',
        background: 'linear-gradient(135deg, #FFFFFF 0%, #F4FCF9 100%)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <span className="badge badge-green">
            ⭐ YOUR NEXT BEST STEP
          </span>
          <span style={{ fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock size={13} />
            {nextStep.duration}
          </span>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginBottom: 6 }}>
          {nextStep.title}
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
          {nextStep.description}
        </p>

        <button
          className="btn-primary"
          onClick={nextStep.onClick}
          style={{ padding: '12px 24px' }}
        >
          <span>{nextStep.actionLabel}</span>
          <ArrowRight size={16} />
        </button>
      </div>

      {/* 📊 LEARN BY LOOKING — VISUAL FINANCIAL CHART MODULES */}
      <div className="groww-card" style={{ padding: '24px', border: '1.5px solid #E2E8F0' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
              <span className="badge badge-blue">INTERACTIVE CHARTS</span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Visual Learning Layer</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>📊 Learn by looking</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
              "Investors read charts every day. Learn what yours is telling you."
            </p>
          </div>

          <button
            className="btn-outline"
            onClick={() => navigateTo('practice_charts')}
            style={{ fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>🧪 Try Chart Practice Lab</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 4 Interactive Visual Chart Cards */}
        <div className="grid-4" style={{ gap: 12 }}>
          <div
            className="groww-card"
            onClick={() => openLesson('understanding-price-charts')}
            style={{
              padding: '16px',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>📈</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-main)' }}>Read a Price Chart</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>X-axis, Y-axis, highs, lows & timeframes</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontWeight: 700, color: 'var(--primary-dark)' }}>
              <span>3 min interactive</span>
              <ArrowRight size={12} />
            </div>
          </div>

          <div
            className="groww-card"
            onClick={() => openLesson('candlestick-charts-101')}
            style={{
              padding: '16px',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>🕯️</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-main)' }}>Understand Candlesticks</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Open, High, Low, Close & wick anatomy</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontWeight: 700, color: 'var(--primary-dark)' }}>
              <span>4 min interactive</span>
              <ArrowRight size={12} />
            </div>
          </div>

          <div
            className="groww-card"
            onClick={() => openLesson('understanding-volatility-charts')}
            style={{
              padding: '16px',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>⚡</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-main)' }}>Spot Volatility</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Why the smoothest path often beats wild swings</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontWeight: 700, color: 'var(--primary-dark)' }}>
              <span>3 min interactive</span>
              <ArrowRight size={12} />
            </div>
          </div>

          <div
            className="groww-card"
            onClick={() => openLesson('calculating-returns')}
            style={{
              padding: '16px',
              cursor: 'pointer',
              border: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              transition: 'var(--transition)'
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 8 }}>📊</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-main)' }}>Understand Portfolio Returns</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>Absolute gain vs % CAGR & cumulative growth</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, fontSize: 11, fontWeight: 700, color: 'var(--primary-dark)' }}>
              <span>5 min interactive</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      </div>

      {/* 🎮 PRACTICE BEFORE YOU INVEST (SIMULATOR + PAPER TRADING LAUNCHERS) */}
      <div className="groww-card" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        color: '#FFFFFF',
        border: 'none'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span className="badge badge-green">VIRTUAL SIMULATOR</span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>Zero Real Money Risk</span>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF' }}>
              🎮 Practice before you invest
            </h2>
            <p style={{ fontSize: 13, color: '#CBD5E1', marginTop: 2 }}>
              Learn what investing feels like before risking your actual hard-earned money.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={() => navigateTo('simulator')}
              style={{ padding: '10px 18px', background: '#00D09C', color: '#0F172A', fontWeight: 800 }}
            >
              <Play size={16} />
              <span>Try Market Simulator</span>
            </button>

            <button
              className="btn-outline"
              onClick={() => navigateTo('simulator')}
              style={{ padding: '10px 18px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
            >
              <span>Paper Trade (₹10,000)</span>
            </button>
          </div>
        </div>

        {/* Simulator Modes Preview */}
        <div className="grid-3" style={{ gap: 12 }}>
          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#38BDF8' }}>A. Market Event Simulation</div>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
              Navigate historical news, quarterly earnings spikes, and sudden 12% market downturns.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#34D399' }}>B. Buy / Sell Paper Trading</div>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
              Execute virtual orders at ₹250/share, track real-time P&L, and sell to lock in returns.
            </p>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.05)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#FBBF24' }}>C. "What If..." Stress Tester</div>
            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 4, lineHeight: 1.4 }}>
              Test starting amounts (₹1k–₹10k) against Bull markets vs Market Crash scenarios.
            </p>
          </div>
        </div>
      </div>

      {/* DUAL PROGRESS TRACKING: KNOWLEDGE + SIMULATION STATS */}
      <div className="grid-2">
        {/* INVESTING KNOWLEDGE PROGRESS */}
        <div className="groww-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={18} color="var(--primary-dark)" />
              <h3 style={{ fontSize: 16, fontWeight: 800 }}>Investing Knowledge</h3>
            </div>
            <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-dark)' }}>70%</span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: 8, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ width: '70%', height: '100%', background: '#00D09C', borderRadius: 9999 }} />
          </div>

          {/* Knowledge Checklist */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8, fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#047857', fontWeight: 600 }}>
              <CheckCircle2 size={14} color="#00B386" />
              <span>Investing basics</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#047857', fontWeight: 600 }}>
              <CheckCircle2 size={14} color="#00B386" />
              <span>Stocks vs mutual funds</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#047857', fontWeight: 600 }}>
              <CheckCircle2 size={14} color="#00B386" />
              <span>Risk & volatility</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#047857', fontWeight: 600 }}>
              <CheckCircle2 size={14} color="#00B386" />
              <span>Returns calculation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-dark)', fontWeight: 700 }}>
              <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary-dark)' }} />
              </div>
              <span>Reading charts</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-light)' }}>
              <Circle size={14} color="#94A3B8" />
              <span>Portfolio analysis</span>
            </div>
          </div>
        </div>

        {/* SIMULATION STATS TRACKER */}
        <div className="groww-card" style={{ padding: '24px', background: 'var(--bg-subtle)', border: '1.5px solid #CBD5E1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={18} color="#D97706" />
              <h3 style={{ fontSize: 16, fontWeight: 800 }}>Simulation Progress</h3>
            </div>
            <span className="badge badge-amber">LEARNING ONLY</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>₹10,650</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#00B386' }}>+6.5% Simulated Return</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', padding: '8px 12px', background: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: 8 }}>
            <div>
              <span style={{ color: 'var(--text-light)', fontSize: 10 }}>STARTING CAPITAL</span>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>₹10,000</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', fontSize: 10 }}>TRADES EXECUTED</span>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>4 Trades</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-light)', fontSize: 10 }}>DECISIONS LOGGED</span>
              <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>8 Decisions</div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--text-light)', textAlign: 'center' }}>
            *Virtual portfolio for practice. Does not represent real money transactions.
          </div>
        </div>
      </div>

      {/* FIRST PAYCHECK BUDGET PLANNER (Personalized Mode) */}
      {(userProfile.lifeStage === 'first_paycheck' || isEditingBudget) && (
        <div className="groww-card" style={{ padding: '24px', border: '1.5px solid #CBD5E1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 22 }}>💰</span>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 800 }}>First Paycheck Budget Planner</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>The 50/30/20 guideline for sustainable wealth building</div>
              </div>
            </div>
            <button
              onClick={() => setIsEditingBudget(!isEditingBudget)}
              className="btn-subtle"
            >
              {isEditingBudget ? 'Done Editing' : 'Customize Plan'}
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 12 }}>
            <div style={{ flex: '1 1 180px', padding: '14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 700 }}>MONTHLY SALARY</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>
                ₹{budgetPlan.income.toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{ flex: '1 1 180px', padding: '14px', background: '#EFF6FF', borderRadius: 'var(--radius-md)', border: '1px solid #BFDBFE' }}>
              <div style={{ fontSize: 11, color: '#1E40AF', fontWeight: 700 }}>NEEDS (50%)</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#1E3A8A', marginTop: 2 }}>
                ₹{budgetPlan.needs.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 10, color: '#3B82F6' }}>Rent, bills, groceries</div>
            </div>

            <div style={{ flex: '1 1 180px', padding: '14px', background: '#FEF3C7', borderRadius: 'var(--radius-md)', border: '1px solid #FCD34D' }}>
              <div style={{ fontSize: 11, color: '#92400E', fontWeight: 700 }}>WANTS (30%)</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#78350F', marginTop: 2 }}>
                ₹{budgetPlan.wants.toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 10, color: '#B45309' }}>Dining, hobbies, travel</div>
            </div>

            <div style={{ flex: '1 1 180px', padding: '14px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
              <div style={{ fontSize: 11, color: 'var(--primary-dark)', fontWeight: 700 }}>INVESTING & SIP (20%)</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#0E2922', marginTop: 2 }}>
                ₹{(budgetPlan.investing + budgetPlan.savings).toLocaleString('en-IN')}
              </div>
              <div style={{ fontSize: 10, color: 'var(--primary-dark)' }}>Auto-SIP on salary day</div>
            </div>
          </div>

          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
            <span>💡 Pro-tip: Set your automated mutual fund SIP debit for the 5th of every month right after salary hits.</span>
            <button
              onClick={() => openLesson('what-is-a-sip')}
              style={{ color: 'var(--primary-dark)', fontWeight: 700, textDecoration: 'underline' }}
            >
              Learn about SIPs
            </button>
          </div>
        </div>
      )}

      {/* TWO COLUMN GRID: FIRST ₹1,000 JOURNEY & GOALS */}
      <div className="grid-2">
        
        {/* YOUR FIRST ₹1,000 GUIDED TRACK */}
        <div className="groww-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={18} color="var(--primary-dark)" />
                <h3 style={{ fontSize: 17, fontWeight: 800 }}>Your First ₹1,000</h3>
              </div>
              <span className="badge badge-green">
                Step {first1kStep} of 6
              </span>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              A guided 6-step roadmap from zero knowledge to taking your first informed investment step.
            </p>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
              {[
                { stepNum: 1, title: 'Understand your starting options' },
                { stepNum: 2, title: 'Define your investment goal' },
                { stepNum: 3, title: 'Learn about market risk & volatility' },
                { stepNum: 4, title: 'Explore broad investment categories' },
                { stepNum: 5, title: 'Simulate ₹1,000 compounding projection' },
                { stepNum: 6, title: 'Take your first real-world step' }
              ].map((s) => {
                const isPassed = first1kStep > s.stepNum;
                const isCurrent = first1kStep === s.stepNum;
                return (
                  <div
                    key={s.stepNum}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      fontSize: 13,
                      color: isPassed ? 'var(--text-muted)' : isCurrent ? 'var(--primary-dark)' : 'var(--text-light)',
                      fontWeight: isCurrent ? 700 : 500
                    }}
                  >
                    {isPassed ? (
                      <CheckCircle2 size={16} color="var(--primary-dark)" />
                    ) : isCurrent ? (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--primary-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--primary-dark)' }} />
                      </div>
                    ) : (
                      <Circle size={16} color="#CBD5E1" />
                    )}
                    <span style={{ textDecoration: isPassed ? 'line-through' : 'none' }}>
                      {s.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="btn-outline"
            onClick={() => navigateTo('first1000')}
            style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <span>Continue First ₹1,000 Journey</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* YOUR GOALS PREVIEW */}
        <div className="groww-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Target size={18} color="var(--accent-blue)" />
                <h3 style={{ fontSize: 17, fontWeight: 800 }}>Your Goals</h3>
              </div>
              <button
                onClick={() => navigateTo('goals')}
                style={{ fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700 }}
              >
                View all ({goalsList.length})
              </button>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Connecting every Rupee to a clear life milestone gives you investing discipline.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {goalsList.slice(0, 2).map((g) => {
                const pct = Math.min(100, Math.round((g.currentAmount / g.targetAmount) * 100));
                return (
                  <div key={g.id} style={{ padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 14 }}>
                        <span>{g.emoji}</span>
                        <span>{g.name}</span>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-dark)' }}>{pct}%</span>
                    </div>

                    <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden', marginBottom: 6 }}>
                      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 9999 }} />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)' }}>
                      <span>₹{g.currentAmount.toLocaleString('en-IN')} saved</span>
                      <span>Target: ₹{g.targetAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            className="btn-secondary"
            onClick={() => navigateTo('goals')}
            style={{ width: '100%' }}
          >
            <span>+ Add / Manage Goals</span>
          </button>
        </div>

      </div>

      {/* CONTINUE LEARNING & MARKET IN 60 SECONDS */}
      <div className="grid-2">
        
        {/* CONTINUE LEARNING CARD */}
        <div className="groww-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <BookOpen size={18} color="var(--primary-dark)" />
              <h3 style={{ fontSize: 17, fontWeight: 800 }}>Continue Learning</h3>
            </div>
            <button
              onClick={() => navigateTo('learn')}
              style={{ fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700 }}
            >
              Explore Hub
            </button>
          </div>

          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-subtle)',
            border: '1px solid var(--border-color)',
            marginBottom: 16
          }}>
            <span className="badge badge-purple" style={{ marginBottom: 6 }}>
              {nextIncompleteLesson.category} • {nextIncompleteLesson.duration}
            </span>
            <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2, color: 'var(--text-main)' }}>
              {nextIncompleteLesson.title}
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
              {nextIncompleteLesson.summary}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700 }}>
              <Award size={14} />
              <span>+{nextIncompleteLesson.xp} XP on completion</span>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => openLesson(nextIncompleteLesson.id)}
            style={{ width: '100%' }}
          >
            <span>Start Lesson ({nextIncompleteLesson.duration})</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* MARKET IN 60 SECONDS */}
        <div className="groww-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <TrendingUp size={18} color="#00B386" />
              <h3 style={{ fontSize: 17, fontWeight: 800 }}>Market in 60 Seconds</h3>
            </div>
            <span className="badge badge-demo">SIMULATED DATA</span>
          </div>

          {/* Indices Ticker */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
            {MARKET_DATA.indices.slice(0, 2).map((idx) => (
              <div key={idx.name} style={{ padding: '10px 12px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>{idx.name}</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>{idx.value}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: idx.isPositive ? '#00B386' : '#E11D48', marginTop: 1 }}>
                  {idx.percentChange} ({idx.change})
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: 'var(--radius-md)', border: '1px solid #E2E8F0', marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-main)' }}>
              Why did markets move today?
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>
              {MARKET_DATA.marketUpdate.headline}
            </p>
          </div>

          <button
            className="btn-secondary"
            onClick={() => openLesson('what-is-an-index')}
            style={{ width: '100%', fontSize: 13 }}
          >
            <span>Learn: What is an Index? (3 min)</span>
          </button>
        </div>

      </div>

      {/* PORTFOLIO SNAPSHOT & CAMPUS PREVIEW */}
      <div className="grid-2">
        
        {/* DEMO PORTFOLIO WIDGET */}
        <div className="groww-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <PieChart size={18} color="var(--primary-dark)" />
              <h3 style={{ fontSize: 17, fontWeight: 800 }}>Your Portfolio</h3>
            </div>
            <span className="badge badge-demo">SIMULATED PORTFOLIO</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{MOCK_PORTFOLIO_DATA.totalValue.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#00B386' }}>
              {MOCK_PORTFOLIO_DATA.percentReturn} (+₹{MOCK_PORTFOLIO_DATA.absoluteReturn})
            </span>
          </div>

          {/* Allocation Bar */}
          <div style={{ width: '100%', height: 12, borderRadius: 9999, display: 'flex', overflow: 'hidden', marginBottom: 12 }}>
            <div style={{ width: `${MOCK_PORTFOLIO_DATA.allocation.equity}%`, background: '#3B82F6' }} title="Equity 82%" />
            <div style={{ width: `${MOCK_PORTFOLIO_DATA.allocation.debt}%`, background: '#10B981' }} title="Debt 10%" />
            <div style={{ width: `${MOCK_PORTFOLIO_DATA.allocation.cash}%`, background: '#64748B' }} title="Cash 8%" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-muted)', marginBottom: 20 }}>
            <span>🔵 Equity 82%</span>
            <span>🟢 Debt 10%</span>
            <span>⚪ Cash 8%</span>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigateTo('portfolio_explainer')}
            style={{ width: '100%' }}
          >
            <span>Explain My Portfolio</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* GROWW CAMPUS BANNER */}
        <div className="groww-card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 100%)',
          border: '1.5px solid #E9D5FF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span className="badge badge-purple">
                🎓 GROWW CAMPUS
              </span>
              <span style={{ fontSize: 12, color: 'var(--accent-purple)', fontWeight: 700 }}>
                1,400+ Students Learning
              </span>
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 800, color: '#581C87', marginBottom: 4 }}>
              Financial Literacy on College Campuses
            </h3>
            <p style={{ fontSize: 13, color: '#6B21A8', lineHeight: 1.5, marginBottom: 16 }}>
              Join upcoming masterclasses, solve weekly ₹10,000 portfolio challenges, and apply to become a Campus Ambassador.
            </p>
          </div>

          <button
            className="btn-secondary"
            onClick={() => navigateTo('campus')}
            style={{ width: '100%', background: '#FFFFFF', borderColor: '#D8B4FE', color: '#6B21A8', fontWeight: 700 }}
          >
            <GraduationCap size={16} />
            <span>Explore Campus Community</span>
          </button>
        </div>

      </div>

    </div>
  );
}
