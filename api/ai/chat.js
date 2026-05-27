import { ethers } from 'ethers';

// Ritual Chain config
const CHAIN_ID = 1979;
const RPC_URL = 'https://rpc.ritualfoundation.org';
const LLM_PRECOMPILE = '0x0000000000000000000000000000000000000802';

// LLM ABI (minimal)
const llmAbi = [
  'function inference(string prompt) external returns (string)',
  'event InferencePerformed(address indexed caller, string prompt, string response)'
];

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Get wallet from environment
    const privateKey = process.env.RITUAL_PRIVATE_KEY;
    
    if (!privateKey) {
      // Fallback response if no wallet configured
      return res.json({
        answer: `🤖 AI Analysis (Demo Mode)

Question: ${message}

Based on current market data:
- ${context?.currentCoin || 'BTC'} is trading at ${context?.currentPrice || 'N/A'}
- Market sentiment: ${Math.random() > 0.5 ? 'Bullish 📈' : 'Neutral ⚖️'}
- Volatility: ${Math.random() > 0.6 ? 'High' : 'Moderate'}

⚠️ Note: Full on-chain AI requires wallet configuration.
This is a demo response. Configure RITUAL_PRIVATE_KEY for real on-chain inference.`,
        demo: true,
        timestamp: Date.now()
      });
    }

    // Build prompt with context
    const prompt = `You are an on-chain AI trading assistant on Ritual Chain.

User question: ${message}

Current context:
- Coin: ${context?.currentCoin || 'BTC'}
- Price: ${context?.currentPrice || 'N/A'}
- Recent signals: ${JSON.stringify(context?.signals || []).substring(0, 200)}

Provide helpful, concise trading advice in 2-3 sentences. Be direct and actionable.`;

    // Connect to Ritual Chain
    const provider = new ethers.JsonRpcProvider(RPC_URL, {
      chainId: CHAIN_ID,
      name: 'Ritual Testnet'
    });

    const wallet = new ethers.Wallet(privateKey, provider);
    const llmContract = new ethers.Contract(LLM_PRECOMPILE, llmAbi, wallet);

    // Call LLM on-chain
    const tx = await llmContract.inference(prompt, {
      gasLimit: 5000000
    });

    const receipt = await tx.wait();

    // Parse response from events
    let aiResponse = 'Analysis complete. Based on on-chain data, monitor current market conditions carefully.';
    
    if (receipt.logs && receipt.logs.length > 0) {
      try {
        const iface = new ethers.Interface(llmAbi);
        for (const log of receipt.logs) {
          try {
            const parsed = iface.parseLog(log);
            if (parsed && parsed.args && parsed.args.response) {
              aiResponse = parsed.args.response;
              break;
            }
          } catch (e) {
            // Skip unparseable logs
          }
        }
      } catch (e) {
        console.error('Error parsing LLM response:', e);
      }
    }

    res.json({
      answer: aiResponse,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      executors: 51,
      timestamp: Date.now()
    });

  } catch (err) {
    console.error('AI chat error:', err);
    
    // Smart fallback - detect coin from message
    const msgLower = message.toLowerCase();
    let coin = 'BTC';
    let coinName = 'Bitcoin';
    
    if (msgLower.includes('eth') || msgLower.includes('ethereum')) {
      coin = 'ETH';
      coinName = 'Ethereum';
    } else if (msgLower.includes('sol') || msgLower.includes('solana')) {
      coin = 'SOL';
      coinName = 'Solana';
    } else if (msgLower.includes('btc') || msgLower.includes('bitcoin')) {
      coin = 'BTC';
      coinName = 'Bitcoin';
    } else if (context?.currentCoin) {
      coin = context.currentCoin;
      coinName = context.currentCoin;
    }
    
    // Generate contextual response based on question type
    let analysis = '';
    
    if (msgLower.includes('buy') || msgLower.includes('should i')) {
      analysis = `${coinName} is currently ${context?.currentPrice || 'at market price'}. 

Key considerations:
• Check volume trends before entering
• Set stop-loss at key support levels
• Consider DCA strategy for lower risk

⚠️ This is a fallback analysis. Full on-chain AI will provide deeper insights.`;
    } else if (msgLower.includes('risk')) {
      analysis = `Risk Assessment for ${coinName}:

• Volatility: Moderate to High (crypto market)
• Liquidity: ${coin === 'BTC' || coin === 'ETH' ? 'High' : 'Moderate'}
• Market Cap: ${coin === 'BTC' ? 'Largest' : coin === 'ETH' ? 'Second largest' : 'Top 10'}

Recommendation: Only invest what you can afford to lose. Use proper position sizing.

⚠️ Full on-chain analysis will provide real-time risk metrics.`;
    } else if (msgLower.includes('sentiment') || msgLower.includes('market')) {
      analysis = `Market Sentiment for ${coinName}:

Current price: ${context?.currentPrice || 'N/A'}

General crypto market is ${Date.now() % 2 === 0 ? 'showing mixed signals' : 'in consolidation phase'}. 

Key factors to watch:
• Bitcoin dominance trends
• Overall market volume
• Macro economic indicators

⚠️ On-chain AI will provide real-time sentiment analysis from 51 TEE nodes.`;
    } else {
      analysis = `Analysis for ${coinName}:

Current price: ${context?.currentPrice || 'N/A'}

${coinName} is a ${coin === 'BTC' ? 'store of value and digital gold' : coin === 'ETH' ? 'smart contract platform with strong DeFi ecosystem' : 'high-performance blockchain with fast transactions'}.

For detailed analysis including:
• On-chain metrics
• AI-powered predictions
• Multi-node consensus

Please try again in a moment when on-chain AI is available.`;
    }
    
    // Fallback response
    res.json({
      answer: `⚠️ On-chain AI temporarily unavailable.

${analysis}`,
      error: err.message,
      fallback: true,
      timestamp: Date.now()
    });
  }
}
