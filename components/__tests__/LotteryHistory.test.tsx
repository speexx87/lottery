import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LotteryHistory from '../LotteryHistory';
import { LotteryContext } from '../../context/context';

// Mock context
const mockLotteryContract = {
  getPastRounds: vi.fn().mockResolvedValue([
    {
      id: 1,
      timestamp: Math.floor(Date.now() / 1000),
      potSize: '10',
      winner: '0x1234567890123456789012345678901234567890'
    }
  ])
};

const mockContextValue = {
  lotteryContract: mockLotteryContract,
  // Add other mock context values as needed
};

describe('LotteryHistory Component', () => {
  it('renders loading state initially', async () => {
    render(
      <LotteryContext.Provider value={mockContextValue}>
        <LotteryHistory />
      </LotteryContext.Provider>
    );

    expect(screen.getByText('Loading history...')).toBeTruthy();
  });

  it('renders lottery history table when data is available', async () => {
    render(
      <LotteryContext.Provider value={mockContextValue}>
        <LotteryHistory />
      </LotteryContext.Provider>
    );

    // Wait for loading to complete and table to render
    await screen.findByTestId('lottery-history');
    
    expect(screen.getByText('Lottery History')).toBeTruthy();
    expect(screen.getByText('Round')).toBeTruthy();
    expect(screen.getByText('Date')).toBeTruthy();
    expect(screen.getByText('Pot Size')).toBeTruthy();
    expect(screen.getByText('Winner')).toBeTruthy();
  });

  it('handles empty history gracefully', async () => {
    const emptyMockContract = {
      ...mockLotteryContract,
      getPastRounds: vi.fn().mockResolvedValue([])
    };

    render(
      <LotteryContext.Provider value={{...mockContextValue, lotteryContract: emptyMockContract}}>
        <LotteryHistory />
      </LotteryContext.Provider>
    );

    await screen.findByText('No past lottery rounds yet.');
  });

  it('handles contract initialization error', async () => {
    const errorMockContract = {
      ...mockLotteryContract,
      getPastRounds: vi.fn().mockRejectedValue(new Error('Contract not initialized'))
    };

    render(
      <LotteryContext.Provider value={{...mockContextValue, lotteryContract: errorMockContract}}>
        <LotteryHistory />
      </LotteryContext.Provider>
    );

    await screen.findByText(/Error:/);
  });
});