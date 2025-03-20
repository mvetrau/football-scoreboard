import { Scoreboard } from '../src/scoreboard';

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

  test('should not allow duplicate matches in progress', () => {
    scoreboard.startMatch('Brazil', 'Argentina');
    expect(() => scoreboard.startMatch('Brazil', 'Argentina')).toThrow(
      'This match is already in progress.'
    );
  });
});
