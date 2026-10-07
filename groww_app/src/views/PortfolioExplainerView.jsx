import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_PORTFOLIO_DATA } from '../data/portfolioData';
import { InteractiveLineChart } from '../components/charts/InteractiveLineChart';
import { RiskReturnScatter } from '../components/charts/RiskReturnScatter';
import { PieChart, ShieldCheck, AlertTriangle, CheckCircle2, Layers, HelpCircle, ArrowRight, BookOpen, TrendingUp, Info } from 'lucide-react';

export function PortfolioExplainerView() {
  const { navigateTo, openLesson } = useApp();
  const [activeTab, setActiveTab] = useState('performance'); // 'performance' | 'holdings' | 'overlap' | 'risk' | 'sectors'
  const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');
  const [showBenchmark, setShowBenchmark] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(null);

  const data = MOCK_PORTFOLIO_DATA;

  // Portfolio performance timeframes data
  const timeframeData = {
    '1M': {
      invested: 20000,
      current: 20640,
      gain: 640,
      returnPct: '+3.2%',
      chart: [
        { date: 'Week 1', value: 20000, label: 'Start of month' },
        { date: 'Week 2', value: 20180, label: 'Small rally' },
        { date: 'Week 3', value: 19850, label: 'Brief dip' },
        { date: 'Week 4', value: 20640, label: 'Month close' }
      ],
      benchmark: [
        { date: 'Week 1', value: 20000 },
        { date: 'Week 2', value: 20100 },
        { date: 'Week 3', value: 19900 },
        { date: 'Week 4', value: 20450 }
      ],
      milestones: [
        { index: 2, value: 19850, title: 'Short-term Market Dip', description: 'Small 1.5% weekly fluctuation. Normal noise that does not harm long-term goals.', color: '#E11D48', badge: '📉 Dip' }
      ]
    },
    '6M': {
      invested: 20000,
      current: 21800,
      gain: 1800,
      returnPct: '+9.0%',
      chart: [
        { date: 'Month 1', value: 20000, label: 'SIP start' },
        { date: 'Month 2', value: 20500, label: 'Earnings rally' },
        { date: 'Month 3', value: 19600, label: 'Market correction' },
        { date: 'Month 4', value: 20800, label: 'Recovery begins' },
        { date: 'Month 5', value: 21200, label: 'Steady compounding' },
        { date: 'Month 6', value: 21800, label: 'Current value' }
      ],
      benchmark: [
        { date: 'Month 1', value: 20000 },
        { date: 'Month 2', value: 20350 },
        { date: 'Month 3', value: 19500 },
        { date: 'Month 4', value: 20400 },
        { date: 'Month 5', value: 20900 },
        { date: 'Month 6', value: 21400 }
      ],
      milestones: [
        { index: 2, value: 19600, title: 'Sector Rotation Dip (-4.4%)', description: 'Tech sector profit-booking caused a temporary pull-back. Regular SIP investments bought more units at lower prices.', color: '#E11D48', badge: '⚡ Dip' },
        { index: 5, value: 21800, title: 'New Portfolio High', description: 'Diversified equity allocation rebounded to +9.0% total return.', color: '#00B386', badge: '🚀 High' }
      ]
    },
    '1Y': {
      invested: 20000,
      current: 23400,
      gain: 3400,
      returnPct: '+17.0%',
      chart: [
        { date: 'Jan', value: 20000, label: 'Initial allocation' },
        { date: 'Mar', value: 20900, label: 'Q1 positive sentiment' },
        { date: 'May', value: 19400, label: 'Market pullback (-7%)' },
        { date: 'Jul', value: 21200, label: 'Monsoon rally' },
        { date: 'Sep', value: 22100, label: 'Q2 corporate earnings' },
        { date: 'Nov', value: 22700, label: 'Festive demand surge' },
        { date: 'Dec', value: 23400, label: 'Current 1Y balance' }
      ],
      benchmark: [
        { date: 'Jan', value: 20000 },
        { date: 'Mar', value: 20600 },
        { date: 'May', value: 19200 },
        { date: 'Jul', value: 20800 },
        { date: 'Sep', value: 21600 },
        { date: 'Nov', value: 22100 },
        { date: 'Dec', value: 22600 }
      ],
      milestones: [
        { index: 2, value: 19400, title: '7% Mid-Year Market Drawdown', description: 'Global inflation fears sparked a temporary sell-off. Investors who held their nerve gained +20% from this bottom.', color: '#E11D48', badge: '⚠️ -7% Dip' },
        { index: 6, value: 23400, title: 'Portfolio Beat Nifty 50 (+17% vs +13%)', description: 'Your mix of Index Fund + Parag Parikh Flexi Cap generated alpha over broad market indices.', color: '#00D09C', badge: '🏆 +17% Peak' }
      ]
    },
    '3Y': {
      invested: 20000,
      current: 29800,
      gain: 9800,
      returnPct: '+49.0%',
      chart: [
        { date: 'Year 0', value: 20000, label: 'Start' },
        { date: '6M', value: 21200, label: 'Gradual rise' },
        { date: '1Y', value: 23400, label: 'Year 1 milestone' },
        { date: '1.5Y', value: 22100, label: 'Interim correction' },
        { date: '2Y', value: 25600, label: 'Macro expansion' },
        { date: '2.5Y', value: 27900, label: 'Strong compounding' },
        { date: '3Y', value: 29800, label: 'Year 3 closing' }
      ],
      benchmark: [
        { date: 'Year 0', value: 20000 },
        { date: '6M', value: 20800 },
        { date: '1Y', value: 22600 },
        { date: '1.5Y', value: 21500 },
        { date: '2Y', value: 24400 },
        { date: '2.5Y', value: 26500 },
        { date: '3Y', value: 28200 }
      ],
      milestones: [
        { index: 3, value: 22100, title: 'Mid-Cycle Correction', description: 'A reminder that equity compounding is never a straight line; staying invested is key.', color: '#E11D48', badge: '📉 Correction' },
        { index: 6, value: 29800, title: 'Power of Compounding', description: 'Compounding accelerates as early gains begin earning returns of their own.', color: '#00B386', badge: '🌱 +49%' }
      ]
    },
    '5Y': {
      invested: 20000,
      current: 38400,
      gain: 18400,
      returnPct: '+92.0%',
      chart: [
        { date: 'Year 0', value: 20000, label: 'Start' },
        { date: 'Year 1', value: 23400, label: 'Year 1' },
        { date: 'Year 2', value: 25600, label: 'Year 2' },
        { date: 'Year 3', value: 29800, label: 'Year 3' },
        { date: 'Year 4', value: 33500, label: 'Year 4' },
        { date: 'Year 5', value: 38400, label: 'Year 5 doubling' }
      ],
      benchmark: [
        { date: 'Year 0', value: 20000 },
        { date: 'Year 1', value: 22600 },
        { date: 'Year 2', value: 24400 },
        { date: 'Year 3', value: 28200 },
        { date: 'Year 4', value: 31800 },
        { date: 'Year 5', value: 35900 }
      ],
      milestones: [
        { index: 5, value: 38400, title: 'Long-term Wealth Created (+92%)', description: 'Illustrates how diversified equity nearly doubles over a full 5-year business cycle.', color: '#00D09C', badge: '✨ +92%' }
      ]
    }
  };

  const currentTF = timeframeData[selectedTimeframe] || timeframeData['1Y'];

  return (
    <div className="fade-in" style={{ maxWidth: 920, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      
      {/* Top Banner */}
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
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="badge badge-demo">SIMULATED PORTFOLIO</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Demo Portfolio Explainer</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
            Portfolio Performance & Analytics
          </h1>
          <p style={{ fontSize: 14, color: '#CBD5E1', marginTop: 4, maxWidth: 560 }}>
            Track simulated growth, compare against broad market benchmarks, inspect drawdown dips, and decode your true risk profile.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '16px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: 12, color: '#94A3B8' }}>Simulated Value ({selectedTimeframe})</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#00D09C', marginTop: 2 }}>
            ₹{currentTF.current.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#00D09C', fontWeight: 700 }}>
            {currentTF.returnPct} (+₹{currentTF.gain.toLocaleString('en-IN')})
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        background: '#FFFFFF',
        padding: '10px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        {[
          { id: 'performance', label: '📈 Performance & Benchmark' },
          { id: 'holdings', label: '1. What You Own (Holdings)' },
          { id: 'overlap', label: '2. Hidden Overlap Detector ⚠️' },
          { id: 'risk', label: '3. Risk vs Return Map' },
          { id: 'sectors', label: '4. Sector Breakdown' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: '10px 18px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 700,
              background: activeTab === t.id ? 'var(--primary-dark)' : 'transparent',
              color: activeTab === t.id ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'var(--transition)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB: PERFORMANCE & BENCHMARK */}
      {activeTab === 'performance' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Performance Summary Metrics */}
          <div className="grid-4" style={{ gap: 12 }}>
            <div className="groww-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>INVESTED AMOUNT</div>
              <div style={{ fontSize: 18, fontWeight: 800, marginTop: 4 }}>₹{currentTF.invested.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>Monthly systematic contributions</div>
            </div>

            <div className="groww-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>CURRENT VALUE</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginTop: 4 }}>₹{currentTF.current.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>Based on {selectedTimeframe} timeline</div>
            </div>

            <div className="groww-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>ABSOLUTE GAIN</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#00B386', marginTop: 4 }}>+₹{currentTF.gain.toLocaleString('en-IN')}</div>
              <div style={{ fontSize: 11, color: '#00B386', fontWeight: 600, marginTop: 2 }}>Net wealth generated</div>
            </div>

            <div className="groww-card" style={{ padding: '16px' }}>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>PERCENTAGE RETURN</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#00B386', marginTop: 4 }}>{currentTF.returnPct}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>Overall portfolio CAGR</div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="groww-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, gap: 10 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 800 }}>Portfolio Value Over Time</h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
                  Hover over the chart to inspect dates. Click milestone pins (📍) to see what drove changes.
                </p>
              </div>

              {/* Benchmark Toggle Button */}
              <button
                onClick={() => setShowBenchmark(!showBenchmark)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 12,
                  fontWeight: 700,
                  border: showBenchmark ? '1.5px solid #3B82F6' : '1px solid var(--border-color)',
                  background: showBenchmark ? '#EFF6FF' : '#FFFFFF',
                  color: showBenchmark ? '#1D4ED8' : 'var(--text-muted)',
                  cursor: 'pointer'
                }}
              >
                <span>📊 {showBenchmark ? 'Hide Benchmark' : 'Compare with Nifty 50 Benchmark'}</span>
              </button>
            </div>

            <InteractiveLineChart
              data={currentTF.chart}
              benchmarkData={currentTF.benchmark}
              showBenchmark={showBenchmark}
              color="#00D09C"
              benchmarkColor="#3B82F6"
              timeframes={['1M', '6M', '1Y', '3Y', '5Y']}
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={(tf) => {
                setSelectedTimeframe(tf);
                setActiveMilestone(null);
              }}
              interactivePoints={currentTF.milestones}
              onPointClick={(pt) => setActiveMilestone(pt)}
              title="Simulated Portfolio Growth"
            />

            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 12 }}>
              *Illustrative simulation — benchmark comparison helps you understand performance relative to the broad market and is not a recommendation.
            </div>
          </div>

          {/* 💡 UNDERSTAND THIS GRAPH FEATURE */}
          <div className="groww-card" style={{ padding: '24px', background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)', border: '1.5px solid #E2E8F0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#FEF08A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15 }}>
                💡
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: 'var(--primary-dark)' }}>
                Understand This Graph — Interactive Lesson
              </h3>
            </div>

            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Tap on any of the guided questions below to learn why financial graphs behave this way:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                {
                  id: 'dip',
                  question: '📉 "Why did my portfolio value fall during Month 5 / May?"',
                  happened: 'The broader stock market went through a temporary 7% pullback due to macro interest-rate headwinds.',
                  learn: 'Short-term portfolio declines are completely normal in market-linked investing. If your financial goal is 5+ years away, market dips are opportunities for monthly SIPs to accumulate more units at cheaper NAVs.'
                },
                {
                  id: 'benchmark',
                  question: '📊 "Why do we compare performance against the Nifty 50?"',
                  happened: 'Nifty 50 tracks India’s 50 largest bluechip corporations, acting as the standard yardstick for Indian equity markets.',
                  learn: 'If a portfolio returns +17% while the benchmark returns +13%, the portfolio generated +4% "Alpha" through smart diversification. However, past outperformance never guarantees future gains.'
                },
                {
                  id: 'recovery',
                  question: '🚀 "How did the portfolio recover to new highs?"',
                  happened: 'Companies continued earning profits and paying dividends, allowing economic growth to power the stock market rebound.',
                  learn: 'Selling during a market crash turns a temporary "unrealized paper loss" into a permanent "realized loss." Staying calm and disciplined is the #1 superpower of successful investors.'
                }
              ].map((item) => (
                <details
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 16px',
                    cursor: 'pointer'
                  }}
                >
                  <summary style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', userSelect: 'none' }}>
                    {item.question}
                  </summary>
                  <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>What happened?</span>
                      <p style={{ fontSize: 13, color: 'var(--text-main)', marginTop: 2 }}>{item.happened}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: 11, fontWeight: 800, color: '#00B386', textTransform: 'uppercase' }}>What should you learn?</span>
                      <p style={{ fontSize: 13, color: 'var(--text-main)', marginTop: 2 }}>{item.learn}</p>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: WHAT YOU OWN & WHAT IT MEANS */}
      {activeTab === 'holdings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>
            Here is the simple-English translation of the assets in your simulated portfolio:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.holdings.map(h => (
              <div key={h.id} className="groww-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginBottom: 8 }}>
                  <div>
                    <span className="badge badge-slate" style={{ marginBottom: 4 }}>
                      {h.category}
                    </span>
                    <h3 style={{ fontSize: 16, fontWeight: 800 }}>{h.name}</h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-main)' }}>
                      ₹{h.amount.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-light)', fontWeight: 600 }}>
                      {h.percentage}% of portfolio
                    </div>
                  </div>
                </div>

                <div style={{
                  padding: '12px 14px',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  lineHeight: 1.4,
                  marginTop: 10
                }}>
                  <strong style={{ color: 'var(--primary-dark)' }}>In plain English:</strong> {h.purpose}
                  <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 4 }}>
                    Expense Ratio: <strong>{h.expenseRatio}</strong> • Risk Level: <strong>{h.riskLevel}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: HIDDEN OVERLAP DETECTOR */}
      {activeTab === 'overlap' && (
        <div className="groww-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span className="badge badge-amber">OVERLAP ANALYSIS</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Portfolio Intelligence</span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
            ⚠️ 42% Common Holdings Overlap Detected
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            You own both <em>ICICI Nifty 50 Index Fund</em> and <em>Parag Parikh Flexi Cap Fund</em>. Let's see what they both hold:
          </p>

          <div style={{
            background: '#FFFBEB',
            border: '1.5px solid #FCD34D',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            marginBottom: 20
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#92400E', marginBottom: 4 }}>
              💡 Key Insight: Owning More Funds ≠ More Diversification
            </div>
            <p style={{ fontSize: 13, color: '#78350F', lineHeight: 1.5 }}>
              {data.overlapAnalysis.educationalInsight}
            </p>
          </div>

          <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: 20 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
                <tr style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Company Name</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Sector</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>ICICI Index Fund</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Parag Parikh Fund</th>
                </tr>
              </thead>
              <tbody>
                {data.overlapAnalysis.commonHoldings.map((h, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{h.company}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{h.sector}</td>
                    <td style={{ padding: '12px 16px', color: '#1E40AF', fontWeight: 700 }}>{h.weightFundA}</td>
                    <td style={{ padding: '12px 16px', color: '#047857', fontWeight: 700 }}>{h.weightFundB}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            className="btn-outline"
            onClick={() => openLesson('what-is-diversification')}
            style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
          >
            <BookOpen size={16} />
            <span>Learn More About True Diversification (4 min)</span>
          </button>
        </div>
      )}

      {/* TAB 3: RISK VS RETURN MAP */}
      {activeTab === 'risk' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="groww-card" style={{ padding: '24px' }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>PORTFOLIO HEALTH</span>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
              Risk Snapshot: {data.riskSnapshot.score}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 20 }}>
              {data.riskSnapshot.description}
            </p>

            <div className="grid-2" style={{ gap: 14, marginBottom: 20 }}>
              <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary-dark)', marginBottom: 4 }}>
                  🛡️ Liquidity Safety Buffer
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-main)', lineHeight: 1.4 }}>
                  {data.riskSnapshot.safetyBuffer}
                </p>
              </div>

              <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 4 }}>
                  ⏱️ Recommended Time Horizon
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-main)', lineHeight: 1.4 }}>
                  Because 82% is in equity mutual funds, give this portfolio at least <strong>5+ years</strong> to ride out market cycles.
                </p>
              </div>
            </div>

            <div style={{ fontSize: 12, color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <ShieldCheck size={14} color="#00B386" />
              <span>Educational portfolio breakdown. FirstStep does not provide personalized buy/sell advisory.</span>
            </div>
          </div>

          {/* Interactive Risk vs Return Scatter Plot */}
          <RiskReturnScatter title="Visual Risk vs Return Trade-Off Map" />
        </div>
      )}

      {/* TAB 4: SECTOR BREAKDOWN */}
      {activeTab === 'sectors' && (
        <div className="groww-card" style={{ padding: '28px' }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
            Sector Diversification Breakdown
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            How your investments are distributed across key pillars of the Indian economy:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {data.sectors.map(sec => (
              <div key={sec.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  <span>{sec.name}</span>
                  <span style={{ fontWeight: 800, color: sec.color }}>{sec.percentage}%</span>
                </div>
                <div style={{ width: '100%', height: 8, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                  <div style={{ width: `${sec.percentage}%`, height: '100%', background: sec.color, borderRadius: 9999 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
