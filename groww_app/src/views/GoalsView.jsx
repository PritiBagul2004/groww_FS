import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SIPCompoundingChart } from '../components/charts/SIPCompoundingChart';
import { Target, Plus, CheckCircle2, Calendar, Sparkles, X, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GoalsView() {
  const { goalsList, addGoal, contributeToGoal } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGoalForContrib, setSelectedGoalForContrib] = useState(null);
  const [contribAmount, setContribAmount] = useState(1000);

  // New Goal Form State
  const [newGoalData, setNewGoalData] = useState({
    name: '',
    category: 'Education',
    emoji: '🎓',
    targetAmount: 25000,
    currentAmount: 2000,
    targetDate: '2027-06',
    isFlexible: false,
    monthlySIP: 1500
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newGoalData.name) return;
    addGoal(newGoalData);
    setIsAddModalOpen(false);
    setNewGoalData({
      name: '',
      category: 'Education',
      emoji: '🎓',
      targetAmount: 25000,
      currentAmount: 2000,
      targetDate: '2027-06',
      isFlexible: false,
      monthlySIP: 1500
    });
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const handleContribSubmit = (e) => {
    e.preventDefault();
    if (!selectedGoalForContrib || contribAmount <= 0) return;
    contributeToGoal(selectedGoalForContrib.id, contribAmount);
    setSelectedGoalForContrib(null);
    confetti({ particleCount: 60, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="fade-in" style={{ maxWidth: 900, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)',
        color: '#FFFFFF',
        padding: '24px 28px',
        border: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 9999 }}>
              GOAL-BASED INVESTING
            </span>
            <span style={{ fontSize: 12, color: '#DBEAFE' }}>Purpose • Discipline • Clarity</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
            Your Financial Goals
          </h1>
          <p style={{ fontSize: 14, color: '#BFDBFE', marginTop: 4, maxWidth: 540 }}>
            Connect your money to real milestones. Flexible pace goals allow students and freelancers to contribute whenever money comes in.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setIsAddModalOpen(true)}
          style={{ background: '#FFFFFF', color: '#1E3A8A', fontWeight: 800 }}
        >
          <Plus size={18} />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* SEE YOUR MONEY GROW (COMPOUNDING ENGINE) */}
      <div className="groww-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#166534', fontWeight: 800, fontSize: 14 }}>
            🌱
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>See Your Money Grow</h2>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Adjust monthly investment, timeline, and return to visualize how compounding beats plain cash savings.
            </div>
          </div>
        </div>

        <SIPCompoundingChart
          initialMonthly={1000}
          initialYears={10}
          initialRate={10}
          title="Contributions vs Compounded Wealth Growth"
        />

        <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
          <ShieldCheck size={14} color="#00B386" />
          <span>Illustrative compounding calculation — not a guaranteed return or investment recommendation.</span>
        </div>
      </div>

      {/* Section Subhead */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: 18, fontWeight: 800 }}>Active Goals & Milestones</h2>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{goalsList.length} Goals Tracking</span>
      </div>

      {/* Goals Grid */}
      <div className="grid-2" style={{ gap: 16 }}>
        {goalsList.map(goal => {
          const pct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
          const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

          return (
            <div
              key={goal.id}
              className="groww-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: pct >= 100 ? '2px solid var(--primary-border)' : '1px solid var(--border-color)',
                background: pct >= 100 ? '#F0FDF4' : '#FFFFFF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 28 }}>{goal.emoji}</span>
                    <div>
                      <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>{goal.name}</h3>
                      <span className={`badge ${goal.isFlexible ? 'badge-amber' : 'badge-blue'}`}>
                        {goal.isFlexible ? '🔄 Flexible Pace' : '📅 Monthly SIP'}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--primary-dark)' }}>{pct}%</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: 8, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden', margin: '14px 0 10px 0' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 9999, transition: 'width 0.5s ease' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 16 }}>
                  <div>
                    <span style={{ color: 'var(--text-light)', fontSize: 11 }}>SAVED SO FAR</span>
                    <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>₹{goal.currentAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: 'var(--text-light)', fontSize: 11 }}>TARGET AMOUNT</span>
                    <div style={{ fontWeight: 800, color: 'var(--text-muted)' }}>₹{goal.targetAmount.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-md)', marginBottom: 16 }}>
                  {remaining === 0 ? (
                    <strong style={{ color: 'var(--primary-dark)' }}>🎉 Goal Achieved! Great job!</strong>
                  ) : (
                    <span>₹{remaining.toLocaleString('en-IN')} left • Target: <strong>{goal.targetDate}</strong></span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className="btn-primary"
                  onClick={() => setSelectedGoalForContrib(goal)}
                  style={{ flex: 1, padding: '10px 14px', fontSize: 13 }}
                >
                  <span>+ Add Contribution (Sim)</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: ADD GOAL */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Create New Financial Goal</h2>
              <button onClick={() => setIsAddModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Higher Studies, Goa Vacation, MacBook..."
                  value={newGoalData.name}
                  onChange={e => setNewGoalData({ ...newGoalData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <div className="grid-2" style={{ gap: 12 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                    Target Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    step="500"
                    value={newGoalData.targetAmount}
                    onChange={e => setNewGoalData({ ...newGoalData, targetAmount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                    Current Starting Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={newGoalData.currentAmount}
                    onChange={e => setNewGoalData({ ...newGoalData, currentAmount: Number(e.target.value) })}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                  Goal Type & Contribution Mode
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  <div
                    onClick={() => setNewGoalData({ ...newGoalData, isFlexible: false })}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${!newGoalData.isFlexible ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: !newGoalData.isFlexible ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600
                    }}
                  >
                    📅 Monthly SIP Mode
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Fixed regular amount per month</div>
                  </div>

                  <div
                    onClick={() => setNewGoalData({ ...newGoalData, isFlexible: true })}
                    style={{
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      border: `1.5px solid ${newGoalData.isFlexible ? 'var(--primary)' : 'var(--border-color)'}`,
                      background: newGoalData.isFlexible ? 'var(--primary-light)' : '#FFFFFF',
                      cursor: 'pointer',
                      fontSize: 13,
                      fontWeight: 600
                    }}
                  >
                    🔄 Flexible Mode (Students & Freelance)
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Contribute whenever income arrives</div>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                  Target Completion Date
                </label>
                <input
                  type="month"
                  required
                  value={newGoalData.targetDate}
                  onChange={e => setNewGoalData({ ...newGoalData, targetDate: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ marginTop: 8, padding: '12px' }}>
                <span>Create Goal</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD SIMULATED CONTRIBUTION */}
      {selectedGoalForContrib && (
        <div className="modal-overlay" onClick={() => setSelectedGoalForContrib(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Simulate Goal Contribution</h3>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Goal: {selectedGoalForContrib.name}</div>
              </div>
              <button onClick={() => setSelectedGoalForContrib(null)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleContribSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 6 }}>
                  Contribution Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="100"
                  step="100"
                  value={contribAmount}
                  onChange={e => setContribAmount(Number(e.target.value))}
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-md)', border: '1.5px solid var(--primary)', fontSize: 16, fontWeight: 700, fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                {[500, 1000, 2000, 5000].map(amt => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setContribAmount(amt)}
                    style={{
                      flex: 1,
                      padding: '8px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border-color)',
                      fontSize: 12,
                      fontWeight: 700
                    }}
                  >
                    +₹{amt.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: 10 }}>
                <span>Simulate Deposit</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
