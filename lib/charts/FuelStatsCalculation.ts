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

export const calculateFuelStats = (matches: IMatchScout[]): FuelStats[] => {
  const teamMap = new Map<string, number[]>();

  // Group fuel scores by team
  matches.forEach((match) => {
    const totalFuel =
      match.autoLaunches +
      match.firstShiftLauches +
      match.secondShiftLauches +
      match.endgameLaunches;

    if (!teamMap.has(match.teamNumber)) {
      teamMap.set(match.teamNumber, []);
    }
    teamMap.get(match.teamNumber)!.push(totalFuel);
  });

  // Calculate stats for each team
  const stats: FuelStats[] = Array.from(teamMap.entries()).map(
    ([teamNumber, fuelScores]) => {
      const sorted = [...fuelScores].sort((a, b) => a - b);
      const min = sorted[0];
      const max = sorted[sorted.length - 1];
      const q1 = calculatePercentile(sorted, 25);
      const median = calculatePercentile(sorted, 50);
      const q3 = calculatePercentile(sorted, 75);

      return {
        teamNumber,
        min,
        q1: Math.round(q1 * 10) / 10,
        median: Math.round(median * 10) / 10,
        q3: Math.round(q3 * 10) / 10,
        max,
      };
    }
  );

  return stats.sort(
    (a, b) => parseInt(b.teamNumber) - parseInt(a.teamNumber)
  );
};
