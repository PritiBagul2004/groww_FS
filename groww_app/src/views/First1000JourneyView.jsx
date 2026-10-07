import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Target, TrendingUp, Sliders, Play, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export function First1000JourneyView() {
  const { first1kStep, setFirst1kStep, navigateTo, showToast, unlockedBadges, unlockBadge } = useApp();
  const [activeStep, setActiveStep] = useState(first1kStep || 1);

  // Step 2 state: Goal
  const [selectedGoal, setSelectedGoal] = useState("Higher Education / Course");
  // Step 3 state: Risk
  const [selectedRisk, setSelectedRisk] = useState("Moderate Growth (3-5+ years)");
  // Step 4 state: Selected Product Category for deep dive
  const [selectedCategory, setSelectedCategory] = useState("index_funds");
  // Step 5 state: Compounding Calculator
  const [monthlyAmount, setMonthlyAmount] = useState(1000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);

  // Compute compounding
  const totalMonths = years * 12;
  const monthlyRate = expectedReturn / 100 / 12;
  const investedTotal = monthlyAmount * totalMonths;
  const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  const estimatedWealthGain = Math.max(0, Math.round(futureValue - investedTotal));

  const handleNextStep = () => {
    if (activeStep < 6) {
      const next = activeStep + 1;
      setActiveStep(next);
      setFirst1kStep(Math.max(first1kStep, next));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Step 6 finish
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      showToast("First ₹1,000 Journey Completed! 🚀", "You unlocked the First ₹1,000 Milestone Badge!", 150);
      navigateTo('home');
    }
  };

  const productCategories = {
    index_funds: {
      name: "Diversified Index Funds (e.g. Nifty 50)",
      badge: "Passive / Low Cost",
      whatItIs: "A fund that automatically holds the top 50 largest companies in India in the exact same proportion as the Nifty 50 index.",
      howItWorks: "Your ₹1,000 is automatically split across Tata, Reliance, Infosys, HDFC, L&T, etc. No human fund manager is trying to pick risky single stocks.",
      benefits: "Ultra-low expense ratio (0.1% to 0.2%), zero single-company bankruptcy risk, long-term reflection of Indian economic growth.",
      risks: "Subject to normal market volatility (prices rise and fall with the overall Indian economy).",
      whoItFits: "Beginners starting with a 3–5+ year time horizon wanting low-maintenance wealth compounding.",
      learnFirst: "Understand that index investing requires patience through 1-2 year market cycles."
    },
    flexi_cap: {
      name: "Active Diversified Equity Funds (Flexi Cap)",
      badge: "Active Growth",
      whatItIs: "A mutual fund managed by experienced fund managers who can invest across large, mid, and small companies.",
      howItWorks: "Fund managers research companies to pick potential market winners across multiple sectors.",
      benefits: "Potential to outperform standard market benchmarks through skilled company selection.",
      risks: "Higher expense ratio (0.5% - 1.0%) and risk of human manager underperformance.",
      whoItFits: "Investors wanting professional stock selection who have a 5+ year horizon.",
      learnFirst: "Check fund factsheet, expense ratio, and fund manager track record."
    },
    etfs: {
      name: "Exchange Traded Funds (Gold / Nifty ETFs)",
      badge: "Live Exchange Traded",
      whatItIs: "Baskets of assets (like Physical Gold or Nifty 50) that trade live on the stock market during market hours.",
      howItWorks: "Bought and sold in real-time through your Demat account just like an individual stock.",
      benefits: "Instant intraday liquidity, low fees, ability to buy units of physical gold electronically.",
      risks: "Requires placing orders during market hours; slight tracking errors may exist.",
      whoItFits: "Investors comfortable with demat order placement and looking for low-cost asset allocation.",
      learnFirst: "How to place market vs limit orders on Groww."
    },
    liquid_funds: {
      name: "Liquid & Overnight Debt Funds",
      badge: "Capital Safety / Buffer",
      whatItIs: "Funds investing in very short-term government treasury bills and high-grade bank debt instruments.",
      howItWorks: "Lends money for 1 to 90 days to top-tier financial institutions with negligible price risk.",
      benefits: "Virtually zero equity market volatility, next-day withdrawal, beats traditional savings account interest.",
      risks: "Returns are modest (typically 6% - 7%) and will not beat long-term equity growth.",
      whoItFits: "Parking emergency funds, semester fees, or money needed in under 12 months.",
      learnFirst: "Liquid funds are for safety and emergency liquidity, NOT high-growth wealth building."
    }
  };

  return (
    <div className="fade-in" style={{ maxWidth: 840, margin: '20px auto 60px auto', padding: '0 20px' }}>
      
      {/* Top Header & Step Tracker */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={() => activeStep > 1 ? setActiveStep(activeStep - 1) : navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 14, fontWeight: 600 }}
        >
          <ArrowLeft size={18} />
          <span>{activeStep === 1 ? 'Back to Dashboard' : `Back to Step ${activeStep - 1}`}</span>
        </button>
        <span className="badge badge-green">
          YOUR FIRST ₹1,000 • STEP {activeStep} OF 6
        </span>
      </div>

      {/* Progress Circles Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        padding: '16px 20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: 24,
        overflowX: 'auto'
      }}>
        {[
          { num: 1, label: 'Understand' },
          { num: 2, label: 'Goal' },
          { num: 3, label: 'Risk' },
          { num: 4, label: 'Options' },
          { num: 5, label: 'Simulate' },
          { num: 6, label: 'Start' }
        ].map(s => {
          const isDone = activeStep > s.num;
          const isCurr = activeStep === s.num;
          return (
            <div
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                opacity: isDone || isCurr ? 1 : 0.5
              }}
            >
              <div style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: isDone ? 'var(--primary-dark)' : isCurr ? 'var(--primary)' : '#E2E8F0',
                color: isDone || isCurr ? '#0E2922' : '#64748B',
                fontWeight: 800,
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {isDone ? '✓' : s.num}
              </div>
              <span style={{ fontSize: 13, fontWeight: isCurr ? 700 : 500, color: isCurr ? 'var(--text-main)' : 'var(--text-muted)' }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: UNDERSTAND WHY ₹1,000 IS ENOUGH */}
      {activeStep === 1 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>STEP 1 • MINDSET</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Why your first ₹1,000 is your most important investment
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
            Many young Indians believe they need ₹50,000 or a finance degree before they can start investing.
            In reality, the biggest hurdle is not capital—it is taking that first psychological step.
          </p>

          <div className="grid-2" style={{ gap: 14, marginBottom: 24 }}>
            <div style={{ padding: '16px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--primary-dark)', marginBottom: 4 }}>
                🌱 Builds the Investing Muscle
              </div>
              <p style={{ fontSize: 13, color: '#0E2922', lineHeight: 1.4 }}>
                Learning with ₹1,000 allows you to experience real market movements and dividends with zero anxiety.
              </p>
            </div>

            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)', marginBottom: 4 }}>
                ⏳ Unlocks the Magic of Time
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4 }}>
                ₹1,000 invested at 21 has 40 years to compound, multiplying far more than ₹10,000 invested at age 35.
              </p>
            </div>
          </div>

          <div style={{
            padding: '16px',
            background: '#F8FAFC',
            borderRadius: 'var(--radius-md)',
            border: '1px solid #E2E8F0',
            fontSize: 13,
            color: 'var(--text-muted)',
            marginBottom: 24
          }}>
            <strong>Remember:</strong> FirstStep is a simulation and educational guide to prepare you for informed decisions.
          </div>

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Define What This ₹1,000 Is For</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 2: DEFINE YOUR GOAL */}
      {activeStep === 2 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-blue" style={{ marginBottom: 12 }}>STEP 2 • PURPOSE</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            What is this ₹1,000 working towards?
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            Money without a target is easily spent. Tagging your investment to a milestone builds discipline.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: 24 }}>
            {[
              { emoji: '🎓', label: 'Higher Education / Course', desc: 'Certifications, Masters tuition' },
              { emoji: '✈️', label: 'Travel & Vacations', desc: 'Goa or Euro trip with friends' },
              { emoji: '💻', label: 'Laptop / Tech Upgrade', desc: 'New MacBook or creator setup' },
              { emoji: '🛟', label: 'Emergency Rainy Day Fund', desc: '1-3 months essential buffer' },
              { emoji: '💰', label: 'Long-Term Wealth Freedom', desc: '10+ year compounding journey' },
              { emoji: '🌱', label: 'First Investment Habit', desc: 'Just getting the ball rolling' }
            ].map(g => (
              <div
                key={g.label}
                onClick={() => setSelectedGoal(g.label)}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${selectedGoal === g.label ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: selectedGoal === g.label ? 'var(--primary-light)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 4 }}>{g.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>{g.label}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{g.desc}</div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Next: Understand Risk & Volatility</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 3: UNDERSTAND RISK */}
      {activeStep === 3 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-amber" style={{ marginBottom: 12 }}>STEP 3 • RISK RESILIENCE</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Understanding Risk: Volatility is the price of admission
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            Before allocating your first ₹1,000, choose your comfort level with price swings:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
            {[
              {
                id: 'safe',
                title: 'Conservative & Liquid (Under 1 Year)',
                desc: 'You cannot tolerate any dips because you need the money soon. Best for: Liquid & Arbitrage Funds.',
                fluctuation: 'Zero to minimal price swings (~6-7% expected return)'
              },
              {
                id: 'moderate',
                title: 'Moderate Growth (3 to 5+ Years)',
                desc: 'You can handle temporary 5-10% market swings knowing broad Indian indices trend upwards over time.',
                fluctuation: 'Moderate short-term swings (~11-13% long-term historical average)'
              },
              {
                id: 'aggressive',
                title: 'Long-Term Aggressive (7+ Years)',
                desc: 'You embrace market dips as discount buying opportunities and have a multi-year horizon.',
                fluctuation: 'High short-term volatility (~13-15%+ long-term potential)'
              }
            ].map(r => (
              <div
                key={r.id}
                onClick={() => setSelectedRisk(r.title)}
                style={{
                  padding: '16px 18px',
                  borderRadius: 'var(--radius-lg)',
                  border: `2px solid ${selectedRisk === r.title ? 'var(--primary)' : 'var(--border-color)'}`,
                  background: selectedRisk === r.title ? 'var(--primary-light)' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-main)' }}>{r.title}</div>
                  {selectedRisk === r.title && <CheckCircle2 size={18} color="var(--primary-dark)" />}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>{r.desc}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary-dark)', marginTop: 6 }}>
                  {r.fluctuation}
                </div>
              </div>
            ))}
          </div>

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Explore Investment Categories</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 4: EXPLORE BROAD PRODUCT CATEGORIES */}
      {activeStep === 4 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-purple" style={{ marginBottom: 12 }}>STEP 4 • PRODUCT LANDSCAPE</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            Explore Broad Investment Options
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            We explain broad categories rather than telling you which single stock to buy. Select a category to inspect its breakdown:
          </p>

          {/* Category Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}>
            {[
              { id: 'index_funds', label: 'Index Funds' },
              { id: 'flexi_cap', label: 'Flexi Cap Funds' },
              { id: 'etfs', label: 'ETFs & Gold' },
              { id: 'liquid_funds', label: 'Liquid Funds' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  fontWeight: 700,
                  background: selectedCategory === cat.id ? 'var(--primary-dark)' : 'var(--bg-subtle)',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category Deep Dive Card */}
          {(() => {
            const item = productCategories[selectedCategory];
            return (
              <div style={{
                padding: '20px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                marginBottom: 24
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 800 }}>{item.name}</h3>
                  <span className="badge badge-green">{item.badge}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, lineHeight: 1.5 }}>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>What it is:</strong> {item.whatItIs}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>How it works:</strong> {item.howItWorks}
                  </div>
                  <div style={{ color: '#166534', background: '#DCFCE7', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                    <strong>Potential Benefits:</strong> {item.benefits}
                  </div>
                  <div style={{ color: '#991B1B', background: '#FEE2E2', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                    <strong>Key Risks:</strong> {item.risks}
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-main)' }}>Who typically considers it:</strong> {item.whoItFits}
                  </div>
                </div>
              </div>
            );
          })()}

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Next: Simulate ₹1,000 Growth</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 5: SIMULATE ₹1,000 COMPOUNDING */}
      {activeStep === 5 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>STEP 5 • COMPOUNDING SIMULATOR</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            See what regular ₹1,000 investing can achieve
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            Adjust the sliders below to see the math of disciplined monthly SIP investing over time:
          </p>

          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 700 }}>
                <span>Monthly Investment</span>
                <span style={{ color: 'var(--primary-dark)' }}>₹{monthlyAmount.toLocaleString('en-IN')} / month</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={monthlyAmount}
                onChange={e => setMonthlyAmount(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 700 }}>
                <span>Time Period</span>
                <span style={{ color: 'var(--primary-dark)' }}>{years} Years</span>
              </div>
              <input
                type="range"
                min="3"
                max="25"
                step="1"
                value={years}
                onChange={e => setYears(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, fontWeight: 700 }}>
                <span>Hypothetical Annual Growth Rate</span>
                <span style={{ color: 'var(--primary-dark)' }}>{expectedReturn}% p.a.</span>
              </div>
              <input
                type="range"
                min="6"
                max="15"
                step="1"
                value={expectedReturn}
                onChange={e => setExpectedReturn(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary-dark)' }}
              />
            </div>
          </div>

          {/* Results Summary Box */}
          <div style={{
            padding: '20px',
            background: 'linear-gradient(135deg, #0E1318 0%, #1E2833 100%)',
            borderRadius: 'var(--radius-lg)',
            color: '#FFFFFF',
            marginBottom: 24
          }}>
            <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase' }}>
              Projected Portfolio Value (Simulation)
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#00D09C', marginTop: 4 }}>
              ₹{Math.round(futureValue).toLocaleString('en-IN')}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 14, fontSize: 13 }}>
              <div>
                <span style={{ color: '#94A3B8' }}>Total You Invested:</span>
                <div style={{ fontWeight: 700, color: '#FFFFFF', marginTop: 2 }}>₹{investedTotal.toLocaleString('en-IN')}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ color: '#94A3B8' }}>Compounding Gain:</span>
                <div style={{ fontWeight: 700, color: '#00D09C', marginTop: 2 }}>+₹{estimatedWealthGain.toLocaleString('en-IN')}</div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 11, color: 'var(--text-light)', marginBottom: 20 }}>
            * Simulation projection based on compound interest formulas for educational illustration. Not guaranteed returns.
          </div>

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Next: Review Readiness Checklist</span>
            <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 6: READINESS CHECKLIST & START */}
      {activeStep === 6 && (
        <div className="groww-card" style={{ padding: '32px 28px' }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>STEP 6 • READY TO START</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>
            You're Ready for Your First Investment Step! 🎉
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            You've completed all fundamental preparations. Here is your informed investor checklist:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
            {[
              { title: 'Connected money to a goal', desc: `Goal: ${selectedGoal}` },
              { title: 'Understood risk & volatility', desc: `Profile: ${selectedRisk}` },
              { title: 'Explored low-cost diversified options', desc: 'Understood index funds and expense ratios' },
              { title: 'Zero speculative trading traps', desc: 'Avoiding get-rich-quick F&O tips' }
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-light)',
                  border: '1px solid var(--primary-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12
                }}
              >
                <CheckCircle2 size={20} color="var(--primary-dark)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0E2922' }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--primary-dark)' }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            background: '#EFF6FF',
            border: '1px solid #BFDBFE',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            color: '#1E40AF',
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 10
          }}>
            <ShieldCheck size={20} color="#2563EB" style={{ flexShrink: 0 }} />
            <span>
              <strong>Case Study Prototype Note:</strong> In production, clicking below opens real Groww KYC & micro-SIP setup. Here it returns you to the Home dashboard with your unlocked First ₹1,000 Badge.
            </span>
          </div>

          <button className="btn-primary" onClick={handleNextStep} style={{ width: '100%', padding: '14px', fontSize: 16 }}>
            <span>Complete First ₹1,000 Journey & Claim Badge</span>
            <Award size={18} />
          </button>
        </div>
      )}

    </div>
  );
}
