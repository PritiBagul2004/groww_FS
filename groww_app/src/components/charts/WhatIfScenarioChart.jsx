import React, { useState } from 'react';

export function WhatIfScenarioChart({
  height = 240,
  title = "What-If Scenario Simulator"
}) {
  const [startingAmount, setStartingAmount] = useState(10000);
  const [duration, setDuration] = useState('1Y'); // '1M' | '1Y' | '5Y'
  const [scenario, setScenario] = useState('normal'); // 'bull' | 'normal' | 'crash'

  // Generate dynamic simulation points based on selections
  const generatePoints = () => {
    let steps = 12;
    if (duration === '1M') steps = 4;
    if (duration === '5Y') steps = 20;

    const data = [];
    let currentVal = startingAmount;

    for (let i = 0; i <= steps; i++) {
      let growthFactor = 0;
      if (scenario === 'bull') {
        growthFactor = 0.015 + Math.sin(i * 0.8) * 0.008;
      } else if (scenario === 'normal') {
        growthFactor = 0.009 + Math.cos(i * 0.7) * 0.007;
      } else if (scenario === 'crash') {
        // Crash in first third, then gradual recovery
        if (i <= Math.floor(steps * 0.4)) {
          growthFactor = -0.045 + (i * 0.005);
        } else {
          growthFactor = 0.018;
        }
      }

      if (i > 0) {
        currentVal = Math.round(currentVal * (1 + growthFactor));
      }

      data.push({
        step: i,
        label: duration === '1M' ? `W${i}` : duration === '1Y' ? `M${i}` : `Q${i}`,
        value: currentVal
      });
    }
    return data;
  };

  const chartData = generatePoints();
  const finalVal = chartData[chartData.length - 1].value;
  const changeVal = finalVal - startingAmount;
  const pctChange = ((changeVal / startingAmount) * 100).toFixed(1);
  const isPositive = changeVal >= 0;

  // SVG Chart Calculation
  const width = 560;
  const padding = { top: 20, right: 30, bottom: 30, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = chartData.map(d => d.value);
  const minVal = Math.min(...values) * 0.95;
  const maxVal = Math.max(...values) * 1.05;
  const range = maxVal - minVal || 1;

  const getX = (i) => padding.left + (i / (chartData.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - ((val - minVal) / range) * chartHeight;

  const points = chartData.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const pathD = `M ${points.join(' L ')}`;
  const areaD = `M ${getX(0)},${padding.top + chartHeight} L ${points.join(' L ')} L ${getX(chartData.length - 1)},${padding.top + chartHeight} Z`;

  const chartColor = scenario === 'crash' && !isPositive ? '#E11D48' : scenario === 'bull' ? '#00B386' : '#3B82F6';

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '18px', border: '1px solid var(--border-color)' }}>
      {/* Header & Result */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 2 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{finalVal.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: isPositive ? '#00B386' : '#E11D48' }}>
              {isPositive ? '+' : ''}₹{changeVal.toLocaleString('en-IN')} ({isPositive ? '+' : ''}{pctChange}%)
            </span>
          </div>
        </div>

        <span className="badge badge-demo">ILLUSTRATIVE WHAT-IF</span>
      </div>

      {/* 3 Interactive Selector Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
        {/* 1. Starting Amount */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
            STARTING CAPITAL
          </label>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1000, 5000, 10000].map(amt => (
              <button
                key={amt}
                onClick={() => setStartingAmount(amt)}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 11,
                  fontWeight: 700,
                  background: startingAmount === amt ? 'var(--primary-light)' : 'var(--bg-subtle)',
                  color: startingAmount === amt ? 'var(--primary-dark)' : 'var(--text-main)',
                  border: `1px solid ${startingAmount === amt ? 'var(--primary-border)' : 'var(--border-subtle)'}`
                }}
              >
                ₹{amt / 1000}k
              </button>
            ))}
          </div>
        </div>

        {/* 2. Duration */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
            TIME HORIZON
          </label>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: '1M', label: '1 Month' },
              { id: '1Y', label: '1 Year' },
              { id: '5Y', label: '5 Years' }
            ].map(d => (
              <button
                key={d.id}
                onClick={() => setDuration(d.id)}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 11,
                  fontWeight: 700,
                  background: duration === d.id ? 'var(--primary-light)' : 'var(--bg-subtle)',
                  color: duration === d.id ? 'var(--primary-dark)' : 'var(--text-main)',
                  border: `1px solid ${duration === d.id ? 'var(--primary-border)' : 'var(--border-subtle)'}`
                }}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Market Scenario */}
        <div>
          <label style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
            MARKET CYCLE
          </label>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { id: 'bull', label: '🐂 Bull', color: '#00B386' },
              { id: 'normal', label: '⚖️ Normal', color: '#3B82F6' },
              { id: 'crash', label: '🐻 Crash', color: '#E11D48' }
            ].map(sc => (
              <button
                key={sc.id}
                onClick={() => setScenario(sc.id)}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 11,
                  fontWeight: 700,
                  background: scenario === sc.id ? `${sc.color}18` : 'var(--bg-subtle)',
                  color: scenario === sc.id ? sc.color : 'var(--text-main)',
                  border: `1.5px solid ${scenario === sc.id ? sc.color : 'var(--border-subtle)'}`
                }}
              >
                {sc.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Chart */}
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id={`whatIfGrad-${chartColor.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity="0.25" />
            <stop offset="100%" stopColor={chartColor} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.5, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio;
          const val = maxVal - ratio * range;
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8">
                ₹{Math.round(val).toLocaleString('en-IN')}
              </text>
            </g>
          );
        })}

        {/* Shaded Area */}
        <path d={areaD} fill={`url(#whatIfGrad-${chartColor.replace('#', '')})`} />

        {/* Main Line */}
        <path d={pathD} fill="none" stroke={chartColor} strokeWidth="2.5" strokeLinecap="round" />

        {/* Start and End Points */}
        <circle cx={getX(0)} cy={getY(chartData[0].value)} r="4" fill="#64748B" />
        <circle cx={getX(chartData.length - 1)} cy={getY(finalVal)} r="5" fill={chartColor} stroke="#FFFFFF" strokeWidth="2" />

        {/* X Axis Labels */}
        {chartData.filter((_, i) => i === 0 || i === Math.floor(chartData.length / 2) || i === chartData.length - 1).map((d, i) => (
          <text key={i} x={getX(chartData.indexOf(d))} y={height - 8} textAnchor="middle" fontSize="10" fill="#94A3B8">
            {d.label}
          </text>
        ))}
      </svg>

      <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 8, textAlign: 'center' }}>
        ⚠️ <strong>Illustrative simulation — not a prediction or guarantee of future returns.</strong>
      </div>
    </div>
  );
}
