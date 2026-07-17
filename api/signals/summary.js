export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const response = await fetch('http://72.62.133.122:3001/api/signals/summary');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ 
      totalSignals: 0,
      accuracy: {
        '1h': { total: 0, correct: null, accuracy: null },
        '4h': { total: 0, correct: null, accuracy: null },
        '24h': { total: 0, correct: null, accuracy: null }
      },
      topPairs: [],
      error: 'Backend unavailable' 
    });
  }
}
