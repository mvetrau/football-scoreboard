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

  /**
   * Starts a new match with an initial score of 0-0.
   * @param home - The home team name.
   * @param away - The away team name.
   * @throws Error if the home and away teams are the same.
   * @throws Error if the match is already in progress.
   */
  startMatch(home: string, away: string): void {
    if (home === away) {
      throw new Error('Home and Away teams must be different.');
    }

    if (this._findMatch(home, away)) {
      throw new Error('This match is already in progress.');
    }

    this.matches.unshift({ home, away, homeScore: 0, awayScore: 0 });
  }

  public updateScore(home: string, away: string, homeScore: number, awayScore: number): void {}

  public finishMatch(home: string, away: string): void {}

  public getSummary(): Match[] {
    return this.matches; // ToDo
  }

  /**
   * Finds an ongoing match by home and away team names.
   * @param home - The home team name.
   * @param away - The away team name.
   * @returns The match if found, otherwise `undefined`.
   * @private
   */
  private _findMatch(home: string, away: string): Match | undefined {
    return this.matches.find((m) => m.home === home && m.away === away);
  }
}
