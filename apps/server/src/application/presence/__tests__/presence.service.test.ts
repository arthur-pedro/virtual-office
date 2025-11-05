import { beforeEach, describe, expect, it } from 'vitest';

import { PresenceService } from '../presence.service';

describe('PresenceService', () => {
  let service: PresenceService;

  beforeEach(() => {
    service = new PresenceService();
  });

  it('stores and returns players', () => {
    service.upsert({
      id: 'p1',
      displayName: 'Player One',
      direction: 'down',
      position: { x: 10, y: 20 },
      role: 'member',
      status: 'online',
    });

    expect(service.list()).toHaveLength(1);
  });
});
