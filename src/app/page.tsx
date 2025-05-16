'use client';

import { useEffect, useState } from 'react';
import CandlestickChart, { Candle } from '@/components/CandlestickChart';

interface AlphaVantageDailyResponse {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

const SYMBOL = 'GME';

export default function HomePage() {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
        const res = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${SYMBOL}&apikey=${apiKey}`
        );
        const json = await res.json();

        const raw: AlphaVantageDailyResponse = json['Time Series (Daily)'];
        if (!raw) {
          throw new Error(json['Note'] || json['Error Message'] || 'Invalid data from Alpha Vantage');
        }

        const parsed: Candle[] = Object.entries(raw)
          .map(([date, values]) => ({
            time: date as const, // lightweight-charts accepts 'YYYY-MM-DD' string
            open: parseFloat(values['1. open']),
            high: parseFloat(values['2. high']),
            low: parseFloat(values['3. low']),
            close: parseFloat(values['4. close']),
          }))
          .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

        setCandles(parsed);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch stock data');
      }
    };

    fetchData();
  }, []);

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Stock Candlestick Chart ({SYMBOL})</h1>

      {error && <p className="text-red-600">{error}</p>}

      {!error && candles.length === 0 && <p>Loading chart data...</p>}

      {!error && candles.length > 0 && (
        <CandlestickChart data={candles} height={500} />
      )}
    </main>
  );
}
