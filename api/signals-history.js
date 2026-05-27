// Mock signals history endpoint for Vercel
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Try to fetch from backend, fallback to mock
    try {
        const backendRes = await fetch('http://72.62.133.122:3001/api/signals/history');
        if (backendRes.ok) {
            const data = await backendRes.json();
            return res.status(200).json(data);
        }
    } catch (err) {
        console.log('Backend unreachable, using mock data');
    }

    // Mock data fallback
    const now = Date.now();
    const pairs = ['BTC/USDC', 'ETH/USDC', 'SOL/USDC', 'AVAX/USDC', 'MATIC/USDC', 'LINK/USDC', 'UNI/USDC', 'AAVE/USDC', 'ARB/USDC', 'OP/USDC'];
    const signals = [];
    
    for (let i = 0; i < 20; i++) {
        const pair = pairs[i % pairs.length];
        const signal = ['BUY', 'SELL', 'HOLD'][Math.floor(Math.random() * 3)];
        const confidence = 65 + Math.floor(Math.random() * 30);
        const outcome = Math.random() > 0.3 ? 'correct' : (Math.random() > 0.5 ? 'wrong' : null);
        
        signals.push({
            pair,
            signal,
            confidence,
            timestamp: now - (i * 3600000), // 1 hour apart
            outcome
        });
    }
    
    res.status(200).json({ signals });
}
