'use client';

import React, { useEffect, useState } from 'react';
import { fetchStockQuote, GlobalQuote } from '@/lib/fetchStockQuote';

const SYMBOL = 'GME';

export default function Home() {
  const [quote, setQuote] = useState<GlobalQuote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const data = await fetchStockQuote(SYMBOL);
        setQuote(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getQuote();
  }, []);

  if (loading) return <p className="p-4">Loading stock data...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Stock Quote: {quote?.['01. symbol']}</h1>
      <ul className="space-y-2">
        <li><strong>Price:</strong> ${quote?.['05. price']}</li>
        <li><strong>Open:</strong> ${quote?.['02. open']}</li>
        <li><strong>High:</strong> ${quote?.['03. high']}</li>
        <li><strong>Low:</strong> ${quote?.['04. low']}</li>
        <li><strong>Previous Close:</strong> ${quote?.['08. previous close']}</li>
        <li><strong>Change:</strong> {quote?.['09. change']} ({quote?.['10. change percent']})</li>
        <li><strong>Volume:</strong> {quote?.['06. volume']}</li>
      </ul>
    </div>
  );
}
