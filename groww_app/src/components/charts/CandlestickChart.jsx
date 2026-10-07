import React, { useState } from 'react';

export function CandlestickChart({
  candles = [],
  showSingleAnnotated = false,
  height = 240,
  title = '',
  onCandleClick = null
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Single candle anatomy demo data
  const singleCandle = {
    open: 200,
    close: 240,
    high: 260,
    low: 180,
    isGreen: true,
    label: 'Single Bullish Candle Anatomy'
  };

  if (showSingleAnnotated) {
    const width = 480;
    const h = 260;
    const candleWidth = 50;
    const cx = width / 2;
    const topY = 40;
    const botY = 220;
    const range = 260 - 180; // 80

    const getY = (val) => topY + (h - 80) * (1 - (val - 180) / range);

    const highY = getY(260);
    const closeY = getY(240);
    const openY = getY(200);
    const lowY = getY(180);

    return (
      <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border-color)' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8, textAlign: 'center' }}>
          Anatomy of a Candlestick (Green / Bullish)
        </div>

        <svg viewBox={`0 0 ${width} ${h}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Upper Wick */}
          <line x1={cx} y1={highY} x2={cx} y2={closeY} stroke="#00B386" strokeWidth="3" />
          
          {/* Candle Body */}
          <rect
            x={cx - candleWidth / 2}
            y={closeY}
            width={candleWidth}
            height={openY - closeY}
            fill="#00D09C"
            stroke="#00B386"
            strokeWidth="2"
            rx="4"
          />

          {/* Lower Wick */}
          <line x1={cx} y1={openY} x2={cx} y2={lowY} stroke="#00B386" strokeWidth="3" />

          {/* Annotation: High */}
          <line x1={cx + 10} y1={highY} x2={cx + 90} y2={highY} stroke="#94A3B8" strokeDasharray="3 3" />
          <text x={cx + 100} y={highY + 4} fontSize="12" fontWeight="700" fill="#0E2922">
            High (₹260) — Highest price traded
          </text>

          {/* Annotation: Close */}
          <line x1={cx + candleWidth / 2 + 5} y1={closeY} x2={cx + 90} y2={closeY} stroke="#94A3B8" strokeDasharray="3 3" />
          <text x={cx + 100} y={closeY + 4} fontSize="12" fontWeight="700" fill="#00B386">
            Close (₹240) — Price at end of period
          </text>

          {/* Annotation: Body */}
          <text x={cx - candleWidth / 2 - 15} y={(openY + closeY) / 2 + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#0E2922">
            Body (Open to Close) ➔
          </text>

          {/* Annotation: Open */}
          <line x1={cx + candleWidth / 2 + 5} y1={openY} x2={cx + 90} y2={openY} stroke="#94A3B8" strokeDasharray="3 3" />
          <text x={cx + 100} y={openY + 4} fontSize="12" fontWeight="700" fill="#53606E">
            Open (₹200) — Starting price
          </text>

          {/* Annotation: Low */}
          <line x1={cx + 10} y1={lowY} x2={cx + 90} y2={lowY} stroke="#94A3B8" strokeDasharray="3 3" />
          <text x={cx + 100} y={lowY + 4} fontSize="12" fontWeight="700" fill="#E11D48">
            Low (₹180) — Lowest dip reached
          </text>

          {/* Wick Labels on Left */}
          <text x={cx - 15} y={highY + 15} textAnchor="end" fontSize="10" fill="#64748B">
            Upper Wick ➔
          </text>
          <text x={cx - 15} y={lowY - 10} textAnchor="end" fontSize="10" fill="#64748B">
            Lower Wick ➔
          </text>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-around', background: 'var(--bg-subtle)', padding: '10px 14px', borderRadius: 'var(--radius-md)', fontSize: 12, marginTop: 10 }}>
          <span>🟢 <strong>Green Candle:</strong> Close &gt; Open (Price Rose)</span>
          <span>🔴 <strong>Red Candle:</strong> Close &lt; Open (Price Fell)</span>
        </div>
      </div>
    );
  }

  // Multi-candle sequence
  const width = 560;
  const padding = { top: 20, right: 30, bottom: 30, left: 45 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const minLow = Math.min(...candles.map(c => c.low));
  const maxHigh = Math.max(...candles.map(c => c.high));
  const range = maxHigh - minLow || 1;

  const getX = (i) => padding.left + (i + 0.5) * (chartWidth / candles.length);
  const getY = (val) => padding.top + chartHeight - ((val - minLow) / range) * chartHeight;
  const candleW = Math.max(8, (chartWidth / candles.length) * 0.55);

  const activeCandle = hoveredIndex !== null ? candles[hoveredIndex] : candles[candles.length - 1];

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '16px', border: '1px solid var(--border-color)' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 10 }}>
        <div>
          {title && <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, marginTop: 2 }}>
            <span>Open: <strong>₹{activeCandle?.open}</strong></span>
            <span>High: <strong style={{ color: '#00B386' }}>₹{activeCandle?.high}</strong></span>
            <span>Low: <strong style={{ color: '#E11D48' }}>₹{activeCandle?.low}</strong></span>
            <span>Close: <strong style={{ color: activeCandle?.close >= activeCandle?.open ? '#00B386' : '#E11D48' }}>₹{activeCandle?.close}</strong></span>
          </div>
        </div>

        {activeCandle && (
          <span className={`badge ${activeCandle.close >= activeCandle.open ? 'badge-green' : 'badge-rose'}`} style={{ fontSize: 12, padding: '4px 8px' }}>
            {activeCandle.close >= activeCandle.open ? '🟢 Bullish (+)' : '🔴 Bearish (-)'}
          </span>
        )}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((ratio, idx) => {
          const y = padding.top + chartHeight * ratio;
          const val = maxHigh - ratio * range;
          return (
            <g key={idx}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <text x={padding.left - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#94A3B8">
                ₹{Math.round(val)}
              </text>
            </g>
          );
        })}

        {/* Candles */}
        {candles.map((c, i) => {
          const x = getX(i);
          const isUp = c.close >= c.open;
          const candleColor = isUp ? '#00D09C' : '#F43F5E';
          const wickColor = isUp ? '#00B386' : '#E11D48';

          const topBodyVal = Math.max(c.open, c.close);
          const botBodyVal = Math.min(c.open, c.close);
          const topBodyY = getY(topBodyVal);
          const botBodyY = getY(botBodyVal);
          const bodyH = Math.max(3, botBodyY - topBodyY);

          const highY = getY(c.high);
          const lowY = getY(c.low);
          const isHovered = hoveredIndex === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onClick={() => onCandleClick && onCandleClick(c, i)}
              style={{ cursor: 'pointer' }}
            >
              {/* Highlight background on hover */}
              {isHovered && (
                <rect
                  x={x - candleW}
                  y={padding.top}
                  width={candleW * 2}
                  height={chartHeight}
                  fill="#F1F5F9"
                  opacity="0.6"
                  rx="4"
                />
              )}

              {/* Upper & Lower Wick */}
              <line x1={x} y1={highY} x2={x} y2={lowY} stroke={wickColor} strokeWidth={isHovered ? 2.5 : 1.5} />

              {/* Candle Body */}
              <rect
                x={x - candleW / 2}
                y={topBodyY}
                width={candleW}
                height={bodyH}
                fill={candleColor}
                stroke={wickColor}
                strokeWidth={isHovered ? 2 : 1}
                rx="2"
              />

              {/* X-axis Label */}
              <text x={x} y={height - 10} textAnchor="middle" fontSize="9" fill="#94A3B8">
                {c.label || `C${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
