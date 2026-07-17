export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  try {
    const response = await fetch('http://72.62.133.122:3001/api/stats');
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(502).json({ blockNumber: 0, chainId: 1979 });
  }
}
