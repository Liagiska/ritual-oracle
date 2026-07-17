// ═══════════════════════════════════════════════════════════════
// PRECOMPILES DATA
// ═══════════════════════════════════════════════════════════════
const PRECOMPILES = [
    { name: 'LLM Inference', address: '0x0802', exec: 'short-async', tags: ['short'], icon: '🧠',
      desc: 'On-chain LLM inference with SSE streaming support. Call any LLM model directly from your smart contract with real-time token streaming.' },
    { name: 'HTTP Request', address: '0x0801', exec: 'short-async', tags: ['short'], icon: '🌐',
      desc: 'Make HTTP/HTTPS requests from smart contracts. Fetch off-chain data, call APIs, and integrate web services on-chain.' },
    { name: 'Sovereign Agent', address: '0x080C', exec: 'long-async', tags: ['long'], icon: '👑',
      desc: 'Fully autonomous agent with own wallet, identity, and schedule. Deploys independently, runs perpetually via Scheduler.' },
    { name: 'Persistent Agent', address: '0x0820', exec: 'long-async', tags: ['long'], icon: '🔄',
      desc: 'Stateful agent with persistent memory across sessions. Maintains context, learns from history, builds knowledge over time.' },
    { name: 'Long HTTP', address: '0x0805', exec: 'long-async', tags: ['long'], icon: '⏳',
      desc: 'Long-running HTTP requests with poll/deliver patterns. For APIs that take >5s to respond.' },
    { name: 'Image Processing', address: '0x0818', exec: 'long-async', tags: ['long'], icon: '🖼️',
      desc: 'On-chain image analysis and generation. Process images through AI models directly from contracts.' },
    { name: 'Audio Processing', address: '0x0819', exec: 'long-async', tags: ['long'], icon: '🎵',
      desc: 'On-chain audio transcription, analysis, and generation. Speech-to-text and audio AI capabilities.' },
    { name: 'Video Processing', address: '0x081A', exec: 'long-async', tags: ['long'], icon: '🎬',
      desc: 'On-chain video analysis and processing. Frame extraction, object detection, and video understanding.' },
    { name: 'ONNX Inference', address: '0x0800', exec: 'sync', tags: ['sync'], icon: '🔮',
      desc: 'Synchronous ONNX ML model inference. Run machine learning models deterministically on-chain.' },
    { name: 'Ed25519 Verify', address: '0x0009', exec: 'sync', tags: ['sync'], icon: '🔐',
      desc: 'Ed25519 signature verification. Verify off-chain signatures on-chain for authentication and authorization.' },
    { name: 'Passkey (SECP256R1)', address: '0x0100', exec: 'sync', tags: ['sync'], icon: '🔑',
      desc: 'SECP256R1 curve operations for passkey-based authentication. WebAuthn-compatible on-chain verification.' },
    { name: 'TxPasskey', address: '0x77', exec: 'sync', tags: ['sync'], icon: '✍️',
      desc: 'Transaction passkey verification. Sign and verify transactions using passkey credentials.' },
    { name: 'Scheduler', address: 'System', exec: 'cross-cutting', tags: ['cross'], icon: '⏰',
      desc: 'Scheduled execution system contract. Set predicates and triggers for automated contract execution.' },
    { name: 'Secrets', address: 'System', exec: 'cross-cutting', tags: ['cross'], icon: '🤫',
      desc: 'ECIES encryption, secret name replacement, PII redaction, and delegated ACL for confidential data.' },
    { name: 'X402 Payments', address: '0x0402', exec: 'cross-cutting', tags: ['cross'], icon: '💳',
      desc: 'X402 micropayment protocol via HTTP. Pay-per-call APIs with automatic billing and settlement.' },
    { name: 'ONX Framework', address: 'System', exec: 'cross-cutting', tags: ['cross'], icon: '⚡',
      desc: 'ONX execution framework for orchestrating multi-step on-chain workflows with precompile chaining.' }
];

// ═══════════════════════════════════════════════════════════════
// SKILLS DATA
// ═══════════════════════════════════════════════════════════════
const SKILLS = [
    // Meta Protocols (Ω)
    { name: 'ritual-meta-bootstrap', category: 'meta', desc: '10 behavioral rules as background middleware for the entire build session.' },
    { name: 'ritual-meta-inspiration', category: 'meta', desc: 'JIT idea generation from live blockchain and AI trends for project inspiration.' },
    { name: 'ritual-meta-projection', category: 'meta', desc: 'Transform raw ideas into Ritual-native specifications with precompile mappings.' },
    { name: 'ritual-meta-elicitation', category: 'meta', desc: 'Lazy goal-state variance reduction with 0-5 contextual questions.' },
    { name: 'ritual-meta-orchestrator', category: 'meta', desc: 'Build-debug interleaving with 4 principles for efficient development.' },
    { name: 'ritual-meta-circuit-breaker', category: 'meta', desc: 'Trajectory divergence detection to stop before wasting budget.' },
    { name: 'ritual-meta-human-in-loop', category: 'meta', desc: 'Mid-session fork elicitation for expensive preference-based decisions.' },
    { name: 'ritual-meta-non-interactive-bias', category: 'meta', desc: 'Search before asking — exhaust 5-step resolution hierarchy first.' },
    { name: 'ritual-meta-verification', category: 'meta', desc: 'Per-skill checks, cross-skill integration, and 12-step E2E journey verification.' },
    // Architecture & Reference (Ω)
    { name: 'ritual-dapp-overview', category: 'reference', desc: 'Chain architecture, TEE-EOVMT, 3 execution models, 9-state async lifecycle, system contracts.' },
    { name: 'ritual-dapp-precompiles', category: 'reference', desc: 'All 16 precompile ABIs with field counts, Solidity + viem encoding examples.' },
    { name: 'ritual-dapp-deploy', category: 'reference', desc: 'Chain config (ID 1979), Foundry/Hardhat setup, deployment scripts, faucet access.' },
    { name: 'ritual-dapp-design', category: 'reference', desc: 'Dark-mode terminal aesthetic, typography, color semantics, WCAG 2.1 AA compliance.' },
    // Precompile Features (α)
    { name: 'ritual-dapp-http', category: 'precompile', desc: 'HTTP precompile (0x0801) — fetch APIs, webhooks, and off-chain data from contracts.' },
    { name: 'ritual-dapp-llm', category: 'precompile', desc: 'LLM precompile (0x0802) — on-chain AI inference with SSE streaming responses.' },
    { name: 'ritual-dapp-agents', category: 'precompile', desc: 'Persistent Agent (0x0820) + Sovereign Agent (0x080C) — autonomous on-chain agents.' },
    { name: 'ritual-dapp-longrunning', category: 'precompile', desc: 'Long HTTP (0x0805) — long-running async requests with poll/deliver patterns.' },
    { name: 'ritual-dapp-multimodal', category: 'precompile', desc: 'Image (0x0818), Audio (0x0819), Video (0x081A) — multimodal AI processing on-chain.' },
    { name: 'ritual-dapp-onnx', category: 'precompile', desc: 'ONNX ML inference (0x0800) — synchronous deterministic model execution.' },
    { name: 'ritual-dapp-ed25519', category: 'precompile', desc: 'Ed25519 signature verification (0x0009) — off-chain to on-chain auth bridge.' },
    { name: 'ritual-dapp-scheduler', category: 'precompile', desc: 'Scheduler system contract — predicates and triggers for automated execution.' },
    { name: 'ritual-dapp-secrets', category: 'precompile', desc: 'ECIES encryption, secret replacement, PII redaction, delegated ACL for confidential data.' },
    { name: 'ritual-dapp-x402', category: 'precompile', desc: 'X402 micropayments via HTTP — pay-per-call APIs with automatic settlement.' },
    { name: 'ritual-dapp-passkey', category: 'precompile', desc: 'SECP256R1 (0x0100) + TxPasskey (0x77) — passkey-based auth and tx signing.' },
    // Smart Contracts (α)
    { name: 'ritual-dapp-contracts', category: 'contract', desc: 'Consumer patterns: sync, short-running decoding, long-running callbacks, auth, events.' },
    { name: 'ritual-dapp-wallet', category: 'contract', desc: 'RitualWallet deposit/lock/withdraw, fee estimation, emergency withdrawal patterns.' },
    // Full-Stack (α)
    { name: 'ritual-dapp-frontend', category: 'fullstack', desc: 'Next.js + wagmi, 9-state async TX machine, spcCalls parsing, SSE streaming integration.' },
    { name: 'ritual-dapp-backend', category: 'fullstack', desc: 'Event indexer, AsyncJobTracker watcher, sender lock serialization, health endpoints.' },
    { name: 'ritual-dapp-testing', category: 'fullstack', desc: 'Foundry unit/fuzz/fork tests, vm.mockCall for precompiles, Vitest, Playwright E2E.' },
];

// ═══════════════════════════════════════════════════════════════
// RENDER PRECOMPILES
// ═══════════════════════════════════════════════════════════════
function renderPrecompiles() {
    const grid = document.getElementById('precompileGrid');
    if (!grid || grid.children.length > 0) return; // Already rendered
    
    const tagMap = {
        'sync': { cls: 'tag-sync', label: 'Sync' },
        'short': { cls: 'tag-short', label: 'Short Async' },
        'long': { cls: 'tag-long', label: 'Long Async' },
        'cross': { cls: 'tag-cross', label: 'Cross-Cutting' }
    };
    
    PRECOMPILES.forEach(pc => {
        const card = document.createElement('div');
        card.className = `precompile-card ${pc.exec}`;
        card.innerHTML = `
            <div class="precompile-header">
                <div class="precompile-icon">${pc.icon}</div>
                <div>
                    <div class="precompile-name">${pc.name}</div>
                    <div class="precompile-address">${pc.address}</div>
                </div>
            </div>
            <div class="precompile-desc">${pc.desc}</div>
            <div class="precompile-tags">
                ${pc.tags.map(t => `<span class="precompile-tag ${tagMap[t].cls}">${tagMap[t].label}</span>`).join('')}
            </div>
        `;
        grid.appendChild(card);
    });
}

// ═══════════════════════════════════════════════════════════════
// RENDER SKILLS
// ═══════════════════════════════════════════════════════════════
function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid || grid.children.length > 0) return;
    
    const catClassMap = {
        'meta': 'cat-meta',
        'precompile': 'cat-precompile',
        'contract': 'cat-contract',
        'fullstack': 'cat-fullstack',
        'reference': 'cat-reference'
    };
    const catLabelMap = {
        'meta': 'Ω Meta',
        'precompile': 'α Precompile',
        'contract': 'α Contract',
        'fullstack': 'α Full-Stack',
        'reference': 'Ω Reference'
    };
    
    SKILLS.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        card.dataset.category = skill.category;
        card.dataset.search = `${skill.name} ${skill.desc}`.toLowerCase();
        card.innerHTML = `
            <div class="skill-header">
                <span class="skill-category-badge ${catClassMap[skill.category]}">${catLabelMap[skill.category]}</span>
                <span class="skill-name">${skill.name}</span>
            </div>
            <div class="skill-desc">${skill.desc}</div>
        `;
        grid.appendChild(card);
    });
}

// ═══════════════════════════════════════════════════════════════
// FILTER SKILLS
// ═══════════════════════════════════════════════════════════════
function filterSkills() {
    const query = (document.getElementById('skillSearch')?.value || '').toLowerCase();
    const category = document.getElementById('skillFilter')?.value || 'all';
    
    document.querySelectorAll('.skill-card').forEach(card => {
        const matchSearch = !query || card.dataset.search.includes(query);
        const matchCat = category === 'all' || card.dataset.category === category;
        card.classList.toggle('hidden', !(matchSearch && matchCat));
    });
}

// ═══════════════════════════════════════════════════════════════
// FETCH ON-CHAIN AGENT STATS
// ═══════════════════════════════════════════════════════════════
async function loadAgentStats() {
    try {
        const res = await fetch('https://rpc.ritualfoundation.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_blockNumber', params: [], id: 1 })
        });
        const data = await res.json();
        const blockNum = parseInt(data.result, 16);
        
        const chainIdEl = document.getElementById('agentChainId');
        const blockNumEl = document.getElementById('agentBlockNum');
        
        if (chainIdEl) chainIdEl.textContent = '1979 (Ritual)';
        if (blockNumEl) blockNumEl.textContent = blockNum.toLocaleString();
        
        // Also try to get system contract info
        const walletAddr = '0x532F0dF0896F353d8C3DD8cc134e8129DA2a3948';
        const walletRes = await fetch('https://rpc.ritualfoundation.org', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jsonrpc: '2.0', method: 'eth_getCode', params: [walletAddr, 'latest'], id: 2 })
        });
        const walletData = await walletRes.json();
        const isDeployed = walletData.result && walletData.result !== '0x';
        
        const walletEl = document.getElementById('agentWalletAddr');
        if (walletEl) walletEl.textContent = isDeployed ? `${walletAddr.slice(0,6)}...${walletAddr.slice(-4)} ✓ Deployed` : `${walletAddr.slice(0,6)}...${walletAddr.slice(-4)}`;
    } catch (e) {
        console.log('Agent stats fetch failed, using defaults');
        const chainIdEl = document.getElementById('agentChainId');
        const blockNumEl = document.getElementById('agentBlockNum');
        if (chainIdEl) chainIdEl.textContent = '1979 (Ritual)';
        if (blockNumEl) blockNumEl.textContent = '—';
    }
}
