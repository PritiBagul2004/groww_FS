import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Play } from 'lucide-react';

export function LandingView() {
  const { navigateTo, startDemoMode } = useApp();

  return (
    <div className="fade-in" style={{ paddingBottom: 60 }}>
      {/* Hero Section */}
      <section style={{
        maxWidth: 1000,
        margin: '50px auto 30px auto',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'var(--primary-light)',
          color: 'var(--primary-dark)',
          border: '1px solid var(--primary-border)',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          fontSize: 13,
          fontWeight: 700,
          marginBottom: 20
        }}>
          <Sparkles size={16} />
          <span>GROWW FIRSTSTEP</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 54px)',
          fontWeight: 800,
          color: 'var(--text-main)',
          letterSpacing: '-1.5px',
          lineHeight: 1.15,
          marginBottom: 18
        }}>
          Investing for the first time? <br />
          <span style={{
            background: 'linear-gradient(90deg, #00B386 0%, #00D09C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Start here.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: 'var(--text-muted)',
          maxWidth: 680,
          margin: '0 auto 32px auto',
          lineHeight: 1.5
        }}>
          Whether you're a student, earning your first paycheck, or working part-time, FirstStep helps you understand investing and find your starting point.
        </p>

        {/* 3 CTAs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          marginBottom: 20
        }}>
          <button
            className="btn-primary"
            onClick={() => navigateTo('beginner_onboarding')}
            style={{ fontSize: 16, padding: '14px 28px' }}
          >
            <span>🌱 I'm new to investing</span>
            <ArrowRight size={18} />
          </button>

          <button
            className="btn-secondary"
            onClick={() => navigateTo('experienced_onboarding')}
            style={{ fontSize: 16, padding: '14px 24px' }}
          >
            <span>📈 I already invest</span>
          </button>

          <button
            onClick={startDemoMode}
            style={{
              background: '#F1F5F9',
              color: '#334155',
              border: '1.5px dashed #CBD5E1',
              fontWeight: 700,
              padding: '13px 22px',
              borderRadius: 'var(--radius-md)',
              fontSize: 15,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}
          >
            <Play size={16} color="#00B386" />
            <span>Explore without signing up (Demo)</span>
          </button>
        </div>

        <div style={{ fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <ShieldCheck size={15} color="#00B386" />
          <span>Educational exploration • Zero real financial transactions • Takes only 2 minutes</span>
        </div>
      </section>

      {/* 4 Core Pillars */}
      <section style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px' }}>
        <div className="grid-4">
          <div className="groww-card" style={{ padding: '24px' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary-light)',
              color: 'var(--primary-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              marginBottom: 14
            }}>
              📖
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-dark)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              LEARN
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 8px 0' }}>Zero Financial Jargon</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Understand stocks, SIPs, and mutual funds through real-world analogies rather than dry textbook definitions.
            </p>
          </div>

          <div className="groww-card" style={{ padding: '24px' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-blue-bg)',
              color: 'var(--accent-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              marginBottom: 14
            }}>
              🎯
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-blue)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              PLAN
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 8px 0' }}>Connect Money to Goals</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Match your time horizon to the right risk level—whether saving for a laptop, trip, or long-term wealth.
            </p>
          </div>

          <div className="groww-card" style={{ padding: '24px' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-purple-bg)',
              color: 'var(--accent-purple)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              marginBottom: 14
            }}>
              🎮
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-purple)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              SIMULATE
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 8px 0' }}>Practice Before Risking ₹1</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Build a virtual ₹10,000 portfolio, experience simulated market dips, and build behavioral resilience.
            </p>
          </div>

          <div className="groww-card" style={{ padding: '24px' }}>
            <div style={{
              width: 44,
              height: 44,
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-amber-bg)',
              color: 'var(--accent-amber)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              marginBottom: 14
            }}>
              🌱
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-amber)', letterSpacing: 0.5, textTransform: 'uppercase' }}>
              GROW
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, margin: '4px 0 8px 0' }}>First ₹1,000 Habit</div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              From pocket money micro-SIPs to your first salary plan, build a lifelong investing habit.
            </p>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section style={{
        maxWidth: 1000,
        margin: '50px auto',
        padding: '36px 30px',
        background: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--primary-dark)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            STEP-BY-STEP ROADMAP
          </span>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>How FirstStep Works</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4 }}>
            5 simple steps to go from complete beginner to confident investor
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#0E2922',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              1
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Tell us about yourself</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Answer 5 simple questions about your life stage, monthly comfort capacity, and risk comfort. (No bank details or sensitive info needed).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#0E2922',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              2
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Discover your investor profile</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Get identified into an actionable profile (e.g. <em>The Goal Builder</em> or <em>The First-Paycheck Investor</em>) tailored to your exact cashflow.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#0E2922',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              3
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Get a personalized 4-week learning path</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Bite-sized 2–3 minute lessons with relatable analogies and mini-quizzes that earn you XP badges.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#0E2922',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              4
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Practice with ₹10,000 virtual simulator</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Allocate across index funds, ETFs, and debt, then test how your portfolio behaves during market crashes without risking a single rupee.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: 'var(--primary)',
              color: '#0E2922',
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              5
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>Take your informed first step</div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Complete your First ₹1,000 journey and transition seamlessly to the Groww ecosystem with complete confidence.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
