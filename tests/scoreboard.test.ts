import { Match, Scoreboard } from '../src/scoreboard';

describe('Football Scoreboard', () => {
  let scoreboard: Scoreboard;

  beforeEach(() => {
    scoreboard = new Scoreboard();
  });

  test('should start a new match with a score of 0-0', () => {
    scoreboard.startMatch('Mexico', 'Canada');
    expect(scoreboard.getSummary()).toEqual([
      { home: 'Mexico', away: 'Canada', homeScore: 0, awayScore: 0 },
    ]);
  });

  test('should not allow a match where home and away teams are the same', () => {
    expect(() => scoreboard.startMatch('Brazil', 'Brazil')).toThrow(
      'Home and Away teams must be different.'
    );
  });

  test('should not allow a team to participate in multiple ongoing matches', () => {
    scoreboard.startMatch('Brazil', 'Argentina');

    expect(() => scoreboard.startMatch('Brazil', 'France')).toThrow(
      'A team cannot participate in multiple ongoing matches.'
    );

    expect(() => scoreboard.startMatch('Italy', 'Argentina')).toThrow(
      'A team cannot participate in multiple ongoing matches.'
    );
  });

  test('should update the score of an ongoing match', () => {
    scoreboard.startMatch('Mexico', 'Canada');
    scoreboard.updateScore('Mexico', 'Canada', 2, 1);

    const expected: Match[] = [{ home: 'Mexico', away: 'Canada', homeScore: 2, awayScore: 1 }];
    expect(scoreboard.getSummary()).toEqual(expected);
  });

  test('should not allow negative or non-integer scores', () => {
    scoreboard.startMatch('France', 'Germany');

    expect(() => scoreboard.updateScore('France', 'Germany', -1, 2)).toThrow(
      'Scores must be non-negative integers.'
    );
    expect(() => scoreboard.updateScore('France', 'Germany', 2.5, 2)).toThrow(
      'Scores must be non-negative integers.'
    );
  });

  test('should not allow updating scores for a non-existing match', () => {
    expect(() => scoreboard.updateScore('USA', 'Canada', 1, 1)).toThrow('Match not found.');
  });

  test('should remove a finished match from the scoreboard', () => {
    scoreboard.startMatch('Mexico', 'Canada');
    scoreboard.finishMatch('Mexico', 'Canada');

    expect(scoreboard.getSummary()).toEqual([]);
  });

  test('should not allow finishing a non-existing match', () => {
    expect(() => scoreboard.finishMatch('England', 'Italy')).toThrow('Match not found.');
  });

  test('should order matches by total score', () => {
    scoreboard.startMatch('Spain', 'Brazil');
    scoreboard.updateScore('Spain', 'Brazil', 3, 3);

    scoreboard.startMatch('Mexico', 'Canada');
    scoreboard.updateScore('Mexico', 'Canada', 2, 1);

    const expected: Match[] = [
      { home: 'Spain', away: 'Brazil', homeScore: 3, awayScore: 3 },
      { home: 'Mexico', away: 'Canada', homeScore: 2, awayScore: 1 },
    ];

    expect(scoreboard.getSummary()).toEqual(expected);
  });

  test('should order matches by recency if scores are equal', () => {
    scoreboard.startMatch('Poland', 'Albania');
    scoreboard.updateScore('Poland', 'Albania', 5, 2);

    scoreboard.startMatch('Mexico', 'Canada');
    scoreboard.updateScore('Mexico', 'Canada', 2, 2);

    scoreboard.startMatch('Spain', 'Brazil');
    scoreboard.updateScore('Spain', 'Brazil', 1, 3);

    scoreboard.startMatch('Germany', 'France');
    scoreboard.updateScore('Germany', 'France', 2, 2);

    const expected: Match[] = [
      { home: 'Poland', away: 'Albania', homeScore: 5, awayScore: 2 },
      { home: 'Germany', away: 'France', homeScore: 2, awayScore: 2 },
      { home: 'Spain', away: 'Brazil', homeScore: 1, awayScore: 3 },
      { home: 'Mexico', away: 'Canada', homeScore: 2, awayScore: 2 },
    ];

    expect(scoreboard.getSummary()).toEqual(expected);
  });
});
