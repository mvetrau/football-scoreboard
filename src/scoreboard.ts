export interface Match {
  /** The name of the home team */
  home: string;
  /** The name of the away team */
  away: string;
  /** The score of the home team */
  homeScore: number;
  /** The score of the away team */
  awayScore: number;
}

/**
 * A scoreboard to track live football matches.
 * Supports starting, updating, finishing matches, and retrieving a sorted summary.
 */
export class Scoreboard {
  private matches: Match[] = [];

  public startMatch(home: string, away: string): void {}

  public updateScore(home: string, away: string, homeScore: number, awayScore: number): void {}

  public finishMatch(home: string, away: string): void {}

  public getSummary(): Match[] {
    return [];
  }
}
