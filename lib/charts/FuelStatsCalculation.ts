import { IMatchSummary } from '@/models/insights/MatchSummary';
import { IMatchScout } from '@/models/scout/MatchScout';

export interface FuelStats {
  teamNumber: string;
  min: number;
  q1: number;
  median: number;
  q3: number;
  max: number;
}

const calculatePercentile = (sortedData: number[], percentile: number): number => {
  const index = (percentile / 100) * (sortedData.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index % 1;

  if (lower === upper) {
    return sortedData[lower];
  }

  return sortedData[lower] * (1 - weight) + sortedData[upper] * weight;
};

export interface FuelData {
  teamNumber: string;
  totalFuel: number;
}

export const calculateFuelStats = <T>(
  data: T[],
  mapper: (item: T) => FuelData
): FuelStats[] => {
  const teamMap = new Map<string, number[]>();

  data.forEach((item) => {
    const { teamNumber, totalFuel } = mapper(item);

    if (!teamMap.has(teamNumber)) {
      teamMap.set(teamNumber, []);
    }
    teamMap.get(teamNumber)!.push(totalFuel);
  });

  const stats: FuelStats[] = Array.from(teamMap.entries()).map(
    ([teamNumber, fuelScores]) => {
      const sorted = [...fuelScores].sort((a, b) => a - b);
      return {
        teamNumber,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        q1: Math.round(calculatePercentile(sorted, 25) * 10) / 10,
        median: Math.round(calculatePercentile(sorted, 50) * 10) / 10,
        q3: Math.round(calculatePercentile(sorted, 75) * 10) / 10,
      };
    }
  );

  return stats.sort((a, b) => parseInt(b.teamNumber) - parseInt(a.teamNumber));
};
