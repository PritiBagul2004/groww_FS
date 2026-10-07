import React, { useState } from 'react';

export function VolumePriceChart({
  data = [],
  height = 270,
  title = "Price & Trading Volume Relationship"
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  if (!data || data.length === 0) return null;

  const width = 560;
  const padding = { top: 20, right: 30, bottom: 25, left: 50 };
  const chartWidth = width - padding.left - padding.right;

  // Split height: Top 60% for Price, Bottom 30% for Volume, 10% gap
  const priceHeight = height * 0.55;
  const volumeHeight = height * 0.25;
  const volumeTop = padding.top + priceHeight + 18;

  const prices = data.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  const volumes = data.map(d => d.volume);
  const maxVolume = Math.max(...volumes) || 1;

  const getX = (i) => padding.left + (i / (data.length - 1)) * chartWidth;
  const getYPrice = (val) => padding.top + priceHeight - ((val - minPrice) / priceRange) * priceHeight;
  const getYVolume = (val) => volumeTop + volumeHeight - (val / maxVolume) * volumeHeight;

  const points = data.map((d, i) => `${getX(i)},${getYPrice(d.price)}`);
  const pathD = `M ${points.join(' L ')}`;

  const active = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const barW = Math.max(6, (chartWidth / data.length) * 0.5);

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '16px', border: '1px solid var(--border-color)' }}>
      {/* Header Info */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 2 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-main)' }}>
              ₹{active.price.toLocaleString('en-IN')}
            </span>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#3B82F6', background: '#EFF6FF', padding: '2px 8px', borderRadius: 9999 }}>
              Volume: {active.volume.toLocaleString('en-IN')} shares
            </span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-light)' }}>
          {active.date || 'Hover over dates to inspect'}
        </div>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Price Grid */}
        <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="#F1F5F9" strokeWidth="1" />
        <line x1={padding.left} y1={padding.top + priceHeight} x2={width - padding.right} y2={padding.top + priceHeight} stroke="#E2E8F0" strokeWidth="1" />
        <text x={padding.left - 6} y={padding.top + 8} textAnchor="end" fontSize="10" fill="#94A3B8">₹{maxPrice}</text>
        <text x={padding.left - 6} y={padding.top + priceHeight} textAnchor="end" fontSize="10" fill="#94A3B8">₹{minPrice}</text>
        <text x={padding.left} y={padding.top + 10} fontSize="9" fontWeight="700" fill="#64748B">PRICE (₹)</text>

        {/* Main Price Line */}
        <path d={pathD} fill="none" stroke="#00D09C" strokeWidth="2.5" strokeLinecap="round" />

        {/* Volume Sub-chart */}
        <text x={padding.left} y={volumeTop - 4} fontSize="9" fontWeight="700" fill="#64748B">
          TRADING VOLUME (Number of shares traded)
        </text>

        {data.map((d, i) => {
          const x = getX(i);
          const y = getYVolume(d.volume);
          const h = volumeTop + volumeHeight - y;
          const isSpike = d.volume === maxVolume;
          const isHovered = hoverIndex === i;

          return (
            <g
              key={i}
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
              style={{ cursor: 'pointer' }}
            >
              {/* Volume bar */}
              <rect
                x={x - barW / 2}
                y={y}
                width={barW}
                height={Math.max(2, h)}
                fill={isSpike ? '#F59E0B' : isHovered ? '#3B82F6' : '#CBD5E1'}
                rx="2"
              />

              {isSpike && (
                <text x={x} y={y - 4} textAnchor="middle" fontSize="9" fontWeight="800" fill="#D97706">
                  🔥 Spike
                </text>
              )}
            </g>
          );
        })}

        {/* Crosshair indicator */}
        {hoverIndex !== null && (
          <g>
            <line
              x1={getX(hoverIndex)}
              y1={padding.top}
              x2={getX(hoverIndex)}
              y2={volumeTop + volumeHeight}
              stroke="#94A3B8"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <circle
              cx={getX(hoverIndex)}
              cy={getYPrice(active.price)}
              r="4"
              fill="#00D09C"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </g>
        )}
      </svg>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', background: 'var(--bg-subtle)', padding: '8px 12px', borderRadius: 'var(--radius-md)', marginTop: 8 }}>
        💡 <strong>Key Principle:</strong> "Price tells you <em>what</em> happened. Volume tells you <em>how much conviction/activity</em> was behind the move."
      </div>
    </div>
  );
}
