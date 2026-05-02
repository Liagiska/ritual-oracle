#!/bin/bash
# ============================================
# RITUAL ORACLE — Smart Contract Setup
# Deploy Oracle Contract to Ritual Testnet
# ============================================
set -e

echo "🔮 Setting up Smart Contracts..."

# Create contract directory
mkdir -p /root/ritual-oracle-contracts
cd /root/ritual-oracle-contracts

# Initialize Hardhat project
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npx hardhat init << EOF
TypeScript
contracts
scripts
tests
.gitignore
package.json
EOF

# Create Oracle Smart Contract
cat > contracts/SignalOracle.sol << 'EOF'
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SignalOracle {
    struct Signal {
        string pair;
        string action; // BUY, SELL, HOLD
        uint256 confidence;
        uint256 timestamp;
        uint256 blockNumber;
        address generator;
    }
    
    uint256 public signalCount;
    mapping(uint256 => Signal) public signals;
    mapping(address => bool) public authorizedGenerators;
    
    event SignalGenerated(
        uint256 indexed signalId,
        string pair,
        string action,
        uint256 confidence
    );
    
    modifier onlyAuthorized() {
        require(authorizedGenerators[msg.sender], "Not authorized");
        _;
    }
    
    function generateSignal(
        string memory pair,
        string memory action,
        uint256 confidence
    ) external onlyAuthorized returns (uint256) {
        require(confidence <= 100, "Confidence must be <= 100");
        
        signalCount++;
        signals[signalCount] = Signal({
            pair: pair,
            action: action,
            confidence: confidence,
            timestamp: block.timestamp,
            blockNumber: block.number,
            generator: msg.sender
        });
        
        emit SignalGenerated(signalCount, pair, action, confidence);
        return signalCount;
    }
    
    function authorizeGenerator(address generator) external {
        authorizedGenerators[generator] = true;
    }
    
    function getLatestSignals(uint256 count) external view returns (Signal[] memory) {
        uint256 startIndex = signalCount > count ? signalCount - count : 0;
        uint256 resultCount = signalCount - startIndex;
        
        Signal[] memory result = new Signal[](resultCount);
        for (uint256 i = 0; i < resultCount; i++) {
            result[i] = signals[startIndex + i + 1];
        }
        return result;
    }
}
EOF

# Create deployment script
cat > scripts/deploy.js << 'EOF'
const hre = require("hardhat");

async function main() {
    console.log("🔮 Deploying SignalOracle to Ritual Testnet...");
    
    const SignalOracle = await hre.ethers.getContractFactory("SignalOracle");
    const oracle = await SignalOracle.deploy();
    await oracle.waitForDeployment();
    
    const address = await oracle.getAddress();
    console.log(`✅ SignalOracle deployed to: ${address}`);
    console.log(`📝 Network: ${hre.network.name} (Chain ID: ${hre.network.config.chainId})`);
    
    // Save deployment info
    const fs = require('fs');
    const deploymentInfo = {
        network: hre.network.name,
        chainId: hre.network.config.chainId,
        address: address,
        deployedAt: new Date().toISOString()
    };
    
    fs.writeFileSync('deployment.json', JSON.stringify(deploymentInfo, null, 2));
    console.log("📄 Deployment info saved to deployment.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
EOF

# Configure Hardhat for Ritual
cat > hardhat.config.js << 'EOF'
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.20",
  networks: {
    ritual: {
      url: "https://rpc.ritualfoundation.org",
      chainId: 1979,
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : []
    }
  }
};
EOF

echo "✅ Smart contract setup complete!"
echo "📝 To deploy: cd /root/ritual-oracle-contracts && npx hardhat run scripts/deploy.js --network ritual"
