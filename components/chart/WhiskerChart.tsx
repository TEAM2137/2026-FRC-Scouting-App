'use client';

import { FuelStats } from '@/lib/charts/FuelStatsCalculation';
import { useState } from 'react';

interface WhiskerChartProps {
  data: FuelStats[];
}

export const WhiskerChart = ({ data }: WhiskerChartProps) => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  if (data.length === 0) return <div className="text-white">No data available</div>;

  
  const globalMin = Math.min(...data.map((d) => d.min));
  const globalMax = Math.max(...data.map((d) => d.max));
  const range = globalMax - globalMin || 1;

  const scale = (value: number) => ((value - globalMin) / range) * 100;

  return (
    <div className="w-full bg-neutral-900 p-6 rounded-xl">
      <h3 className="text-white text-lg font-bold mb-6">
        Fuel Score Distribution by Team
      </h3>
      <div className="space-y-4">
        {data.map((item) => {
          const minPercent = scale(item.min);
          const maxPercent = scale(item.max);
          const q1Percent = scale(item.q1);
          const medianPercent = scale(item.median);
          const q3Percent = scale(item.q3);
          const boxWidth = q3Percent - q1Percent;

          return (
            <div
              key={item.teamNumber}
              className="flex items-center gap-4"
              onMouseEnter={() => setHoveredTeam(item.teamNumber)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              {/* Team label */}
              <div className="w-12 text-right">
                <span className="text-white font-bold text-sm">
                  {item.teamNumber}
                </span>
              </div>

              {/* Box plot container */}
              <div className="flex-1 h-12 relative bg-neutral-800 rounded border border-neutral-700">
                {/* Whisker line (min to max) */}
                <div
                  className="absolute top-1/2 h-0.5 bg-slate-500 -translate-y-1/2"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                />

                {/* Min cap */}
                <div
                  className="absolute top-1/4 h-4 w-0.5 bg-slate-500 -translate-y-1/2"
                  style={{ left: `${minPercent}%` }}
                />

                {/* Max cap */}
                <div
                  className="absolute top-1/4 h-4 w-0.5 bg-slate-500 -translate-y-1/2"
                  style={{ left: `${maxPercent}%` }}
                />

                {/* Box (Q1 to Q3) */}
                <div
                  className="absolute top-1/2 h-8 bg-blue-600 rounded -translate-y-1/2 border border-blue-500 transition-all"
                  style={{
                    left: `${q1Percent}%`,
                    width: `${boxWidth}%`,
                  }}
                >
                  {/* Median line */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-amber-400"
                    style={{
                      left: `${((medianPercent - q1Percent) / boxWidth) * 100}%`,
                    }}
                  />
                </div>

                {hoveredTeam === item.teamNumber && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-950 text-white px-3 py-2 rounded text-xs whitespace-nowrap border border-neutral-600 z-10 space-y-1">
                    <div>Min: {item.min}</div>
                    <div>Q1: {item.q1}</div>
                    <div>Median: {item.median}</div>
                    <div>Q3: {item.q3}</div>
                    <div>Max: {item.max}</div>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="text-xs text-gray-400 w-16">
                <div>{item.min}-{item.max}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-xs text-gray-500 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-4 bg-slate-500" />
          <span>Whiskers (Min-Max)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-12 bg-blue-600 rounded border border-blue-500" />
          <span>Box (Q1-Q3)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-0.5 bg-amber-400" />
          <span>Median</span>
        </div>
      </div>
    </div>
  );
};
