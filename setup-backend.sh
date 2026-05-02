#!/bin/bash
# ============================================
# RITUAL ORACLE — Backend Setup Script
# Install Node.js, Ritual SDK, Backend Server
# ============================================
set -e

echo "🔮 Setting up Ritual Oracle Backend..."

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Create project directory
mkdir -p /root/ritual-oracle-backend
cd /root/ritual-oracle-backend

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors ethers @ritualnetwork/ritual-sdk dotenv

# Create .env file
cat > .env << 'EOF'
# Ritual Network Config
RITUAL_RPC_URL=https://rpc.ritualfoundation.org
RITUAL_CHAIN_ID=1979
PRIVATE_KEY=your_private_key_here

# Server Config
PORT=3000
FRONTEND_URL=https://ritual-oracle-two.vercel.app

# Mock Data (ganti dengan real inference nanti)
SIGNAL_ACCURACY=73.4
AVG_LATENCY=318
EOF

# Create backend server
cat > server.js << 'EOF'
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Mock signal data (nanti ganti dengan real LLM inference)
const generateSignal = () => {
    const pairs = ['ETH/USDC', 'BTC/USDC', 'SOL/USDC', 'AVAX/USDC', 'ARB/USDC'];
    const actions = ['BUY', 'SELL', 'HOLD'];
    const pair = pairs[Math.floor(Math.random() * pairs.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    return {
        pair,
        action,
        confidence,
        timestamp: new Date().toISOString(),
        blockNumber: Math.floor(Math.random() * 10000) + 48000
    };
};

// API Endpoints
app.get('/api/signals/latest', (req, res) => {
    const signals = Array(5).fill(null).map(() => generateSignal());
    res.json({ signals, accuracy: process.env.SIGNAL_ACCURACY });
});

app.get('/api/stats', (req, res) => {
    res.json({
        latency: process.env.AVG_LATENCY,
        blockTime: 350,
        chainId: process.env.RITUAL_CHAIN_ID
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔮 Ritual Oracle Backend running on port ${PORT}`);
});
EOF

# Create systemd service
cat > /etc/systemd/system/ritual-oracle-backend.service << 'EOF'
[Unit]
Description=Ritual Oracle Backend Server
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/ritual-oracle-backend
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
systemctl daemon-reload
systemctl enable ritual-oracle-backend
systemctl start ritual-oracle-backend

echo "✅ Backend setup complete!"
echo " API available at: http://$(curl -s ifconfig.me):3000"
echo "📝 Check logs: journalctl -u ritual-oracle-backend -f"
