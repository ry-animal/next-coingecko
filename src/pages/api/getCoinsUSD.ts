import type { NextApiRequest, NextApiResponse } from "next";

type CoinData = {
  [key: string]: {
    usd: number;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CoinData | { error: string }>
) {
  const { coinList } = req.query;

  if (!coinList || typeof coinList !== 'string') {
    return res.status(404).json({ error: 'bad params' });
  }

  const apiKey = process.env.COINGECKO_API_KEY;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinList}&vs_currencies=usd`,
      {
        headers: {
          'X-CoinGecko-API-Key': apiKey || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('api request failed');
    }

    const data: CoinData = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching coin prices' });
  }
}