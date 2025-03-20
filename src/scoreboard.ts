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

  /**
   * Updates the score of an ongoing match.
   * @param home - The home team name.
   * @param away - The away team name.
   * @param homeScore - The new home team score (must be a non-negative integer).
   * @param awayScore - The new away team score (must be a non-negative integer).
   * @throws Error if scores are not non-negative integers.
   * @throws Error if the match is not found.
   */
  public updateScore(home: string, away: string, homeScore: number, awayScore: number): void {
    if (
      !Number.isInteger(homeScore) ||
      homeScore < 0 ||
      !Number.isInteger(awayScore) ||
      awayScore < 0
    ) {
      throw new Error('Scores must be non-negative integers.');
    }

    const match = this._findMatch(home, away);
    if (!match) {
      throw new Error('Match not found.');
    }

    match.homeScore = homeScore;
    match.awayScore = awayScore;
  }

  /**
   * Finishes a match and removes it from the scoreboard.
   * @param home - The home team name.
   * @param away - The away team name.
   * @throws Error if the match is not found.
   */
  public finishMatch(home: string, away: string): void {
    if (!this._findMatch(home, away)) {
      throw new Error('Match not found.');
    }

    this.matches = this.matches.filter((m) => !(m.home === home && m.away === away));
  }

  /**
   * Retrieves a sorted summary of ongoing matches.
   * Matches are ordered by total score (highest first).
   * If scores are the same, the most recent match is shown first.
   * @returns An array of matches sorted by total score and recency.
   */
  public getSummary(): Match[] {
    return [...this.matches].sort((a, b) => {
      const totalScoreA = a.homeScore + a.awayScore;
      const totalScoreB = b.homeScore + b.awayScore;

      if (totalScoreA === totalScoreB) {
        return this.matches.indexOf(a) - this.matches.indexOf(b);
      }

      return totalScoreB - totalScoreA;
    });
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
