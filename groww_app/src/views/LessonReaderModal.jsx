import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LESSONS_DATA } from '../data/lessonsData';
import { X, CheckCircle2, AlertCircle, Award, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

import { InteractiveLineChart } from '../components/charts/InteractiveLineChart';
import { CandlestickChart } from '../components/charts/CandlestickChart';
import { VolumePriceChart } from '../components/charts/VolumePriceChart';
import { DrawdownChart } from '../components/charts/DrawdownChart';

export function LessonReaderModal({ lessonId, onClose }) {
  const { completedLessons, completeLesson, navigateTo } = useApp();
  const lesson = LESSONS_DATA.find(l => l.id === lessonId);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('read'); // 'read' | 'quiz'

  // State for returns calculator in Lesson 4
  const [startPrice, setStartPrice] = useState(100);
  const [endPrice, setEndPrice] = useState(125);

  // Timeframe state for Lesson 1
  const [selectedTf, setSelectedTf] = useState('1M');

  // Single vs sequence candle toggle for Lesson 2
  const [candleMode, setCandleMode] = useState('anatomy'); // 'anatomy' | 'sequence'

  if (!lesson) return null;

  const isCompleted = completedLessons.includes(lesson.id);

  const handleSelectOption = (qIndex, optionIndex) => {
    if (quizSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const allCorrect = lesson.quiz.every((q, i) => selectedAnswers[i] === q.correctIndex);
    
    if (allCorrect || Object.keys(selectedAnswers).length === lesson.quiz.length) {
      completeLesson(lesson.id, lesson.xp);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const currentIndex = LESSONS_DATA.findIndex(l => l.id === lessonId);
  const nextLesson = LESSONS_DATA[currentIndex + 1];

  // Mock data for Lesson 1 (Timeframe price chart)
  const getLineDataForTf = (tf) => {
    if (tf === '1D') {
      return [
        { date: '9:15 AM', value: 2420 },
        { date: '10:30 AM', value: 2445 },
        { date: '12:00 PM', value: 2415 },
        { date: '1:30 PM', value: 2460 },
        { date: '3:30 PM', value: 2480 }
      ];
    }
    if (tf === '1W') {
      return [
        { date: 'Mon', value: 2380 },
        { date: 'Tue', value: 2410 },
        { date: 'Wed', value: 2390 },
        { date: 'Thu', value: 2450 },
        { date: 'Fri', value: 2480 }
      ];
    }
    if (tf === '1Y') {
      return [
        { date: 'Oct', value: 1950 },
        { date: 'Dec', value: 2100 },
        { date: 'Feb', value: 2050 },
        { date: 'Apr', value: 2240 },
        { date: 'Jun', value: 2320 },
        { date: 'Aug', value: 2410 },
        { date: 'Oct', value: 2480 }
      ];
    }
    if (tf === '5Y') {
      return [
        { date: '2021', value: 1100 },
        { date: '2022', value: 1450 },
        { date: '2023', value: 1800 },
        { date: '2024', value: 2150 },
        { date: '2026', value: 2480 }
      ];
    }
    // 1M default
    return [
      { date: 'Week 1', value: 2320 },
      { date: 'Week 2', value: 2380 },
      { date: 'Week 3', value: 2340 },
      { date: 'Week 4', value: 2480 }
    ];
  };

  // Mock candle sequence for Lesson 2
  const sampleCandles = [
    { label: 'Day 1', open: 190, high: 210, low: 185, close: 205 },
    { label: 'Day 2', open: 205, high: 220, low: 200, close: 218 },
    { label: 'Day 3', open: 218, high: 225, low: 195, close: 198 },
    { label: 'Day 4', open: 198, high: 235, low: 195, close: 230 },
    { label: 'Day 5', open: 230, high: 245, low: 225, close: 240 },
    { label: 'Day 6', open: 240, high: 242, low: 215, close: 222 }
  ];

  // Mock volume data for Lesson 3
  const sampleVolumeData = [
    { date: 'Day 1', price: 100, volume: 15000 },
    { date: 'Day 2', price: 102, volume: 18000 },
    { date: 'Day 3', price: 101, volume: 12000 },
    { date: 'Day 4 (Spike)', price: 115, volume: 85000 },
    { date: 'Day 5', price: 118, volume: 42000 },
    { date: 'Day 6', price: 122, volume: 38000 }
  ];

  // Volatility comparison data for Lesson 5
  const steadyData = [
    { date: 'Yr 1', value: 10000 },
    { date: 'Yr 2', value: 11400 },
    { date: 'Yr 3', value: 12800 },
    { date: 'Yr 4', value: 14200 },
    { date: 'Yr 5', value: 16000 }
  ];
  const volatileData = [
    { date: 'Yr 1', value: 10000 },
    { date: 'Yr 2', value: 13500 },
    { date: 'Yr 3', value: 9800 },
    { date: 'Yr 4', value: 14800 },
    { date: 'Yr 5', value: 16000 }
  ];

  // Render embedded interactive chart for the lesson
  const renderEmbeddedChart = () => {
    if (lesson.hasInteractiveChart === 'line_price') {
      return (
        <div style={{ marginBottom: 16 }}>
          <InteractiveLineChart
            data={getLineDataForTf(selectedTf)}
            selectedTimeframe={selectedTf}
            onTimeframeChange={setSelectedTf}
            title="Interactive Price Chart Simulation (Nifty 50 Bluechip)"
            interactivePoints={[
              { index: 0, badge: '🟢 Open' },
              { index: getLineDataForTf(selectedTf).length - 1, badge: '🏁 Current' }
            ]}
          />
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'candlestick_anatomy') {
      return (
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <button
              onClick={() => setCandleMode('anatomy')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 12,
                fontWeight: 700,
                background: candleMode === 'anatomy' ? 'var(--primary-dark)' : 'var(--bg-subtle)',
                color: candleMode === 'anatomy' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              1. Single Annotated Anatomy
            </button>
            <button
              onClick={() => setCandleMode('sequence')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: 12,
                fontWeight: 700,
                background: candleMode === 'sequence' ? 'var(--primary-dark)' : 'var(--bg-subtle)',
                color: candleMode === 'sequence' ? '#FFFFFF' : 'var(--text-muted)'
              }}
            >
              2. Multi-Candle Sequence View
            </button>
          </div>

          <CandlestickChart
            showSingleAnnotated={candleMode === 'anatomy'}
            candles={sampleCandles}
            title="Interactive Candlestick Sequence (Hover to Inspect OHLC)"
          />
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'volume_sync') {
      return (
        <div style={{ marginBottom: 16 }}>
          <VolumePriceChart data={sampleVolumeData} />
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'returns_calc') {
      const absGain = endPrice - startPrice;
      const pctGain = (((endPrice - startPrice) / (startPrice || 1)) * 100).toFixed(1);
      const isPos = absGain >= 0;

      return (
        <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '18px', border: '1px solid var(--border-color)', marginBottom: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Interactive Returns Calculator (Try Changing Prices)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginBottom: 16 }}>
            <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>STARTING BUY PRICE</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>₹{startPrice}</div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={startPrice}
                onChange={e => setStartPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', marginTop: 6 }}
              />
            </div>

            <div style={{ background: 'var(--bg-subtle)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>CURRENT SELLING PRICE</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>₹{endPrice}</div>
              <input
                type="range"
                min="50"
                max="500"
                step="10"
                value={endPrice}
                onChange={e => setEndPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)', marginTop: 6 }}
              />
            </div>
          </div>

          <div style={{ padding: '14px', background: isPos ? 'var(--primary-light)' : '#FFF1F2', borderRadius: 'var(--radius-md)', border: `1.5px solid ${isPos ? 'var(--primary-border)' : '#FECDD3'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 11, color: isPos ? 'var(--primary-dark)' : '#9F1239', fontWeight: 700 }}>ABSOLUTE RUPEE CHANGE</span>
              <div style={{ fontSize: 16, fontWeight: 800, color: isPos ? '#0E2922' : '#9F1239' }}>
                {isPos ? '+' : ''}₹{absGain}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: 11, color: isPos ? 'var(--primary-dark)' : '#9F1239', fontWeight: 700 }}>PERCENTAGE RETURN</span>
              <div style={{ fontSize: 20, fontWeight: 800, color: isPos ? '#008765' : '#E11D48' }}>
                {isPos ? '+' : ''}{pctGain}%
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'volatility_compare') {
      return (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, color: 'var(--text-muted)' }}>
            Comparing Volatility: Steady Path A (Green) vs Rollercoaster Path B (Purple)
          </div>
          <InteractiveLineChart
            data={steadyData}
            showBenchmark={true}
            benchmarkData={volatileData}
            color="#00D09C"
            benchmarkColor="#8B5CF6"
            title="Both grow from ₹10k to ₹16k over 5 years"
            timeframes={[]}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginTop: 8, color: 'var(--text-muted)' }}>
            <span style={{ color: '#00B386', fontWeight: 700 }}>🟢 Investment A: Smooth upward compounding</span>
            <span style={{ color: '#8B5CF6', fontWeight: 700 }}>🟣 Investment B: High volatility (swings from ₹13.5k down to ₹9.8k)</span>
          </div>
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'drawdown_visualizer') {
      return (
        <div style={{ marginBottom: 16 }}>
          <DrawdownChart />
        </div>
      );
    }

    if (lesson.hasInteractiveChart === 'compare_two') {
      return (
        <div style={{ marginBottom: 16 }}>
          <InteractiveLineChart
            data={[
              { date: 'Yr 1', value: 100 },
              { date: 'Yr 2', value: 118 },
              { date: 'Yr 3', value: 132 },
              { date: 'Yr 4', value: 154 },
              { date: 'Yr 5', value: 182 }
            ]}
            showBenchmark={true}
            benchmarkData={[
              { date: 'Yr 1', value: 100 },
              { date: 'Yr 2', value: 110 },
              { date: 'Yr 3', value: 122 },
              { date: 'Yr 4', value: 135 },
              { date: 'Yr 5', value: 155 }
            ]}
            color="#00D09C"
            benchmarkColor="#64748B"
            title="Fund A (+82%) vs Nifty 50 Benchmark (+55%)"
            yPrefix="Index "
            timeframes={['1M', '1Y', '5Y']}
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content modal-content-lg"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          background: '#FFFFFF',
          zIndex: 10
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span className="badge badge-green">{lesson.category}</span>
              <span style={{ fontSize: 12, color: 'var(--text-light)' }}>• {lesson.duration}</span>
              {isCompleted && (
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--primary-dark)', fontWeight: 700 }}>
                  <CheckCircle2 size={14} /> Completed
                </span>
              )}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 800 }}>{lesson.title}</h2>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--bg-subtle)',
              color: 'var(--text-muted)'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Toggle: Read vs Quiz */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 24px',
          background: 'var(--bg-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('read')}
            style={{
              padding: '12px 18px',
              fontSize: 14,
              fontWeight: 700,
              color: activeTab === 'read' ? 'var(--primary-dark)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === 'read' ? 'var(--primary)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>📖 Lesson Concept & Interactive Visual</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            style={{
              padding: '12px 18px',
              fontSize: 14,
              fontWeight: 700,
              color: activeTab === 'quiz' ? 'var(--primary-dark)' : 'var(--text-muted)',
              borderBottom: `2px solid ${activeTab === 'quiz' ? 'var(--primary)' : 'transparent'}`,
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>🧠 Mini Quiz & XP ({lesson.quiz.length})</span>
            <span style={{ background: '#FEF3C7', color: '#92400E', padding: '1px 6px', borderRadius: 9999, fontSize: 11 }}>
              +{lesson.xp} XP
            </span>
          </button>
        </div>

        {/* TAB 1: READ CONTENT */}
        {activeTab === 'read' && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            
            {/* Embedded Live Chart */}
            {renderEmbeddedChart()}

            {/* Simple Explanation */}
            <div style={{ background: '#FFFFFF', lineHeight: 1.6, fontSize: 15, color: 'var(--text-main)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 8, color: 'var(--text-main)' }}>
                Concept Breakdown
              </h3>
              <div style={{ whiteSpace: 'pre-line', color: 'var(--text-main)' }}>
                {lesson.explanation}
              </div>
            </div>

            {/* Real-world Analogy */}
            <div style={{
              background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
              border: '1.5px solid #86EFAC',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px'
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#166534', textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span>💡 Real-World Analogy</span>
              </div>
              <p style={{ fontSize: 14, color: '#14532D', lineHeight: 1.5 }}>
                {lesson.analogy}
              </p>
            </div>

            {/* Why this matters */}
            <div style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px'
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase', marginBottom: 6 }}>
                ⭐ Why This Matters For You (20–26)
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-main)', lineHeight: 1.5 }}>
                {lesson.whyItMatters}
              </p>
            </div>

            {/* Common Misconception */}
            <div style={{
              background: '#FFFBEB',
              border: '1px solid #FCD34D',
              borderRadius: 'var(--radius-lg)',
              padding: '18px 20px'
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#92400E', textTransform: 'uppercase', marginBottom: 6 }}>
                ⚠️ Common Misconception
              </div>
              <div style={{ fontSize: 14, color: '#78350F', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                {lesson.commonMisconception}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: 18, marginTop: 10 }}>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('ask_ai');
                }}
                className="btn-secondary"
                style={{ fontSize: 13 }}
              >
                <span>Ask Groww AI about this</span>
              </button>

              <button
                className="btn-primary"
                onClick={() => setActiveTab('quiz')}
              >
                <span>Take Mini Quiz & Claim +{lesson.xp} XP</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: MINI QUIZ */}
        {activeTab === 'quiz' && (
          <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 800 }}>Quick Knowledge Check</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                Answer these questions to cement your understanding and earn {lesson.xp} XP.
              </p>
            </div>

            {lesson.quiz.map((q, qIndex) => {
              const selected = selectedAnswers[qIndex];
              const isAnswered = selected !== undefined;
              const isCorrect = selected === q.correctIndex;

              return (
                <div
                  key={qIndex}
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-subtle)'
                  }}
                >
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 14 }}>
                    {qIndex + 1}. {q.question}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {q.options.map((opt, optIndex) => {
                      let btnBg = '#FFFFFF';
                      let btnBorder = 'var(--border-color)';
                      let btnColor = 'var(--text-main)';

                      if (quizSubmitted) {
                        if (optIndex === q.correctIndex) {
                          btnBg = 'var(--primary-light)';
                          btnBorder = 'var(--primary-dark)';
                          btnColor = 'var(--primary-dark)';
                        } else if (selected === optIndex) {
                          btnBg = '#FEE2E2';
                          btnBorder = '#EF4444';
                          btnColor = '#991B1B';
                        }
                      } else if (selected === optIndex) {
                        btnBg = 'var(--primary-light)';
                        btnBorder = 'var(--primary)';
                        btnColor = 'var(--primary-dark)';
                      }

                      return (
                        <div
                          key={optIndex}
                          onClick={() => handleSelectOption(qIndex, optIndex)}
                          style={{
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-md)',
                            border: `1.5px solid ${btnBorder}`,
                            background: btnBg,
                            color: btnColor,
                            cursor: quizSubmitted ? 'default' : 'pointer',
                            fontSize: 14,
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            transition: 'var(--transition)'
                          }}
                        >
                          <span>{opt}</span>
                          {quizSubmitted && optIndex === q.correctIndex && (
                            <CheckCircle2 size={18} color="var(--primary-dark)" />
                          )}
                          {quizSubmitted && selected === optIndex && optIndex !== q.correctIndex && (
                            <AlertCircle size={18} color="#EF4444" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{
                      marginTop: 14,
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: isCorrect ? 'var(--primary-light)' : '#FFFBEB',
                      border: `1px solid ${isCorrect ? 'var(--primary-border)' : '#FCD34D'}`,
                      fontSize: 13,
                      color: isCorrect ? 'var(--primary-dark)' : '#92400E',
                      lineHeight: 1.4
                    }}>
                      <strong>{isCorrect ? '✅ Spot on!' : '💡 Explanation:'}</strong> {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Quiz Submit Button */}
            {!quizSubmitted ? (
              <button
                className="btn-primary"
                onClick={handleQuizSubmit}
                disabled={Object.keys(selectedAnswers).length < lesson.quiz.length}
                style={{
                  width: '100%',
                  padding: '14px',
                  opacity: Object.keys(selectedAnswers).length < lesson.quiz.length ? 0.6 : 1
                }}
              >
                <span>Submit Quiz & Claim XP</span>
                <Award size={18} />
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="btn-secondary"
                  onClick={onClose}
                  style={{ flex: 1 }}
                >
                  Close Lesson
                </button>
                {nextLesson && (
                  <button
                    className="btn-primary"
                    onClick={() => {
                      setSelectedAnswers({});
                      setQuizSubmitted(false);
                      setActiveTab('read');
                      completeLesson(lesson.id, lesson.xp);
                      onClose();
                    }}
                    style={{ flex: 1 }}
                  >
                    <span>Next Lesson</span>
                    <ArrowRight size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
