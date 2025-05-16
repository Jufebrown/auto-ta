export interface GlobalQuote {
  '01. symbol': string;
  '02. open': string;
  '03. high': string;
  '04. low': string;
  '05. price': string;
  '06. volume': string;
  '07. latest trading day': string;
  '08. previous close': string;
  '09. change': string;
  '10. change percent': string;
}

export const fetchStockQuote = async (symbol: string): Promise<GlobalQuote> => {
  const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;
  const res = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  );

  const data = await res.json();

  if (!data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
    throw new Error('No stock data found. You may have hit the API rate limit.');
  }

  return data['Global Quote'];
};
