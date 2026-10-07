import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Award, Sparkles, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';
import confetti from 'canvas-confetti';

import { InteractiveLineChart } from '../components/charts/InteractiveLineChart';
import { CandlestickChart } from '../components/charts/CandlestickChart';
import { VolumePriceChart } from '../components/charts/VolumePriceChart';

export function PracticeChartsView() {
  const { addXP, showToast, navigateTo } = useApp();

  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const challenges = [
    {
      id: 1,
      title: "Challenge 1 — Return Calculation",
      question: "Looking at the chart below, the stock price moved from ₹200 to ₹240. What was the percentage return?",
      chartType: "line",
      chartData: [
        { date: 'Day 1 (Buy)', value: 200 },
        { date: 'Day 10', value: 215 },
        { date: 'Day 20', value: 228 },
        { date: 'Day 30 (Sell)', value: 240 }
      ],
      options: [
        { id: 'a', text: '+40% Return', isCorrect: false },
        { id: 'b', text: '+20% Return ((240 - 200) / 200)', isCorrect: true },
        { id: 'c', text: '+15% Return', isCorrect: false },
        { id: 'd', text: '+24% Return', isCorrect: false }
      ],
      explanation: "Percentage Return = ((Ending Price - Starting Price) / Starting Price) * 100 = (40 / 200) * 100 = 20% gain."
    },
    {
      id: 2,
      title: "Challenge 2 — Candlestick Range",
      question: "Which candle had the largest overall trading range (distance from the very top of the upper wick to the bottom of the lower wick)?",
      chartType: "candlestick",
      candles: [
        { label: 'Candle 1', open: 100, high: 108, low: 98, close: 106 }, // range 10
        { label: 'Candle 2', open: 106, high: 112, low: 104, close: 110 }, // range 8
        { label: 'Candle 3 (Wild)', open: 110, high: 135, low: 95, close: 125 }, // range 40
        { label: 'Candle 4', open: 125, high: 130, low: 122, close: 128 }, // range 8
        { label: 'Candle 5', open: 128, high: 132, low: 124, close: 126 } // range 8
      ],
      options: [
        { id: 'a', text: 'Candle 1', isCorrect: false },
        { id: 'b', text: 'Candle 2', isCorrect: false },
        { id: 'c', text: 'Candle 3 (High ₹135 to Low ₹95 = ₹40 range)', isCorrect: true },
        { id: 'd', text: 'Candle 5', isCorrect: false }
      ],
      explanation: "Candle 3 spanned ₹40 between high (₹135) and low (₹95), representing intense intraday volatility."
    },
    {
      id: 3,
      title: "Challenge 3 — Trading Volume Confirmation",
      question: "On which day did the stock experience a massive surge in trading volume alongside a price breakout?",
      chartType: "volume",
      volumeData: [
        { date: 'Mon', price: 500, volume: 20000 },
        { date: 'Tue', price: 505, volume: 18000 },
        { date: 'Wed', price: 502, volume: 15000 },
        { date: 'Thu (Breakout)', price: 545, volume: 120000 },
        { date: 'Fri', price: 550, volume: 45000 }
      ],
      options: [
        { id: 'a', text: 'Monday', isCorrect: false },
        { id: 'b', text: 'Tuesday', isCorrect: false },
        { id: 'c', text: 'Thursday (120,000 shares traded)', isCorrect: true },
        { id: 'd', text: 'Wednesday', isCorrect: false }
      ],
      explanation: "Thursday saw a 6x volume spike (120k shares), confirming heavy institutional buying power."
    },
    {
      id: 4,
      title: "Challenge 4 — Largest Drawdown",
      question: "Which of the two hypothetical investments on this chart experienced the largest percentage decline from its peak?",
      chartType: "compare",
      lineA: [
        { date: 'Start', value: 100 },
        { date: 'Peak', value: 130 },
        { date: 'Trough', value: 120 }, // -7.6%
        { date: 'End', value: 140 }
      ],
      lineB: [
        { date: 'Start', value: 100 },
        { date: 'Peak', value: 150 },
        { date: 'Trough', value: 95 }, // -36.6%
        { date: 'End', value: 140 }
      ],
      options: [
        { id: 'a', text: 'Investment A (Green — only fell from ₹130 to ₹120)', isCorrect: false },
        { id: 'b', text: 'Investment B (Purple — plunged from ₹150 down to ₹95 = -36.6%)', isCorrect: true },
        { id: 'c', text: 'Both experienced zero drawdown', isCorrect: false }
      ],
      explanation: "Investment B suffered a 36.6% crash from ₹150 to ₹95 before recovering."
    },
    {
      id: 5,
      title: "Challenge 5 — Identifying Volatility",
      question: "An investor needs money within 18 months and wants lower emotional anxiety. Which path matches their risk profile?",
      chartType: "compare_volatility",
      lineA: [
        { date: 'M1', value: 1000 },
        { date: 'M6', value: 1040 },
        { date: 'M12', value: 1080 },
        { date: 'M18', value: 1120 }
      ],
      lineB: [
        { date: 'M1', value: 1000 },
        { date: 'M6', value: 1250 },
        { date: 'M12', value: 850 },
        { date: 'M18', value: 1120 }
      ],
      options: [
        { id: 'a', text: 'Path A (Low Volatility, smooth predictable growth)', isCorrect: true },
        { id: 'b', text: 'Path B (High Volatility, sharp -32% drop at month 12)', isCorrect: false },
        { id: 'c', text: 'Neither', isCorrect: false }
      ],
      explanation: "For short horizons under 2 years, smooth Path A protects capital from sudden market drawdowns."
    },
    {
      id: 6,
      title: "Challenge 6 — 2x Wealth Doubling Milestone",
      question: "At which time point did an investor who purchased at ₹100 successfully double their capital to ₹200?",
      chartType: "line",
      chartData: [
        { date: 'Month 1 (Buy @ ₹100)', value: 100 },
        { date: 'Month 3', value: 140 },
        { date: 'Month 6 (Doubled @ ₹200)', value: 200 },
        { date: 'Month 9', value: 230 },
        { date: 'Month 12', value: 260 }
      ],
      options: [
        { id: 'a', text: 'Month 3', isCorrect: false },
        { id: 'b', text: 'Month 6 (Reached ₹200 = 2x of ₹100)', isCorrect: true },
        { id: 'c', text: 'Month 12', isCorrect: false },
        { id: 'd', text: 'Month 1', isCorrect: false }
      ],
      explanation: "At Month 6, the price crossed ₹200, achieving a 100% gain (2x doubling of starting capital)."
    }
  ];

  const currentChallenge = challenges[currentChallengeIndex];

  const handleSelectOption = (opt) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setIsAnswerSubmitted(true);
    if (selectedOption.isCorrect) {
      setScore(prev => prev + 1);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    }
  };

  const handleNext = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      showToast("Chart Master Challenge Complete! 🏆", `Score: ${score + (selectedOption?.isCorrect ? 1 : 0)} / ${challenges.length}`, 150);
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRestart = () => {
    setCurrentChallengeIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fade-in" style={{ maxWidth: 840, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #065F46 0%, #047857 100%)',
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
              HANDS-ON LAB
            </span>
            <span style={{ fontSize: 12, color: '#A7F3D0' }}>Interactive Chart Diagnostic</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
            🧪 Practice with Charts
          </h1>
          <p style={{ fontSize: 14, color: '#D1FAE5', marginTop: 4, maxWidth: 540 }}>
            Test your ability to read price trends, spot volume surges, identify candlesticks, and evaluate drawdowns with real visual charts.
          </p>
        </div>

        <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.2)', padding: '12px 18px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ fontSize: 11, color: '#A7F3D0', fontWeight: 700 }}>CHALLENGE PROGRESS</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#FFFFFF', marginTop: 2 }}>
            {currentChallengeIndex + 1} / {challenges.length}
          </div>
          <div style={{ fontSize: 12, color: '#FCD34D', fontWeight: 700 }}>
            Score: {score} Correct
          </div>
        </div>
      </div>

      {!isCompleted ? (
        <div className="groww-card" style={{ padding: '28px' }}>
          {/* Challenge Title */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <span className="badge badge-green">{currentChallenge.title}</span>
            <span style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 600 }}>
              Question {currentChallengeIndex + 1} of {challenges.length}
            </span>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginBottom: 16 }}>
            {currentChallenge.question}
          </h2>

          {/* Interactive Chart Canvas based on challenge type */}
          <div style={{ marginBottom: 20 }}>
            {currentChallenge.chartType === 'line' && (
              <InteractiveLineChart
                data={currentChallenge.chartData}
                timeframes={[]}
                title="Simulated Price Action"
              />
            )}

            {currentChallenge.chartType === 'candlestick' && (
              <CandlestickChart
                candles={currentChallenge.candles}
                title="5-Day Candlestick Sequence"
              />
            )}

            {currentChallenge.chartType === 'volume' && (
              <VolumePriceChart
                data={currentChallenge.volumeData}
                title="Price & Volume Breakdown"
              />
            )}

            {(currentChallenge.chartType === 'compare' || currentChallenge.chartType === 'compare_volatility') && (
              <InteractiveLineChart
                data={currentChallenge.lineA}
                showBenchmark={true}
                benchmarkData={currentChallenge.lineB}
                color="#00D09C"
                benchmarkColor="#8B5CF6"
                title="Investment A (Green) vs Investment B (Purple)"
                timeframes={[]}
              />
            )}
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {currentChallenge.options.map(opt => {
              let btnBg = '#FFFFFF';
              let btnBorder = 'var(--border-color)';
              let btnColor = 'var(--text-main)';

              if (isAnswerSubmitted) {
                if (opt.isCorrect) {
                  btnBg = 'var(--primary-light)';
                  btnBorder = 'var(--primary-dark)';
                  btnColor = 'var(--primary-dark)';
                } else if (selectedOption?.id === opt.id) {
                  btnBg = '#FEE2E2';
                  btnBorder = '#EF4444';
                  btnColor = '#991B1B';
                }
              } else if (selectedOption?.id === opt.id) {
                btnBg = 'var(--primary-light)';
                btnBorder = 'var(--primary)';
                btnColor = 'var(--primary-dark)';
              }

              return (
                <div
                  key={opt.id}
                  onClick={() => handleSelectOption(opt)}
                  style={{
                    padding: '14px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${btnBorder}`,
                    background: btnBg,
                    color: btnColor,
                    cursor: isAnswerSubmitted ? 'default' : 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'var(--transition)'
                  }}
                >
                  <span>{opt.text}</span>
                  {isAnswerSubmitted && opt.isCorrect && <CheckCircle2 size={18} color="var(--primary-dark)" />}
                  {isAnswerSubmitted && selectedOption?.id === opt.id && !opt.isCorrect && <AlertCircle size={18} color="#EF4444" />}
                </div>
              );
            })}
          </div>

          {/* Feedback Explanation */}
          {isAnswerSubmitted && (
            <div style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: selectedOption?.isCorrect ? 'var(--primary-light)' : '#FFFBEB',
              border: `1.5px solid ${selectedOption?.isCorrect ? 'var(--primary-border)' : '#FCD34D'}`,
              marginBottom: 20,
              fontSize: 13,
              color: selectedOption?.isCorrect ? 'var(--primary-dark)' : '#92400E',
              lineHeight: 1.5
            }}>
              <strong>{selectedOption?.isCorrect ? '✅ Correct!' : '💡 Explanation:'}</strong> {currentChallenge.explanation}
            </div>
          )}

          {/* Action Button */}
          {!isAnswerSubmitted ? (
            <button
              className="btn-primary"
              onClick={handleSubmitAnswer}
              disabled={!selectedOption}
              style={{ width: '100%', padding: '14px', fontSize: 15, opacity: selectedOption ? 1 : 0.6 }}
            >
              <span>Submit Answer</span>
              <CheckCircle2 size={16} />
            </button>
          ) : (
            <button
              className="btn-primary"
              onClick={handleNext}
              style={{ width: '100%', padding: '14px', fontSize: 15 }}
            >
              <span>{currentChallengeIndex === challenges.length - 1 ? 'Finish Practice Lab' : 'Next Challenge'}</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      ) : (
        /* Results Card */
        <div className="groww-card" style={{ padding: '36px 28px', textAlign: 'center' }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--primary-light)',
            color: 'var(--primary-dark)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            fontSize: 32
          }}>
            🏆
          </div>

          <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)' }}>
            Chart Practice Completed!
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginTop: 4 }}>
            You scored <strong>{score} out of {challenges.length}</strong> on visual chart interpretation.
          </p>

          <div style={{
            margin: '24px auto',
            maxWidth: 360,
            padding: '16px',
            background: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-around'
          }}>
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 700 }}>ACCURACY</span>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary-dark)' }}>
                {Math.round((score / challenges.length) * 100)}%
              </div>
            </div>
            <div style={{ borderLeft: '1px solid var(--border-color)', height: 36 }} />
            <div>
              <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 700 }}>BONUS XP</span>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#D97706' }}>+150 XP</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={handleRestart}>
              <RefreshCw size={15} />
              <span>Retry Lab</span>
            </button>

            <button className="btn-primary" onClick={() => navigateTo('simulator')}>
              <span>Try Market Simulator</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
