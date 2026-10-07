import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Award } from 'lucide-react';

export function ProfileRevealView() {
  const { userProfile, navigateTo } = useApp();

  const getArchetypeDetails = () => {
    switch (userProfile.archetype) {
      case 'The First-Paycheck Investor':
        return {
          emoji: '💰',
          tagline: 'Beginning to manage your first salary & build wealth habits.',
          focus: "We'll focus first on the 50/30/20 salary budget planner, emergency fund setup, and automating your first monthly SIP on payday.",
          badge: 'Salary Optimizer'
        };
      case 'The Flexible Investor':
        return {
          emoji: '🔄',
          tagline: 'Investing at your own flexible pace with irregular income.',
          focus: "We'll focus on annual targets (e.g. ₹12,000/year) and flexible contributions without the stress of rigid monthly SIP debits.",
          badge: 'Agile Saver'
        };
      case 'The Goal Builder':
        return {
          emoji: '🎯',
          tagline: 'Has clear financial milestones and wants structured execution.',
          focus: "We'll focus first on understanding risk, time horizon alignment, and diversified low-cost index investing.",
          badge: 'Goal Oriented'
        };
      case 'The Confident Beginner':
        return {
          emoji: '📈',
          tagline: 'Has basic knowledge and is ready to optimize portfolio health.',
          focus: "We'll focus on fund overlap detection, asset allocation, and avoiding behavioral mistakes during market cycles.",
          badge: 'Growth Ready'
        };
      default: // The Explorer
        return {
          emoji: '🌱',
          tagline: 'New to investing and curious about building financial knowledge.',
          focus: "We'll start from square one: zero financial jargon, relatable analogies, and practicing with ₹10,000 virtual simulator money.",
          badge: 'Explorer'
        };
    }
  };

  const details = getArchetypeDetails();

  return (
    <div className="fade-in" style={{ maxWidth: 680, margin: '30px auto 60px auto', padding: '0 20px' }}>
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
          marginBottom: 12
        }}>
          <Sparkles size={15} />
          <span>PROFILE GENERATED</span>
        </div>
        <h1 style={{ fontSize: 30, fontWeight: 800 }}>
          You're <span style={{ color: 'var(--primary-dark)' }}>{userProfile.archetype}</span>
        </h1>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 480, margin: '6px auto 0 auto' }}>
          {details.tagline}
        </p>
      </div>

      {/* Main Archetype Card */}
      <div className="groww-card" style={{ padding: '32px 28px', border: '2px solid var(--primary-border)', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'var(--primary-light)',
          zIndex: 0,
          opacity: 0.6
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 'var(--radius-lg)',
              background: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              boxShadow: '0 4px 12px rgba(0,208,156,0.2)'
            }}>
              {details.emoji}
            </div>
            <div>
              <span className="badge badge-green" style={{ marginBottom: 4 }}>
                {details.badge}
              </span>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{userProfile.archetype}</h2>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Tailored FirstStep Learning Plan</div>
            </div>
          </div>

          <p style={{ fontSize: 14, color: 'var(--text-main)', lineHeight: 1.6, marginBottom: 24 }}>
            {details.focus}
          </p>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 20, marginBottom: 24 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 14 }}>
              YOUR STARTING POINT SNAPSHOT
            </div>

            <div className="grid-2" style={{ gap: 12 }}>
              <div style={{ padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>EXPERIENCE LEVEL</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginTop: 2, textTransform: 'capitalize' }}>
                  {userProfile.experienceLevel ? userProfile.experienceLevel.replace('_', ' ') : 'Beginner'}
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>COMFORT CAPACITY</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>
                  {userProfile.investmentCapacity === '0_1000' ? '₹0 – ₹1,000 / mo' :
                   userProfile.investmentCapacity === '1000_5000' ? '₹1,000 – ₹5,000 / mo' :
                   userProfile.investmentCapacity === '5000_10000' ? '₹5,000 – ₹10,000 / mo' : '₹10,000+ / mo'}
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>TIME HORIZON</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>
                  {userProfile.timeHorizon === '5plus' ? '5+ Years (Long Term)' :
                   userProfile.timeHorizon === '3_5yr' ? '3 to 5 Years' :
                   userProfile.timeHorizon === '1_3yr' ? '1 to 3 Years' : 'Under 1 Year (Liquid)'}
                </div>
              </div>

              <div style={{ padding: '12px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>LEARNING PREFERENCE</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginTop: 2 }}>
                  Interactive & Jargon-free
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 24 }}>
            <ShieldCheck size={14} color="#00B386" />
            <span>This is an educational profile to personalize your learning roadmap, not a financial advisory diagnosis.</span>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigateTo('learning_plan_preview')}
            style={{ width: '100%', padding: '14px', fontSize: 16 }}
          >
            <span>See My Personalized Learning Plan</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
