"use client";

import React from "react";

/* ------------------------------------------------------------------ */
/*  Shared, dependency-free SVG chart primitives for the client        */
/*  dashboard. Everything is rendered inline so no charting library    */
/*  is required.                                                       */
/* ------------------------------------------------------------------ */

const GREEN = "#4CAF50";
const GREEN_LIGHT = "#8BC34A";
const ORANGE = "#F5A623";

/* ---------- helpers ---------- */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/* ================================================================== */
/*  Semi-circle gauge (CSAT meter)                                     */
/* ================================================================== */
export const GaugeMeter: React.FC<{ value: number; max?: number; label?: string }> = ({
  value,
  max = 100,
  label,
}) => {
  const cx = 150;
  const cy = 150;
  const r = 110;
  const pct = Math.min(Math.max(value / max, 0), 1);
  // gauge sweeps from -90deg (left) to +90deg (right) => 180deg range
  const needleAngle = -90 + pct * 180;
  const needle = polarToCartesian(cx, cy, r - 18, needleAngle);

  // colour bands
  const bands = [
    { from: -90, to: -30, color: "#E5405E" },
    { from: -30, to: 30, color: ORANGE },
    { from: 30, to: 90, color: GREEN },
  ];

  return (
    <svg viewBox="0 0 300 190" className="w-full max-w-[320px]">
      {bands.map((b, i) => (
        <path
          key={i}
          d={arcPath(cx, cy, r, b.from, b.to)}
          fill="none"
          stroke={b.color}
          strokeWidth="22"
          strokeLinecap="butt"
        />
      ))}
      {/* needle */}
      <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke="#333" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="8" fill="#333" />
      <text x={cx} y={cy + 30} textAnchor="middle" className="fill-gray-800" fontSize="26" fontWeight="700">
        {label ?? value}
      </text>
    </svg>
  );
};

/* ================================================================== */
/*  Progress gauge (Overall Progress - filled semi-circle)             */
/* ================================================================== */
export const ProgressGauge: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "%" }) => {
  const cx = 130;
  const cy = 130;
  const r = 100;
  const pct = Math.min(Math.max(value / 100, 0), 1);
  const endAngle = -90 + pct * 180;
  return (
    <svg viewBox="0 0 260 165" className="w-full max-w-[280px]">
      <path d={arcPath(cx, cy, r, -90, 90)} fill="none" stroke="#EAEAEA" strokeWidth="26" strokeLinecap="round" />
      <path d={arcPath(cx, cy, r, -90, endAngle)} fill="none" stroke={GREEN} strokeWidth="26" strokeLinecap="round" />
      <text x={cx} y={cy - 6} textAnchor="middle" className="fill-gray-800" fontSize="34" fontWeight="800">
        {value} {suffix}
      </text>
    </svg>
  );
};

/* ================================================================== */
/*  Donut / pie (100% completed rings)                                 */
/* ================================================================== */
export const DonutChart: React.FC<{ value: number; centerLabel?: string }> = ({ value, centerLabel }) => {
  const size = 160;
  const cx = size / 2;
  const cy = size / 2;
  const r = 60;
  const circ = 2 * Math.PI * r;
  const pct = Math.min(Math.max(value / 100, 0), 1);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[170px]">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#EDEDED" strokeWidth="18" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={GREEN}
        strokeWidth="18"
        strokeDasharray={`${circ * pct} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text x={cx} y={cy + 6} textAnchor="middle" fontSize="20" fontWeight="700" className="fill-gray-800">
        {centerLabel ?? `${value}%`}
      </text>
    </svg>
  );
};

/* ================================================================== */
/*  Grouped bar chart (planned vs actual)                              */
/* ================================================================== */
export const GroupedBarChart: React.FC<{
  categories: string[];
  planned: number[];
  actual: number[];
  height?: number;
}> = ({ categories, planned, actual, height = 190 }) => {
  const width = 340;
  const pad = { top: 16, right: 8, bottom: 26, left: 30 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(100, ...planned, ...actual);
  const groupW = chartW / categories.length;
  const barW = groupW * 0.28;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {[0, 25, 50, 75, 100].map((t) => {
        const y = pad.top + chartH - (t / max) * chartH;
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#EEE" />
            <text x={pad.left - 4} y={y + 3} textAnchor="end" fontSize="8" className="fill-gray-400">
              {t}%
            </text>
          </g>
        );
      })}
      {categories.map((c, i) => {
        const gx = pad.left + i * groupW + groupW / 2;
        const pH = (planned[i] / max) * chartH;
        const aH = (actual[i] / max) * chartH;
        return (
          <g key={c}>
            <rect x={gx - barW - 2} y={pad.top + chartH - pH} width={barW} height={pH} fill={GREEN} rx="1" />
            <rect x={gx + 2} y={pad.top + chartH - aH} width={barW} height={aH} fill={ORANGE} rx="1" />
            <text x={gx} y={height - 8} textAnchor="middle" fontSize="8" className="fill-gray-500">
              {c}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ================================================================== */
/*  Simple vertical bar chart (service logs / single series)           */
/* ================================================================== */
export const SimpleBarChart: React.FC<{
  categories: string[];
  values: number[];
  highlightIndex?: number;
  height?: number;
}> = ({ categories, values, highlightIndex, height = 180 }) => {
  const width = 380;
  const pad = { top: 12, right: 10, bottom: 40, left: 30 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(1, ...values);
  const slot = chartW / categories.length;
  const barW = slot * 0.4;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <line x1={pad.left} y1={pad.top + chartH} x2={width - pad.right} y2={pad.top + chartH} stroke="#DDD" />
      {[0, 1].map((t) => {
        const y = pad.top + chartH - t * chartH;
        return (
          <text key={t} x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="8" className="fill-gray-400">
            {t}
          </text>
        );
      })}
      {categories.map((c, i) => {
        const x = pad.left + i * slot + slot / 2 - barW / 2;
        const h = (values[i] / max) * chartH;
        return (
          <g key={c}>
            <rect
              x={x}
              y={pad.top + chartH - h}
              width={barW}
              height={h}
              fill={highlightIndex === i ? GREEN : "#E7E7E7"}
              rx="1"
            />
            <text
              x={pad.left + i * slot + slot / 2}
              y={height - 22}
              textAnchor="middle"
              fontSize="8"
              className="fill-gray-500"
              transform={`rotate(35 ${pad.left + i * slot + slot / 2} ${height - 22})`}
            >
              {c}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/* ================================================================== */
/*  Line chart (NPV curve / past due)                                  */
/* ================================================================== */
export const LineChart: React.FC<{
  points: number[];
  labels?: string[];
  color?: string;
  height?: number;
  area?: boolean;
  showDots?: boolean;
  thick?: number;
}> = ({ points, labels, color = GREEN, height = 200, area = false, showDots = false, thick = 3 }) => {
  const width = 420;
  const pad = { top: 16, right: 16, bottom: 28, left: 40 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const max = Math.max(...points);
  const min = Math.min(...points, 0);
  const range = max - min || 1;
  const step = chartW / (points.length - 1 || 1);
  const coords = points.map((p, i) => ({
    x: pad.left + i * step,
    y: pad.top + chartH - ((p - min) / range) * chartH,
  }));
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");
  const areaPath = `${line} L ${coords[coords.length - 1].x} ${pad.top + chartH} L ${coords[0].x} ${pad.top + chartH} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {[0, 0.5, 1].map((t) => {
        const y = pad.top + t * chartH;
        return <line key={t} x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="#EEE" />;
      })}
      {area && <path d={areaPath} fill={color} opacity={0.15} />}
      <path d={line} fill="none" stroke={color} strokeWidth={thick} strokeLinecap="round" strokeLinejoin="round" />
      {showDots &&
        coords.map((c, i) => <circle key={i} cx={c.x} cy={c.y} r="4" fill={color} />)}
      {labels &&
        labels.map((l, i) => (
          <text
            key={i}
            x={pad.left + i * (chartW / (labels.length - 1 || 1))}
            y={height - 8}
            textAnchor="middle"
            fontSize="8"
            className="fill-gray-500"
          >
            {l}
          </text>
        ))}
    </svg>
  );
};

/* ================================================================== */
/*  Combo chart: bars + trend line (Payback / ROI)                     */
/* ================================================================== */
export const ComboChart: React.FC<{
  categories: (string | number)[];
  bars: number[];
  line: number[];
  barColor?: string;
  lineColor?: string;
  height?: number;
}> = ({ categories, bars, line, barColor = GREEN_LIGHT, lineColor = ORANGE, height = 230 }) => {
  const width = 460;
  const pad = { top: 16, right: 40, bottom: 28, left: 44 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const barMax = Math.max(...bars, 1);
  const barMin = Math.min(...bars, 0);
  const barRange = barMax - barMin || 1;
  const lineMax = Math.max(...line, 1);
  const lineMin = Math.min(...line, 0);
  const lineRange = lineMax - lineMin || 1;
  const slot = chartW / categories.length;
  const barW = slot * 0.4;
  const zeroY = pad.top + chartH - ((0 - barMin) / barRange) * chartH;

  const lineCoords = line.map((v, i) => ({
    x: pad.left + i * slot + slot / 2,
    y: pad.top + chartH - ((v - lineMin) / lineRange) * chartH,
  }));
  const linePath = lineCoords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <line x1={pad.left} y1={zeroY} x2={width - pad.right} y2={zeroY} stroke="#DDD" />
      {categories.map((c, i) => {
        const v = bars[i];
        const h = (Math.abs(v) / barRange) * chartH;
        const y = v >= 0 ? zeroY - h : zeroY;
        const x = pad.left + i * slot + slot / 2 - barW / 2;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill={v >= 0 ? barColor : ORANGE} rx="1" />
            <text x={pad.left + i * slot + slot / 2} y={height - 8} textAnchor="middle" fontSize="8" className="fill-gray-500">
              {c}
            </text>
          </g>
        );
      })}
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" />
    </svg>
  );
};
