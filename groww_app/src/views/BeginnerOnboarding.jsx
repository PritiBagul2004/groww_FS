import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Sparkles, HelpCircle } from 'lucide-react';

export function BeginnerOnboarding() {
  const { completeOnboarding, navigateTo } = useApp();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  // Form State
  const [formData, setFormData] = useState({
    lifeStage: 'student',
    incomeSource: 'stipend',
    investmentCapacity: '1000_5000',
    experienceLevel: 'completely_new',
    goals: ['long_term_wealth', 'higher_studies'],
    timeHorizon: '5plus',
    riskComfort: 'wait',
    learningStyles: ['interactive', 'short_reads']
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData(prev => {
      const current = prev[field] || [];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...current, value] };
      }
    });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      completeOnboarding(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigateTo('landing');
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  return (
    <div className="fade-in" style={{ maxWidth: 680, margin: '20px auto 60px auto', padding: '0 20px' }}>
      {/* Top Header & Progress */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: 'var(--text-muted)',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          <ArrowLeft size={18} />
          <span>{step === 1 ? 'Exit' : 'Back'}</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--primary-dark)' }}>
            Step {step} of {totalSteps}
          </span>
          <div style={{ width: 100, height: 6, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
            <div
              style={{
                width: `${(step / totalSteps) * 100}%`,
                height: '100%',
                background: 'var(--primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        <button
          onClick={handleSkip}
          style={{ fontSize: 13, color: 'var(--text-light)', fontWeight: 500 }}
        >
          Skip
        </button>
      </div>

      {/* Main Card */}
      <div className="groww-card" style={{ padding: '32px 28px' }}>
        
        {/* SCREEN 1: LIFE STAGE */}
        {step === 1 && (
          <div>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>
              LIFE STAGE
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              Where are you right now?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              Your current stage helps us tailor recommendations to your lifestyle and cashflow.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { id: 'student', emoji: '🎓', title: 'Student', desc: 'In college or school, managing pocket money or savings.' },
                { id: 'intern', emoji: '💼', title: 'Intern / Part-time', desc: 'Receiving monthly stipends or gig project earnings.' },
                { id: 'first_paycheck', emoji: '💰', title: 'First paycheck', desc: 'Recently started full-time work and received first salary.' },
                { id: 'early_career', emoji: '📈', title: 'Early-career professional', desc: 'Working for 1–3 years, looking to organize investments.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('lifeStage', opt.id)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${formData.lifeStage === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.lifeStage === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-main)' }}>{opt.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{opt.desc}</div>
                    </div>
                  </div>
                  {formData.lifeStage === opt.id && <CheckCircle2 size={20} color="var(--primary-dark)" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 2: MONEY SITUATION */}
        {step === 2 && (
          <div>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>
              MONEY SITUATION
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              How does money currently come to you?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              No exact bank details needed. Just a broad sense of how you receive funds.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 28 }}>
              {[
                { id: 'family', label: 'Family support' },
                { id: 'stipend', label: 'Scholarship / stipend' },
                { id: 'part_time', label: 'Part-time income' },
                { id: 'internship', label: 'Internship income' },
                { id: 'salary', label: 'Monthly salary' },
                { id: 'freelance', label: 'Irregular / freelance' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('incomeSource', opt.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${formData.incomeSource === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.incomeSource === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                    color: formData.incomeSource === opt.id ? 'var(--primary-dark)' : 'var(--text-main)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{opt.label}</span>
                  {formData.incomeSource === opt.id && <CheckCircle2 size={16} color="var(--primary-dark)" />}
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
              How much could you comfortably set aside each month?
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 14 }}>
              Investing even ₹500/month is a fantastic starting point.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { id: '0_1000', label: '₹0 – ₹1,000 / month', desc: 'Pocket money friendly' },
                { id: '1000_5000', label: '₹1,000 – ₹5,000 / month', desc: 'Stipend / first salary' },
                { id: '5000_10000', label: '₹5,000 – ₹10,000 / month', desc: 'Building serious savings' },
                { id: '10000_plus', label: '₹10,000+ / month', desc: 'Accelerated investing' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('investmentCapacity', opt.id)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${formData.investmentCapacity === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.investmentCapacity === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)' }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 3: INVESTMENT EXPERIENCE */}
        {step === 3 && (
          <div>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>
              INVESTMENT EXPERIENCE
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              How familiar are you with investing?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
              There are no wrong answers. We will adjust the level of jargon accordingly.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                {
                  id: 'completely_new',
                  emoji: '🌱',
                  title: 'Completely new',
                  desc: "I don't really understand investment terms yet, and need simple explanations from scratch."
                },
                {
                  id: 'heard_about_it',
                  emoji: '🌿',
                  title: "I've heard about it",
                  desc: "I know terms like SIP, stocks, and mutual funds, but don't know how to choose what fits me."
                },
                {
                  id: 'tried_little',
                  emoji: '🌳',
                  title: "I've tried a little",
                  desc: "I have invested small amounts before, but don't fully understand how to build a structured portfolio."
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('experienceLevel', opt.id)}
                  style={{
                    padding: '18px 20px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${formData.experienceLevel === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.experienceLevel === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <span style={{ fontSize: 28 }}>{opt.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)' }}>{opt.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{opt.desc}</div>
                    </div>
                  </div>
                  {formData.experienceLevel === opt.id && <CheckCircle2 size={22} color="var(--primary-dark)" style={{ flexShrink: 0 }} />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 4: INVESTMENT GOALS & TIME HORIZON */}
        {step === 4 && (
          <div>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>
              GOALS & HORIZON
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              What would you like your money to achieve?
            </h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Select one or more goals (multi-select):
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 24 }}>
              {[
                { id: 'higher_studies', emoji: '🎓', label: 'Higher Education' },
                { id: 'travel', emoji: '✈️', label: 'Travel & Trips' },
                { id: 'laptop', emoji: '💻', label: 'Laptop / Tech' },
                { id: 'vehicle', emoji: '🚗', label: 'Two-wheeler / Vehicle' },
                { id: 'future_home', emoji: '🏠', label: 'Future Independence' },
                { id: 'financial_safety', emoji: '🛟', label: 'Emergency Safety Buffer' },
                { id: 'long_term_wealth', emoji: '💰', label: 'Long-term Wealth' },
                { id: 'just_starting', emoji: '🌱', label: 'Just Getting Started' }
              ].map(opt => {
                const isSelected = formData.goals.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleArrayField('goals', opt.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10
                    }}
                  >
                    <span style={{ fontSize: 18 }}>{opt.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: isSelected ? 'var(--primary-dark)' : 'var(--text-main)' }}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>
              When might you need this money?
            </h3>
            <p style={{ fontSize: 12, color: 'var(--primary-dark)', background: 'var(--primary-light)', padding: '6px 12px', borderRadius: 'var(--radius-sm)', marginBottom: 12 }}>
              💡 Your time horizon affects how you should think about risk (short term = safe liquid funds, long term = growth index funds).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { id: 'less_1yr', label: 'Less than 1 year', desc: 'Short term / liquid safe' },
                { id: '1_3yr', label: '1 to 3 years', desc: 'Medium term balance' },
                { id: '3_5yr', label: '3 to 5 years', desc: 'Growth potential' },
                { id: '5plus', label: '5+ years', desc: 'Long-term compounding' },
                { id: 'not_sure', label: 'Not sure yet', desc: 'Start with flexi basics' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('timeHorizon', opt.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${formData.timeHorizon === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.timeHorizon === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-main)' }}>{opt.label}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-light)' }}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCREEN 5: RISK COMFORT SNAPSHOT */}
        {step === 5 && (
          <div>
            <span className="badge badge-amber" style={{ marginBottom: 12 }}>
              RISK COMFORT SNAPSHOT
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              Imagine this scenario...
            </h2>
            <div style={{
              padding: '16px',
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: 'var(--radius-md)',
              fontSize: 14,
              color: '#92400E',
              lineHeight: 1.5,
              marginBottom: 20
            }}>
              "You invested <strong>₹10,000</strong>. A few months later, due to a global market correction, it is temporarily worth <strong>₹8,000 (-20%)</strong>."
              <div style={{ fontWeight: 700, marginTop: 6, color: '#78350F' }}>
                What would you most likely do?
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {[
                {
                  id: 'sell',
                  emoji: '😰',
                  title: 'Option A: Sell',
                  desc: "I'd rather sell immediately to avoid any further losses."
                },
                {
                  id: 'wait',
                  emoji: '😐',
                  title: 'Option B: Wait',
                  desc: "I'd pause, stay calm, and want to understand why markets fell before doing anything."
                },
                {
                  id: 'stay_invested',
                  emoji: '😎',
                  title: 'Option C: Stay Invested / Buy More',
                  desc: "I understand markets fluctuate and see dips as a discount opportunity for long-term growth."
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('riskComfort', opt.id)}
                  style={{
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-lg)',
                    border: `2px solid ${formData.riskComfort === opt.id ? 'var(--primary)' : 'var(--border-color)'}`,
                    background: formData.riskComfort === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 26 }}>{opt.emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-main)' }}>{opt.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{opt.desc}</div>
                    </div>
                  </div>
                  {formData.riskComfort === opt.id && <CheckCircle2 size={20} color="var(--primary-dark)" />}
                </div>
              ))}
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="#00B386" />
              <span>This is a learning tool snapshot to personalize your lessons, not a SEBI risk profiling assessment.</span>
            </div>
          </div>
        )}

        {/* SCREEN 6: LEARNING STYLE */}
        {step === 6 && (
          <div>
            <span className="badge badge-purple" style={{ marginBottom: 12 }}>
              LEARNING PREFERENCE
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>
              How do you prefer to learn?
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
              Select the formats that keep you engaged (multi-select):
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {[
                { id: 'short_reads', emoji: '📖', title: 'Short 2-minute explanations', desc: 'Clear analogies and zero-jargon articles.' },
                { id: 'interactive', emoji: '🎮', title: 'Interactive examples & sliders', desc: 'Visual calculators and market compounding charts.' },
                { id: 'quizzes', emoji: '🧠', title: 'Bite-sized quizzes', desc: 'Earn XP badges and test your understanding.' },
                { id: 'learn_by_doing', emoji: '💻', title: 'Learn by doing (Simulations)', desc: 'Practice allocating ₹10,000 virtual money safely.' }
              ].map(opt => {
                const isSelected = formData.learningStyles.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    onClick={() => toggleArrayField('learningStyles', opt.id)}
                    style={{
                      padding: '16px 18px',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: isSelected ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 24 }}>{opt.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{opt.title}</div>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{opt.desc}</div>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 size={20} color="var(--primary-dark)" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom CTA Button */}
        <div style={{ marginTop: 28, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button
            className="btn-primary"
            onClick={handleNext}
            style={{ width: '100%', padding: '14px', fontSize: 16 }}
          >
            <span>{step === totalSteps ? 'Build my FirstStep Profile ✨' : 'Continue'}</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}
