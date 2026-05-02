export default async function handler(req, res) {
  try {
    // IP VPS kamu (tanpa $ di depan!)
    const VPS_IP = '159.223.221.130';
    const backendUrl = 'http://159.223.221.130:3000/api/signals/latest';
    
    console.log('Fetching from:', backendUrl);
    
    const response = await fetch(backendUrl);
    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ 
      error: 'Backend unreachable', 
      details: error.message 
    });
  }
}
