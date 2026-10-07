import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LESSONS_DATA, CATEGORIES } from '../data/lessonsData';
import { Search, BookOpen, CheckCircle2, Circle, Clock, Award, Sparkles, MessageSquareCode, ArrowRight } from 'lucide-react';

export function LearnView() {
  const { completedLessons, openLesson, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLessons = LESSONS_DATA.filter(lesson => {
    const matchesCat = selectedCategory === "ALL" || lesson.category === selectedCategory;
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          lesson.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const totalXP = LESSONS_DATA.reduce((acc, curr) => acc + curr.xp, 0);
  const earnedXP = LESSONS_DATA.filter(l => completedLessons.includes(l.id)).reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Header Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #00D09C 0%, #00B386 100%)',
        color: '#0E2922',
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
            <span style={{ background: '#FFFFFF', color: '#008765', fontSize: 11, fontWeight: 800, padding: '2px 8px', borderRadius: 9999 }}>
              FINANCIAL ACADEMY
            </span>
            <span style={{ fontSize: 12, color: '#0E2922', opacity: 0.8 }}>Zero Jargon • 100% Practical</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0E2922' }}>
            Learn Investing Without Fear
          </h1>
          <p style={{ fontSize: 14, color: '#0E2922', opacity: 0.9, marginTop: 4, maxWidth: 520 }}>
            Master core investing concepts in 3-minute bite-sized lessons. Complete mini-quizzes to earn XP and unlock badges.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'right',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#53606E', textTransform: 'uppercase' }}>
            Learning Progress
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#141A21', marginTop: 2 }}>
            {completedLessons.length} / {LESSONS_DATA.length} Lessons
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#008765' }}>
            {earnedXP} / {totalXP} XP Claimed
          </div>
        </div>
      </div>

      {/* 📈 READING INVESTMENT CHARTS SPOTLIGHT BANNER */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #0E1318 0%, #1E2833 100%)',
        color: '#FFFFFF',
        padding: '24px 28px',
        border: 'none',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        <div style={{ maxWidth: 540 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="badge badge-green">FEATURED MODULE</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Interactive Visual Layer</span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF' }}>
            📈 Reading Investment Charts
          </h2>
          <p style={{ fontSize: 13, color: '#CBD5E1', marginTop: 4, lineHeight: 1.5 }}>
            Master price trends, candlestick anatomy, volume confirmation, absolute vs % returns, volatility, drawdowns, and benchmark comparisons.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            className="btn-primary"
            onClick={() => setSelectedCategory("READING CHARTS")}
            style={{ padding: '10px 18px', background: '#00D09C', color: '#0F172A', fontWeight: 800 }}
          >
            <span>Explore 7 Chart Lessons</span>
            <ArrowRight size={15} />
          </button>

          <button
            className="btn-outline"
            onClick={() => navigateTo('practice_charts')}
            style={{ padding: '10px 18px', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.08)' }}
          >
            <span>🧪 Practice with Charts (Lab)</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Search Bar */}
        <div style={{
          position: 'relative',
          flex: '1 1 300px',
          maxWidth: 420
        }}>
          <Search size={18} color="var(--text-light)" style={{ position: 'absolute', left: 14, top: 12 }} />
          <input
            type="text"
            placeholder="Search concepts (e.g. SIP, P/E ratio, index, risk)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: 'var(--radius-full)',
              border: '1.5px solid var(--border-color)',
              fontSize: 14,
              fontFamily: 'inherit',
              outline: 'none',
              background: '#FFFFFF'
            }}
          />
        </div>

        {/* Category Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: 13,
                fontWeight: 700,
                background: selectedCategory === cat ? 'var(--primary-dark)' : '#FFFFFF',
                color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-muted)',
                border: `1px solid ${selectedCategory === cat ? 'var(--primary-dark)' : 'var(--border-color)'}`,
                transition: 'var(--transition)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid-3" style={{ gap: 16 }}>
        {filteredLessons.map(lesson => {
          const isCompleted = completedLessons.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className="groww-card groww-card-interactive"
              onClick={() => openLesson(lesson.id)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px',
                border: isCompleted ? '1.5px solid var(--primary-border)' : '1px solid var(--border-color)',
                background: isCompleted ? '#FAFDFB' : '#FFFFFF'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span className={`badge ${isCompleted ? 'badge-green' : 'badge-slate'}`}>
                    {lesson.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-light)' }}>
                    <Clock size={13} />
                    <span>{lesson.duration}</span>
                  </div>
                </div>

                <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                  {lesson.title}
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: 16 }}>
                  {lesson.summary}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {isCompleted ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700 }}>
                      <CheckCircle2 size={15} /> Completed
                    </span>
                  ) : (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-light)' }}>
                      <Circle size={15} /> Not started
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: '#D97706' }}>
                  <Award size={14} />
                  <span>+{lesson.xp} XP</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ask AI Helper Banner */}
      <div style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, #0E1318 0%, #1E2833 100%)',
        borderRadius: 'var(--radius-xl)',
        color: '#FFFFFF',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0E2922'
          }}>
            <MessageSquareCode size={24} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800 }}>Confused about a financial term?</div>
            <div style={{ fontSize: 13, color: '#94A3B8' }}>Ask Groww AI for structured, jargon-free explanations with real-world examples.</div>
          </div>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigateTo('ask_ai')}
        >
          <span>Ask Groww AI</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}
