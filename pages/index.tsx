import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import LotteryCard from '../components/LotteryCard';
import LotteryHistory from '../components/LotteryHistory';
import { LotteryProvider } from '../context/context';

const Home: React.FC = () => {
  return (
    <LotteryProvider>
      <div className={styles.container}>
        <Head>
          <title>Decentralized Lottery</title>
          <meta name="description" content="Decentralized Lottery Platform" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        
        <main className={styles.main}>
          <div className={styles.gridContainer}>
            <div className={styles.lotterySection}>
              <LotteryCard />
            </div>
            
            <div className={styles.historySection}>
              <LotteryHistory />
            </div>
          </div>
        </main>
      </div>
    </LotteryProvider>
  );
};

export default Home;