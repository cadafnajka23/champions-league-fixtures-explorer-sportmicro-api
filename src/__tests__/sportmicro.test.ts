import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesSearch, formatFixtureDate } from '../lib/sportmicro.ts';

test('matchesSearch finds team names and venue text', () => {
  assert.equal(matchesSearch({ home_team_name: 'Real Madrid', away_team_name: 'Dortmund', arena_name: 'Bernabéu' }, 'dortmund'), true);
  assert.equal(matchesSearch({ home_team_name: 'Real Madrid', away_team_name: 'Dortmund', arena_name: 'Bernabéu' }, 'london'), false);
});

test('formatFixtureDate handles missing timestamps', () => {
  assert.equal(formatFixtureDate({}), 'Date unavailable');
});
