import React, { useState, useEffect } from 'react';
import { useLotteryContext } from '../context/context';
import styles from '../styles/LotteryHistory.module.css';

interface LotteryRound {
  id: number;
  timestamp: number;
  potSize: string;
  winner: string;
}

const LotteryHistory: React.FC = () => {
  const { lotteryContract } = useLotteryContext();
  const [history, setHistory] = useState<LotteryRound[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLotteryHistory = async () => {
      try {
        if (!lotteryContract) {
          throw new Error('Lottery contract not initialized');
        }

        // Simulate fetching lottery history from the contract
        // In a real implementation, replace with actual contract method
        const rounds: LotteryRound[] = await lotteryContract.getPastRounds();
        
        setHistory(rounds);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    fetchLotteryHistory();
  }, [lotteryContract]);

  if (loading) return <div>Loading history...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.historyContainer} data-testid="lottery-history">
      <h2>Lottery History</h2>
      {history.length === 0 ? (
        <p>No past lottery rounds yet.</p>
      ) : (
        <table className={styles.historyTable}>
          <thead>
            <tr>
              <th>Round</th>
              <th>Date</th>
              <th>Pot Size</th>
              <th>Winner</th>
            </tr>
          </thead>
          <tbody>
            {history.map((round) => (
              <tr key={round.id}>
                <td>{round.id}</td>
                <td>{new Date(round.timestamp * 1000).toLocaleDateString()}</td>
                <td>{round.potSize} ETH</td>
                <td>{round.winner.slice(0, 6)}...{round.winner.slice(-4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LotteryHistory;