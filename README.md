# Ritual Oracle

**On-chain AI trading signals powered by Ritual Network's LLM precompile.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://ritual-oracle-two.vercel.app)
[![Ritual Network](https://img.shields.io/badge/built%20on-Ritual-blue)](https://ritual.net)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🔥 What is Ritual Oracle?

Ritual Oracle is a **production-ready on-chain AI system** that generates crypto trading signals using Ritual Network's native LLM precompile. Every inference is recorded on-chain, making signals **transparent, verifiable, and immutable**.

**Key Features:**
- ✅ **25,000+ signals generated** (and counting)
- ✅ **4 trading pairs** (BTC, ETH, SOL, AVAX)
- ✅ **40-second refresh cycle** (near real-time)
- ✅ **On-chain reasoning** (every signal includes AI explanation)
- ✅ **Performance tracking** (win rate, accuracy, ROI)
- ✅ **Open-source** (fully auditable)

---

## 🚀 Live Demo

**Production:** [ritual-oracle-two.vercel.app](https://ritual-oracle-two.vercel.app)

**Features:**
- Real-time signal generation
- Signal history with pagination
- Performance dashboard with charts
- AI chat interface
- Copy-trading portfolio tracker

---

## 🏗️ Architecture

```
User → Frontend (Vercel) → Smart Contract (Ritual Chain)
                                ↑
                    Backend Worker (VPS, 40s loop)
                                ↓
                    Ritual LLM Precompile (0x0101)
```

**Why this design?**
- **Decoupled inference:** Backend generates signals every 40s, writes to contract
- **Instant reads:** Frontend reads latest signal from contract (no waiting)
- **Fixed gas costs:** Predictable expenses regardless of traffic
- **Verifiable:** Every signal is on-chain with timestamp, reasoning, and outcome

---

## 📊 Production Metrics

| Metric              | Value        |
|---------------------|--------------|
| Total Signals       | 25,588+      |
| Uptime              | 94%          |
| Avg Response Time   | 2.3s         |
| Trading Pairs       | 4 (BTC, ETH, SOL, AVAX) |
| Refresh Cycle       | 40 seconds   |

**Accuracy (7-day window):**
- BTC: 68%
- ETH: 71%
- SOL: 64%
- AVAX: 59%

*Note: Accuracy is directional (did price move in predicted direction within 1hr), not magnitude.*

---

## 🛠️ Tech Stack

**Frontend:**
- HTML/CSS/JavaScript (vanilla)
- Chart.js (performance visualization)
- ethers.js (blockchain interaction)
- Deployed on Vercel

**Backend:**
- Node.js + Express
- SQLite (signal storage)
- ethers.js (Ritual precompile calls)
- Runs on VPS (40s cron loop)

**Blockchain:**
- Ritual Network (testnet)
- LLM Precompile: `0x0000000000000000000000000000000000000802`
- Chain ID: 1979

---

## 📦 Installation

### Prerequisites
- Node.js 18+
- Ritual testnet wallet with funds
- VPS or local machine for backend worker

### Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/Liagiska/ritual-oracle.git
   cd ritual-oracle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Ritual wallet private key
   ```

4. **Deploy frontend to Vercel:**
   ```bash
   vercel --prod
   ```

5. **Run backend worker:**
   ```bash
   node server.js
   ```

---

## 🔧 Configuration

**Environment Variables:**

```env
# Ritual Network
RITUAL_RPC_URL=https://rpc.ritualfoundation.org
PRIVATE_KEY=your_wallet_private_key_here
CHAIN_ID=1979

# Backend
PORT=3001
NODE_ENV=production

# Optional: Sentry error monitoring
SENTRY_DSN=your_sentry_dsn_here
```

---

## 📖 How It Works

### 1. Signal Generation
- Backend worker calls Ritual's LLM precompile every 40 seconds
- Prompt includes: current price, volume, RSI, market sentiment
- LLM returns: direction (BUY/SELL), confidence (0-100), reasoning

### 2. On-Chain Storage
- Signal is written to Ritual Chain via smart contract
- Includes: pair, action, confidence, reasoning, timestamp, block number
- Emits event for real-time frontend updates

### 3. Accuracy Tracking
- Backend fetches actual price movements (1hr, 4hr, 24hr)
- Compares predicted direction vs actual outcome
- Stores results in SQLite for performance dashboard

### 4. Frontend Display
- Reads latest signal from contract (instant, no backend dependency)
- Displays signal history with pagination
- Shows performance metrics with Chart.js

---

## 🎯 Use Cases

- **Traders:** Get AI-generated signals with on-chain verification
- **Researchers:** Study on-chain AI inference patterns
- **Developers:** Learn how to integrate Ritual's LLM precompile
- **Auditors:** Verify signal accuracy via blockchain history

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Live Demo:** [ritual-oracle-two.vercel.app](https://ritual-oracle-two.vercel.app)
- **Ritual Network:** [ritual.net](https://ritual.net)
- **Article:** [Building On-Chain AI: 23,000+ Signals](https://x.com/tutubearrr/status/2059526286280941735)
- **Twitter:** [@tutubearrr](https://twitter.com/tutubearrr)

---

## 🙏 Acknowledgments

Built with [Ritual Network](https://ritual.net) — the first production-ready on-chain AI infrastructure.

Special thanks to the Ritual team for building the LLM precompile and supporting the developer community.

---

**⚠️ Disclaimer:** This is experimental software running on testnet. Signals are for educational purposes only. Not financial advice. DYOR.
