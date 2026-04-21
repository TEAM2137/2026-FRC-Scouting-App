import { IMatchScout } from '@/models/scout/MatchScout';

export interface FuelStats {
  teamNumber: string;
  min: number;
  max: number;
  average: number;
}

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
      const min = Math.min(...fuelScores);
      const max = Math.max(...fuelScores);
      const average =
        fuelScores.reduce((sum, score) => sum + score, 0) / fuelScores.length;

      return {
        teamNumber,
        min,
        max,
        average: Math.round(average * 10) / 10, // Round to 1 decimal
      };
    }
  );

  return stats.sort(
    (a, b) => parseInt(b.teamNumber) - parseInt(a.teamNumber)
  );
};
