export interface DailyTimeSeriesEntry {
  [date: string]: {
    '1. open': string;
    '2. high': string;
    '3. low': string;
    '4. close': string;
    '5. volume': string;
  };
}

export const fetchDailySeries = async (symbol: string): Promise<DailyTimeSeriesEntry> => {
  const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
  );
  const json = await res.json();
  if (!json['Time Series (Daily)']) {
    throw new Error('Alpha Vantage API error or limit reached');
  }
  return json['Time Series (Daily)'];
};
