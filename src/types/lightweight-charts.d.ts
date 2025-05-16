import { ICandlestickSeriesApi, CandlestickSeriesOptions } from 'lightweight-charts';

declare module 'lightweight-charts' {
  interface IChartApi {
    addCandlestickSeries(options?: CandlestickSeriesOptions): ICandlestickSeriesApi;
  }
}
