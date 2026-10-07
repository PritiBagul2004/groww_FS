import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CAMPUS_DATA } from '../data/campusData';
import { GraduationCap, Calendar, Award, Flame, Users, CheckCircle2, ArrowRight, X, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export function GrowwCampusView() {
  const { registeredEvents, registerEvent, ambassadorApplied, submitAmbassadorForm, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'challenges' | 'leaderboard' | 'ambassador'

  // Ambassador Modal Form State
  const [isAmbassadorModalOpen, setIsAmbassadorModalOpen] = useState(false);
  const [ambassadorForm, setAmbassadorForm] = useState({
    name: 'Suhani Gupta',
    college: '',
    year: '3rd Year',
    city: 'Bengaluru',
    motivation: ''
  });

  const handleAmbassadorSubmit = (e) => {
    e.preventDefault();
    submitAmbassadorForm(ambassadorForm);
    setIsAmbassadorModalOpen(false);
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  return (
    <div className="fade-in" style={{ maxWidth: 920, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Top Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 100%)',
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
              GROWW CAMPUS COMMUNITY
            </span>
            <span style={{ fontSize: 12, color: '#E9D5FF' }}>Financial Literacy on Indian Campuses</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
            Groww Campus
          </h1>
          <p style={{ fontSize: 14, color: '#DDD6FE', marginTop: 4, maxWidth: 560 }}>
            Join peer workshops, masterclasses, zero-risk simulation challenges, and lead the financial literacy movement in your college.
          </p>
        </div>

        <button
          className="btn-primary"
          onClick={() => setIsAmbassadorModalOpen(true)}
          style={{ background: '#FFFFFF', color: '#581C87', fontWeight: 800 }}
        >
          <Sparkles size={16} />
          <span>{ambassadorApplied ? 'Application Submitted ✓' : 'Become an Ambassador'}</span>
        </button>
      </div>

      {/* Campus Tabs */}
      <div style={{
        display: 'flex',
        gap: 10,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'events', label: '1. Upcoming Masterclasses' },
          { id: 'challenges', label: '2. Campus Challenges' },
          { id: 'leaderboard', label: '3. Learning Leaderboard' },
          { id: 'ambassador', label: '4. Ambassador Program' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 700,
              background: activeTab === t.id ? '#581C87' : 'transparent',
              color: activeTab === t.id ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'var(--transition)',
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: UPCOMING EVENTS */}
      {activeTab === 'events' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Free interactive live workshops hosted by Groww Product & Financial Education leaders:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CAMPUS_DATA.events.map(evt => {
              const isRegistered = registeredEvents.includes(evt.id);
              return (
                <div key={evt.id} className="groww-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                    <div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                        {evt.tags.map(tag => (
                          <span key={tag} className="badge badge-purple">{tag}</span>
                        ))}
                      </div>
                      <h3 style={{ fontSize: 18, fontWeight: 800 }}>{evt.title}</h3>
                      <div style={{ fontSize: 13, color: 'var(--accent-purple)', fontWeight: 600, marginTop: 2 }}>
                        {evt.speaker}
                      </div>
                    </div>

                    <button
                      className={isRegistered ? 'btn-subtle' : 'btn-primary'}
                      onClick={() => registerEvent(evt.id)}
                      style={{ padding: '10px 18px', fontSize: 13 }}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Registered ✓</span>
                        </>
                      ) : (
                        <span>Register Free</span>
                      )}
                    </button>
                  </div>

                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 14 }}>
                    {evt.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-light)', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                    <span>📅 {evt.date}</span>
                    <span>👥 {evt.attendees.toLocaleString('en-IN')} students enrolled</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CAMPUS CHALLENGES */}
      {activeTab === 'challenges' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Practice safe investing habits and earn bonus XP for your profile:
          </div>

          <div className="grid-3" style={{ gap: 16 }}>
            {CAMPUS_DATA.challenges.map(c => (
              <div key={c.id} className="groww-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span className="badge badge-amber">+{c.rewardXP} XP</span>
                    <span style={{ fontSize: 11, color: 'var(--text-light)' }}>{c.participants} active</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 6 }}>{c.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 16 }}>
                    {c.description}
                  </p>
                </div>

                <button
                  className="btn-outline"
                  onClick={() => {
                    if (c.id === 'chal-1') navigateTo('simulator');
                    else if (c.id === 'chal-3') navigateTo('goals');
                    else navigateTo('learn');
                  }}
                  style={{ width: '100%', fontSize: 13 }}
                >
                  <span>Start Challenge</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LEARNING LEADERBOARD */}
      {activeTab === 'leaderboard' && (
        <div className="groww-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>Campus Learning Leaderboard</h2>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Ranked purely by lesson streaks and quizzes completed (zero trading volume metric).
              </div>
            </div>
            <span className="badge badge-green">HABIT DISCIPLINE</span>
          </div>

          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Rank</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Learner</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>College</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Learning Streak</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Total XP</th>
                </tr>
              </thead>
              <tbody>
                {CAMPUS_DATA.leaderboard.map(item => (
                  <tr
                    key={item.rank}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      background: item.isUser ? 'var(--primary-light)' : '#FFFFFF',
                      fontWeight: item.isUser ? 700 : 500
                    }}
                  >
                    <td style={{ padding: '12px 16px' }}>
                      {item.rank === 1 ? '🥇 1' : item.rank === 2 ? '🥈 2' : item.rank === 3 ? '🥉 3' : `#${item.rank}`}
                    </td>
                    <td style={{ padding: '12px 16px', color: item.isUser ? 'var(--primary-dark)' : 'var(--text-main)' }}>
                      {item.name} {item.isUser && '(You)'}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{item.college}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ color: '#E11D48', fontWeight: 700 }}>🔥 {item.streak} days</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 800, color: 'var(--text-main)' }}>
                      {item.xp} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AMBASSADOR PROGRAM */}
      {activeTab === 'ambassador' && (
        <div className="groww-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span className="badge badge-purple">LEADERSHIP OPPORTUNITY</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>{CAMPUS_DATA.ambassadorProgram.title}</h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginTop: 4, marginBottom: 20 }}>
            {CAMPUS_DATA.ambassadorProgram.subtitle}
          </p>

          <div className="grid-2" style={{ gap: 16, marginBottom: 24 }}>
            <div style={{ padding: '18px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-purple)', marginBottom: 10 }}>
                📋 Your Responsibilities
              </div>
              <ul style={{ fontSize: 13, color: 'var(--text-main)', paddingLeft: 18, lineHeight: 1.6 }}>
                {CAMPUS_DATA.ambassadorProgram.responsibilities.map((r, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{r}</li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '18px', background: 'var(--primary-light)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-border)' }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--primary-dark)', marginBottom: 10 }}>
                🎁 Exclusive Perks & Rewards
              </div>
              <ul style={{ fontSize: 13, color: '#0E2922', paddingLeft: 18, lineHeight: 1.6 }}>
                {CAMPUS_DATA.ambassadorProgram.perks.map((p, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>{p}</li>
                ))}
              </ul>
            </div>
          </div>

          <button
            className="btn-primary"
            onClick={() => setIsAmbassadorModalOpen(true)}
            style={{ padding: '14px 28px', fontSize: 15 }}
          >
            <span>{ambassadorApplied ? 'Application Submitted (Edit)' : 'Apply to Become an Ambassador'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      {/* MODAL: AMBASSADOR APPLICATION FORM */}
      {isAmbassadorModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAmbassadorModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Groww Campus Ambassador Application</h3>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Represent financial literacy on your campus</div>
              </div>
              <button onClick={() => setIsAmbassadorModalOpen(false)} style={{ color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAmbassadorSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Full Name</label>
                <input
                  type="text"
                  required
                  value={ambassadorForm.name}
                  onChange={e => setAmbassadorForm({ ...ambassadorForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <div className="grid-2" style={{ gap: 10 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>College / University</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. IIT Bombay, Christ Univ..."
                    value={ambassadorForm.college}
                    onChange={e => setAmbassadorForm({ ...ambassadorForm, college: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>Year of Study</label>
                  <select
                    value={ambassadorForm.year}
                    onChange={e => setAmbassadorForm({ ...ambassadorForm, year: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                  >
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year / Postgrad</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, display: 'block', marginBottom: 4 }}>
                  Why do you want to promote financial literacy among peers?
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Share a short note on how you'd help classmates avoid social media stock scams and learn disciplined investing..."
                  value={ambassadorForm.motivation}
                  onChange={e => setAmbassadorForm({ ...ambassadorForm, motivation: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 14, fontFamily: 'inherit' }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ padding: '12px', marginTop: 6 }}>
                <span>Submit Ambassador Application</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
