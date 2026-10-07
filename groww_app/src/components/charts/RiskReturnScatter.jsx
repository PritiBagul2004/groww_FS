import React, { useState } from 'react';

export function RiskReturnScatter({
  height = 280,
  title = "Risk vs Potential Return Map"
}) {
  const [selectedAsset, setSelectedAsset] = useState(null);

  const assets = [
    {
      id: 'liquid',
      name: 'Liquid / Overnight Fund',
      riskScore: 12,
      returnScore: 20,
      riskLabel: 'Very Low (Zero equity risk)',
      returnLabel: '6.5% – 7.0%',
      color: '#10B981',
      description: 'Ultra-safe short-term parking for emergency funds and semester fees with next-day withdrawal.',
      category: 'Safe Cash Buffer'
    },
    {
      id: 'gsec',
      name: 'Govt Bonds / Fixed Deposits',
      riskScore: 22,
      returnScore: 28,
      riskLabel: 'Low Risk',
      returnLabel: '7.0% – 7.8%',
      color: '#3B82F6',
      description: 'Lends money to sovereign government. Predictable fixed income with minimal volatility.',
      category: 'Fixed Income'
    },
    {
      id: 'hybrid',
      name: 'Conservative Hybrid Fund',
      riskScore: 40,
      returnScore: 45,
      riskLabel: 'Moderate Risk',
      returnLabel: '9.0% – 10.5%',
      color: '#6366F1',
      description: '75% Debt + 25% Equity. Smooths out stock market bumps while beating bank deposit inflation.',
      category: 'Balanced'
    },
    {
      id: 'nifty50',
      name: 'NIFTY 50 Index Fund',
      riskScore: 62,
      returnScore: 68,
      riskLabel: 'Moderate to High Equity',
      returnLabel: '11.5% – 13.0%',
      color: '#00D09C',
      description: 'Top 50 backbone companies of India. High short-term swings but solid 5+ year wealth compounding.',
      category: 'Core Equity Index'
    },
    {
      id: 'flexicap',
      name: 'Flexi Cap Mutual Fund',
      riskScore: 72,
      returnScore: 78,
      riskLabel: 'High Equity Volatility',
      returnLabel: '12.5% – 14.5%',
      color: '#F59E0B',
      description: 'Active fund investing in leaders across Large, Mid, and Small caps. Requires 5–7+ year patience.',
      category: 'Active Growth'
    },
    {
      id: 'smallcap',
      name: 'Small Cap Individual Stocks',
      riskScore: 88,
      returnScore: 85,
      riskLabel: 'Very High Volatility',
      returnLabel: '14.0% – 18.0% (High Dispersion)',
      color: '#EC4899',
      description: 'High growth potential but high risk of sharp 30-50% downturns if single companies struggle.',
      category: 'High Risk Equity'
    },
    {
      id: 'fo',
      name: 'Futures & Options (F&O Trading)',
      riskScore: 96,
      returnScore: 15,
      riskLabel: 'Extreme Risk (Leveraged)',
      returnLabel: '93% of retail traders lose money (SEBI)',
      color: '#E11D48',
      description: 'Not long-term investing! Leveraged short-term derivatives where official SEBI data proves 9/10 retail traders incur net losses.',
      category: 'High Risk Speculation'
    }
  ];

  const width = 560;
  const padding = { top: 25, right: 35, bottom: 40, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const getX = (risk) => padding.left + (risk / 100) * chartWidth;
  const getY = (ret) => padding.top + chartHeight - (ret / 100) * chartHeight;

  const active = selectedAsset || assets[3]; // default Nifty 50

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '16px', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>
          <div style={{ fontSize: 14, color: 'var(--text-main)', marginTop: 2 }}>
            Click any asset bubble below to inspect its risk/return trade-off:
          </div>
        </div>
        <span className="badge badge-green">Educational Map</span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Quadrant Guidelines */}
        <line x1={padding.left} y1={padding.top + chartHeight} x2={width - padding.right} y2={padding.top + chartHeight} stroke="#94A3B8" strokeWidth="1.5" />
        <line x1={padding.left} y1={padding.top} x2={padding.left} y2={padding.top + chartHeight} stroke="#94A3B8" strokeWidth="1.5" />

        {/* Diagonal Efficiency Frontier Curve */}
        <path
          d={`M ${getX(10)},${getY(18)} Q ${getX(50)},${getY(55)} ${getX(88)},${getY(88)}`}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="3"
          strokeDasharray="4 4"
        />

        {/* Axes Labels */}
        <text x={padding.left} y={padding.top - 8} fontSize="10" fontWeight="700" fill="#1E40AF">
          ▲ HIGHER POTENTIAL RETURN
        </text>
        <text x={width - padding.right} y={height - 8} textAnchor="end" fontSize="10" fontWeight="700" fill="#E11D48">
          HIGHER RISK / VOLATILITY ▶
        </text>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((ratio, i) => (
          <line
            key={i}
            x1={padding.left}
            y1={padding.top + chartHeight * ratio}
            x2={width - padding.right}
            y2={padding.top + chartHeight * ratio}
            stroke="#F1F5F9"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        ))}

        {/* Asset Bubbles */}
        {assets.map((a) => {
          const cx = getX(a.riskScore);
          const cy = getY(a.returnScore);
          const isSelected = active.id === a.id;

          return (
            <g
              key={a.id}
              onClick={() => setSelectedAsset(a)}
              style={{ cursor: 'pointer' }}
            >
              {isSelected && (
                <circle cx={cx} cy={cy} r="16" fill={a.color} opacity="0.25" />
              )}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? 10 : 7}
                fill={a.color}
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={cx}
                y={cy - 12}
                textAnchor="middle"
                fontSize="9"
                fontWeight={isSelected ? "800" : "600"}
                fill={isSelected ? '#0F172A' : '#64748B'}
              >
                {a.name.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Selected Asset Information Box */}
      <div style={{
        marginTop: 10,
        padding: '14px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-subtle)',
        border: `1.5px solid ${active.color}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--text-main)' }}>
            {active.name}
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: active.color, background: '#FFFFFF', padding: '2px 8px', borderRadius: 9999, border: `1px solid ${active.color}` }}>
            {active.category}
          </span>
        </div>

        <div style={{ display: 'flex', gap: 16, fontSize: 12, margin: '2px 0' }}>
          <span>Risk: <strong>{active.riskLabel}</strong></span>
          <span>Expected Return: <strong>{active.returnLabel}</strong></span>
        </div>

        <p style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.4 }}>
          {active.description}
        </p>
      </div>

      <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 8 }}>
        💡 <strong>Core Takeaway:</strong> "The highest return asset is not automatically the best. The right asset is the one that matches your personal timeline and risk comfort."
      </div>
    </div>
  );
}
