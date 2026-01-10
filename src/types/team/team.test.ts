import { describe, it, expect } from 'vitest';
import type { Team, TeamFormData } from './index';

describe('Team types', () => {
  it('should correctly type a Team object', () => {
    const team: Team = {
      id: 1,
      name: 'Test Team',
    };

    expect(team.id).toBe(1);
    expect(team.name).toBe('Test Team');
  });

  it('should correctly type TeamFormData', () => {
    const formData: TeamFormData = {
      name: 'New Team',
    };

    expect(formData.name).toBe('New Team');
  });
});
