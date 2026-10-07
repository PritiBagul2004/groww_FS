import React, { useState } from 'react';

export function SIPCompoundingChart({
  initialMonthly = 1000,
  initialYears = 10,
  initialRate = 12,
  height = 250,
  title = "See Your Money Grow (Compounding Visualizer)"
}) {
  const [monthly, setMonthly] = useState(initialMonthly);
  const [years, setYears] = useState(initialYears);
  const [rate, setRate] = useState(initialRate);

  // Generate year-by-year curve points
  const points = [];
  const monthlyRate = rate / 100 / 12;

  for (let yr = 0; yr <= years; yr++) {
    const months = yr * 12;
    const invested = monthly * months;
    let futureVal = 0;
    if (months > 0) {
      futureVal = monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    }
    points.push({
      year: yr,
      invested: Math.round(invested),
      futureVal: Math.round(futureVal)
    });
  }

  const finalData = points[points.length - 1];
  const totalInvested = finalData.invested;
  const totalWealth = finalData.futureVal;
  const totalGains = Math.max(0, totalWealth - totalInvested);

  // SVG dimensions
  const width = 560;
  const padding = { top: 20, right: 30, bottom: 30, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxVal = Math.max(totalWealth, totalInvested, 10000);

  const getX = (yr) => padding.left + (yr / years) * chartWidth;
  const getY = (val) => padding.top + chartHeight - (val / maxVal) * chartHeight;

  // Path for Invested Line
  const investedPoints = points.map(p => `${getX(p.year)},${getY(p.invested)}`);
  const investedPathD = `M ${investedPoints.join(' L ')}`;

  // Path for Wealth Line & Area
  const wealthPoints = points.map(p => `${getX(p.year)},${getY(p.futureVal)}`);
  const wealthPathD = `M ${wealthPoints.join(' L ')}`;
  const wealthAreaD = `M ${getX(0)},${padding.top + chartHeight} L ${wealthPoints.join(' L ')} L ${getX(years)},${padding.top + chartHeight} Z`;

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border-color)' }}>
      {/* Title */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#00D09C', marginTop: 2 }}>
            ₹{totalWealth.toLocaleString('en-IN')} <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>projected value</span>
          </div>
        </div>
        <span className="badge badge-green">Compounding Engine</span>
      </div>

      {/* Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
        <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>MONTHLY SIP</span>
            <span style={{ color: 'var(--primary-dark)' }}>₹{monthly.toLocaleString('en-IN')}</span>
          </div>
          <input
            type="range"
            min="500"
            max="15000"
            step="500"
            value={monthly}
            onChange={e => setMonthly(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', marginTop: 6 }}
          />
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>TIME PERIOD</span>
            <span style={{ color: 'var(--primary-dark)' }}>{years} Years</span>
          </div>
          <input
            type="range"
            min="2"
            max="25"
            step="1"
            value={years}
            onChange={e => setYears(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', marginTop: 6 }}
          />
        </div>

        <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: 'var(--text-muted)' }}>
            <span>ANNUAL RETURN</span>
            <span style={{ color: 'var(--primary-dark)' }}>{rate}% p.a.</span>
          </div>
          <input
            type="range"
            min="6"
            max="15"
            step="1"
            value={rate}
            onChange={e => setRate(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', marginTop: 6 }}
          />
        </div>
      </div>

      {/* SVG Compounding Chart */}
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="compGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D09C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D09C" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * ratio;
          const val = maxVal * (1 - ratio);
          return (
            <g key={i}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
              <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill="#94A3B8">
                ₹{Math.round(val / 1000)}k
              </text>
            </g>
          );
        })}

        {/* Wealth Shaded Area */}
        <path d={wealthAreaD} fill="url(#compGrad)" />

        {/* Total Invested Line */}
        <path d={investedPathD} fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 4" />

        {/* Total Wealth Line */}
        <path d={wealthPathD} fill="none" stroke="#00D09C" strokeWidth="3" strokeLinecap="round" />

        {/* Final Points */}
        <circle cx={getX(years)} cy={getY(totalInvested)} r="4" fill="#64748B" />
        <circle cx={getX(years)} cy={getY(totalWealth)} r="5" fill="#00D09C" stroke="#FFFFFF" strokeWidth="2" />

        {/* X Axis Year Labels */}
        {[0, Math.round(years / 2), years].map(yr => (
          <text key={yr} x={getX(yr)} y={height - 10} textAnchor="middle" fontSize="10" fill="#94A3B8">
            Yr {yr}
          </text>
        ))}
      </svg>

      {/* Summary Footer */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 14px',
        background: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        marginTop: 10,
        gap: 10
      }}>
        <div>
          <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>TOTAL YOU INVESTED</span>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#475569' }}>₹{totalInvested.toLocaleString('en-IN')}</div>
        </div>

        <div>
          <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>COMPOUNDING GAIN</span>
          <div style={{ fontSize: 14, fontWeight: 800, color: '#00B386' }}>+₹{totalGains.toLocaleString('en-IN')}</div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>WEALTH MULTIPLIER</span>
          <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--primary-dark)' }}>
            {(totalWealth / (totalInvested || 1)).toFixed(1)}x Your Money
          </div>
        </div>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 8, textAlign: 'center' }}>
        ✨ <em>"This is the power of compounding: giving your money time to generate returns on its returns."</em>
      </div>
    </div>
  );
}
