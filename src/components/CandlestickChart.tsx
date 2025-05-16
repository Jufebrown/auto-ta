'use client';

import { useEffect, useRef } from 'react';
import type { Time } from 'lightweight-charts';

export interface Candle {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface Props {
  data: Candle[];
  height?: number;
}

export default function CandlestickChart({ data, height = 500 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let chart: any;

    const initChart = async () => {
      const { createChart } = await import('lightweight-charts');

      if (!containerRef.current) return;

      chart = createChart(containerRef.current, {
        width: containerRef.current.clientWidth,
        height,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#000000',
        },
        grid: {
          vertLines: { color: '#eee' },
          horzLines: { color: '#eee' },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      const candlestickSeries = chart.addCandlestickSeries();
      candlestickSeries.setData(data);
    };

    initChart();

    const handleResize = () => {
      if (chart && containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chart) chart.remove();
    };
  }, [data, height]);

  return <div ref={containerRef} style={{ width: '100%', height }} />;
}
