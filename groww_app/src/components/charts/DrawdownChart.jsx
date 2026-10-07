import React, { useState } from 'react';

export function DrawdownChart({
  height = 250,
  title = "Understanding Peak, Drawdown & Recovery"
}) {
  const [selectedPhase, setSelectedPhase] = useState('trough'); // 'peak' | 'trough' | 'recovery'

  const data = [
    { label: 'Month 1', value: 10000 },
    { label: 'Month 2', value: 11500 },
    { label: 'Month 3', value: 13000 },
    { label: 'Month 4 (Peak)', value: 14000, isPeak: true },
    { label: 'Month 5', value: 12200 },
    { label: 'Month 6 (Trough)', value: 10500, isTrough: true },
    { label: 'Month 7', value: 11800 },
    { label: 'Month 8', value: 13200 },
    { label: 'Month 9 (Recovery)', value: 14500, isRecovery: true }
  ];

  const width = 560;
  const padding = { top: 30, right: 30, bottom: 35, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const values = data.map(d => d.value);
  const minVal = 9500;
  const maxVal = 15500;
  const range = maxVal - minVal;

  const getX = (i) => padding.left + (i / (data.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - ((val - minVal) / range) * chartHeight;

  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const pathD = `M ${points.join(' L ')}`;

  const peakIdx = 3;
  const troughIdx = 5;
  const recoveryIdx = 8;

  const peakX = getX(peakIdx);
  const peakY = getY(14000);
  const troughX = getX(troughIdx);
  const troughY = getY(10500);
  const recoveryX = getX(recoveryIdx);
  const recoveryY = getY(14500);

  const drawdownPct = (((10500 - 14000) / 14000) * 100).toFixed(1); // -25.0%

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '16px', border: '1px solid var(--border-color)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>
          <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)', marginTop: 2 }}>
            ₹10,000 ➔ ₹14,000 (Peak) ➔ ₹10,500 (Drawdown) ➔ ₹14,500 (Recovery)
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {[
            { id: 'peak', label: '1. Peak (₹14k)', color: '#00B386' },
            { id: 'trough', label: '2. Drawdown (-25%)', color: '#E11D48' },
            { id: 'recovery', label: '3. Recovery (₹14.5k)', color: '#3B82F6' }
          ].map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPhase(p.id)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: 11,
                fontWeight: 700,
                background: selectedPhase === p.id ? p.color : 'var(--bg-subtle)',
                color: selectedPhase === p.id ? '#FFFFFF' : 'var(--text-muted)',
                border: `1px solid ${selectedPhase === p.id ? p.color : 'var(--border-color)'}`
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Horizontal Peak reference line */}
        <line
          x1={peakX}
          y1={peakY}
          x2={recoveryX}
          y2={peakY}
          stroke="#94A3B8"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
        <text x={recoveryX - 10} y={peakY - 6} textAnchor="end" fontSize="10" fontWeight="600" fill="#64748B">
          Previous All-Time High Reference (₹14,000)
        </text>

        {/* Drawdown shaded area */}
        <polygon
          points={`${peakX},${peakY} ${getX(4)},${getY(12200)} ${troughX},${troughY} ${troughX},${peakY}`}
          fill="#FEE2E2"
          opacity="0.6"
        />

        {/* Main Line */}
        <path d={pathD} fill="none" stroke="#00D09C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Drawdown Vertical Drop indicator */}
        <line
          x1={troughX}
          y1={peakY}
          x2={troughX}
          y2={troughY}
          stroke="#E11D48"
          strokeWidth="2"
          strokeDasharray="3 3"
        />
        <text x={troughX + 8} y={(peakY + troughY) / 2 + 4} fontSize="11" fontWeight="800" fill="#E11D48">
          {drawdownPct}% Drawdown (-₹3,500)
        </text>

        {/* Highlight Circles */}
        {/* Peak */}
        <circle cx={peakX} cy={peakY} r="6" fill="#00D09C" stroke="#FFFFFF" strokeWidth="2" />
        <text x={peakX} y={peakY - 10} textAnchor="middle" fontSize="11" fontWeight="800" fill="#008765">
          🏔️ Peak ₹14,000
        </text>

        {/* Trough */}
        <circle cx={troughX} cy={troughY} r="7" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2" />
        <text x={troughX} y={troughY + 16} textAnchor="middle" fontSize="11" fontWeight="800" fill="#991B1B">
          📉 Trough ₹10,500
        </text>

        {/* Recovery */}
        <circle cx={recoveryX} cy={recoveryY} r="6" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
        <text x={recoveryX} y={recoveryY - 10} textAnchor="middle" fontSize="11" fontWeight="800" fill="#1E40AF">
          🚀 New High ₹14,500
        </text>

        {/* X Axis Labels */}
        {data.map((d, i) => (
          <text key={i} x={getX(i)} y={height - 10} textAnchor="middle" fontSize="9" fill="#94A3B8">
            {d.label.split(' ')[0]}
          </text>
        ))}
      </svg>

      {/* Educational Explanation Box */}
      <div style={{
        marginTop: 10,
        padding: '12px 14px',
        borderRadius: 'var(--radius-md)',
        background: selectedPhase === 'trough' ? '#FFF1F2' : selectedPhase === 'peak' ? 'var(--primary-light)' : '#EFF6FF',
        border: `1.5px solid ${selectedPhase === 'trough' ? '#FECDD3' : selectedPhase === 'peak' ? 'var(--primary-border)' : '#BFDBFE'}`
      }}>
        {selectedPhase === 'trough' && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: '#9F1239' }}>
              ⚠️ The Drawdown Phase (Paper Volatility ≠ Permanent Loss)
            </div>
            <div style={{ fontSize: 12, color: '#881337', marginTop: 2, lineHeight: 1.4 }}>
              The portfolio fell from ₹14,000 to ₹10,500 (-25%). Investors who panicked and clicked <strong>Sell</strong> permanently lost ₹3,500. Investors who held high-quality diversified funds waited for the business cycle to recover to ₹14,500.
            </div>
          </div>
        )}

        {selectedPhase === 'peak' && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: '#008765' }}>
              🏔️ The Peak (All-Time High)
            </div>
            <div style={{ fontSize: 12, color: '#0E2922', marginTop: 2, lineHeight: 1.4 }}>
              When markets reach highs, it's normal to feel excited. But markets never move up in a straight line forever; minor pullbacks are a healthy, natural part of economic cycles.
            </div>
          </div>
        )}

        {selectedPhase === 'recovery' && (
          <div>
            <div style={{ fontWeight: 800, fontSize: 13, color: '#1E40AF' }}>
              🚀 The Recovery Phase
            </div>
            <div style={{ fontSize: 12, color: '#1E3A8A', marginTop: 2, lineHeight: 1.4 }}>
              As India's economy and company earnings continued growing, the price broke past the old ₹14,000 peak to reach ₹14,500, rewarding disciplined long-term compounding.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
