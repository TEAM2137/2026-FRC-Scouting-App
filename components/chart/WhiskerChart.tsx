'use client';

import { FuelStats } from '@/lib/charts/FuelStatsCalculation';
import { useState } from 'react';

interface WhiskerChartProps {
  data: FuelStats[];
}

export const WhiskerChart = ({ data }: WhiskerChartProps) => {
  const [hoveredTeam, setHoveredTeam] = useState<string | null>(null);

  if (data.length === 0) return <div className="text-white">No data available</div>;

  // Find global min and max for scaling
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
          const avgPercent = scale(item.average);
          const boxWidth = maxPercent - minPercent;

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
                  className="absolute top-1/2 h-0.5 bg-slate-400 -translate-y-1/2"
                  style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                  }}
                />

                {/* Box (average centered) */}
                <div
                  className="absolute top-1/2 h-8 bg-amber-500 rounded -translate-y-1/2 border border-amber-600 transition-all"
                  style={{
                    left: `${avgPercent - 3}%`,
                    width: '6%',
                    minWidth: '20px',
                  }}
                  title={`Avg: ${item.average}`}
                >
                  {hoveredTeam === item.teamNumber && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-neutral-950 text-white px-2 py-1 rounded text-xs whitespace-nowrap border border-neutral-600 z-10">
                      {item.average}
                    </div>
                  )}
                </div>

                {/* Min line cap */}
                <div
                  className="absolute top-1/4 h-4 w-0.5 bg-slate-400 -translate-y-1/2"
                  style={{ left: `${minPercent}%` }}
                />

                {/* Max line cap */}
                <div
                  className="absolute top-1/4 h-4 w-0.5 bg-slate-400 -translate-y-1/2"
                  style={{ left: `${maxPercent}%` }}
                />
              </div>

              {/* Stats */}
              <div className="text-xs text-gray-400 w-24">
                <div>Min: {item.min}</div>
                <div>Max: {item.max}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 text-xs text-gray-500 flex gap-6">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-4 bg-slate-400" />
          <span>Range</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-6 bg-amber-500 rounded" />
          <span>Average</span>
        </div>
      </div>
    </div>
  );
};
