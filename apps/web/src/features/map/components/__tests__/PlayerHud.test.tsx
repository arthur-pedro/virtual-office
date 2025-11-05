import { render, screen } from '@testing-library/react';
import type { PlayerState } from '@virtual-office/shared-kernel';

import { PlayerHud } from '../PlayerHud';

type MockPlayerStore = {
  player: PlayerState;
};

vi.mock('../../state/playerStore', () => ({
  usePlayerStore: (selector: (state: MockPlayerStore) => unknown) =>
    selector({
      player: {
        id: 'p1',
        displayName: 'Tester',
        position: { x: 42, y: 12 },
        direction: 'up',
        role: 'member',
        status: 'online',
      },
    }),
}));

describe('PlayerHud', () => {
  it('shows player basic data', () => {
    render(<PlayerHud />);

    expect(screen.getByText('Tester —')).toBeInTheDocument();
    expect(screen.getByText('(42, 12)')).toBeInTheDocument();
  });
});
