// Tools you use. These start as plain official links.
// If you later join an affiliate program, swap the href for your tracking link
// and set `affiliate: true`. The page then labels it and adds rel="sponsored".
export const resources = [
  {
    group: "Build",
    items: [
      { name: "VS Code", note: "My editor.", href: "https://code.visualstudio.com", affiliate: false },
      { name: "GitHub", note: "Code and portfolio.", href: "https://github.com", affiliate: false },
      { name: "Vercel", note: "Where I deploy Next.js apps.", href: "https://vercel.com", affiliate: false },
      { name: "Solana docs", note: "The official developer docs.", href: "https://solana.com/docs", affiliate: false },
    ],
  },
  {
    group: "Wallets (use test wallets for learning)",
    items: [
      { name: "Phantom", note: "Solana wallet, set to devnet for testing.", href: "https://phantom.com", affiliate: false },
      { name: "MetaMask", note: "EVM wallet, set to Sepolia for testing.", href: "https://metamask.io", affiliate: false },
    ],
  },
  {
    group: "Reading the chain",
    items: [
      { name: "Solscan", note: "Solana block explorer.", href: "https://solscan.io", affiliate: false },
      { name: "Etherscan", note: "Ethereum block explorer.", href: "https://etherscan.io", affiliate: false },
      { name: "DexScreener", note: "Pools, liquidity and charts.", href: "https://dexscreener.com", affiliate: false },
    ],
  },
];
