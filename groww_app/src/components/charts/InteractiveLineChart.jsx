import React, { useState } from 'react';

export function InteractiveLineChart({
  data,
  height = 240,
  showBenchmark = false,
  benchmarkData = null,
  color = '#00D09C',
  benchmarkColor = '#94A3B8',
  yPrefix = '₹',
  ySuffix = '',
  timeframes = ['1D', '1W', '1M', '1Y', '5Y'],
  selectedTimeframe = '1M',
  onTimeframeChange = null,
  interactivePoints = [],
  onPointClick = null,
  title = '',
  subtitle = ''
}) {
  const [hoverIndex, setHoverIndex] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  if (!data || data.length === 0) return null;

  const width = 600;
  const padding = { top: 20, right: 30, bottom: 35, left: 55 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Compute min and max
  const values = data.map(d => d.value);
  if (showBenchmark && benchmarkData) {
    values.push(...benchmarkData.map(d => d.value));
  }
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = maxValue - minValue || 1;

  // Coordinate mappers
  const getX = (index) => padding.left + (index / (data.length - 1)) * chartWidth;
  const getY = (val) => padding.top + chartHeight - ((val - minValue) / range) * chartHeight;

  // Generate SVG path for primary data
  const points = data.map((d, i) => `${getX(i)},${getY(d.value)}`);
  const pathD = `M ${points.join(' L ')}`;

  // Gradient area path
  const areaD = `M ${getX(0)},${padding.top + chartHeight} L ${points.join(' L ')} L ${getX(data.length - 1)},${padding.top + chartHeight} Z`;

  // Benchmark path
  let benchmarkPathD = '';
  if (showBenchmark && benchmarkData && benchmarkData.length === data.length) {
    const bPoints = benchmarkData.map((d, i) => `${getX(i)},${getY(d.value)}`);
    benchmarkPathD = `M ${bPoints.join(' L ')}`;
  }

  const activeItem = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];
  const firstItem = data[0];
  const priceChange = activeItem.value - firstItem.value;
  const pctChange = ((priceChange / firstItem.value) * 100).toFixed(2);
  const isPositive = priceChange >= 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const normalizedX = (mouseX / rect.width) * width;
    const boundedX = Math.max(padding.left, Math.min(width - padding.right, normalizedX));
    const rawIndex = ((boundedX - padding.left) / chartWidth) * (data.length - 1);
    const nearestIndex = Math.round(rawIndex);
    if (nearestIndex >= 0 && nearestIndex < data.length) {
      setHoverIndex(nearestIndex);
    }
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  return (
    <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-lg)', padding: '16px', border: '1px solid var(--border-color)', position: 'relative' }}>
      {/* Chart Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, gap: 10 }}>
        <div>
          {title && <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-muted)' }}>{title}</div>}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-main)' }}>
              {yPrefix}{activeItem.value.toLocaleString('en-IN')}{ySuffix}
            </span>
            <span style={{ fontSize: 13, fontWeight: 700, color: isPositive ? '#00B386' : '#E11D48' }}>
              {isPositive ? '+' : ''}{yPrefix}{Math.abs(priceChange).toLocaleString('en-IN')} ({isPositive ? '+' : ''}{pctChange}%)
            </span>
          </div>
          {activeItem.date && (
            <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>
              {activeItem.date} {activeItem.label ? `• ${activeItem.label}` : ''}
            </div>
          )}
        </div>

        {/* Timeframe Buttons */}
        {timeframes && timeframes.length > 0 && (
          <div style={{ display: 'flex', gap: 4, background: 'var(--bg-subtle)', padding: 3, borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            {timeframes.map(tf => (
              <button
                key={tf}
                onClick={() => onTimeframeChange && onTimeframeChange(tf)}
                style={{
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  fontWeight: 700,
                  background: selectedTimeframe === tf ? '#FFFFFF' : 'transparent',
                  color: selectedTimeframe === tf ? 'var(--text-main)' : 'var(--text-light)',
                  boxShadow: selectedTimeframe === tf ? '0 1px 3px rgba(0,0,0,0.08)' : 'none'
                }}
              >
                {tf}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SVG Chart */}
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <linearGradient id={`grad-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines (horizontal) */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
            const y = padding.top + chartHeight * ratio;
            const val = maxValue - ratio * range;
            return (
              <g key={idx}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke="#EEF2F6"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padding.left - 8}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94A3B8"
                  fontFamily="Inter, sans-serif"
                >
                  {yPrefix}{Math.round(val).toLocaleString('en-IN')}
                </text>
              </g>
            );
          })}

          {/* X Axis Date labels */}
          {data.filter((_, i) => i === 0 || i === Math.floor(data.length / 2) || i === data.length - 1).map((d, i, arr) => {
            const index = data.indexOf(d);
            const x = getX(index);
            const anchor = i === 0 ? 'start' : i === arr.length - 1 ? 'end' : 'middle';
            return (
              <text
                key={i}
                x={x}
                y={height - 10}
                textAnchor={anchor}
                fontSize="10"
                fill="#94A3B8"
                fontFamily="Inter, sans-serif"
              >
                {d.date || d.label || `T${index}`}
              </text>
            );
          })}

          {/* Fill area */}
          <path d={areaD} fill={`url(#grad-${color.replace('#', '')})`} />

          {/* Benchmark Line */}
          {showBenchmark && benchmarkPathD && (
            <path
              d={benchmarkPathD}
              fill="none"
              stroke={benchmarkColor}
              strokeWidth="2"
              strokeDasharray="5 5"
            />
          )}

          {/* Main Price Line */}
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Milestone Pins */}
          {interactivePoints.map((pt, idx) => {
            const x = getX(pt.index);
            const y = getY(pt.value !== undefined ? pt.value : data[pt.index]?.value || 0);
            const isSel = selectedPoint?.index === pt.index;

            return (
              <g
                key={idx}
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPoint(pt);
                  if (onPointClick) onPointClick(pt);
                }}
              >
                <circle cx={x} cy={y} r={isSel ? 8 : 6} fill={pt.color || '#3B82F6'} stroke="#FFFFFF" strokeWidth="2" />
                <circle cx={x} cy={y} r={isSel ? 12 : 9} fill={pt.color || '#3B82F6'} opacity="0.25" />
                <text x={x} y={y - 12} textAnchor="middle" fontSize="10" fontWeight="700" fill={pt.color || '#1E40AF'}>
                  {pt.badge || `📍 ${idx + 1}`}
                </text>
              </g>
            );
          })}

          {/* Hover Crosshair & Dot */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padding.top}
                x2={getX(hoverIndex)}
                y2={padding.top + chartHeight}
                stroke="#64748B"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(activeItem.value)}
                r="5"
                fill={color}
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Benchmark Legend if enabled */}
      {showBenchmark && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8, fontSize: 12, color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 3, background: color, borderRadius: 2 }} />
            <span style={{ fontWeight: 600 }}>Your Portfolio</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 14, height: 3, background: benchmarkColor, borderRadius: 2 }} />
            <span>Nifty 50 Benchmark</span>
          </div>
        </div>
      )}

      {/* Selected Interactive Point Detail Box */}
      {selectedPoint && (
        <div style={{
          marginTop: 12,
          padding: '12px 14px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid #BFDBFE',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-blue)' }}>
              {selectedPoint.title || 'Chart Milestone'}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-main)', marginTop: 2 }}>
              {selectedPoint.description}
            </div>
          </div>
          <button
            onClick={() => setSelectedPoint(null)}
            style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
