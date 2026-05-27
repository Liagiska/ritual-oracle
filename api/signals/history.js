export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const { limit = 50, offset = 0, pair } = req.query;
    const params = new URLSearchParams({ limit, offset });
    if (pair) params.append('pair', pair);
    
    const response = await fetch(`http://159.223.221.130:3000/api/signals/history?${params}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ 
      signals: [], 
      pagination: { limit: 50, offset: 0, total: 0, hasMore: false },
      error: 'Backend unavailable' 
    });
  }
}
