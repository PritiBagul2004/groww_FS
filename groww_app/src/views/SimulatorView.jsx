import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Activity, ShieldCheck, TrendingUp, TrendingDown, RefreshCw, Award, AlertTriangle, CheckCircle2, ArrowRight, ShoppingCart, Sliders, Play, Plus, Minus } from 'lucide-react';
import confetti from 'canvas-confetti';

import { InteractiveLineChart } from '../components/charts/InteractiveLineChart';
import { WhatIfScenarioChart } from '../components/charts/WhatIfScenarioChart';

export function SimulatorView() {
  const { simulatorState, updateSimulator, runScenario, showToast, navigateTo } = useApp();

  const [activeTab, setActiveTab] = useState('paper_trading'); // 'market_sim' | 'portfolio_sim' | 'paper_trading'

  // ==========================================
  // MODE A: MARKET SIMULATION STATE
  // ==========================================
  const [marketTimeframe, setMarketTimeframe] = useState('1M');
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [marketDecision, setMarketDecision] = useState(null);
  const [marketFeedback, setMarketFeedback] = useState(null);

  const marketTimelineEvents = [
    {
      id: 'e1',
      title: '📈 Price Rises +8% on Sector Momentum',
      type: 'rise',
      priceChange: '+8%',
      currentPrice: 270,
      description: 'The stock surged 8% this week as domestic manufacturing data beat expectations.',
      question: 'The price has quickly jumped from ₹250 to ₹270 (+8%). What would you do?',
      options: [
        { id: 'hold', label: 'Hold and stick to my multi-year goal', consequence: 'Smart patience: avoids trading fees and keeps long-term compounding intact.' },
        { id: 'buy_more', label: 'Buy more shares immediately due to rising hype', consequence: 'Chasing green candles after an 8% run-up increases risk of buying near a short-term peak.' },
        { id: 'sell_all', label: 'Sell everything immediately to pocket ₹20 profit', consequence: 'Locking in tiny gains interrupts long-term compounding and creates tax friction.' },
        { id: 'not_sure', label: 'Not sure / Review business earnings first', consequence: 'Prudent: checking fundamental valuation before acting is what disciplined investors do.' }
      ]
    },
    {
      id: 'e2',
      title: '📉 Global Market Falls -12% on Geopolitical News',
      type: 'fall',
      priceChange: '-12%',
      currentPrice: 238,
      description: 'Overseas inflation figures sparked a 12% broad-market correction across all sectors.',
      question: 'Your stock dropped 12% in 4 days. What is your reaction?',
      options: [
        { id: 'panic_sell', label: 'Sell immediately to stop any more red days', consequence: 'Panic selling locks in a paper loss. Broad market indexes typically recover over 6-12 months.' },
        { id: 'hold', label: 'Hold: remember my 5-year time horizon', consequence: 'Resilience: price drops are normal market breath; holding good assets prevents capital erosion.' },
        { id: 'buy_sip', label: 'Invest regular monthly amount at discounted price', consequence: 'Rupee Cost Averaging: your fixed monthly amount buys more units at cheaper valuations.' },
        { id: 'not_sure', label: 'Pause and learn why the market dipped', consequence: 'Great habit: evaluating root causes eliminates emotional panic.' }
      ]
    },
    {
      id: 'e3',
      title: '📰 Company Announces Strong Quarterly Net Profit (+22%)',
      type: 'earnings',
      priceChange: '+5%',
      currentPrice: 285,
      description: 'Quarterly financial results show 22% higher revenue and debt reduction.',
      question: 'Company fundamentals are improving steadily. What do you do?',
      options: [
        { id: 'hold_compound', label: 'Continue holding as the underlying business is healthy', consequence: 'Core investing principle: stock prices follow business earnings growth over time.' },
        { id: 'sell_quick', label: 'Sell because you made 10% total', consequence: 'Selling great businesses too early is a common beginner mistake.' }
      ]
    }
  ];

  const currentEvent = marketTimelineEvents[currentEventIndex];

  const handleMarketDecisionSubmit = () => {
    if (!marketDecision) return;
    const opt = currentEvent.options.find(o => o.id === marketDecision);
    setMarketFeedback(opt ? opt.consequence : '');
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  const handleNextEvent = () => {
    setMarketDecision(null);
    setMarketFeedback(null);
    setCurrentEventIndex(prev => (prev + 1) % marketTimelineEvents.length);
  };

  // ==========================================
  // MODE C: PAPER TRADING (BUY / SELL SIMULATOR)
  // ==========================================
  const [paperStock, setPaperStock] = useState({
    name: 'Tata Green Power / Bluechip Basket',
    symbol: 'TATA-GREEN',
    price: 250,
    history: [
      { date: '9:15 AM', value: 245 },
      { date: '10:30 AM', value: 248 },
      { date: '12:00 PM', value: 246 },
      { date: '1:30 PM', value: 252 },
      { date: '3:30 PM', value: 250 }
    ]
  });

  const [virtualCash, setVirtualCash] = useState(10000);
  const [holdings, setHoldings] = useState(0); // number of shares
  const [avgBuyPrice, setAvgBuyPrice] = useState(0);
  const [tradeQuantity, setTradeQuantity] = useState(10);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [tradeOutcomeModal, setTradeOutcomeModal] = useState(null);

  const estimatedOrderValue = tradeQuantity * paperStock.price;
  const currentHoldingValue = holdings * paperStock.price;
  const totalInvestedInStock = holdings * avgBuyPrice;
  const unrealizedPnL = currentHoldingValue - totalInvestedInStock;
  const unrealizedPnLPct = totalInvestedInStock > 0 ? ((unrealizedPnL / totalInvestedInStock) * 100).toFixed(1) : 0;

  const handleBuyShares = () => {
    if (estimatedOrderValue > virtualCash || tradeQuantity <= 0) {
      showToast("Insufficient Balance", "You cannot exceed your virtual balance");
      return;
    }

    const newCash = virtualCash - estimatedOrderValue;
    const newHoldings = holdings + tradeQuantity;
    const newTotalCost = totalInvestedInStock + estimatedOrderValue;
    const newAvgPrice = Math.round(newTotalCost / newHoldings);

    setVirtualCash(newCash);
    setHoldings(newHoldings);
    setAvgBuyPrice(newAvgPrice);

    const trade = {
      type: 'BUY',
      qty: tradeQuantity,
      price: paperStock.price,
      total: estimatedOrderValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTradeHistory(prev => [trade, ...prev]);

    showToast("Virtual Order Executed! 📈", `Bought ${tradeQuantity} shares at ₹${paperStock.price}`, 50);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
  };

  const handleSellShares = () => {
    if (tradeQuantity > holdings || holdings === 0) {
      showToast("Insufficient Shares", "You do not own this many shares to sell");
      return;
    }

    const sellTotal = tradeQuantity * paperStock.price;
    const costBasis = tradeQuantity * avgBuyPrice;
    const realizedGain = sellTotal - costBasis;
    const returnPct = costBasis > 0 ? (((sellTotal - costBasis) / costBasis) * 100).toFixed(1) : 0;

    const newCash = virtualCash + sellTotal;
    const newHoldings = holdings - tradeQuantity;

    setVirtualCash(newCash);
    setHoldings(newHoldings);
    if (newHoldings === 0) setAvgBuyPrice(0);

    const trade = {
      type: 'SELL',
      qty: tradeQuantity,
      buyPrice: avgBuyPrice,
      sellPrice: paperStock.price,
      total: sellTotal,
      realizedGain,
      returnPct,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setTradeHistory(prev => [trade, ...prev]);
    setTradeOutcomeModal(trade);

    confetti({ particleCount: 70, spread: 60, origin: { y: 0.7 } });
  };

  const simulatePriceFluctuation = (deltaPct) => {
    const newPrice = Math.max(50, Math.round(paperStock.price * (1 + deltaPct / 100)));
    setPaperStock(prev => ({
      ...prev,
      price: newPrice,
      history: [...prev.history, { date: 'Sim', value: newPrice }]
    }));
    showToast("Simulated Market Tick", `Price moved to ₹${newPrice} (${deltaPct >= 0 ? '+' : ''}${deltaPct}%)`);
  };

  // Decision Challenges in Mode C
  const [challenge1Answer, setChallenge1Answer] = useState(null);
  const [challenge2Selections, setChallenge2Selections] = useState([]);

  return (
    <div className="fade-in" style={{ maxWidth: 940, margin: '20px auto 60px auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      
      {/* Top Banner */}
      <div className="groww-card" style={{
        background: 'linear-gradient(135deg, #0E1318 0%, #1A222C 100%)',
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
            <span className="badge badge-demo">PAPER TRADING SIMULATOR</span>
            <span style={{ fontSize: 12, color: '#94A3B8' }}>Zero Real Money Risk</span>
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
            🎮 Investment Simulator
          </h1>
          <p style={{ fontSize: 14, color: '#CBD5E1', marginTop: 4, maxWidth: 560 }}>
            Learn what investing feels like before using real money. Practice paper buying, selling, and managing volatility safely.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.08)',
          padding: '14px 20px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          textAlign: 'right'
        }}>
          <div style={{ fontSize: 11, color: '#94A3B8', fontWeight: 700 }}>VIRTUAL CASH BALANCE</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#00D09C', marginTop: 2 }}>
            ₹{virtualCash.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 11, color: '#CBD5E1' }}>
            Holdings Value: ₹{currentHoldingValue.toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* 3 Simulator Mode Switcher Tabs */}
      <div style={{
        display: 'flex',
        gap: 10,
        background: '#FFFFFF',
        padding: '8px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)'
      }}>
        {[
          { id: 'paper_trading', label: '1. Buy / Sell Simulation (Paper Trade)' },
          { id: 'market_sim', label: '2. Market Event Simulation' },
          { id: 'portfolio_sim', label: '3. What-If & Stress Tester' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 700,
              background: activeTab === tab.id ? 'var(--primary-dark)' : 'transparent',
              color: activeTab === tab.id ? '#FFFFFF' : 'var(--text-muted)',
              transition: 'var(--transition)',
              textAlign: 'center'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* MODE C: REAL BUY / SELL SIMULATION (PAPER TRADING INTERFACE) */}
      {/* ========================================================================= */}
      {activeTab === 'paper_trading' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Main Paper Trading Desk */}
          <div className="groww-card" style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 16 }}>
              <div>
                <span className="badge badge-green" style={{ marginBottom: 4 }}>DEMO STOCK</span>
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>{paperStock.name}</h2>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>NSE: {paperStock.symbol} • Large Cap Basket</span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-main)' }}>
                  ₹{paperStock.price}
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-light)' }}>Simulated Live Price</div>
              </div>
            </div>

            {/* Price Chart */}
            <div style={{ marginBottom: 20 }}>
              <InteractiveLineChart
                data={paperStock.history}
                timeframes={[]}
                title="Live Simulated Price Action"
              />
            </div>

            {/* Simulated Price Mover Controls for Practice */}
            <div style={{
              background: 'var(--bg-subtle)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 20
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)' }}>
                Simulate Market Movement:
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => simulatePriceFluctuation(5)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', background: '#DCFCE7', color: '#166534', border: '1px solid #86EFAC', fontSize: 12, fontWeight: 700 }}
                >
                  📈 Price Rallies (+5%)
                </button>
                <button
                  onClick={() => simulatePriceFluctuation(-6)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', background: '#FEE2E2', color: '#991B1B', border: '1px solid #FECDD3', fontSize: 12, fontWeight: 700 }}
                >
                  📉 Price Dips (-6%)
                </button>
                <button
                  onClick={() => simulatePriceFluctuation(10)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', background: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE', fontSize: 12, fontWeight: 700 }}
                >
                  🚀 Breakout (+10%)
                </button>
              </div>
            </div>

            {/* Order Execution Panel */}
            <div style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: '1.5px solid var(--border-color)',
              background: '#FFFFFF'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                    ORDER QUANTITY (SHARES)
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      onClick={() => setTradeQuantity(Math.max(1, tradeQuantity - 5))}
                      style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={tradeQuantity}
                      onChange={e => setTradeQuantity(Math.max(1, Number(e.target.value)))}
                      style={{ width: 70, textAlign: 'center', padding: '6px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontWeight: 800, fontSize: 16 }}
                    />
                    <button
                      onClick={() => setTradeQuantity(tradeQuantity + 5)}
                      style={{ width: 34, height: 34, borderRadius: 'var(--radius-sm)', background: 'var(--bg-subtle)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 700 }}>ORDER ESTIMATED VALUE</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>
                    ₹{estimatedOrderValue.toLocaleString('en-IN')}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    Balance after buy: ₹{(virtualCash - estimatedOrderValue).toLocaleString('en-IN')}
                  </div>
                </div>

                {/* BUY and SELL CTA Buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    className="btn-primary"
                    onClick={handleBuyShares}
                    disabled={estimatedOrderValue > virtualCash}
                    style={{ padding: '12px 24px', fontSize: 15, opacity: estimatedOrderValue > virtualCash ? 0.6 : 1 }}
                  >
                    <span>BUY ({tradeQuantity})</span>
                  </button>

                  <button
                    onClick={handleSellShares}
                    disabled={holdings < tradeQuantity || holdings === 0}
                    style={{
                      background: holdings >= tradeQuantity ? '#E11D48' : '#F1F5F9',
                      color: holdings >= tradeQuantity ? '#FFFFFF' : '#94A3B8',
                      fontWeight: 700,
                      padding: '12px 24px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 15,
                      cursor: holdings >= tradeQuantity ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <span>SELL ({tradeQuantity})</span>
                  </button>
                </div>
              </div>

              {/* Current Portfolio Position */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                padding: '12px 14px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: 13,
                border: '1px solid var(--border-subtle)',
                gap: 10
              }}>
                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: 11 }}>YOUR HOLDINGS</span>
                  <div style={{ fontWeight: 800 }}>{holdings} shares</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: 11 }}>AVG BUY PRICE</span>
                  <div style={{ fontWeight: 800 }}>₹{avgBuyPrice}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-light)', fontSize: 11 }}>CURRENT VALUE</span>
                  <div style={{ fontWeight: 800 }}>₹{currentHoldingValue.toLocaleString('en-IN')}</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: 'var(--text-light)', fontSize: 11 }}>UNREALIZED P&L</span>
                  <div style={{ fontWeight: 800, color: unrealizedPnL >= 0 ? '#00B386' : '#E11D48' }}>
                    {unrealizedPnL >= 0 ? '+' : ''}₹{unrealizedPnL.toLocaleString('en-IN')} ({unrealizedPnL >= 0 ? '+' : ''}{unrealizedPnLPct}%)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Decision Challenges */}
          <div className="groww-card" style={{ padding: '24px 28px' }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
              🧠 Buy / Hold / Sell Decision Challenges
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>
              Test your decision-making instincts in real investing scenarios:
            </p>

            {/* Scenario 1 */}
            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: 18 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                Scenario 1: You bought at ₹100. The price is now ₹125 (+25%). Your fundamental thesis and multi-year horizon have not changed. What do you do?
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 10 }}>
                {[
                  { id: 'more', label: 'Buy More' },
                  { id: 'hold', label: 'Hold (Recommended)' },
                  { id: 'sell', label: 'Sell' },
                  { id: 'not_sure', label: "I'm not sure" }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setChallenge1Answer(opt.id)}
                    style={{
                      padding: '10px 8px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: 12,
                      fontWeight: 700,
                      background: challenge1Answer === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                      color: challenge1Answer === opt.id ? 'var(--primary-dark)' : 'var(--text-main)',
                      border: `1.5px solid ${challenge1Answer === opt.id ? 'var(--primary-dark)' : 'var(--border-color)'}`
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {challenge1Answer && (
                <div style={{ marginTop: 12, fontSize: 12, color: 'var(--primary-dark)', background: '#FFFFFF', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-border)' }}>
                  💡 <strong>Insight:</strong> There isn't automatically one single correct answer. If your thesis is strong and money is for 5+ years, <strong>Holding</strong> allows compounding to run. Selling too early cuts off future business gains.
                </div>
              )}
            </div>

            {/* Scenario 2 */}
            <div style={{ padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
                Scenario 2: You bought at ₹100. The price falls to ₹80 (-20%). Social media sentiment is negative. What should you check before deciding?
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
                {[
                  { id: 'reason', label: '1. Why the price fell (Macro news vs real company issue)' },
                  { id: 'fund', label: "2. The company's underlying fundamentals and revenue growth" },
                  { id: 'horizon', label: '3. My personal investment time horizon (e.g. 5+ years)' },
                  { id: 'risk', label: '4. My personal risk tolerance' },
                  { id: 'hype', label: '5. "Everyone online on Twitter/Reddit is selling!" (Avoid emotional trap)' }
                ].map(opt => {
                  const isChecked = challenge2Selections.includes(opt.id);
                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        setChallenge2Selections(prev =>
                          prev.includes(opt.id) ? prev.filter(x => x !== opt.id) : [...prev, opt.id]
                        );
                      }}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? (opt.id === 'hype' ? '#FEE2E2' : 'var(--primary-light)') : '#FFFFFF',
                        border: `1px solid ${isChecked ? (opt.id === 'hype' ? '#EF4444' : 'var(--primary-dark)') : 'var(--border-color)'}`,
                        fontSize: 13,
                        fontWeight: 600,
                        color: isChecked ? (opt.id === 'hype' ? '#991B1B' : 'var(--primary-dark)') : 'var(--text-main)',
                        cursor: 'pointer'
                      }}
                    >
                      {opt.label}
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
                💡 Select all valid information sources (Options 1–4 are disciplined; Option 5 is an emotional trap).
              </div>
            </div>
          </div>

          {/* Sell Outcome Modal */}
          {tradeOutcomeModal && (
            <div className="modal-overlay" onClick={() => setTradeOutcomeModal(null)}>
              <div className="modal-content" onClick={e => e.stopPropagation()} style={{ padding: '24px', maxWidth: 440 }}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 36, marginBottom: 6 }}>💰</div>
                  <h3 style={{ fontSize: 20, fontWeight: 800 }}>Trade Completed & Closed</h3>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Realized Trade Outcome Breakdown</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, background: 'var(--bg-subtle)', padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Shares Sold:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{tradeOutcomeModal.qty}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Buy Price:</span>
                    <strong>₹{tradeOutcomeModal.buyPrice}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                    <span style={{ color: 'var(--text-muted)' }}>Sell Price:</span>
                    <strong>₹{tradeOutcomeModal.sellPrice}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, borderTop: '1px solid var(--border-subtle)', paddingTop: 8 }}>
                    <span>Realized P&L:</span>
                    <strong style={{ color: tradeOutcomeModal.realizedGain >= 0 ? '#00B386' : '#E11D48' }}>
                      {tradeOutcomeModal.realizedGain >= 0 ? '+' : ''}₹{tradeOutcomeModal.realizedGain} ({tradeOutcomeModal.returnPct}%)
                    </strong>
                  </div>
                </div>

                <button className="btn-primary" onClick={() => setTradeOutcomeModal(null)} style={{ width: '100%', padding: '12px' }}>
                  Back to Simulator
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE A: MARKET SIMULATION TIMELINE */}
      {/* ========================================================================= */}
      {activeTab === 'market_sim' && (
        <div className="groww-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span className="badge badge-green">MARKET CYCLE SIMULATOR</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Event {currentEventIndex + 1} of {marketTimelineEvents.length}
            </span>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6 }}>
            {currentEvent.title}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20 }}>
            {currentEvent.description}
          </p>

          <div style={{ marginBottom: 20 }}>
            <InteractiveLineChart
              data={[
                { date: 'T1', value: 250 },
                { date: 'T2', value: 248 },
                { date: 'T3', value: currentEvent.currentPrice }
              ]}
              timeframes={['1D', '1W', '1M', '6M', '1Y']}
              selectedTimeframe={marketTimeframe}
              onTimeframeChange={setMarketTimeframe}
              title="Simulated Event Price Response"
            />
          </div>

          {/* Decision prompt */}
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 18, marginBottom: 18 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-main)', marginBottom: 12 }}>
              {currentEvent.question}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentEvent.options.map(opt => (
                <div
                  key={opt.id}
                  onClick={() => !marketFeedback && setMarketDecision(opt.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: `1.5px solid ${marketDecision === opt.id ? 'var(--primary-dark)' : 'var(--border-color)'}`,
                    background: marketDecision === opt.id ? 'var(--primary-light)' : '#FFFFFF',
                    cursor: marketFeedback ? 'default' : 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{opt.label}</span>
                  {marketDecision === opt.id && <CheckCircle2 size={18} color="var(--primary-dark)" />}
                </div>
              ))}
            </div>
          </div>

          {!marketFeedback ? (
            <button
              className="btn-primary"
              onClick={handleMarketDecisionSubmit}
              disabled={!marketDecision}
              style={{ width: '100%', padding: '12px', opacity: marketDecision ? 1 : 0.6 }}
            >
              <span>Submit Decision & See Consequence Analysis</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div>
              <div style={{
                padding: '16px',
                background: 'var(--primary-light)',
                borderRadius: 'var(--radius-md)',
                border: '1.5px solid var(--primary-border)',
                fontSize: 13,
                color: '#0E2922',
                marginBottom: 16,
                lineHeight: 1.5
              }}>
                <strong>🧠 Behavioral Feedback:</strong> {marketFeedback}
              </div>

              <button className="btn-primary" onClick={handleNextEvent} style={{ width: '100%', padding: '12px' }}>
                <span>Next Market Event</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE B: WHAT-IF SCENARIOS & STRESS TESTER */}
      {/* ========================================================================= */}
      {activeTab === 'portfolio_sim' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <WhatIfScenarioChart />

          {/* Allocation Stress Tester */}
          <div className="groww-card" style={{ padding: '24px 28px' }}>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 4 }}>
              Asset Allocation Stress Tester
            </h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 16 }}>
              Adjust allocations across Index Funds, Direct Stocks, and Debt to see how your overall portfolio cushions shocks:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'indexFund', name: 'Nifty 50 Index Fund', val: simulatorState.allocations.indexFund, color: '#3B82F6' },
                { key: 'bluechipStock', name: 'Single Direct Stock', val: simulatorState.allocations.bluechipStock, color: '#10B981' },
                { key: 'debtFund', name: 'Liquid Debt Fund', val: simulatorState.allocations.debtFund, color: '#8B5CF6' },
                { key: 'cash', name: 'Emergency Cash Reserve', val: simulatorState.allocations.cash, color: '#64748B' }
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{item.name}</span>
                  <span style={{ fontWeight: 800, color: item.color }}>₹{item.val.toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
